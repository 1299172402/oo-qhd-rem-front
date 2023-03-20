/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const http = require("http");
const handlebars = require("handlebars");
const config = require("./config");

// 读取配置 初始化Map
const _apiFilePath = `${__dirname}/${config.apiFilePath}`;
const _modelFilePath = `${__dirname}/${config.modelFilePath}`;
const _apiFileType = `${config.apiFileType}`;

const getJson = (url) => {
  return new Promise((resolve) => {
    let json = "";
    http.get(url, (res) => {
      res.setEncoding("utf-8");
      res
        .on("data", (data) => {
          json += data;
        })
        .on("end", () => {
          resolve(JSON.parse(json));
        });
    });
  });
};

// 建立目录
if (!fs.existsSync(_apiFilePath)) {
  fs.mkdirSync(_apiFilePath);
}
if (!fs.existsSync(_modelFilePath)) {
  fs.mkdirSync(_modelFilePath);
}

// 读取模板文件
const modelTemplateFileName = `${__dirname}/${config.templatePath}/model.hbs`;
const modelCompiler = handlebars.compile(fs.readFileSync(modelTemplateFileName, "utf-8"));
const apiTemplateFileName = `${__dirname}/${config.templatePath}/api-${_apiFileType}.hbs`;
const apiCompiler = handlebars.compile(fs.readFileSync(apiTemplateFileName, "utf-8"));

//制定模板处理函数
handlebars.registerHelper("isDiffRef", (name, refName) => {
  return name != refName;
});
handlebars.registerHelper("lowerCase", (str) => {
  return str.toLowerCase();
});
handlebars.registerHelper("isPost", (str) => {
  return str == "post"
});

// 处理类型映射
const typeMapping = (jsonType, isArray, ref, refSet) => {
  switch (jsonType) {
    case "integer":
    case "number":
      return !isArray ? "number" : "number[]";
    case "string":
      return !isArray ? "string" : "string[]";
    default:
      // eslint-disable-next-line no-case-declarations
      try{
        console.log('------ref----',ref);
        const _ref = ref.replace("#/definitions/", "").replace(/dto/gi, "");
        if (refSet) {
          if (!refSet.has(_ref)) {
            refSet.add(_ref);
          }
        }
        return !isArray ? _ref : `${_ref}[]`;
      }catch(err){
        console.log(err,ref);
      }
  }
};

// 处理model的property类型
const getModelProperty = (propertyValue, refSet) => {
  if (propertyValue.type && propertyValue.type == "array") {
    return typeMapping(propertyValue.items.type, true, propertyValue.items.$ref, refSet);
  } else {
    return typeMapping(propertyValue.type, false, propertyValue.$ref, refSet);
  }
};

// 处理api参数的property类型
const getApiParamProperty = (paramValue, refSet) => {
  if (paramValue.schema && paramValue.schema.type && paramValue.schema.type == "array") {
    return typeMapping(paramValue.schema.items.type, true, paramValue.schema.items.$ref, refSet);
  } else if (paramValue.schema && paramValue.schema.type && paramValue.schema.type == "string") {
    return typeMapping(paramValue.schema.type, false, undefined, refSet);
  } else if (paramValue.schema) {
    return typeMapping(paramValue.type, false, paramValue.schema.$ref, refSet);
  } else if (paramValue.type && paramValue.type == "array") {
    return typeMapping(paramValue.items.type, true, paramValue.items.$ref, refSet);
  } else {
    return typeMapping(paramValue.type, false, undefined, refSet);
  }
};

// 处理api返回值的property类型
const getApiResponseProperty = (responseOK, refSet) => {
  if (!responseOK.schema || (responseOK.schema.type && responseOK.schema.type == "object")) {
    return "";
  } else if (responseOK.schema.type && responseOK.schema.type == "array") {
    return typeMapping(responseOK.schema.items.type, true, responseOK.schema.items.$ref, refSet);
  } else {
    return typeMapping(responseOK.schema.type, false, responseOK.schema.$ref, refSet);
  }
};

// 处理request参数
const processParam = (paramName, paramType, apiData, request) => {
  const pathParams = request.parameters.filter((param) => param.in == paramType);
  if (pathParams && pathParams.length > 0) {
    apiData[paramName] = pathParams;
  }
};

// 解析model的函数
const resolveModel = (swaggerJson, modelMap) => {
  //Dto
  for (const definitionKey in swaggerJson.definitions) {
    // 待处理
    if (definitionKey.includes("DataSetDTO")) {
      continue;
    }
    // eslint-disable-next-line no-prototype-builtins
    if (swaggerJson.definitions.hasOwnProperty(definitionKey)) {
      const definitionValue = swaggerJson.definitions[definitionKey];
      if (definitionValue.type == "object") {
        const modelName = definitionKey.replace(/dto/gi, "");
        if (!modelMap.has(modelName)) {
          const modelProperty = {};
          const refSet = new Set();
          for (const propertyName in definitionValue.properties) {
            // eslint-disable-next-line no-prototype-builtins
            if (definitionValue.properties.hasOwnProperty(propertyName)) {
              const propertyValue = definitionValue.properties[propertyName];
              modelProperty[propertyName] = getModelProperty(propertyValue, refSet);
            }
          }
          const modelDescription = {
            properties: modelProperty,
          };
          if (refSet.size > 0) {
            modelDescription.refs = Array.from(refSet);
          }
          modelMap.set(modelName, modelDescription);
        }
      }
    }
  }
};

// 解析api的函数
const resolveApi = (swaggerJson, apiMap, tagMap, apiFileType, filterWords) => {
  const methods = ["get", "post", "delete", "put"];
  for (const pathKey in swaggerJson.paths) {
    // 增加路由字段过滤器
    if (filterWords) {
      let containsKey = false;
      for (const word of filterWords) {
        if (pathKey.includes(word)) {
          containsKey = true;
          break;
        }
      }
      if (containsKey) {
        continue;
      }
    }
    // eslint-disable-next-line no-prototype-builtins
    if (swaggerJson.paths.hasOwnProperty(pathKey)) {
      const requests = swaggerJson.paths[pathKey];
      for (const method of methods) {
        // eslint-disable-next-line no-prototype-builtins
        if (requests.hasOwnProperty(method)) {
          const request = requests[method];
          // if (request.consumes && request.consumes.length > 0 && request.consumes[0] == "application/json") {
            const resource = tagMap.get(request.tags[0]).toLowerCase();
            if (!apiMap.has(resource)) {
              apiMap.set(resource, { refs: new Set(), data: [] });
            }
            const refSet = apiMap.get(resource).refs;
            const regExp = /\{[^{}]+\}/g;
            const matches = pathKey.match(regExp);
            let url = pathKey;
            if (matches) {
              for (let index = 0; index < matches.length; index++) {
                const eachMatch = matches[index];
                url = pathKey.replace(new RegExp(eachMatch, "g"), `$${eachMatch}`);
              }
            }
            const apiData = {
              url: url,
              method: method,
              function: request.operationId.replace(new RegExp(`Using${method.toUpperCase()}.*`), ""),
              responseDataType: getApiResponseProperty(request.responses[200], refSet),
            };

            if (request.parameters) {
              processParam("pathParams", "path", apiData, request);
              processParam("bodyParams", "body", apiData, request);
              processParam("queryParams", "query", apiData, request);
              apiData["args"] = request.parameters.map((parameter) => {
                return {
                  name: parameter.name,
                  type: apiFileType == "js" ? "" : getApiParamProperty(parameter, refSet),
                };
              });
            }
            apiMap.get(resource).data.push(apiData);
          // }
        }
      }
    }
  }
};

// 解析tag的函数
const resolveTags = (swaggerJson, tagMap) => {
  for (const tag of swaggerJson.tags) {
    if (!tagMap.has(tag.name)) {
      tagMap.set(tag.name, tag.description.replace(/\s/g, "").replace(/Controller/gi, ""));
    }
  }
};

// 保存Api文件
const saveApiFiles = (apiMap, apiFilePath, templateCompiler, apiFileType, moduleName, baseUrl, devBaseUrl) => {
  apiMap.forEach((value, key) => {
    if (!fs.existsSync(`${apiFilePath}/${moduleName}`)) {
      fs.mkdirSync(`${apiFilePath}/${moduleName}`);
    }
    fs.writeFileSync(
      `${apiFilePath}/${moduleName}/${key}.${apiFileType}`,
      templateCompiler({ data: value.data, refs: value.refs, moduleName, baseUrl, devBaseUrl })
    );
  });
};

//保存Model文件
const saveModelFiles = (modelMap, modelFilePath, templateCompiler, moduleName) => {
  modelMap.forEach((value, key) => {
    if (!fs.existsSync(`${modelFilePath}/${moduleName}`)) {
      fs.mkdirSync(`${modelFilePath}/${moduleName}`);
    }
    fs.writeFileSync(
      `${modelFilePath}/${moduleName}/${key.toLowerCase()}.ts`,
      templateCompiler({
        name: key,
        properties: value.properties,
        refs: value.refs,
      })
    );
  });
};

// 处理不用模块的json文件
config.modules.forEach((module) => {
  const _apiMap = new Map();
  const _modelMap = new Map();
  const _tagMap = new Map();
  const execFunc = (swaggerJson) => {
    // 执行解析函数
    resolveTags(swaggerJson, _tagMap);
    resolveApi(swaggerJson, _apiMap, _tagMap, _apiFileType, module.filterWords);
    // 执行保存文件
    saveApiFiles(_apiMap, _apiFilePath, apiCompiler, _apiFileType, module.name,module.baseUrl,module.devBaseUrl);
    // 执行保存model文件
    if (_apiFileType == "ts") {
      resolveModel(swaggerJson, _modelMap);
      saveModelFiles(_modelMap, _modelFilePath, modelCompiler, module.name);
    }
  };
  if (module.generatorType === 0) {
    execFunc(require(module.generatorSource));
  } else {
    getJson(module.generatorSource).then(execFunc);
  }
});
