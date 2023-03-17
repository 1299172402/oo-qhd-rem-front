/** !
 * AngularJS file upload/drop directive and service with progress and abort
 * @author  Danial  <danial.farid@gmail.com>
 * @version 4.1.0
 */
(function () {

  let key; let i;
  function patchXHR(fnName, newFn) {
    window.XMLHttpRequest.prototype[fnName] = newFn(window.XMLHttpRequest.prototype[fnName]);
  }

  if (window.XMLHttpRequest && !window.XMLHttpRequest.__isFileAPIShim) {
    patchXHR('setRequestHeader', (orig) => function (header, value) {
      if (header === '__setXHR_') {
        const val = value(this);
        // fix for angular < 1.2.0
        if (val instanceof Function) {
          val(this);
        }
      } else {
        orig.apply(this, arguments);
      }
    });
  }

  const ngFileUpload = angular.module('ngFileUpload', []);

  ngFileUpload.version = '4.1.0';
  ngFileUpload.service('Upload', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    function sendHttp(config) {
      config.method = config.method || 'POST';
      config.headers = config.headers || {};
      config.transformRequest = config.transformRequest || function (data, headersGetter) {
        if (window.ArrayBuffer && data instanceof window.ArrayBuffer) {
          return data;
        }
        return $http.defaults.transformRequest[0](data, headersGetter);
      };
      const deferred = $q.defer();
      const {promise} = deferred;

      config.headers.__setXHR_ = function () {
        return function (xhr) {
          if (!xhr) return;
          config.__XHR = xhr;
          config.xhrFn && config.xhrFn(xhr);
          xhr.upload.addEventListener('progress', (e) => {
            e.config = config;
            deferred.notify ? deferred.notify(e) : promise.progress_fn && $timeout(() => {
              promise.progress_fn(e)
            });
          }, false);
          // fix for firefox not firing upload progress end, also IE8-9
          xhr.upload.addEventListener('load', (e) => {
            if (e.lengthComputable) {
              e.config = config;
              deferred.notify ? deferred.notify(e) : promise.progress_fn && $timeout(() => {
                promise.progress_fn(e)
              });
            }
          }, false);
        };
      };

      $http(config).then((r) => {
        deferred.resolve(r)
      }, (e) => {
        deferred.reject(e)
      }, (n) => {
        deferred.notify(n)
      });

      promise.success = function (fn) {
        promise.then((response) => {
          fn(response.data, response.status, response.headers, config);
        });
        return promise;
      };

      promise.error = function (fn) {
        promise.then(null, (response) => {
          fn(response.data, response.status, response.headers, config);
        });
        return promise;
      };

      promise.progress = function (fn) {
        promise.progress_fn = fn;
        promise.then(null, null, (update) => {
          fn(update);
        });
        return promise;
      };
      promise.abort = function () {
        if (config.__XHR) {
          $timeout(() => {
            config.__XHR.abort();
          });
        }
        return promise;
      };
      promise.xhr = function (fn) {
        config.xhrFn = (function (origXhrFn) {
          return function () {
            origXhrFn && origXhrFn.apply(promise, arguments);
            fn.apply(promise, arguments);
          }
        })(config.xhrFn);
        return promise;
      };

      return promise;
    }

    this.upload = function (config) {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = undefined;
      config.transformRequest = config.transformRequest ?
        (angular.isArray(config.transformRequest) ?
          config.transformRequest : [config.transformRequest]) : [];
      config.transformRequest.push((data) => {
        const formData = new FormData();
        const allFields = {};
        for (key in config.fields) {
          if (config.fields.hasOwnProperty(key)) {
            allFields[key] = config.fields[key];
          }
        }
        if (data) allFields.data = data;

        if (config.formDataAppender) {
          for (key in allFields) {
            if (allFields.hasOwnProperty(key)) {
              config.formDataAppender(formData, key, allFields[key]);
            }
          }
        } else {
          for (key in allFields) {
            if (allFields.hasOwnProperty(key)) {
              let val = allFields[key];
              if (val !== undefined) {
                if (angular.isDate(val)) {
                  val = val.toISOString();
                }
                if (angular.isString(val)) {
                  formData.append(key, val);
                } else if (config.sendObjectsAsJsonBlob && angular.isObject(val)) {
                  formData.append(key, new Blob([val], {type: 'application/json'}));
                } else {
                  formData.append(key, JSON.stringify(val));
                }

              }
            }
          }
        }

        if (config.file != null) {
          const fileFormName = config.fileFormDataName || 'file';

          if (angular.isArray(config.file)) {
            const isFileFormNameString = angular.isString(fileFormName);
            for (let i = 0; i < config.file.length; i++) {
              formData.append(isFileFormNameString ? fileFormName : fileFormName[i], config.file[i],
                (config.fileName && config.fileName[i]) || config.file[i].name);
            }
          } else {
            formData.append(fileFormName, config.file, config.fileName || config.file.name);
          }
        }
        return formData;
      });

      return sendHttp(config);
    };

    this.http = function (config) {
      return sendHttp(config);
    };
  }]);

  ngFileUpload.directive('ngfSelect', ['$parse', '$timeout', '$compile',
    function ($parse, $timeout, $compile) {
      return {
        restrict: 'AEC',
        require: '?ngModel',
        link (scope, elem, attr, ngModel) {
          linkFileSelect(scope, elem, attr, ngModel, $parse, $timeout, $compile);
        }
      }
    }]);

  function linkFileSelect(scope, elem, attr, ngModel, $parse, $timeout, $compile) {
    function isInputTypeFile() {
      return elem[0].tagName.toLowerCase() === 'input' && elem.attr('type') && elem.attr('type').toLowerCase() === 'file';
    }
    const changeFnAttr = attr.ngfChange || (attr.ngfSelect && attr.ngfSelect.indexOf('(') > 0);
    let isUpdating = false;
    function changeFn(evt) {
      if (!isUpdating) {
        isUpdating = true;
        try {
          const fileList = evt.__files_ || (evt.target && evt.target.files);
          const files = []; const rejFiles = [];

          for (let i = 0; i < fileList.length; i++) {
            const file = fileList.item(i);
            if (validate(scope, $parse, attr, file, evt)) {
              files.push(file);
            } else {
              rejFiles.push(file);
            }
          }
          updateModel($parse, $timeout, scope, ngModel, attr, changeFnAttr, files, rejFiles, evt);
          if (files.length == 0) evt.target.value = files;
          //                if (evt.target && evt.target.getAttribute('__ngf_gen__')) {
          //                    angular.element(evt.target).remove();
          //                }
        } finally {
          isUpdating = false;
        }
      }
    }

    function bindAttrToFileInput(fileElem) {
      if (attr.ngfMultiple) fileElem.attr('multiple', $parse(attr.ngfMultiple)(scope));
      if (!$parse(attr.ngfMultiple)(scope)) fileElem.attr('multiple', undefined);
      if (attr.accept) fileElem.attr('accept', attr.accept);
      if (attr.ngfCapture) fileElem.attr('capture', $parse(attr.ngfCapture)(scope));
      if (attr.ngfDisabled) fileElem.attr('disabled', $parse(attr.ngfDisabled)(scope));
      for (let i = 0; i < elem[0].attributes.length; i++) {
        const attribute = elem[0].attributes[i];
        if (attribute.name !== 'type' && attribute.name !== 'class' && attribute.name !== 'id' && attribute.name !== 'style') {
            	fileElem.attr(attribute.name, attribute.value);
        }
      }
    }

    function createFileInput(evt) {
      if (elem.attr('disabled')) {
        return;
      }
      const fileElem = angular.element('<input type="file">');
      bindAttrToFileInput(fileElem);

      if (isInputTypeFile()) {
        elem.replaceWith(fileElem);
        elem = fileElem;
      } else {
        fileElem.css('display', 'none').attr('tabindex', '-1').attr('__ngf_gen__', true);
        if (elem.__ngf_ref_elem__) {elem.__ngf_ref_elem__.remove();}
        elem.__ngf_ref_elem__ = fileElem;
        document.body.appendChild(fileElem[0]);
      }

      return fileElem;
    }

    function resetModel(evt) {
      updateModel($parse, $timeout, scope, ngModel, attr, changeFnAttr, [], [], evt, true);
    }

    function clickHandler(evt) {
    	evt.preventDefault();
      const fileElem = createFileInput(evt);
      if (fileElem) {
        	fileElem.bind('change', changeFn);
        	resetModel(evt);

        	function clickAndAssign() {
            	fileElem[0].click();
    	        if (isInputTypeFile()) {
    	            elem.bind('click touchend', clickHandler);
    	            evt.preventDefault()
    	        }
        	}
        	
        	// fix for android native browser
        	if (navigator.userAgent.toLowerCase().match(/android/)) {
          setTimeout(() => {
                	clickAndAssign();
          }, 0);        		
        	} else {
        		clickAndAssign();
        	}
      }
    }

    if (window.FileAPI && window.FileAPI.ngfFixIE) {
      window.FileAPI.ngfFixIE(elem, createFileInput, bindAttrToFileInput, changeFn, resetModel);
    } else {
      elem.bind('click touchend', clickHandler);
    }
  }

  ngFileUpload.directive('ngfDrop', ['$parse', '$timeout', '$location', function ($parse, $timeout, $location) {
    return {
      restrict: 'AEC',
      require: '?ngModel',
      link (scope, elem, attr, ngModel) {
        linkDrop(scope, elem, attr, ngModel, $parse, $timeout, $location);
      }
    }
  }]);

  ngFileUpload.directive('ngfNoFileDrop', () => function (scope, elem) {
    if (dropAvailable()) elem.css('display', 'none')
  });

  ngFileUpload.directive('ngfDropAvailable', ['$parse', '$timeout', function ($parse, $timeout) {
    return function (scope, elem, attr) {
      if (dropAvailable()) {
        const fn = $parse(attr.ngfDropAvailable);
        $timeout(() => {
          fn(scope);
          if (fn.assign) {
            fn.assign(scope, true);                	
          }
        });
      }
    }
  }]);

  function linkDrop(scope, elem, attr, ngModel, $parse, $timeout, $location) {
    const available = dropAvailable();
    if (attr.dropAvailable) {
      $timeout(() => {
        	scope[attr.dropAvailable] ? scope[attr.dropAvailable].value = available : scope[attr.dropAvailable] = available;
      });
    }
    if (!available) {
      if ($parse(attr.ngfHideOnDropNotAvailable)(scope) == true) {
        elem.css('display', 'none');
      }
      return;
    }
    let leaveTimeout = null;
    const stopPropagation = $parse(attr.ngfStopPropagation);
    let dragOverDelay = 1;
    const accept = $parse(attr.ngfAccept);
    const disabled = $parse(attr.ngfDisabled);
    let actualDragOverClass;

    elem[0].addEventListener('dragover', (evt) => {
      if (disabled(scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
      // handling dragover events from the Chrome download bar
      if (navigator.userAgent.indexOf("Chrome") > -1) {
        const b = evt.dataTransfer.effectAllowed;
        evt.dataTransfer.dropEffect = (b === 'move' || b === 'linkMove') ? 'move' : 'copy';
      }
      $timeout.cancel(leaveTimeout);
      if (!scope.actualDragOverClass) {
        actualDragOverClass = calculateDragOverClass(scope, attr, evt);
      }
      elem.addClass(actualDragOverClass);
    }, false);
    elem[0].addEventListener('dragenter', (evt) => {
      if (disabled(scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
    }, false);
    elem[0].addEventListener('dragleave', () => {
      if (disabled(scope)) return;
      leaveTimeout = $timeout(() => {
        elem.removeClass(actualDragOverClass);
        actualDragOverClass = null;
      }, dragOverDelay || 1);
    }, false);
    elem[0].addEventListener('drop', (evt) => {
      if (disabled(scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
      elem.removeClass(actualDragOverClass);
      actualDragOverClass = null;
      extractFiles(evt, (files, rejFiles) => {
        updateModel($parse, $timeout, scope, ngModel, attr,
          attr.ngfChange || (attr.ngfDrop && attr.ngfDrop.indexOf('(') > 0), files, rejFiles, evt)
      }, $parse(attr.ngfAllowDir)(scope) != false, attr.multiple || $parse(attr.ngfMultiple)(scope));
    }, false);

    function calculateDragOverClass(scope, attr, evt) {
      let accepted = true;
      const {items} = evt.dataTransfer;
      if (items != null) {
        for (let i = 0; i < items.length && accepted; i++) {
          accepted = accepted
                    && (items[i].kind == 'file' || items[i].kind == '')
                    && validate(scope, $parse, attr, items[i], evt);
        }
      }
      let clazz = $parse(attr.ngfDragOverClass)(scope, {$event: evt});
      if (clazz) {
        if (clazz.delay) dragOverDelay = clazz.delay;
        if (clazz.accept) clazz = accepted ? clazz.accept : clazz.reject;
      }
      return clazz || attr.ngfDragOverClass || 'dragover';
    }

    function extractFiles(evt, callback, allowDir, multiple) {
      let files = []; const rejFiles = []; const {items} = evt.dataTransfer; let processing = 0;

      function addFile(file) {
        if (validate(scope, $parse, attr, file, evt)) {
          files.push(file);
        } else {
          rejFiles.push(file);
        }
      }

      if (items && items.length > 0 && $location.protocol() != 'file') {
        for (var i = 0; i < items.length; i++) {
          if (items[i].webkitGetAsEntry && items[i].webkitGetAsEntry() && items[i].webkitGetAsEntry().isDirectory) {
            const entry = items[i].webkitGetAsEntry();
            if (entry.isDirectory && !allowDir) {
              continue;
            }
            if (entry != null) {
              traverseFileTree(files, entry);
            }
          } else {
            const f = items[i].getAsFile();
            if (f != null) addFile(f);
          }
          if (!multiple && files.length > 0) break;
        }
      } else {
        const fileList = evt.dataTransfer.files;
        if (fileList != null) {
          for (var i = 0; i < fileList.length; i++) {
            addFile(fileList.item(i));
            if (!multiple && files.length > 0) break;
          }
        }
      }
      let delays = 0;
      (function waitForProcess(delay) {
        $timeout(() => {
          if (!processing) {
            if (!multiple && files.length > 1) {
              i = 0;
              while (files[i].type == 'directory') i++;
              files = [files[i]];
            }
            callback(files, rejFiles);
          } else if (delays++ * 10 < 20 * 1000) {
            waitForProcess(10);
          }
        }, delay || 0)
      })();

      function traverseFileTree(files, entry, path) {
        if (entry != null) {
          if (entry.isDirectory) {
            const filePath = (path || '') + entry.name;
            addFile({name: entry.name, type: 'directory', path: filePath});
            const dirReader = entry.createReader();
            let entries = [];
            processing++;
            var readEntries = function () {
              dirReader.readEntries((results) => {
                try {
                  if (!results.length) {
                    for (let i = 0; i < entries.length; i++) {
                      traverseFileTree(files, entries[i], `${(path || '') + entry.name  }/`);
                    }
                    processing--;
                  } else {
                    entries = entries.concat(Array.prototype.slice.call(results || [], 0));
                    readEntries();
                  }
                } catch (e) {
                  processing--;
                  console.error(e);
                }
              }, () => {
                processing--;
              });
            };
            readEntries();
          } else {
            processing++;
            entry.file((file) => {
              try {
                processing--;
                file.path = (path || '') + file.name;
                addFile(file);
              } catch (e) {
                processing--;
                console.error(e);
              }
            }, () => {
              processing--;
            });
          }
        }
      }
    }
  }

  ngFileUpload.directive('ngfSrc', ['$parse', '$timeout', function ($parse, $timeout) {
    return {
      restrict: 'AE',
      link (scope, elem, attr, file) {
        if (window.FileReader) {
          scope.$watch(attr.ngfSrc, (file) => {
            if (file) {
              $timeout(() => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function(e) {
                  $timeout(() => {
                    elem.attr('src', e.target.result);
                  });
                }
              });
            } else {
              elem.attr('src', '');
            }
          });
        }
      }
    }
  }]);

  function dropAvailable() {
    const div = document.createElement('div');
    return ('draggable' in div) && ('ondrop' in div);
  }

  function updateModel($parse, $timeout, scope, ngModel, attr, fileChange, files, rejFiles, evt, noDelay) {
    function update() {
      if (ngModel) {
        $parse(attr.ngModel).assign(scope, files);
        $timeout(() => {
          ngModel && ngModel.$setViewValue(files != null && files.length == 0 ? null : files);
        });
      }
      if (attr.ngModelRejected) {
        $parse(attr.ngModelRejected).assign(scope, rejFiles);
      }
      if (fileChange) {
        $parse(fileChange)(scope, {
          $files: files,
          $rejectedFiles: rejFiles,
          $event: evt
        });

      }
    }
    if (noDelay) {
      update();
    } else {
      $timeout(() => {
        update();
      });
    }
  }

  function validate(scope, $parse, attr, file, evt) {
    const accept = $parse(attr.ngfAccept);
    const fileSizeMax = $parse(attr.ngfMaxSize)(scope) || 9007199254740991;
    const fileSizeMin = $parse(attr.ngfMinSize)(scope) || -1;
    const val = accept(scope, {$file: file, $event: evt}); let match = false;
    if (val != null && angular.isString(val)) {
      const regexp = new RegExp(globStringToRegex(val), 'gi');
      match = (file.type != null && file.type.match(regexp)) ||
        		(file.name != null && file.name.match(regexp));
    }
    return (val == null || match) && (file.size == null || (file.size < fileSizeMax && file.size > fileSizeMin));
  }

  function globStringToRegex(str) {
    if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
      return str.substring(1, str.length - 1);
    }
    const split = str.split(','); let result = '';
    if (split.length > 1) {
      for (let i = 0; i < split.length; i++) {
        result += `(${  globStringToRegex(split[i])  })`;
        if (i < split.length - 1) {
          result += '|'
        }
      }
    } else {
      if (str.indexOf('.') == 0) {
        str = `*${  str}`;
      }
      result = `^${  str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + '-]', 'g'), '\\$&')  }$`;
      result = result.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
    }
    return result;
  }

})();

/** !
 * AngularJS file upload/drop directive and service with progress and abort
 * FileAPI Flash shim for old browsers not supporting FormData 
 * @author  Danial  <danial.farid@gmail.com>
 * @version 4.1.0
 */

(function() {

  const hasFlash = function() {
    try {
	  const fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	  if (fo) return true;
    } catch(e) {
	  if (navigator.mimeTypes['application/x-shockwave-flash'] != undefined) return true;
    }
    return false;
  }

  function patchXHR(fnName, newFn) {
    window.XMLHttpRequest.prototype[fnName] = newFn(window.XMLHttpRequest.prototype[fnName]);
  }

  if ((window.XMLHttpRequest && !window.FormData) || (window.FileAPI && FileAPI.forceLoad)) {
    const initializeUploadListener = function(xhr) {
      if (!xhr.__listeners) {
        if (!xhr.upload) xhr.upload = {};
        xhr.__listeners = [];
        const origAddEventListener = xhr.upload.addEventListener;
        xhr.upload.addEventListener = function(t, fn, b) {
          xhr.__listeners[t] = fn;
          origAddEventListener && origAddEventListener.apply(this, arguments);
        };
      }
    }
	
    patchXHR('open', (orig) => function(m, url, b) {
      initializeUploadListener(this);
      this.__url = url;
      try {
        orig.apply(this, [m, url, b]);
      } catch (e) {
        if (e.message.indexOf('Access is denied') > -1) {
          this.__origError = e;
          orig.apply(this, [m, '_fix_for_ie_crossdomain__', b]);
        }
      }
    });

    patchXHR('getResponseHeader', (orig) => function(h) {
      return this.__fileApiXHR && this.__fileApiXHR.getResponseHeader ? this.__fileApiXHR.getResponseHeader(h) : (orig == null ? null : orig.apply(this, [h]));
    });

    patchXHR('getAllResponseHeaders', (orig) => function() {
      return this.__fileApiXHR && this.__fileApiXHR.getAllResponseHeaders ? this.__fileApiXHR.getAllResponseHeaders() : (orig == null ? null : orig.apply(this));
    });

    patchXHR('abort', (orig) => function() {
      return this.__fileApiXHR && this.__fileApiXHR.abort ? this.__fileApiXHR.abort() : (orig == null ? null : orig.apply(this));
    });

    patchXHR('setRequestHeader', (orig) => function(header, value) {
      if (header === '__setXHR_') {
        initializeUploadListener(this);
        const val = value(this);
        // fix for angular < 1.2.0
        if (val instanceof Function) {
          val(this);
        }
      } else {
        this.__requestHeaders = this.__requestHeaders || {};
        this.__requestHeaders[header] = value;
        orig.apply(this, arguments);
      }
    });
	
    function redefineProp(xhr, prop, fn) {
      try {
        Object.defineProperty(xhr, prop, {get: fn});
      } catch (e) {/* ignore */}
    }

    patchXHR('send', (orig) => function() {
      const xhr = this;
      if (arguments[0] && arguments[0].__isFileAPIShim) {
        const formData = arguments[0];
        const config = {
          url: xhr.__url,
          jsonp: false, // removes the callback form param
          cache: true, // removes the ?fileapiXXX in the url
          complete(err, fileApiXHR) {
            xhr.__completed = true;
            if (!err && xhr.__listeners.load) 
              xhr.__listeners.load({type: 'load', loaded: xhr.__loaded, total: xhr.__total, target: xhr, lengthComputable: true});
            if (!err && xhr.__listeners.loadend) 
              xhr.__listeners.loadend({type: 'loadend', loaded: xhr.__loaded, total: xhr.__total, target: xhr, lengthComputable: true});
            if (err === 'abort' && xhr.__listeners.abort) 
              xhr.__listeners.abort({type: 'abort', loaded: xhr.__loaded, total: xhr.__total, target: xhr, lengthComputable: true});
            if (fileApiXHR.status !== undefined) redefineProp(xhr, 'status', () => (fileApiXHR.status == 0 && err && err !== 'abort') ? 500 : fileApiXHR.status);
            if (fileApiXHR.statusText !== undefined) redefineProp(xhr, 'statusText', () => fileApiXHR.statusText);
            redefineProp(xhr, 'readyState', () => 4);
            if (fileApiXHR.response !== undefined) redefineProp(xhr, 'response', () => fileApiXHR.response);
            const resp = fileApiXHR.responseText || (err && fileApiXHR.status == 0 && err !== 'abort' ? err : undefined);
            redefineProp(xhr, 'responseText', () => resp);
            redefineProp(xhr, 'response', () => resp);
            if (err) redefineProp(xhr, 'err', () => err);
            xhr.__fileApiXHR = fileApiXHR;
            if (xhr.onreadystatechange) xhr.onreadystatechange();
            if (xhr.onload) xhr.onload();
          },
          fileprogress(e) {
            e.target = xhr;
            xhr.__listeners.progress && xhr.__listeners.progress(e);
            xhr.__total = e.total;
            xhr.__loaded = e.loaded;
            if (e.total === e.loaded) {
              // fix flash issue that doesn't call complete if there is no response text from the server  
              const _this = this
              setTimeout(() => {
                if (!xhr.__completed) {
                  xhr.getAllResponseHeaders = function(){};
                  _this.complete(null, {status: 204, statusText: 'No Content'});
                }
              }, FileAPI.noContentTimeout || 10000);
            }
          },
          headers: xhr.__requestHeaders
        }
        config.data = {};
        config.files = {}
        for (let i = 0; i < formData.data.length; i++) {
          const item = formData.data[i];
          if (item.val != null && item.val.name != null && item.val.size != null && item.val.type != null) {
            config.files[item.key] = item.val;
          } else {
            config.data[item.key] = item.val;
          }
        }

        setTimeout(() => {
          if (!hasFlash()) {
            throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
          }
          xhr.__fileApiXHR = FileAPI.upload(config);
        }, 1);
      } else {
        if (this.__origError) {
          throw this.__origError;
        }
        orig.apply(xhr, arguments);
      }
    });
    window.XMLHttpRequest.__isFileAPIShim = true;

    function isInputTypeFile(elem) {
      return elem[0].tagName.toLowerCase() === 'input' && elem.attr('type') && elem.attr('type').toLowerCase() === 'file';
    }
	
    window.FormData = FormData = function() {
      return {
        append(key, val, name) {
          if (val.__isFileAPIBlobShim) {
            val = val.data[0];
          }
          this.data.push({
            key,
            val,
            name
          });
        },
        data: [],
        __isFileAPIShim: true
      };
    };

    window.Blob = Blob = function(b) {
      return {
        data: b,
        __isFileAPIBlobShim: true
      };
    };

    (function () {
      // load FileAPI
      if (!window.FileAPI) {
        window.FileAPI = {};
      }
      if (FileAPI.forceLoad) {
        FileAPI.html5 = false;
      }
		
      if (!FileAPI.upload) {
        let jsUrl; let basePath; const script = document.createElement('script'); const allScripts = document.getElementsByTagName('script'); let i; let index; let src;
        if (window.FileAPI.jsUrl) {
          jsUrl = window.FileAPI.jsUrl;
        } else if (window.FileAPI.jsPath) {
          basePath = window.FileAPI.jsPath;
        } else {
          for (i = 0; i < allScripts.length; i++) {
            src = allScripts[i].src;
            index = src.search(/\/ng\-file\-upload[\-a-zA-z0-9\.]*\.js/)
            if (index > -1) {
              basePath = src.substring(0, index + 1);
              break;
            }
          }
        }

        if (FileAPI.staticPath == null) FileAPI.staticPath = basePath;
        script.setAttribute('src', jsUrl || `${basePath  }FileAPI.min.js`);
        document.getElementsByTagName('head')[0].appendChild(script);
        FileAPI.hasFlash = hasFlash();
      }
    })();
	
    FileAPI.ngfFixIE = function(elem, createFileElemFn, bindAttr, changeFn, resetModel) {
      if (!hasFlash()) {
        throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
      }
      var makeFlashInput = function(evt) {
        if (elem.attr('disabled')) {
          elem.__ngf_elem__.removeClass('js-fileapi-wrapper');
        } else {
          let fileElem = elem.__ngf_elem__;
          if (!fileElem) {
            fileElem = elem.__ngf_elem__ = createFileElemFn();
            fileElem.addClass('js-fileapi-wrapper');
            if (!isInputTypeFile(elem)) {
              //						if (fileElem.parent().css('position') === '' || fileElem.parent().css('position') === 'static') {
              //							fileElem.parent().css('position', 'relative');
              //						}
              //						elem.parent()[0].insertBefore(fileElem[0], elem[0]);
              //						elem.css('overflow', 'hidden');
            }
            setTimeout(() => {
              fileElem.bind('mouseenter', makeFlashInput);
            }, 10);
            fileElem.bind('change', function(evt) {
				    	fileApiChangeFn.apply(this, [evt]);
              changeFn.apply(this, [evt]);
              //						alert('change' +  evt);
            });
          } else {
            bindAttr(elem.__ngf_elem__);
          }
          if (!isInputTypeFile(elem)) {
            fileElem.css('position', 'absolute')
              .css('top', `${getOffset(elem[0]).top  }px`).css('left', `${getOffset(elem[0]).left  }px`)
              .css('width', `${elem[0].offsetWidth  }px`).css('height', `${elem[0].offsetHeight  }px`)
              .css('filter', 'alpha(opacity=0)').css('display', elem.css('display'))
              .css('overflow', 'hidden').css('z-index', '900000');
          }
        }
        function getOffset(obj) {
			    let left; let top;
			    left = top = 0;
			    if (obj.offsetParent) {
			        do {
			            left += obj.offsetLeft;
			            top  += obj.offsetTop;
			        } while (obj = obj.offsetParent);
			    }
			    return {
			        left,
			        top
			    };
        }
      };

      elem.bind('mouseenter', makeFlashInput);

      var fileApiChangeFn = function(evt) {
        const files = FileAPI.getFiles(evt);
        // just a double check for #233
        for (let i = 0; i < files.length; i++) {
          if (files[i].size === undefined) files[i].size = 0;
          if (files[i].name === undefined) files[i].name = 'file';
          if (files[i].type === undefined) files[i].type = 'undefined';
        }
        if (!evt.target) {
          evt.target = {};
        }
        evt.target.files = files;
        // if evt.target.files is not writable use helper field
        if (evt.target.files != files) {
          evt.__files_ = files;
        }
        (evt.__files_ || evt.target.files).item = function(i) {
          return (evt.__files_ || evt.target.files)[i] || null;
        };
      };
    };

    FileAPI.disableFileInput = function(elem, disable) {
      if (disable) {
        elem.removeClass('js-fileapi-wrapper')
      } else {
        elem.addClass('js-fileapi-wrapper');
      }
    };
  }


  if (!window.FileReader) {
    window.FileReader = function() {
      const _this = this; let loadStarted = false;
      this.listeners = {};
      this.addEventListener = function(type, fn) {
        _this.listeners[type] = _this.listeners[type] || [];
        _this.listeners[type].push(fn);
      };
      this.removeEventListener = function(type, fn) {
        _this.listeners[type] && _this.listeners[type].splice(_this.listeners[type].indexOf(fn), 1);
      };
      this.dispatchEvent = function(evt) {
        const list = _this.listeners[evt.type];
        if (list) {
          for (let i = 0; i < list.length; i++) {
            list[i].call(_this, evt);
          }
        }
      };
      this.onabort = this.onerror = this.onload = this.onloadstart = this.onloadend = this.onprogress = null;

      const constructEvent = function(type, evt) {
        const e = {type, target: _this, loaded: evt.loaded, total: evt.total, error: evt.error};
        if (evt.result != null) e.target.result = evt.result;
        return e;
      };
      const listener = function(evt) {
        if (!loadStarted) {
          loadStarted = true;
          _this.onloadstart && _this.onloadstart(constructEvent('loadstart', evt));
        }
        if (evt.type === 'load') {
          _this.onloadend && _this.onloadend(constructEvent('loadend', evt));
          var e = constructEvent('load', evt);
          _this.onload && _this.onload(e);
          _this.dispatchEvent(e);
        } else if (evt.type === 'progress') {
          var e = constructEvent('progress', evt);
          _this.onprogress && _this.onprogress(e);
          _this.dispatchEvent(e);
        } else {
          var e = constructEvent('error', evt);
          _this.onerror && _this.onerror(e);
          _this.dispatchEvent(e);
        }
      };
      this.readAsArrayBuffer = function(file) {
        FileAPI.readAsBinaryString(file, listener);
      }
      this.readAsBinaryString = function(file) {
        FileAPI.readAsBinaryString(file, listener);
      }
      this.readAsDataURL = function(file) {
        FileAPI.readAsDataURL(file, listener);
      }
      this.readAsText = function(file) {
        FileAPI.readAsText(file, listener);
      }
    }
  }
})();
