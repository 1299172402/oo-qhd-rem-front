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
