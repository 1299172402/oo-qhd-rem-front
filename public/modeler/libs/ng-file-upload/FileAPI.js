/*! FileAPI 2.0.7 - BSD | git://github.com/mailru/FileAPI.git
 * FileAPI — a set of  javascript tools for working with files. Multiupload, drag'n'drop and chunked file upload. Images: crop, resize and auto orientation by EXIF.
 */

/*
 * JavaScript Canvas to Blob 2.0.5
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on stackoverflow user Stoive's code snippet:
 * http://stackoverflow.com/q/4998908
 */

/* jslint nomen: true, regexp: true */
/* global window, atob, Blob, ArrayBuffer, Uint8Array */

(function (window) {
  

  const CanvasPrototype = window.HTMLCanvasElement &&
            window.HTMLCanvasElement.prototype;
  const hasBlobConstructor = window.Blob && (function () {
    try {
      return Boolean(new Blob());
    } catch (e) {
      return false;
    }
  }());
  const hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array &&
            (function () {
              try {
                return new Blob([new Uint8Array(100)]).size === 100;
              } catch (e) {
                return false;
              }
            }());
  const BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
            window.MozBlobBuilder || window.MSBlobBuilder;
  const dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window.atob &&
            window.ArrayBuffer && window.Uint8Array && function (dataURI) {
    let byteString;
    let arrayBuffer;
    let intArray;
    let i;
    let mimeString;
    let bb;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      // Convert base64 to raw binary data held in a string:
      byteString = atob(dataURI.split(',')[1]);
    } else {
      // Convert base64/URLEncoded data component to raw binary data:
      byteString = decodeURIComponent(dataURI.split(',')[1]);
    }
    // Write the bytes of the string to an ArrayBuffer:
    arrayBuffer = new ArrayBuffer(byteString.length);
    intArray = new Uint8Array(arrayBuffer);
    for (i = 0; i < byteString.length; i += 1) {
      intArray[i] = byteString.charCodeAt(i);
    }
    // Separate out the mime component:
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // Write the ArrayBuffer (or ArrayBufferView) to a blob:
    if (hasBlobConstructor) {
      return new Blob(
        [hasArrayBufferViewSupport ? intArray : arrayBuffer],
        {type: mimeString}
      );
    }
    bb = new BlobBuilder();
    bb.append(arrayBuffer);
    return bb.getBlob(mimeString);
  };
  if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
    if (CanvasPrototype.mozGetAsFile) {
      CanvasPrototype.toBlob = function (callback, type, quality) {
        if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
          callback(dataURLtoBlob(this.toDataURL(type, quality)));
        } else {
          callback(this.mozGetAsFile('blob', type));
        }
      };
    } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
      CanvasPrototype.toBlob = function (callback, type, quality) {
        callback(dataURLtoBlob(this.toDataURL(type, quality)));
      };
    }
  }
  window.dataURLtoBlob = dataURLtoBlob;
})(window);

/* jslint evil: true */
/* global window, URL, webkitURL, ActiveXObject */

(function (window, undef){
  

  let
    gid = 1;
  const noop = function (){};

  const {document} = window;
  const doctype = document.doctype || {};
  const {userAgent} = window.navigator;

  // https://github.com/blueimp/JavaScript-Load-Image/blob/master/load-image.js#L48
  const apiURL = (window.createObjectURL && window) || (window.URL && URL.revokeObjectURL && URL) || (window.webkitURL && webkitURL);

  const {Blob} = window;
  const {File} = window;
  const {FileReader} = window;
  const {FormData} = window;


  const {XMLHttpRequest} = window;
  const {jQuery} = window;

  const html5 =    !!(File && (FileReader && (window.Uint8Array || FormData || XMLHttpRequest.prototype.sendAsBinary)))
				&& !(/safari\//i.test(userAgent) && !/chrome\//i.test(userAgent) && /windows/i.test(userAgent)); // BugFix: https://github.com/mailru/FileAPI/issues/25

  const cors = html5 && ('withCredentials' in (new XMLHttpRequest));

  const chunked = html5 && !!Blob && !!(Blob.prototype.webkitSlice || Blob.prototype.mozSlice || Blob.prototype.slice);

  // https://github.com/blueimp/JavaScript-Canvas-to-Blob
  const {dataURLtoBlob} = window;


  const _rimg = /img/i;
  const _rcanvas = /canvas/i;
  const _rimgcanvas = /img|canvas/i;
  const _rinput = /input/i;
  const _rdata = /^data:[^,]+,/;

  const _toString = {}.toString;


  const {Math} = window;

  const _SIZE_CONST = function (pow){
    pow = new window.Number(Math.pow(1024, pow));
    pow.from = function (sz){ return Math.round(sz * this); };
    return	pow;
  };

  const _elEvents = {}; // element event listeners
  const _infoReader = []; // list of file info processors

  const _readerEvents = 'abort progress error load loadend';
  const _xhrPropsExport = 'status statusText readyState response responseXML responseText responseBody'.split(' ');

  const currentTarget = 'currentTarget'; // for minimize
  const preventDefault = 'preventDefault'; // and this too

  const _isArray = function (ar) {
    return	ar && ('length' in ar);
  };

  /**
		 * Iterate over a object or array
		 */
  const _each = function (obj, fn, ctx){
    if( obj ){
      if( _isArray(obj) ){
        for( let i = 0, n = obj.length; i < n; i++ ){
          if( i in obj ){
            fn.call(ctx, obj[i], i, obj);
          }
        }
      }
      else {
        for( const key in obj ){
          if( obj.hasOwnProperty(key) ){
            fn.call(ctx, obj[key], key, obj);
          }
        }
      }
    }
  };

  /**
		 * Merge the contents of two or more objects together into the first object
		 */
  const _extend = function (dst){
    const args = arguments; let i = 1; const _ext = function (val, key){ dst[key] = val; };
    for( ; i < args.length; i++ ){
      _each(args[i], _ext);
    }
    return  dst;
  };

  /**
		 * Add event listener
		 */
  const _on = function (el, type, fn){
    if( el ){
      const uid = api.uid(el);

      if( !_elEvents[uid] ){
        _elEvents[uid] = {};
      }

      const isFileReader = (FileReader && el) && (el instanceof FileReader);
      _each(type.split(/\s+/), (type)=> {
        if( jQuery && !isFileReader){
          jQuery.event.add(el, type, fn);
        } else {
          if( !_elEvents[uid][type] ){
            _elEvents[uid][type] = [];
          }

          _elEvents[uid][type].push(fn);

          if( el.addEventListener ){ el.addEventListener(type, fn, false); }
          else if( el.attachEvent ){ el.attachEvent(`on${type}`, fn); }
          else { el[`on${type}`] = fn; }
        }
      });
    }
  };


  /**
		 * Remove event listener
		 */
  const _off = function (el, type, fn){
    if( el ){
      const uid = api.uid(el); const events = _elEvents[uid] || {};

      const isFileReader = (FileReader && el) && (el instanceof FileReader);
      _each(type.split(/\s+/), (type)=> {
        if( jQuery && !isFileReader){
          jQuery.event.remove(el, type, fn);
        }
        else {
          const fns = events[type] || []; let i = fns.length;

          while( i-- ){
            if( fns[i] === fn ){
              fns.splice(i, 1);
              break;
            }
          }

          if( el.addEventListener ){ el.removeEventListener(type, fn, false); }
          else if( el.detachEvent ){ el.detachEvent(`on${type}`, fn); }
          else { el[`on${type}`] = null; }
        }
      });
    }
  };


  const _one = function(el, type, fn){
    _on(el, type, function _(evt){
      _off(el, type, _);
      fn(evt);
    });
  };


  const _fixEvent = function (evt){
    if( !evt.target ){ evt.target = window.event && window.event.srcElement || document; }
    if( evt.target.nodeType === 3 ){ evt.target = evt.target.parentNode; }
    return  evt;
  };


  const _supportInputAttr = function (attr){
    const input = document.createElement('input');
    input.setAttribute('type', "file");
    return attr in input;
  };


  /**
		 * FileAPI (core object)
		 */
  var api = {
    version: '2.0.7',

    cors: false,
    html5: true,
    media: false,
    formData: true,
    multiPassResize: true,

    debug: false,
    pingUrl: false,
    multiFlash: false,
    flashAbortTimeout: 0,
    withCredentials: true,

    staticPath: './dist/',

    flashUrl: 0, // @default: './FileAPI.flash.swf'
    flashImageUrl: 0, // @default: './FileAPI.flash.image.swf'

    postNameConcat (name, idx){
      return	name + (idx != null ? `[${ idx }]` : '');
    },

    ext2mime: {
				  jpg:	'image/jpeg'
      , tif:	'image/tiff'
      , txt:	'text/plain'
    },

    // Fallback for flash
    accept: {
				  'image/*': 'art bm bmp dwg dxf cbr cbz fif fpx gif ico iefs jfif jpe jpeg jpg jps jut mcf nap nif pbm pcx pgm pict pm png pnm qif qtif ras rast rf rp svf tga tif tiff xbm xbm xpm xwd'
      , 'audio/*': 'm4a flac aac rm mpa wav wma ogg mp3 mp2 m3u mod amf dmf dsm far gdm imf it m15 med okt s3m stm sfx ult uni xm sid ac3 dts cue aif aiff wpl ape mac mpc mpp shn wv nsf spc gym adplug adx dsp adp ymf ast afc hps xs'
      , 'video/*': 'm4v 3gp nsv ts ty strm rm rmvb m3u ifo mov qt divx xvid bivx vob nrg img iso pva wmv asf asx ogm m2v avi bin dat dvr-ms mpg mpeg mp4 mkv avc vp3 svq3 nuv viv dv fli flv wpl'
    },

    uploadRetry : 0,
    networkDownRetryTimeout : 5000, // milliseconds, don't flood when network is down

    chunkSize : 0,
    chunkUploadRetry : 0,
    chunkNetworkDownRetryTimeout : 2000, // milliseconds, don't flood when network is down

    KB: _SIZE_CONST(1),
    MB: _SIZE_CONST(2),
    GB: _SIZE_CONST(3),
    TB: _SIZE_CONST(4),

    EMPTY_PNG: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=',

    expando: `fileapi${  (new Date).getTime()}`,

    uid (obj){
      return	obj
        ? (obj[api.expando] = obj[api.expando] || api.uid())
        : (++gid, api.expando + gid)
      ;
    },

    log (){
      if( api.debug && window.console && console.log ){
        if( console.log.apply ){
          console.log.apply(console, arguments);
        }
        else {
          console.log([].join.call(arguments, ' '));
        }
      }
    },

    /**
			 * Create new image
			 *
			 * @param {String} [src]
			 * @param {Function} [fn]   1. error -- boolean, 2. img -- Image element
			 * @returns {HTMLElement}
			 */
    newImage (src, fn){
      let img = document.createElement('img');
      if( fn ){
        api.event.one(img, 'error load', (evt)=> {
          fn(evt.type == 'error', img);
          img = null;
        });
      }
      img.src = src;
      return	img;
    },

    /**
			 * Get XHR
			 * @returns {XMLHttpRequest}
			 */
    getXHR (){
      let xhr;

      if( XMLHttpRequest ){
        xhr = new XMLHttpRequest;
      }
      else if( window.ActiveXObject ){
        try {
          xhr = new ActiveXObject('MSXML2.XMLHttp.3.0');
        } catch (e) {
          xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
      }

      return  xhr;
    },

    isArray: _isArray,

    support: {
      dnd:     cors && ('ondrop' in document.createElement('div')),
      cors,
      html5,
      chunked,
      dataURI: true,
      accept:   _supportInputAttr('accept'),
      multiple: _supportInputAttr('multiple')
    },

    event: {
				  on: _on
      , off: _off
      , one: _one
      , fix: _fixEvent
    },


    throttle(fn, delay) {
      let id; let args;

      return function _throttle(){
        args = arguments;

        if( !id ){
          fn.apply(window, args);
          id = setTimeout(()=> {
            id = 0;
            fn.apply(window, args);
          }, delay);
        }
      };
    },


    F (){},


    parseJSON (str){
      let json;
      if( window.JSON && JSON.parse ){
        json = JSON.parse(str);
      }
      else {
        json = (new Function(`return (${str.replace(/([\r\n])/g, '\\$1')});`))();
      }
      return json;
    },


    trim (str){
      str = String(str);
      return	str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    },

    /**
			 * Simple Defer
			 * @return	{Object}
			 */
    defer (){
      const
					  list = []
        ; let result
        ; let error
        ; var defer = {
        resolve (err, res){
          defer.resolve = noop;
          error	= err || false;
          result	= res;

          while( res = list.shift() ){
            res(error, result);
          }
        },

        then (fn){
          if( error !== undef ){
            fn(error, result);
          } else {
            list.push(fn);
          }
        }
      };

      return	defer;
    },

    queue (fn){
      let
					  _idx = 0
        ; let _length = 0
        ; let _fail = false
        ; let _end = false
        ; var queue = {
        inc (){
          _length++;
        },

        next (){
          _idx++;
          setTimeout(queue.check, 0);
        },

        check (){
          (_idx >= _length) && !_fail && queue.end();
        },

        isFail (){
          return _fail;
        },

        fail (){
          !_fail && fn(_fail = true);
        },

        end (){
          if( !_end ){
            _end = true;
            fn();
          }
        }
      }
				;
      return queue;
    },


    /**
			 * For each object
			 *
			 * @param	{Object|Array}	obj
			 * @param	{Function}		fn
			 * @param	{*}				[ctx]
			 */
    each: _each,


    /**
			 * Async for
			 * @param {Array} array
			 * @param {Function} callback
			 */
    afor (array, callback){
      let i = 0; let n = array.length;

      if( _isArray(array) && n-- ){
        (function _next(){
          callback(n != i && _next, array[i], i++);
        })();
      }
      else {
        callback(false);
      }
    },


    /**
			 * Merge the contents of two or more objects together into the first object
			 *
			 * @param	{Object}	dst
			 * @return	{Object}
			 */
    extend: _extend,


    /**
			 * Is file?
			 * @param  {File}  file
			 * @return {Boolean}
			 */
    isFile (file){
      return _toString.call(file) === '[object File]';
    },


    /**
			 * Is blob?
			 * @param   {Blob}  blob
			 * @returns {Boolean}
			 */
    isBlob (blob) {
      return this.isFile(blob) || (_toString.call(blob) === '[object Blob]');
    },


    /**
			 * Is canvas element
			 *
			 * @param	{HTMLElement}	el
			 * @return	{Boolean}
			 */
    isCanvas (el){
      return	el && _rcanvas.test(el.nodeName);
    },


    getFilesFilter (filter){
      filter = typeof filter === 'string' ? filter : (filter.getAttribute && filter.getAttribute('accept') || '');
      return	filter ? new RegExp(`(${ filter.replace(/\./g, '\\.').replace(/,/g, '|') })$`, 'i') : /./;
    },



    /**
			 * Read as DataURL
			 *
			 * @param {File|Element} file
			 * @param {Function} fn
			 */
    readAsDataURL (file, fn){
      if( api.isCanvas(file) ){
        _emit(file, fn, 'load', api.toDataURL(file));
      }
      else {
        _readAs(file, fn, 'DataURL');
      }
    },


    /**
			 * Read as Binary string
			 *
			 * @param {File} file
			 * @param {Function} fn
			 */
    readAsBinaryString (file, fn){
      if( _hasSupportReadAs('BinaryString') ){
        _readAs(file, fn, 'BinaryString');
      } else {
        // Hello IE10!
        _readAs(file, (evt)=> {
          if( evt.type == 'load' ){
            try {
              // dataURL -> binaryString
              evt.result = api.toBinaryString(evt.result);
            } catch (e){
              evt.type = 'error';
              evt.message = e.toString();
            }
          }
          fn(evt);
        }, 'DataURL');
      }
    },


    /**
			 * Read as ArrayBuffer
			 *
			 * @param {File} file
			 * @param {Function} fn
			 */
    readAsArrayBuffer(file, fn){
      _readAs(file, fn, 'ArrayBuffer');
    },


    /**
			 * Read as text
			 *
			 * @param {File} file
			 * @param {String} encoding
			 * @param {Function} [fn]
			 */
    readAsText(file, encoding, fn){
      if( !fn ){
        fn	= encoding;
        encoding = 'utf-8';
      }

      _readAs(file, fn, 'Text', encoding);
    },


    /**
			 * Convert image or canvas to DataURL
			 *
			 * @param   {Element}  el      Image or Canvas element
			 * @param   {String}   [type]  mime-type
			 * @return  {String}
			 */
    toDataURL (el, type){
      if( typeof el === 'string' ){
        return  el;
      }
      if( el.toDataURL ){
        return  el.toDataURL(type || 'image/png');
      }
    },


    /**
			 * Canvert string, image or canvas to binary string
			 *
			 * @param   {String|Element} val
			 * @return  {String}
			 */
    toBinaryString (val){
      return  window.atob(api.toDataURL(val).replace(_rdata, ''));
    },


    /**
			 * Read file or DataURL as ImageElement
			 *
			 * @param	{File|String}	file
			 * @param	{Function}		fn
			 * @param	{Boolean}		[progress]
			 */
    readAsImage (file, fn, progress){
      if( api.isFile(file) ){
        if( apiURL ){
          /** @namespace apiURL.createObjectURL */
          const data = apiURL.createObjectURL(file);
          if( data === undef ){
            _emit(file, fn, 'error');
          }
          else {
            api.readAsImage(data, fn, progress);
          }
        }
        else {
          api.readAsDataURL(file, (evt)=> {
            if( evt.type == 'load' ){
              api.readAsImage(evt.result, fn, progress);
            }
            else if( progress || evt.type == 'error' ){
              _emit(file, fn, evt, null, { loaded: evt.loaded, total: evt.total });
            }
          });
        }
      }
      else if( api.isCanvas(file) ){
        _emit(file, fn, 'load', file);
      }
      else if( _rimg.test(file.nodeName) ){
        if( file.complete ){
          _emit(file, fn, 'load', file);
        }
        else {
          const events = 'error abort load';
          _one(file, events, function _fn(evt){
            if( evt.type == 'load' && apiURL ){
              /** @namespace apiURL.revokeObjectURL */
              apiURL.revokeObjectURL(file.src);
            }

            _off(file, events, _fn);
            _emit(file, fn, evt, file);
          });
        }
      }
      else if( file.iframe ){
        _emit(file, fn, { type: 'error' });
      }
      else {
        // Created image
        const img = api.newImage(file.dataURL || file);
        api.readAsImage(img, fn, progress);
      }
    },


    /**
			 * Make file by name
			 *
			 * @param	{String}	name
			 * @return	{Array}
			 */
    checkFileObj (name){
      let file = {}; const {accept} = api;

      if( typeof name === 'object' ){
        file = name;
      }
      else {
        file.name = (`${name  }`).split(/\\|\//g).pop();
      }

      if( file.type == null ){
        file.type = file.name.split('.').pop();
      }

      _each(accept, (ext, type)=> {
        ext = new RegExp(ext.replace(/\s/g, '|'), 'i');
        if( ext.test(file.type) || api.ext2mime[file.type] ){
          file.type = api.ext2mime[file.type] || (`${type.split('/')[0] }/${ file.type}`);
        }
      });

      return	file;
    },


    /**
			 * Get drop files
			 *
			 * @param	{Event}	evt
			 * @param	{Function} callback
			 */
    getDropFiles (evt, callback){
      const
					  files = []
        ; const dataTransfer = _getDataTransfer(evt)
        ; const entrySupport = _isArray(dataTransfer.items) && dataTransfer.items[0] && _getAsEntry(dataTransfer.items[0])
        ; const queue = api.queue(()=> { callback(files); })
				;

      _each((entrySupport ? dataTransfer.items : dataTransfer.files) || [], (item)=> {
        queue.inc();

        try {
          if( entrySupport ){
            _readEntryAsFiles(item, (err, entryFiles)=> {
              if( err ){
                api.log('[err] getDropFiles:', err);
              } else {
                files.push.apply(files, entryFiles);
              }
              queue.next();
            });
          }
          else {
            _isRegularFile(item, (yes)=> {
              yes && files.push(item);
              queue.next();
            });
          }
        }
        catch( err ){
          queue.next();
          api.log('[err] getDropFiles: ', err);
        }
      });

      queue.check();
    },


    /**
			 * Get file list
			 *
			 * @param	{HTMLInputElement|Event}	input
			 * @param	{String|Function}	[filter]
			 * @param	{Function}			[callback]
			 * @return	{Array|Null}
			 */
    getFiles (input, filter, callback){
      let files = [];

      if( callback ){
        api.filterFiles(api.getFiles(input), filter, callback);
        return null;
      }

      if( input.jquery ){
        // jQuery object
        input.each(function (){
          files = files.concat(api.getFiles(this));
        });
        input	= files;
        files	= [];
      }

      if( typeof filter === 'string' ){
        filter	= api.getFilesFilter(filter);
      }

      if( input.originalEvent ){
        // jQuery event
        input = _fixEvent(input.originalEvent);
      }
      else if( input.srcElement ){
        // IE Event
        input = _fixEvent(input);
      }


      if( input.dataTransfer ){
        // Drag'n'Drop
        input = input.dataTransfer;
      }
      else if( input.target ){
        // Event
        input = input.target;
      }

      if( input.files ){
        // Input[type="file"]
        files = input.files;

        if( !html5 ){
          // Partial support for file api
          files[0].blob	= input;
          files[0].iframe	= true;
        }
      }
      else if( !html5 && isInputFile(input) ){
        if( api.trim(input.value) ){
          files = [api.checkFileObj(input.value)];
          files[0].blob   = input;
          files[0].iframe = true;
        }
      }
      else if( _isArray(input) ){
        files	= input;
      }

      return	api.filter(files, (file)=> !filter || filter.test(file.name));
    },


    /**
			 * Get total file size
			 * @param	{Array}	files
			 * @return	{Number}
			 */
    getTotalSize (files){
      let size = 0; let i = files && files.length;
      while( i-- ){
        size += files[i].size;
      }
      return	size;
    },


    /**
			 * Get image information
			 *
			 * @param	{File}		file
			 * @param	{Function}	fn
			 */
    getInfo (file, fn){
      const info = {}; const readers = _infoReader.concat();

      if( api.isFile(file) ){
        (function _next(){
          const reader = readers.shift();
          if( reader ){
            if( reader.test(file.type) ){
              reader(file, (err, res)=> {
                if( err ){
                  fn(err);
                }
                else {
                  _extend(info, res);
                  _next();
                }
              });
            }
            else {
              _next();
            }
          }
          else {
            fn(false, info);
          }
        })();
      }
      else {
        fn('not_support_info', info);
      }
    },


    /**
			 * Add information reader
			 *
			 * @param {RegExp} mime
			 * @param {Function} fn
			 */
    addInfoReader (mime, fn){
      fn.test = function (type){ return mime.test(type); };
      _infoReader.push(fn);
    },


    /**
			 * Filter of array
			 *
			 * @param	{Array}		input
			 * @param	{Function}	fn
			 * @return	{Array}
			 */
    filter (input, fn){
      const result = []; let i = 0; const n = input.length; let val;

      for( ; i < n; i++ ){
        if( i in input ){
          val = input[i];
          if( fn.call(val, val, i, input) ){
            result.push(val);
          }
        }
      }

      return	result;
    },


    /**
			 * Filter files
			 *
			 * @param	{Array}		files
			 * @param	{Function}	eachFn
			 * @param	{Function}	resultFn
			 */
    filterFiles (files, eachFn, resultFn){
      if( files.length ){
        // HTML5 or Flash
        const queue = files.concat(); let file; const result = []; const deleted = [];

        (function _next(){
          if( queue.length ){
            file = queue.shift();
            api.getInfo(file, (err, info)=> {
              (eachFn(file, err ? false : info) ? result : deleted).push(file);
              _next();
            });
          }
          else {
            resultFn(result, deleted);
          }
        })();
      }
      else {
        resultFn([], files);
      }
    },


    upload (options){
      options = _extend({
					  jsonp: 'callback'
        , prepare: api.F
        , beforeupload: api.F
        , upload: api.F
        , fileupload: api.F
        , fileprogress: api.F
        , filecomplete: api.F
        , progress: api.F
        , complete: api.F
        , pause: api.F
        , imageOriginal: true
        , chunkSize: api.chunkSize
        , chunkUploadRetry: api.chunkUploadRetry
        , uploadRetry: api.uploadRetry
      }, options);


      if( options.imageAutoOrientation && !options.imageTransform ){
        options.imageTransform = { rotate: 'auto' };
      }


      const
					  proxyXHR = new api.XHR(options)
        ; const dataArray = this._getFilesDataArray(options.files)
        ; const _this = this
        ; let _total = 0
        ; let _loaded = 0
        ; let _nextFile
        ; let _complete = false
				;


      // calc total size
      _each(dataArray, (data)=> {
        _total += data.size;
      });

      // Array of files
      proxyXHR.files = [];
      _each(dataArray, (data)=> {
        proxyXHR.files.push(data.file);
      });

      // Set upload status props
      proxyXHR.total	= _total;
      proxyXHR.loaded	= 0;
      proxyXHR.filesLeft = dataArray.length;

      // emit "beforeupload"  event
      options.beforeupload(proxyXHR, options);

      // Upload by file
      _nextFile = function (){
        const
						  data = dataArray.shift()
          ; let _file = data && data.file
          ; let _fileLoaded = false
          ; const _fileOptions = _simpleClone(options)
					;

        proxyXHR.filesLeft = dataArray.length;

        if( _file && _file.name === api.expando ){
          _file = null;
          api.log('[warn] FileAPI.upload() — called without files');
        }

        if( ( proxyXHR.statusText != 'abort' || proxyXHR.current ) && data ){
          // Mark active job
          _complete = false;

          // Set current upload file
          proxyXHR.currentFile = _file;

          // Prepare file options
          if (_file && options.prepare(_file, _fileOptions) === false) {
            _nextFile.call(_this);
            return;
          }
          _fileOptions.file = _file;

          _this._getFormData(_fileOptions, data, (form)=> {
            if( !_loaded ){
              // emit "upload" event
              options.upload(proxyXHR, options);
            }

            var xhr = new api.XHR(_extend({}, _fileOptions, {

              upload: _file ? function (){
                // emit "fileupload" event
                options.fileupload(_file, xhr, _fileOptions);
              } : noop,

              progress: _file ? function (evt){
                if( !_fileLoaded ){
                  // For ignore the double calls.
                  _fileLoaded = (evt.loaded === evt.total);

                  // emit "fileprogress" event
                  options.fileprogress({
											  type:   'progress'
                    , total:  data.total = evt.total
                    , loaded: data.loaded = evt.loaded
                  }, _file, xhr, _fileOptions);

                  // emit "progress" event
                  options.progress({
											  type:   'progress'
                    , total:  _total
                    , loaded: proxyXHR.loaded = (_loaded + data.size * (evt.loaded/evt.total))|0
                  }, _file, xhr, _fileOptions);
                }
              } : noop,

              complete (err){
                _each(_xhrPropsExport, (name)=> {
                  proxyXHR[name] = xhr[name];
                });

                if( _file ){
                  data.total = (data.total || data.size);
                  data.loaded	= data.total;

                  if( !err ) {
                    // emulate 100% "progress"
                    this.progress(data);

                    // fixed throttle event
                    _fileLoaded = true;

                    // bytes loaded
                    _loaded += data.size; // data.size != data.total, it's desirable fix this
                    proxyXHR.loaded = _loaded;
                  }

                  // emit "filecomplete" event
                  options.filecomplete(err, xhr, _file, _fileOptions);
                }

                // upload next file
                setTimeout(() => {_nextFile.call(_this);}, 0);
              }
            })); // xhr


            // ...
            proxyXHR.abort = function (current){
              if (!current) { dataArray.length = 0; }
              this.current = current;
              xhr.abort();
            };

            // Start upload
            xhr.send(form);
          });
        }
        else {
          const successful = proxyXHR.status == 200 || proxyXHR.status == 201 || proxyXHR.status == 204;
          options.complete(successful ? false : (proxyXHR.statusText || 'error'), proxyXHR, options);
          // Mark done state
          _complete = true;
        }
      };


      // Next tick
      setTimeout(_nextFile, 0);


      // Append more files to the existing request
      // first - add them to the queue head/tail
      proxyXHR.append = function (files, first) {
        files = api._getFilesDataArray([].concat(files));

        _each(files, (data) => {
          _total += data.size;
          proxyXHR.files.push(data.file);
          if (first) {
            dataArray.unshift(data);
          } else {
            dataArray.push(data);
          }
        });

        proxyXHR.statusText = "";

        if( _complete ){
          _nextFile.call(_this);
        }
      };


      // Removes file from queue by file reference and returns it
      proxyXHR.remove = function (file) {
				    let i = dataArray.length; let _file;
				    while( i-- ){
          if( dataArray[i].file == file ){
            _file = dataArray.splice(i, 1);
            _total -= _file.size;
          }
        }
        return	_file;
      };

      return proxyXHR;
    },


    _getFilesDataArray (data){
      const files = []; let oFiles = {};

      if( isInputFile(data) ){
        const tmp = api.getFiles(data);
        oFiles[data.name || 'file'] = data.getAttribute('multiple') !== null ? tmp : tmp[0];
      }
      else if( _isArray(data) && isInputFile(data[0]) ){
        _each(data, (input)=> {
          oFiles[input.name || 'file'] = api.getFiles(input);
        });
      }
      else {
        oFiles = data;
      }

      _each(oFiles, function add(file, name){
        if( _isArray(file) ){
          _each(file, (file)=> {
            add(file, name);
          });
        }
        else if( file && (file.name || file.image) ){
          files.push({
							  name
            , file
            , size: file.size
            , total: file.size
            , loaded: 0
          });
        }
      });

      if( !files.length ){
        // Create fake `file` object
        files.push({ file: { name: api.expando } });
      }

      return	files;
    },


    _getFormData (options, data, fn){
      const
					  {file} = data
        ; const {name} = data
        ; let filename = file.name
        ; const filetype = file.type
        ; let trans = api.support.transform && options.imageTransform
        ; const Form = new api.Form
        ; const queue = api.queue(()=> { fn(Form); })
        ; const isOrignTrans = trans && _isOriginTransform(trans)
        ; const {postNameConcat} = api
				;

      // Append data
      _each(options.data, function add(val, name){
        if( typeof val === 'object' ){
          _each(val, (v, i)=> {
            add(v, postNameConcat(name, i));
          });
        }
        else {
          Form.append(name, val);
        }
      });

      (function _addFile(file/** Object */){
        if( file.image ){ // This is a FileAPI.Image
          queue.inc();

          file.toData((err, image)=> {
            // @todo: error
            filename = filename || `${(new Date).getTime()}.png`;

            _addFile(image);
            queue.next();
          });
        }
        else if( api.Image && trans && (/^image/.test(file.type) || _rimgcanvas.test(file.nodeName)) ){
          queue.inc();

          if( isOrignTrans ){
            // Convert to array for transform function
            trans = [trans];
          }

          api.Image.transform(file, trans, options.imageAutoOrientation, (err, images)=> {
            if( isOrignTrans && !err ){
              if( !dataURLtoBlob && !api.flashEngine ){
                // Canvas.toBlob or Flash not supported, use multipart
                Form.multipart = true;
              }

              Form.append(name, images[0], filename,  trans[0].type || filetype);
            }
            else {
              let addOrigin = 0;

              if( !err ){
                _each(images, (image, idx)=> {
                  if( !dataURLtoBlob && !api.flashEngine ){
                    Form.multipart = true;
                  }

                  if( !trans[idx].postName ){
                    addOrigin = 1;
                  }

                  Form.append(trans[idx].postName || postNameConcat(name, idx), image, filename, trans[idx].type || filetype);
                });
              }

              if( err || options.imageOriginal ){
                Form.append(postNameConcat(name, (addOrigin ? 'original' : null)), file, filename, filetype);
              }
            }

            queue.next();
          });
        }
        else if( filename !== api.expando ){
          Form.append(name, file, filename);
        }
      })(file);

      queue.check();
    },


    reset (inp, notRemove){
      let parent; let clone;

      if( jQuery ){
        clone = jQuery(inp).clone(true).insertBefore(inp).val('')[0];
        if( !notRemove ){
          jQuery(inp).remove();
        }
      } else {
        parent  = inp.parentNode;
        clone   = parent.insertBefore(inp.cloneNode(true), inp);
        clone.value = '';

        if( !notRemove ){
          parent.removeChild(inp);
        }

        _each(_elEvents[api.uid(inp)], (fns, type)=> {
          _each(fns, (fn)=> {
            _off(inp, type, fn);
            _on(clone, type, fn);
          });
        });
      }

      return  clone;
    },


    /**
			 * Load remote file
			 *
			 * @param   {String}    url
			 * @param   {Function}  fn
			 * @return  {XMLHttpRequest}
			 */
    load (url, fn){
      const xhr = api.getXHR();
      if( xhr ){
        xhr.open('GET', url, true);

        if( xhr.overrideMimeType ){
				        xhr.overrideMimeType('text/plain; charset=x-user-defined');
        }

        _on(xhr, 'progress', (/** Event */evt)=> {
          /** @namespace evt.lengthComputable */
          if( evt.lengthComputable ){
            fn({ type: evt.type, loaded: evt.loaded, total: evt.total }, xhr);
          }
        });

        xhr.onreadystatechange = function(){
          if( xhr.readyState == 4 ){
            xhr.onreadystatechange = null;
            if( xhr.status == 200 ){
              url = url.split('/');
              /** @namespace xhr.responseBody */
              const file = {
								      name: url[url.length-1]
                , size: xhr.getResponseHeader('Content-Length')
                , type: xhr.getResponseHeader('Content-Type')
              };
              file.dataURL = `data:${file.type};base64,${  api.encode64(xhr.responseBody || xhr.responseText)}`;
              fn({ type: 'load', result: file }, xhr);
            }
            else {
              fn({ type: 'error' }, xhr);
            }
					    }
        };
				    xhr.send(null);
      } else {
        fn({ type: 'error' });
      }

      return  xhr;
    },

    encode64 (str){
      const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; let outStr = ''; let i = 0;

      if( typeof str !== 'string' ){
        str	= String(str);
      }

      while( i < str.length ){
        // all three "& 0xff" added below are there to fix a known bug
        // with bytes returned by xhr.responseText
        const
						  byte1 = str.charCodeAt(i++) & 0xff
          ; const byte2 = str.charCodeAt(i++) & 0xff
          ; const byte3 = str.charCodeAt(i++) & 0xff
          ; const enc1 = byte1 >> 2
          ; const enc2 = ((byte1 & 3) << 4) | (byte2 >> 4)
          ; var enc3; var enc4
					;

        if( isNaN(byte2) ){
          enc3 = enc4 = 64;
        } else {
          enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
          enc4 = isNaN(byte3) ? 64 : byte3 & 63;
        }

        outStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
      }

      return  outStr;
    }

  } // api
	;


  function _emit(target, fn, name, res, ext){
    const evt = {
			  type:		name.type || name
      , target
      , result:	res
    };
    _extend(evt, ext);
    fn(evt);
  }


  function _hasSupportReadAs(as){
    return	FileReader && !!FileReader.prototype[`readAs${as}`];
  }


  function _readAs(file, fn, as, encoding){
    if( api.isBlob(file) && _hasSupportReadAs(as) ){
      let Reader = new FileReader;

      // Add event listener
      _on(Reader, _readerEvents, function _fn(evt){
        const {type} = evt;
        if( type == 'progress' ){
          _emit(file, fn, evt, evt.target.result, { loaded: evt.loaded, total: evt.total });
        }
        else if( type == 'loadend' ){
          _off(Reader, _readerEvents, _fn);
          Reader = null;
        }
        else {
          _emit(file, fn, evt, evt.target.result);
        }
      });


      try {
        // ReadAs ...
        if( encoding ){
          Reader[`readAs${as}`](file, encoding);
        }
        else {
          Reader[`readAs${as}`](file);
        }
      }
      catch (err){
        _emit(file, fn, 'error', undef, { error: err.toString() });
      }
    }
    else {
      _emit(file, fn, 'error', undef, { error: `filreader_not_support_${as}` });
    }
  }


  function _isRegularFile(file, callback){
    // http://stackoverflow.com/questions/8856628/detecting-folders-directories-in-javascript-filelist-objects
    if( !file.type && (file.size % 4096) === 0 && (file.size <= 102400) ){
      if( FileReader ){
        try {
          const Reader = new FileReader();

          _one(Reader, _readerEvents, (evt)=> {
            const isFile = evt.type != 'error';
            callback(isFile);
            if( isFile ){
              Reader.abort();
            }
          });

          Reader.readAsDataURL(file);
        } catch( err ){
          callback(false);
        }
      }
      else {
        callback(null);
      }
    }
    else {
      callback(true);
    }
  }


  function _getAsEntry(item){
    let entry;
    if( item.getAsEntry ){ entry = item.getAsEntry(); }
    else if( item.webkitGetAsEntry ){ entry = item.webkitGetAsEntry(); }
    return	entry;
  }


  function _readEntryAsFiles(entry, callback){
    if( !entry ){
      // error
      callback('invalid entry');
    }
    else if( entry.isFile ){
      // Read as file
      entry.file((file)=> {
        // success
        file.fullPath = entry.fullPath;
        callback(false, [file]);
      }, (err)=> {
        // error
        callback(`FileError.code: ${err.code}`);
      });
    }
    else if( entry.isDirectory ){
      const reader = entry.createReader(); let result = [];

      reader.readEntries((entries)=> {
        // success
        api.afor(entries, (next, entry)=> {
          _readEntryAsFiles(entry, (err, files)=> {
            if( err ){
              api.log(err);
            }
            else {
              result = result.concat(files);
            }

            if( next ){
              next();
            }
            else {
              callback(false, result);
            }
          });
        });
      }, (err)=> {
        // error
        callback(`directory_reader: ${  err}`);
      });
    }
    else {
      _readEntryAsFiles(_getAsEntry(entry), callback);
    }
  }


  function _simpleClone(obj){
    const copy = {};
    _each(obj, (val, key)=> {
      if( val && (typeof val === 'object') && (val.nodeType === void 0) ){
        val = _extend({}, val);
      }
      copy[key] = val;
    });
    return	copy;
  }


  function isInputFile(el){
    return	_rinput.test(el && el.tagName);
  }


  function _getDataTransfer(evt){
    return	(evt.originalEvent || evt || '').dataTransfer || {};
  }


  function _isOriginTransform(trans){
    let key;
    for( key in trans ){
      if( trans.hasOwnProperty(key) ){
        if( !(trans[key] instanceof Object || key === 'overlay' || key === 'filter') ){
          return	true;
        }
      }
    }
    return	false;
  }


  // Add default image info reader
  api.addInfoReader(/^image/, (file/** File */, callback/** Function */)=> {
    if( !file.__dimensions ){
      const defer = file.__dimensions = api.defer();

      api.readAsImage(file, (evt)=> {
        let img = evt.target;
        defer.resolve(evt.type == 'load' ? false : 'error', {
					  width:  img.width
          , height: img.height
        });
        img.src = api.EMPTY_PNG;
        img = null;
      });
    }

    file.__dimensions.then(callback);
  });


  /**
	 * Drag'n'Drop special event
	 *
	 * @param	{HTMLElement}	el
	 * @param	{Function}		onHover
	 * @param	{Function}		onDrop
	 */
  api.event.dnd = function (el, onHover, onDrop){
    let _id; let _type;

    if( !onDrop ){
      onDrop = onHover;
      onHover = api.F;
    }

    if( FileReader ){
      // Hover
      _on(el, 'dragenter dragleave dragover', onHover.ff = onHover.ff || function (evt){
        const
					  {types} = _getDataTransfer(evt)
          ; let i = types && types.length
          ; let debounceTrigger = false
				;

        while( i-- ){
          if( ~types[i].indexOf('File') ){
            evt[preventDefault]();

            if( _type !== evt.type ){
              _type = evt.type; // Store current type of event

              if( _type != 'dragleave' ){
                onHover.call(evt[currentTarget], true, evt);
              }

              debounceTrigger = true;
            }

            break; // exit from "while"
          }
        }

        if( debounceTrigger ){
          clearTimeout(_id);
          _id = setTimeout(()=> {
            onHover.call(evt[currentTarget], _type != 'dragleave', evt);
          }, 50);
        }
      });


      // Drop
      _on(el, 'drop', onDrop.ff = onDrop.ff || function (evt){
        evt[preventDefault]();

        _type = 0;
        onHover.call(evt[currentTarget], false, evt);

        api.getDropFiles(evt, (files)=> {
          onDrop.call(evt[currentTarget], files, evt);
        });
      });
    }
    else {
      api.log("Drag'n'Drop -- not supported");
    }
  };


  /**
	 * Remove drag'n'drop
	 * @param	{HTMLElement}	el
	 * @param	{Function}		onHover
	 * @param	{Function}		onDrop
	 */
  api.event.dnd.off = function (el, onHover, onDrop){
    _off(el, 'dragenter dragleave dragover', onHover.ff);
    _off(el, 'drop', onDrop.ff);
  };


  // Support jQuery
  if( jQuery && !jQuery.fn.dnd ){
    jQuery.fn.dnd = function (onHover, onDrop){
      return this.each(function (){
        api.event.dnd(this, onHover, onDrop);
      });
    };

    jQuery.fn.offdnd = function (onHover, onDrop){
      return this.each(function (){
        api.event.dnd.off(this, onHover, onDrop);
      });
    };
  }

  // @export
  window.FileAPI  = _extend(api, window.FileAPI);


  // Debug info
  api.log(`FileAPI: ${  api.version}`);
  api.log(`protocol: ${  window.location.protocol}`);
  api.log(`doctype: [${  doctype.name  }] ${  doctype.publicId  } ${  doctype.systemId}`);


  // @detect 'x-ua-compatible'
  _each(document.getElementsByTagName('meta'), (meta)=> {
    if( /x-ua-compatible/i.test(meta.getAttribute('http-equiv')) ){
      api.log(`meta.http-equiv: ${  meta.getAttribute('content')}`);
    }
  });


  // @configuration
  if( !api.flashUrl ){ api.flashUrl = `${api.staticPath  }FileAPI.flash.swf`; }
  if( !api.flashImageUrl ){ api.flashImageUrl = `${api.staticPath  }FileAPI.flash.image.swf`; }
  if( !api.flashWebcamUrl ){ api.flashWebcamUrl = `${api.staticPath  }FileAPI.flash.camera.swf`; }
})(window, void 0);

/* global window, FileAPI, document */

(function (api, document, undef) {
  

  const
    {min} = Math;
  const {round} = Math;
  const getCanvas = function () { return document.createElement('canvas'); };
  let support = false;
  const exifOrientation = {
			  8:	270
    , 3:	180
    , 6:	90
    , 7:	270
    , 4:	180
    , 5:	90
  }
	;

  try {
    support = getCanvas().toDataURL('image/png').indexOf('data:image/png') > -1;
  }
  catch (e){}


  function Image(file){
    if( file instanceof Image ){
      const img = new Image(file.file);
      api.extend(img.matrix, file.matrix);
      return	img;
    }
    if( !(this instanceof Image) ){
      return	new Image(file);
    }

    this.file   = file;
    this.size   = file.size || 100;

    this.matrix	= {
      sx: 0,
      sy: 0,
      sw: 0,
      sh: 0,
      dx: 0,
      dy: 0,
      dw: 0,
      dh: 0,
      resize: 0, // min, max OR preview
      deg: 0,
      quality: 1, // jpeg quality
      filter: 0
    };
  }


  Image.prototype = {
    image: true,
    constructor: Image,

    set (attrs){
      api.extend(this.matrix, attrs);
      return	this;
    },

    crop (x, y, w, h){
      if( w === undef ){
        w	= x;
        h	= y;
        x = y = 0;
      }
      return	this.set({ sx: x, sy: y, sw: w, sh: h || w });
    },

    resize (w, h, strategy){
      if( /min|max/.test(h) ){
        strategy = h;
        h = w;
      }

      return	this.set({ dw: w, dh: h || w, resize: strategy });
    },

    preview (w, h){
      return	this.resize(w, h || w, 'preview');
    },

    rotate (deg){
      return	this.set({ deg });
    },

    filter (filter){
      return	this.set({ filter });
    },

    overlay (images){
      return	this.set({ overlay: images });
    },

    clone (){
      return	new Image(this);
    },

    _load (image, fn){
      const self = this;

      if( /img|video/i.test(image.nodeName) ){
        fn.call(self, null, image);
      }
      else {
        api.readAsImage(image, (evt)=> {
          fn.call(self, evt.type != 'load', evt.result);
        });
      }
    },

    _apply (image, fn){
      const
				  canvas = getCanvas()
        ; const m = this.getMatrix(image)
        ; const ctx = canvas.getContext('2d')
        ; const width = image.videoWidth || image.width
        ; const height = image.videoHeight || image.height
        ; let {deg} = m
        ; let {dw} = m
        ; let {dh} = m
        ; let w = width
        ; let h = height
        ; const {filter} = m
        ; let copy // canvas copy
        ; let buffer = image
        ; const {overlay} = m
        ; const queue = api.queue(()=> { image.src = api.EMPTY_PNG; fn(false, canvas); })
        ; const {renderImageToCanvas} = api
			;

      // Normalize angle
      deg -= Math.floor(deg/360)*360;

      // For `renderImageToCanvas`
      image._type = this.file.type;

      while(m.multipass && min(w/dw, h/dh) > 2 ){
        w = (w/2 + 0.5)|0;
        h = (h/2 + 0.5)|0;

        copy = getCanvas();
        copy.width  = w;
        copy.height = h;

        if( buffer !== image ){
          renderImageToCanvas(copy, buffer, 0, 0, buffer.width, buffer.height, 0, 0, w, h);
          buffer = copy;
        }
        else {
          buffer = copy;
          renderImageToCanvas(buffer, image, m.sx, m.sy, m.sw, m.sh, 0, 0, w, h);
          m.sx = m.sy = m.sw = m.sh = 0;
        }
      }


      canvas.width  = (deg % 180) ? dh : dw;
      canvas.height = (deg % 180) ? dw : dh;

      canvas.type = m.type;
      canvas.quality = m.quality;

      ctx.rotate(deg * Math.PI / 180);
      renderImageToCanvas(ctx.canvas, buffer
        , m.sx, m.sy
        , m.sw || buffer.width
        , m.sh || buffer.height
        , (deg == 180 || deg == 270 ? -dw : 0)
        , (deg == 90 || deg == 180 ? -dh : 0)
        , dw, dh
      );
      dw = canvas.width;
      dh = canvas.height;

      // Apply overlay
      overlay && api.each([].concat(overlay), (over)=> {
        queue.inc();
        // preload
        const img = new window.Image; var fn = function (){
          let
						  x = over.x|0
            ; let y = over.y|0
            ; const w = over.w || img.width
            ; const h = over.h || img.height
            ; const {rel} = over
					;

          // center  |  right  |  left
          x = (rel == 1 || rel == 4 || rel == 7) ? (dw - w + x)/2 : (rel == 2 || rel == 5 || rel == 8 ? dw - (w + x) : x);

          // center  |  bottom  |  top
          y = (rel == 3 || rel == 4 || rel == 5) ? (dh - h + y)/2 : (rel >= 6 ? dh - (h + y) : y);

          api.event.off(img, 'error load abort', fn);

          try {
            ctx.globalAlpha = over.opacity || 1;
            ctx.drawImage(img, x, y, w, h);
          }
          catch (er){}

          queue.next();
        };

        api.event.on(img, 'error load abort', fn);
        img.src = over.src;

        if( img.complete ){
          fn();
        }
      });

      if( filter ){
        queue.inc();
        Image.applyFilter(canvas, filter, queue.next);
      }

      queue.check();
    },

    getMatrix (image){
      const
				  m  = api.extend({}, this.matrix)
        ; let sw = m.sw = m.sw || image.videoWidth || image.naturalWidth ||  image.width
        ; let sh = m.sh = m.sh || image.videoHeight || image.naturalHeight || image.height
        ; let dw = m.dw = m.dw || sw
        ; let dh = m.dh = m.dh || sh
        ; const sf = sw/sh; const df = dw/dh
        ; const strategy = m.resize
			;

      if( strategy == 'preview' ){
        if( dw != sw || dh != sh ){
          // Make preview
          let w; let h;

          if( df >= sf ){
            w	= sw;
            h	= w / df;
          } else {
            h	= sh;
            w	= h * df;
          }

          if( w != sw || h != sh ){
            m.sx	= ~~((sw - w)/2);
            m.sy	= ~~((sh - h)/2);
            sw		= w;
            sh		= h;
          }
        }
      }
      else if( strategy ){
        if( !(sw > dw || sh > dh) ){
          dw = sw;
          dh = sh;
        }
        else if( strategy == 'min' ){
          dw = round(sf < df ? min(sw, dw) : dh*sf);
          dh = round(sf < df ? dw/sf : min(sh, dh));
        }
        else {
          dw = round(sf >= df ? min(sw, dw) : dh*sf);
          dh = round(sf >= df ? dw/sf : min(sh, dh));
        }
      }

      m.sw = sw;
      m.sh = sh;
      m.dw = dw;
      m.dh = dh;
      m.multipass = api.multiPassResize;
      return	m;
    },

    _trans (fn){
      this._load(this.file, function (err, image){
        if( err ){
          fn(err);
        }
        else {
          try {
            this._apply(image, fn);
          } catch (err){
            api.log('[err] FileAPI.Image.fn._apply:', err);
            fn(err);
          }
        }
      });
    },


    get (fn){
      if( api.support.transform ){
        const _this = this; const {matrix} = _this;

        if( matrix.deg == 'auto' ){
          api.getInfo(_this.file, (err, info)=> {
            // rotate by exif orientation
            matrix.deg = exifOrientation[info && info.exif && info.exif.Orientation] || 0;
            _this._trans(fn);
          });
        }
        else {
          _this._trans(fn);
        }
      }
      else {
        fn('not_support_transform');
      }

      return this;
    },


    toData (fn){
      return this.get(fn);
    }

  };


  Image.exifOrientation = exifOrientation;


  Image.transform = function (file, transform, autoOrientation, fn){
    function _transform(err, img){
      // img -- info object
      const
				  images = {}
        ; const queue = api.queue((err)=> {
        fn(err, images);
      })
			;

      if( !err ){
        api.each(transform, (params, name)=> {
          if( !queue.isFail() ){
            const ImgTrans = new Image(img.nodeType ? img : file); const isFn = typeof params === 'function';

            if( isFn ){
              params(img, ImgTrans);
            }
            else if( params.width ){
              ImgTrans[params.preview ? 'preview' : 'resize'](params.width, params.height, params.strategy);
            }
            else if( params.maxWidth && (img.width > params.maxWidth || img.height > params.maxHeight) ){
              ImgTrans.resize(params.maxWidth, params.maxHeight, 'max');
            }

            if( params.crop ){
              const {crop} = params;
              ImgTrans.crop(crop.x|0, crop.y|0, crop.w || crop.width, crop.h || crop.height);
            }

            if( params.rotate === undef && autoOrientation ){
              params.rotate = 'auto';
            }

            ImgTrans.set({ type: ImgTrans.matrix.type || params.type || file.type || 'image/png' });

            if( !isFn ){
              ImgTrans.set({
								  deg: params.rotate
                , overlay: params.overlay
                , filter: params.filter
                , quality: params.quality || 1
              });
            }

            queue.inc();
            ImgTrans.toData((err, image)=> {
              if( err ){
                queue.fail();
              }
              else {
                images[name] = image;
                queue.next();
              }
            });
          }
        });
      }
      else {
        queue.fail();
      }
    }


    // @todo: Оло-ло, нужно рефакторить это место
    if( file.width ){
      _transform(false, file);
    } else {
      api.getInfo(file, _transform);
    }
  };


  // @const
  api.each(['TOP', 'CENTER', 'BOTTOM'], (x, i)=> {
    api.each(['LEFT', 'CENTER', 'RIGHT'], (y, j)=> {
      Image[`${x}_${y}`] = i*3 + j;
      Image[`${y}_${x}`] = i*3 + j;
    });
  });


  /**
	 * Trabsform element to canvas
	 *
	 * @param    {Image|HTMLVideoElement}   el
	 * @returns  {Canvas}
	 */
  Image.toCanvas = function(el){
    const canvas		= document.createElement('canvas');
    canvas.width	= el.videoWidth || el.width;
    canvas.height	= el.videoHeight || el.height;
    canvas.getContext('2d').drawImage(el, 0, 0);
    return	canvas;
  };


  /**
	 * Create image from DataURL
	 * @param  {String}  dataURL
	 * @param  {Object}  size
	 * @param  {Function}  callback
	 */
  Image.fromDataURL = function (dataURL, size, callback){
    const img = api.newImage(dataURL);
    api.extend(img, size);
    callback(img);
  };


  /**
	 * Apply filter (caman.js)
	 *
	 * @param  {Canvas|Image}   canvas
	 * @param  {String|Function}  filter
	 * @param  {Function}  doneFn
	 */
  Image.applyFilter = function (canvas, filter, doneFn){
    if( typeof filter === 'function' ){
      filter(canvas, doneFn);
    }
    else if( window.Caman ){
      // http://camanjs.com/guides/
      window.Caman(canvas.tagName == 'IMG' ? Image.toCanvas(canvas) : canvas, function (){
        if( typeof filter === 'string' ){
          this[filter]();
        }
        else {
          api.each(filter, function (val, method){
            this[method](val);
          }, this);
        }
        this.render(doneFn);
      });
    }
  };


  /**
	 * For load-image-ios.js
	 */
  api.renderImageToCanvas = function (canvas, img, sx, sy, sw, sh, dx, dy, dw, dh){
    try {
      return canvas.getContext('2d').drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    } catch (ex) {
      api.log('renderImageToCanvas failed');
      throw ex;
    }
  };


  // @export
  api.support.canvas = api.support.transform = support;
  api.Image = Image;
})(FileAPI, document);

/*
 * JavaScript Load Image iOS scaling fixes 1.0.3
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * iOS image scaling fixes based on
 * https://github.com/stomita/ios-imagefile-megapixel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jslint nomen: true, bitwise: true */
/* global FileAPI, window, document */

(function (factory) {
  

  factory(FileAPI);
}((loadImage) => {
  

  // Only apply fixes on the iOS platform:
  if (!window.navigator || !window.navigator.platform ||
             !(/iP(hone|od|ad)/).test(window.navigator.platform)) {
    return;
  }

  const originalRenderMethod = loadImage.renderImageToCanvas;

  // Detects subsampling in JPEG images:
  loadImage.detectSubsampling = function (img) {
    let canvas;
    let context;
    if (img.width * img.height > 1024 * 1024) { // only consider mexapixel images
      canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      context = canvas.getContext('2d');
      context.drawImage(img, -img.width + 1, 0);
      // subsampled image becomes half smaller in rendering size.
      // check alpha channel value to confirm image is covering edge pixel or not.
      // if alpha value is 0 image is not covering, hence subsampled.
      return context.getImageData(0, 0, 1, 1).data[3] === 0;
    }
    return false;
  };

  // Detects vertical squash in JPEG images:
  loadImage.detectVerticalSquash = function (img, subsampled) {
    let naturalHeight = img.naturalHeight || img.height;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let data;
    let sy;
    let ey;
    let py;
    let alpha;
    if (subsampled) {
      naturalHeight /= 2;
    }
    canvas.width = 1;
    canvas.height = naturalHeight;
    context.drawImage(img, 0, 0);
    data = context.getImageData(0, 0, 1, naturalHeight).data;
    // search image edge pixel position in case it is squashed vertically:
    sy = 0;
    ey = naturalHeight;
    py = naturalHeight;
    while (py > sy) {
      alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    return (py / naturalHeight) || 1;
  };

  // Renders image to canvas while working around iOS image scaling bugs:
  // https://github.com/blueimp/JavaScript-Load-Image/issues/13
  loadImage.renderImageToCanvas = function (
    canvas,
    img,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    destX,
    destY,
    destWidth,
    destHeight
  ) {
    if (img._type === 'image/jpeg') {
      const context = canvas.getContext('2d');
      const tmpCanvas = document.createElement('canvas');
      const tileSize = 1024;
      const tmpContext = tmpCanvas.getContext('2d');
      let subsampled;
      let vertSquashRatio;
      let tileX;
      let tileY;
      tmpCanvas.width = tileSize;
      tmpCanvas.height = tileSize;
      context.save();
      subsampled = loadImage.detectSubsampling(img);
      if (subsampled) {
        sourceX /= 2;
        sourceY /= 2;
        sourceWidth /= 2;
        sourceHeight /= 2;
      }
      vertSquashRatio = loadImage.detectVerticalSquash(img, subsampled);
      if (subsampled || vertSquashRatio !== 1) {
        sourceY *= vertSquashRatio;
        destWidth = Math.ceil(tileSize * destWidth / sourceWidth);
        destHeight = Math.ceil(
          tileSize * destHeight / sourceHeight / vertSquashRatio
        );
        destY = 0;
        tileY = 0;
        while (tileY < sourceHeight) {
          destX = 0;
          tileX = 0;
          while (tileX < sourceWidth) {
            tmpContext.clearRect(0, 0, tileSize, tileSize);
            tmpContext.drawImage(
              img,
              sourceX,
              sourceY,
              sourceWidth,
              sourceHeight,
              -tileX,
              -tileY,
              sourceWidth,
              sourceHeight
            );
            context.drawImage(
              tmpCanvas,
              0,
              0,
              tileSize,
              tileSize,
              destX,
              destY,
              destWidth,
              destHeight
            );
            tileX += tileSize;
            destX += destWidth;
          }
          tileY += tileSize;
          destY += destHeight;
        }
        context.restore();
        return canvas;
      }
    }
    return originalRenderMethod(
      canvas,
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      destWidth,
      destHeight
    );
  };

}));

/* global window, FileAPI */

(function (api, window){
  

  const
		  {document} = window
    ; const {FormData} = window
    ; const Form = function (){ this.items = []; }
    ; const {encodeURIComponent} = window
	;


  Form.prototype = {

    append (name, blob, file, type){
      this.items.push({
				  name
        , blob: blob && blob.blob || (blob == void 0 ? '' : blob)
        , file: blob && (file || blob.name)
        , type:	blob && (type || blob.type)
      });
    },

    each (fn){
      let i = 0; const n = this.items.length;
      for( ; i < n; i++ ){
        fn.call(this, this.items[i]);
      }
    },

    toData (fn, options){
		    // allow chunked transfer if we have only one file to send
		    // flag is used below and in XHR._send
		    options._chunked = api.support.chunked && options.chunkSize > 0 && api.filter(this.items, (item)=> item.file).length == 1;

      if( !api.support.html5 ){
        api.log('FileAPI.Form.toHtmlData');
        this.toHtmlData(fn);
      }
      else if( !api.formData || this.multipart || !FormData ){
        api.log('FileAPI.Form.toMultipartData');
        this.toMultipartData(fn);
      }
      else if( options._chunked ){
        api.log('FileAPI.Form.toPlainData');
        this.toPlainData(fn);
      }
      else {
        api.log('FileAPI.Form.toFormData');
        this.toFormData(fn);
      }
    },

    _to (data, complete, next, arg){
      const queue = api.queue(()=> {
        complete(data);
      });

      this.each((file)=> {
        next(file, data, queue, arg);
      });

      queue.check();
    },


    toHtmlData (fn){
      this._to(document.createDocumentFragment(), fn, (file, data/** DocumentFragment */)=> {
        const {blob} = file; let hidden;

        if( file.file ){
          api.reset(blob, true);
          // set new name
          blob.name = file.name;
          blob.disabled = false;
          data.appendChild(blob);
        }
        else {
          hidden = document.createElement('input');
          hidden.name  = file.name;
          hidden.type  = 'hidden';
          hidden.value = blob;
          data.appendChild(hidden);
        }
      });
    },

    toPlainData (fn){
      this._to({}, fn, (file, data, queue)=> {
        if( file.file ){
          data.type = file.file;
        }

        if( file.blob.toBlob ){
				    // canvas
          queue.inc();
          _convertFile(file, (file, blob)=> {
            data.name = file.name;
            data.file = blob;
            data.size = blob.length;
            data.type = file.type;
            queue.next();
          });
        }
        else if( file.file ){
				    // file
          data.name = file.blob.name;
          data.file = file.blob;
          data.size = file.blob.size;
          data.type = file.type;
        }
        else {
				    // additional data
				    if( !data.params ){
				        data.params = [];
				    }
				    data.params.push(`${encodeURIComponent(file.name) }=${ encodeURIComponent(file.blob)}`);
        }

        data.start = -1;
        data.end = data.file && data.file.FileAPIReadPosition || -1;
        data.retry = 0;
      });
    },

    toFormData (fn){
      this._to(new FormData, fn, (file, data, queue)=> {
        if( file.blob && file.blob.toBlob ){
          queue.inc();
          _convertFile(file, (file, blob)=> {
            data.append(file.name, blob, file.file);
            queue.next();
          });
        }
        else if( file.file ){
          data.append(file.name, file.blob, file.file);
        }
        else {
          data.append(file.name, file.blob);
        }

        if( file.file ){
          data.append(`_${file.name}`, file.file);
        }
      });
    },


    toMultipartData (fn){
      this._to([], fn, (file, data, queue, boundary)=> {
        queue.inc();
        _convertFile(file, (file, blob)=> {
          data.push(
						  `--_${  boundary  }\r\nContent-Disposition: form-data; name="${ file.name }"${ file.file ? `; filename="${ encodeURIComponent(file.file) }"` : ''
						 }${file.file ? `\r\nContent-Type: ${ file.type || 'application/octet-stream'}` : ''
						 }\r\n`
						+ `\r\n${ file.file ? blob : encodeURIComponent(blob)
						 }\r\n`
          );
          queue.next();
        }, true);
      }, api.expando);
    }
  };


  function _convertFile(file, fn, useBinaryString){
    const {blob} = file; let filename = file.file;

    if( filename ){
      if( !blob.toDataURL ){
        // The Blob is not an image.
        api.readAsBinaryString(blob, (evt)=> {
          if( evt.type == 'load' ){
            fn(file, evt.result);
          }
        });
        return;
      }

      const
				  mime = { 'image/jpeg': '.jpe?g', 'image/png': '.png' }
        ; const type = mime[file.type] ? file.type : 'image/png'
        ; const ext  = mime[type] || '.png'
        ; const quality = blob.quality || 1
			;

      if( !filename.match(new RegExp(`${ext}$`, 'i')) ){
        // Does not change the current extension, but add a new one.
        filename += ext.replace('?', '');
      }

      file.file = filename;
      file.type = type;

      if( !useBinaryString && blob.toBlob ){
        blob.toBlob((blob)=> {
          fn(file, blob);
        }, type, quality);
      }
      else {
        fn(file, api.toBinaryString(blob.toDataURL(type, quality)));
      }
    }
    else {
      fn(file, blob);
    }
  }


  // @export
  api.Form = Form;
})(FileAPI, window);

/* global window, FileAPI, Uint8Array */

(function (window, api){
  

  const
		  noop = function (){}
    ; const {document} = window

    ; const XHR = function (options){
    this.uid = api.uid();
    this.xhr = {
				  abort: noop
      , getResponseHeader: noop
      , getAllResponseHeaders: noop
    };
    this.options = options;
  };

  const _xhrResponsePostfix = { '': 1, XML: 1, Text: 1, Body: 1 }
	;


  XHR.prototype = {
    status: 0,
    statusText: '',
    constructor: XHR,

    getResponseHeader (name){
      return this.xhr.getResponseHeader(name);
    },

    getAllResponseHeaders (){
      return this.xhr.getAllResponseHeaders() || {};
    },

    end (status, statusText){
      const _this = this; const {options} = _this;

      _this.end		=
			_this.abort		= noop;
      _this.status	= status;

      if( statusText ){
        _this.statusText = statusText;
      }

      api.log('xhr.end:', status, statusText);
      options.complete(status == 200 || status == 201 ? false : _this.statusText || 'unknown', _this);

      if( _this.xhr && _this.xhr.node ){
        setTimeout(()=> {
          const {node} = _this.xhr;
          try { node.parentNode.removeChild(node); } catch (e){}
          try { delete window[_this.uid]; } catch (e){}
          window[_this.uid] = _this.xhr.node = null;
        }, 9);
      }
    },

    abort (){
      this.end(0, 'abort');

      if( this.xhr ){
        this.xhr.aborted = true;
        this.xhr.abort();
      }
    },

    send (FormData){
      const _this = this; const {options} = this;

      FormData.toData((data)=> {
        // Start uploading
        options.upload(options, _this);
        _this._send.call(_this, options, data);
      }, options);
    },

    _send (options, data){
      const _this = this; let xhr; const {uid} = _this; const onloadFuncName = `${_this.uid  }Load`; let {url} = options;

      api.log('XHR._send:', data);

      if( !options.cache ){
        // No cache
        url += (~url.indexOf('?') ? '&' : '?') + api.uid();
      }

      if( data.nodeName ){
        const {jsonp} = options;

        // prepare callback in GET
        url = url.replace(/([a-z]+)=(\?)/i, `$1=${uid}`);

        // legacy
        options.upload(options, _this);

        const
          onPostMessage = function (evt){
            if( ~url.indexOf(evt.origin) ){
              try {
                const result = api.parseJSON(evt.data);
                if( result.id == uid ){
                  complete(result.status, result.statusText, result.response);
                }
              } catch( err ){
                complete(0, err.message);
              }
            }
          };

        // jsonp-callack
        var complete = window[uid] = function (status, statusText, response){
          _this.readyState	= 4;
          _this.responseText	= response;
          _this.end(status, statusText);

          api.event.off(window, 'message', onPostMessage);
          window[uid] = xhr = transport = window[onloadFuncName] = null;
        }
				;

        _this.xhr.abort = function (){
          try {
            if( transport.stop ){ transport.stop(); }
            else if( transport.contentWindow.stop ){ transport.contentWindow.stop(); }
            else { transport.contentWindow.document.execCommand('Stop'); }
          }
          catch (er) {}
          complete(0, "abort");
        };

        api.event.on(window, 'message', onPostMessage);

        window[onloadFuncName] = function (){
          try {
            const
							  win = transport.contentWindow
              ; const doc = win.document
              ; const result = win.result || api.parseJSON(doc.body.innerHTML)
						;
            complete(result.status, result.statusText, result.response);
          } catch (e){
            api.log('[transport.onload]', e);
          }
        };

        xhr = document.createElement('div');
        xhr.innerHTML = `<form target="${ uid }" action="${ url }" method="POST" enctype="multipart/form-data" style="position: absolute; top: -1000px; overflow: hidden; width: 1px; height: 1px;">`
							+ `<iframe name="${ uid }" src="javascript:false;" onload="${  onloadFuncName  }()"></iframe>${
							 jsonp && (options.url.indexOf('=?') < 0) ? `<input value="${ uid }" name="${jsonp}" type="hidden"/>` : ''
							 }</form>`
        ;

        // get form-data & transport
        let
					  form = xhr.getElementsByTagName('form')[0]
          ; var transport = xhr.getElementsByTagName('iframe')[0]
				;

        form.appendChild(data);

        api.log(form.parentNode.innerHTML);

        // append to DOM
        document.body.appendChild(xhr);

        // keep a reference to node-transport
        _this.xhr.node = xhr;

        // send
        _this.readyState = 2; // loaded
        form.submit();
        form = null;
      }
      else {
        // Clean url
        url = url.replace(/([a-z]+)=(\?)&?/i, '');

        // html5
        if (this.xhr && this.xhr.aborted) {
          api.log("Error: already aborted");
          return;
        }
        xhr = _this.xhr = api.getXHR();

        if (data.params) {
          url += (url.indexOf('?') < 0 ? "?" : "&") + data.params.join("&");
        }

        xhr.open('POST', url, true);

        if( api.withCredentials ){
          xhr.withCredentials = "true";
        }

        if( !options.headers || !options.headers['X-Requested-With'] ){
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }

        api.each(options.headers, (val, key)=> {
          xhr.setRequestHeader(key, val);
        });


        if ( options._chunked ) {
          // chunked upload
          if( xhr.upload ){
            xhr.upload.addEventListener('progress', api.throttle((/** Event */evt)=> {
              if (!data.retry) {
                // show progress only for correct chunk uploads
                options.progress({
									  type:			evt.type
                  , total:		data.size
                  , loaded:		data.start + evt.loaded
                  , totalSize:	data.size
                }, _this, options);
              }
            }, 100), false);
          }

          xhr.onreadystatechange = function (){
            const lkb = parseInt(xhr.getResponseHeader('X-Last-Known-Byte'), 10);

            _this.status     = xhr.status;
            _this.statusText = xhr.statusText;
            _this.readyState = xhr.readyState;

            if( xhr.readyState == 4 ){
              for( const k in _xhrResponsePostfix ){
                _this[`response${k}`]  = xhr[`response${k}`];
              }
              xhr.onreadystatechange = null;

              if (!xhr.status || xhr.status - 201 > 0) {
                api.log(`Error: ${  xhr.status}`);
                // some kind of error
                // 0 - connection fail or timeout, if xhr.aborted is true, then it's not recoverable user action
                // up - server error
                if (((!xhr.status && !xhr.aborted) || xhr.status == 500 || xhr.status == 416) && ++data.retry <= options.chunkUploadRetry) {
                  // let's try again the same chunk
                  // only applicable for recoverable error codes 500 && 416
                  const delay = xhr.status ? 0 : api.chunkNetworkDownRetryTimeout;

                  // inform about recoverable problems
                  options.pause(data.file, options);

                  // smart restart if server reports about the last known byte
                  api.log(`X-Last-Known-Byte: ${  lkb}`);
                  if (lkb) {
                    data.end = lkb;
                  } else {
                    data.end = data.start - 1;
                    if (xhr.status == 416) {
                      data.end -= options.chunkSize;
                    }
                  }

                  setTimeout(() => {
                    _this._send(options, data);
                  }, delay);
                } else {
                  // no mo retries
                  _this.end(xhr.status);
                }
              } else {
                // success
                data.retry = 0;

                if (data.end == data.size - 1) {
                  // finished
                  _this.end(xhr.status);
                } else {
                  // next chunk

                  // shift position if server reports about the last known byte
                  api.log(`X-Last-Known-Byte: ${  lkb}`);
                  if (lkb) {
                    data.end = lkb;
                  }
                  data.file.FileAPIReadPosition = data.end;

                  setTimeout(() => {
                    _this._send(options, data);
                  }, 0);
                }
              }

              xhr = null;
            }
          };

          data.start = data.end + 1;
          data.end = Math.max(Math.min(data.start + options.chunkSize, data.size) - 1, data.start);

          // Retrieve a slice of file
          let
						  {file} = data
            ; let slice = (file.slice || file.mozSlice || file.webkitSlice).call(file, data.start, data.end + 1)
					;

          if( data.size && !slice.size ){
            setTimeout(()=> {
              _this.end(-1);
            });
          } else {
            xhr.setRequestHeader("Content-Range", `bytes ${  data.start  }-${  data.end  }/${  data.size}`);
            xhr.setRequestHeader("Content-Disposition", `attachment; filename=${  encodeURIComponent(data.name)}`);
            xhr.setRequestHeader("Content-Type", data.type || "application/octet-stream");

            xhr.send(slice);
          }

          file = slice = null;
        } else {
          // single piece upload
          if( xhr.upload ){
            // https://github.com/blueimp/jQuery-File-Upload/wiki/Fixing-Safari-hanging-on-very-high-speed-connections-%281Gbps%29
            xhr.upload.addEventListener('progress', api.throttle((/** Event */evt)=> {
              options.progress(evt, _this, options);
            }, 100), false);
          }

          xhr.onreadystatechange = function (){
            _this.status     = xhr.status;
            _this.statusText = xhr.statusText;
            _this.readyState = xhr.readyState;

            if( xhr.readyState == 4 ){
              for( const k in _xhrResponsePostfix ){
                _this[`response${k}`]  = xhr[`response${k}`];
              }
              xhr.onreadystatechange = null;

              if (!xhr.status || xhr.status > 201) {
                api.log(`Error: ${  xhr.status}`);
                if (((!xhr.status && !xhr.aborted) || xhr.status == 500) && (options.retry || 0) < options.uploadRetry) {
                  options.retry = (options.retry || 0) + 1;
                  const delay = api.networkDownRetryTimeout;

                  // inform about recoverable problems
                  options.pause(options.file, options);

                  setTimeout(() => {
                    _this._send(options, data);
                  }, delay);
                } else {
                  // success
                  _this.end(xhr.status);
                }
              } else {
                // success
                _this.end(xhr.status);
              }

              xhr = null;
            }
          };

          if( api.isArray(data) ){
            // multipart
            xhr.setRequestHeader('Content-Type', `multipart/form-data; boundary=_${api.expando}`);
            const rawData = `${data.join('') }--_${ api.expando }--`;

            /** @namespace  xhr.sendAsBinary  https://developer.mozilla.org/ru/XMLHttpRequest#Sending_binary_content */
            if( xhr.sendAsBinary ){
              xhr.sendAsBinary(rawData);
            }
            else {
              const bytes = Array.prototype.map.call(rawData, (c)=> c.charCodeAt(0) & 0xff);
              xhr.send(new Uint8Array(bytes).buffer);

            }
          } else {
            // FormData
            xhr.send(data);
          }
        }
      }
    }
  };


  // @export
  api.XHR = XHR;
})(window, FileAPI);

/**
 * @class	FileAPI.Camera
 * @author	RubaXa	<trash@rubaxa.org>
 * @support	Chrome 21+, FF 18+, Opera 12+
 */

/* global window, FileAPI, jQuery */
/** @namespace LocalMediaStream -- https://developer.mozilla.org/en-US/docs/WebRTC/MediaStream_API#LocalMediaStream */
(function (window, api){
  

  const
    URL = window.URL || window.webkitURL;

  const {document} = window;
  const {navigator} = window;

  const getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  const html5 = !!getMedia
	;


  // Support "media"
  api.support.media = html5;


  const Camera = function (video){
    this.video = video;
  };


  Camera.prototype = {
    isActive (){
      return	!!this._active;
    },


    /**
		 * Start camera streaming
		 * @param	{Function}	callback
		 */
    start (callback){
      const
				  _this = this
        ; const {video} = _this
        ; let _successId
        ; let _failId
        ; const _complete = function (err){
        _this._active = !err;
        clearTimeout(_failId);
        clearTimeout(_successId);
        //					api.event.off(video, 'loadedmetadata', _complete);
        callback && callback(err, _this);
      }
			;

      getMedia.call(navigator, { video: true }, (stream/** LocalMediaStream */)=> {
        // Success
        _this.stream = stream;

        //				api.event.on(video, 'loadedmetadata', function (){
        //					_complete(null);
        //				});

        // Set camera stream
        video.src = URL.createObjectURL(stream);

        // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
        // See crbug.com/110938.
        _successId = setInterval(()=> {
          if( _detectVideoSignal(video) ){
            _complete(null);
          }
        }, 1000);

        _failId = setTimeout(()=> {
          _complete('timeout');
        }, 5000);

        // Go-go-go!
        video.play();
      }, _complete/* error */);
    },


    /**
		 * Stop camera streaming
		 */
    stop (){
      try {
        this._active = false;
        this.video.pause();
        this.stream.stop();
      } catch( err ){ }
    },


    /**
		 * Create screenshot
		 * @return {FileAPI.Camera.Shot}
		 */
    shot (){
      return	new Shot(this.video);
    }
  };


  /**
	 * Get camera element from container
	 *
	 * @static
	 * @param	{HTMLElement}	el
	 * @return	{Camera}
	 */
  Camera.get = function (el){
    return	new Camera(el.firstChild);
  };


  /**
	 * Publish camera element into container
	 *
	 * @static
	 * @param	{HTMLElement}	el
	 * @param	{Object}		options
	 * @param	{Function}		[callback]
	 */
  Camera.publish = function (el, options, callback){
    if( typeof options === 'function' ){
      callback = options;
      options = {};
    }

    // Dimensions of "camera"
    options = api.extend({}, {
			  width:	'100%'
      , height:	'100%'
      , start:	true
    }, options);


    if( el.jquery ){
      // Extract first element, from jQuery collection
      el = el[0];
    }


    const doneFn = function (err){
      if( err ){
        callback(err);
      }
      else {
        // Get camera
        const cam = Camera.get(el);
        if( options.start ){
          cam.start(callback);
        }
        else {
          callback(null, cam);
        }
      }
    };


    el.style.width	= _px(options.width);
    el.style.height	= _px(options.height);


    if( api.html5 && html5 ){
      // Create video element
      const video = document.createElement('video');

      // Set dimensions
      video.style.width	= _px(options.width);
      video.style.height	= _px(options.height);

      // Clean container
      if( window.jQuery ){
        jQuery(el).empty();
      } else {
        el.innerHTML = '';
      }

      // Add "camera" to container
      el.appendChild(video);

      // end
      doneFn();
    }
    else {
      Camera.fallback(el, options, doneFn);
    }
  };


  Camera.fallback = function (el, options, callback){
    callback('not_support_camera');
  };


  /**
	 * @class	FileAPI.Camera.Shot
	 */
  var Shot = function (video){
    const canvas	= video.nodeName ? api.Image.toCanvas(video) : video;
    const shot	= api.Image(canvas);
    shot.type	= 'image/png';
    shot.width	= canvas.width;
    shot.height	= canvas.height;
    shot.size	= canvas.width * canvas.height * 4;
    return	shot;
  };


  /**
	 * Add "px" postfix, if value is a number
	 *
	 * @private
	 * @param	{*}  val
	 * @return	{String}
	 */
  function _px(val){
    return	val >= 0 ? `${val  }px` : val;
  }


  /**
	 * @private
	 * @param	{HTMLVideoElement} video
	 * @return	{Boolean}
	 */
  function _detectVideoSignal(video){
    const canvas = document.createElement('canvas'); let ctx; let res = false;
    try {
      ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 1, 1);
      res = ctx.getImageData(0, 0, 1, 1).data[4] != 255;
    }
    catch( e ){}
    return	res;
  }


  // @export
  Camera.Shot	= Shot;
  api.Camera	= Camera;
})(window, FileAPI);

/**
 * FileAPI fallback to Flash
 *
 * @flash-developer  "Vladimir Demidov" <v.demidov@corp.mail.ru>
 */

/* global window, ActiveXObject, FileAPI */
(function (window, jQuery, api) {
  

  const
		  {document} = window
    ; const {location} = window
    ; const {navigator} = window
    ; const _each = api.each
	;


  api.support.flash = (function (){
    const mime = navigator.mimeTypes; let has = false;

    if( navigator.plugins && typeof navigator.plugins['Shockwave Flash'] === 'object' ){
      has	= navigator.plugins['Shockwave Flash'].description && !(mime && mime['application/x-shockwave-flash'] && !mime['application/x-shockwave-flash'].enabledPlugin);
    }
    else {
      try {
        has	= !!(window.ActiveXObject && new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
      }
      catch(er){
        api.log('Flash -- does not supported.');
      }
    }

    if( has && /^file:/i.test(location) ){
      api.log('[warn] Flash does not work on `file:` protocol.');
    }

    return	has;
  })();


	   api.support.flash
	&& (0
		|| !api.html5 || !api.support.html5
		|| (api.cors && !api.support.cors)
		|| (api.media && !api.support.media)
	)
	&& (function (){
	  const
			  _attr  = api.uid()
	    ; let _retry = 0
	    ; const _files = {}
	    ; const _rhttp = /^https?:/i

	    ; var flash = {
	      _fn: {},


	      /**
				 * Initialization & preload flash object
				 */
	      init (){
	        let child = document.body && document.body.firstChild;

	        if( child ){
	          do {
	            if( child.nodeType == 1 ){
	              api.log('FlashAPI.state: awaiting');

	              const dummy = document.createElement('div');

	              dummy.id = `_${  _attr}`;

	              _css(dummy, {
									  top: 1
	                , right: 1
	                , width: 5
	                , height: 5
	                , position: 'absolute'
	                , zIndex: `${1e6}` // set max zIndex
	              });

	              child.parentNode.insertBefore(dummy, child);
	              flash.publish(dummy, _attr);

	              return;
	            }
	          }
	          while( child = child.nextSibling );
	        }

	        if( _retry < 10 ){
	          setTimeout(flash.init, ++_retry*50);
	        }
	      },


	      /**
				 * Publish flash-object
				 *
				 * @param {HTMLElement} el
				 * @param {String} id
				 * @param {Object} [opts]
				 */
	      publish (el, id, opts){
	        opts = opts || {};
	        el.innerHTML = _makeFlashHTML({
						  id
	          , src: _getUrl(api.flashUrl, `r=${  api.version}`)
	          //						, src: _getUrl('http://v.demidov.boom.corp.mail.ru/uploaderfileapi/FlashFileAPI.swf?1')
	          , wmode: opts.camera ? '' : 'transparent'
	          , flashvars: `callback=${  opts.onEvent || 'FileAPI.Flash.onEvent'
							 }&flashId=${ id
							 }&storeKey=${ navigator.userAgent.match(/\d/ig).join('') }_${ api.version
							 }${flash.isReady || (api.pingUrl ? `&ping=${api.pingUrl}` : '')
							 }&timeout=${api.flashAbortTimeout
							 }${opts.camera ? `&useCamera=${  _getUrl(api.flashWebcamUrl)}` : ''
							 }&debug=${api.debug?"1":""}`
	        }, opts);
	      },


	      ready (){
	        api.log('FlashAPI.state: ready');

	        flash.ready = api.F;
	        flash.isReady = true;
	        flash.patch();
	        flash.patchCamera && flash.patchCamera();
	        api.event.on(document, 'mouseover', flash.mouseover);
	        api.event.on(document, 'click', (evt)=> {
	          if( flash.mouseover(evt) ){
	            evt.preventDefault
	              ? evt.preventDefault()
	              : (evt.returnValue = true)
	            ;
	          }
	        });
	      },


	      getEl (){
	        return	document.getElementById(`_${_attr}`);
	      },


	      getWrapper (node){
	        do {
	          if( /js-fileapi-wrapper/.test(node.className) ){
	            return	node;
	          }
	        }
	        while( (node = node.parentNode) && (node !== document.body) );
	      },
				
	      disableMouseover: false,

	      mouseover (evt){
	      if (!flash.disableMouseover) {
	        const {target} = api.event.fix(evt);
	
	        if( /input/i.test(target.nodeName) && target.type == 'file' && !target.disabled ){
	          const
								  state = target.getAttribute(_attr)
	            ; const wrapper = flash.getWrapper(target)
							;
	
	          if( api.multiFlash ){
	            // check state:
	            //   i — published
	            //   i — initialization
	            //   r — ready
	            if( state == 'i' || state == 'r' ){
	              // publish fail
	              return	false;
	            }
	            if( state != 'p' ){
	              // set "init" state
	              target.setAttribute(_attr, 'i');
	
	              const dummy = document.createElement('div');
	
	              if( !wrapper ){
	                api.log('[err] FlashAPI.mouseover: js-fileapi-wrapper not found');
	                return;
	              }
	
	              _css(dummy, {
										  top:    0
	                , left:   0
	                , width:  target.offsetWidth
	                , height: target.offsetHeight
	                , zIndex: `${1e6}` // set max zIndex
	                , position: 'absolute'
	              });
	
	              wrapper.appendChild(dummy);
	              flash.publish(dummy, api.uid());
	
	              // set "publish" state
	              target.setAttribute(_attr, 'p');
	            }
	
	            return	true;
	          }
	          if( wrapper ){
	            // Use one flash element
	            const box = _getDimensions(wrapper);
	            _css(flash.getEl(), box);
	
	            // Set current input
	            flash.curInp = target;
	          }
	        }
	        else if( !/object|embed/i.test(target.nodeName) ){
	          _css(flash.getEl(), { top: 1, left: 1, width: 5, height: 5 });
	        }
	      }
	    },

	      onEvent (evt){
	      const {type} = evt;
					
	      if( type == 'ready' ){
	        try {
	          // set "ready" state
	          flash.getInput(evt.flashId).setAttribute(_attr, 'r');
	        } catch (e){
	        }

	        flash.ready();
	        setTimeout(()=> { flash.mouseenter(evt); }, 50);
	        return	true;
	      }
	      if( type === 'ping' ){
	        api.log('(flash -> js).ping:', [evt.status, evt.savedStatus], evt.error);
	      }
	      else if( type === 'log' ){
	        api.log('(flash -> js).log:', evt.target);
	      }
	      else if( type in flash ){
	        setTimeout(()=> {
	          api.log(`FlashAPI.event.${evt.type}:`, evt);
	          flash[type](evt);
	        }, 1);
	      }
	    },
	      mouseDown(evt) {
	        flash.disableMouseover = true;
	      },
	      cancel(evt) {
	        flash.disableMouseover = false;
	      },
	      mouseenter (evt){
	        const node = flash.getInput(evt.flashId);

	        if( node ){
	          // Set multiple mode
	          flash.cmd(evt, 'multiple', node.getAttribute('multiple') != null);


	          // Set files filter
	          const accept = []; const exts = {};

	          _each((node.getAttribute('accept') || '').split(/,\s*/), (mime)=> {
	            api.accept[mime] && _each(api.accept[mime].split(' '), (ext)=> {
	              exts[ext] = 1;
	            });
	          });

	          _each(exts, (i, ext)=> {
	            accept.push( ext );
	          });

	          flash.cmd(evt, 'accept', accept.length ? `${accept.join(',')},${accept.join(',').toUpperCase()}` : '*');
	        }
	      },


	      get (id){
	        return	document[id] || window[id] || document.embeds[id];
	      },


	      getInput (id){
	        if( api.multiFlash ){
	          try {
	            const node = flash.getWrapper(flash.get(id));
	            if( node ){
	              return node.getElementsByTagName('input')[0];
	            }
	          } catch (e){
	            api.log('[err] Can not find "input" by flashId:', id, e);
	          }
	        } else {
	          return	flash.curInp;
	        }
	      },


	      select (evt){
	        try {
	          const
							  inp = flash.getInput(evt.flashId)
	            ; const uid = api.uid(inp)
	            ; const {files} = evt.target
	            ; let event
						;
	          _each(files, (file)=> {
	            api.checkFileObj(file);
	          });
	
	          _files[uid] = files;
	
	          if( document.createEvent ){
	            event = document.createEvent('Event');
	            event.files = files;
	            event.initEvent('change', true, true);
	            inp.dispatchEvent(event);
	          }
	          else if( jQuery ){
	            jQuery(inp).trigger({ type: 'change', files });
	          }
	          else {
	            event = document.createEventObject();
	            event.files = files;
	            inp.fireEvent('onchange', event);
	          }
	        } finally {
	          flash.disableMouseover = false;
	        }
	      },


	      cmd (id, name, data, last){
	        try {
	          api.log(`(js -> flash).${name}:`, data);
	          return flash.get(id.flashId || id).cmd(name, data);
	        } catch (e){
	          api.log('(js -> flash).onError:', e);
	          if( !last ){
	            // try again
	            setTimeout(()=> { flash.cmd(id, name, data, true); }, 50);
	          }
	        }
	      },


	      patch (){
	        api.flashEngine = true;

	        // FileAPI
	        _inherit(api, {
	          getFiles (input, filter, callback){
	            if( callback ){
	              api.filterFiles(api.getFiles(input), filter, callback);
	              return null;
	            }

	            let files = api.isArray(input) ? input : _files[api.uid(input.target || input.srcElement || input)];


	            if( !files ){
	              // Файлов нету, вызываем родительский метод
	              return	this.parent.apply(this, arguments);
	            }


	            if( filter ){
	              filter	= api.getFilesFilter(filter);
	              files	= api.filter(files, (file)=> filter.test(file.name));
	            }

	            return	files;
	          },


	          getInfo (file, fn){
	            if( _isHtmlFile(file) ){
	              this.parent.apply(this, arguments);
	            }
	            else if( file.isShot ){
	              fn(null, file.info = {
	                width: file.width,
	                height: file.height
	              });
	            }
	            else {
	              if( !file.__info ){
	                const defer = file.__info = api.defer();

	                //									flash.cmd(file, 'getFileInfo', {
	                //										  id: file.id
	                //										, callback: _wrap(function _(err, info){
	                //											_unwrap(_);
	                //											defer.resolve(err, file.info = info);
	                //										})
	                //									});
	                defer.resolve(null, file.info = null);

	              }

	              file.__info.then(fn);
	            }
	          }
	        });


	        // FileAPI.Image
	        api.support.transform = true;
	        api.Image && _inherit(api.Image.prototype, {
	          get (fn, scaleMode){
	            this.set({ scaleMode: scaleMode || 'noScale' }); // noScale, exactFit
	            return this.parent(fn);
	          },

	          _load (file, fn){
	            api.log('FlashAPI.Image._load:', file);

	            if( _isHtmlFile(file) ){
	              this.parent.apply(this, arguments);
	            }
	            else {
	              const _this = this;
	              api.getInfo(file, (err)=> {
	                fn.call(_this, err, file);
	              });
	            }
	          },

	          _apply (file, fn){
	            api.log('FlashAPI.Image._apply:', file);

	            if( _isHtmlFile(file) ){
	              this.parent.apply(this, arguments);
	            }
	            else {
	              const m = this.getMatrix(file.info); let doneFn = fn;

	              flash.cmd(file, 'imageTransform', {
									  id: file.id
	                , matrix: m
	                , callback: _wrap(function _(err, base64){
	                  api.log('FlashAPI.Image._apply.callback:', err);
	                  _unwrap(_);

	                  if( err ){
	                    doneFn(err);
	                  }
	                  else if( !api.support.html5 && (!api.support.dataURI || base64.length > 3e4) ){
	                    _makeFlashImage({
												  width:	(m.deg % 180) ? m.dh : m.dw
	                      , height:	(m.deg % 180) ? m.dw : m.dh
	                      , scale:	m.scaleMode
	                    }, base64, doneFn);
	                  }
	                  else {
	                    if( m.filter ){
	                      doneFn = function (err, img){
	                        if( err ){
	                          fn(err);
	                        }
	                        else {
	                          api.Image.applyFilter(img, m.filter, function (){
	                            fn(err, this.canvas);
	                          });
	                        }
	                      };
	                    }

	                    api.newImage(`data:${ file.type };base64,${ base64}`, doneFn);
	                  }
	                })
	              });
	            }
	          },

	          toData (fn){
	            const
								  {file} = this
	              ; const {info} = file
	              ; const matrix = this.getMatrix(info)
							;
	            api.log('FlashAPI.Image.toData');

	            if( _isHtmlFile(file) ){
	              this.parent.apply(this, arguments);
	            }
	            else {
	              if( matrix.deg == 'auto' ){
	                matrix.deg = api.Image.exifOrientation[info && info.exif && info.exif.Orientation] || 0;
	              }

	              fn.call(this, !file.info, {
									  id:		file.id
	                , flashId:	file.flashId
	                , name:		file.name
	                , type:		file.type
	                , matrix
	              });
	            }
	          }
	        });


	        api.Image && _inherit(api.Image, {
	          fromDataURL (dataURL, size, callback){
	            if( !api.support.dataURI || dataURL.length > 3e4 ){
	              _makeFlashImage(
									  api.extend({ scale: 'exactFit' }, size)
	                , dataURL.replace(/^data:[^,]+,/, '')
	                , (err, el)=> { callback(el); }
	              );
	            }
	            else {
	              this.parent(dataURL, size, callback);
	            }
	          }
	        });

	        // FileAPI.Form
	        _inherit(api.Form.prototype, {
	          toData (fn){
	            const {items} = this; let i = items.length;

	            for( ; i--; ){
	              if( items[i].file && _isHtmlFile(items[i].blob) ){
	                return this.parent.apply(this, arguments);
	              }
	            }

	            api.log('FlashAPI.Form.toData');
	            fn(items);
	          }
	        });


	        // FileAPI.XHR
	        _inherit(api.XHR.prototype, {
	          _send (options, formData){
	          if(
								   formData.nodeName
								|| formData.append && api.support.html5
								|| api.isArray(formData) && (typeof formData[0] === 'string')
	          ){
	            // HTML5, Multipart or IFrame
	            return	this.parent.apply(this, arguments);
	          }


	          const
								  data = {}
	            ; const files = {}
	            ; const _this = this
	            ; let flashId
	            ; let fileId
							;

	          _each(formData, (item)=> {
	            if( item.file ){
	              files[item.name] = item = _getFileDescr(item.blob);
	              fileId  = item.id;
	              flashId = item.flashId;
	            }
	            else {
	              data[item.name] = item.blob;
	            }
	          });

	          if( !fileId ){
	            flashId = _attr;
	          }

	          if( !flashId ){
	            api.log('[err] FlashAPI._send: flashId -- undefined');
	            return this.parent.apply(this, arguments);
	          }
							
	          api.log(`FlashAPI.XHR._send: ${ flashId } -> ${ fileId}`);
							

	          _this.xhr = {
	            headers: {},
	            abort (){ flash.cmd(flashId, 'abort', { id: fileId }); },
	            getResponseHeader (name){ return this.headers[name]; },
	            getAllResponseHeaders (){ return this.headers; }
	          };

	          const queue = api.queue(()=> {
	            flash.cmd(flashId, 'upload', {
									  url: _getUrl(options.url.replace(/([a-z]+)=(\?)&?/i, ''))
	              , data
	              , files: fileId ? files : null
	              , headers: options.headers || {}
	              , callback: _wrap(function upload(evt){
	                const {type} = evt; const {result} = evt;

	                api.log(`FlashAPI.upload.${type}`);

	                if( type == 'progress' ){
	                  evt.loaded = Math.min(evt.loaded, evt.total); // @todo fixme
	                  evt.lengthComputable = true;
	                  options.progress(evt);
	                }
	                else if( type == 'complete' ){
	                  _unwrap(upload);

	                  if( typeof result === 'string' ){
	                    _this.responseText	= result.replace(/%22/g, "\"").replace(/%5c/g, "\\").replace(/%26/g, "&").replace(/%25/g, "%");
	                  }

	                  _this.end(evt.status || 200);
	                }
	                else if( type == 'abort' || type == 'error' ){
	                  _this.end(evt.status || 0, evt.message);
	                  _unwrap(upload);
	                }
	              })
	            });
	          });


	          // #2174: FileReference.load() call while FileReference.upload() or vice versa
	          _each(files, (file)=> {
	            queue.inc();
	            api.getInfo(file, queue.next);
	          });

	          queue.check();
	        }
	        });
	      }
	    }
		;


	  function _makeFlashHTML(opts){
	    return (`<object id="#id#" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="${opts.width || '100%'}" height="${opts.height || '100%'}">`
				+ `<param name="movie" value="#src#" />`
				+ `<param name="flashvars" value="#flashvars#" />`
				+ `<param name="swliveconnect" value="true" />`
				+ `<param name="allowscriptaccess" value="always" />`
				+ `<param name="allownetworking" value="all" />`
				+ `<param name="menu" value="false" />`
				+ `<param name="wmode" value="#wmode#" />`
				+ `<embed flashvars="#flashvars#" swliveconnect="true" allownetworking="all" allowscriptaccess="always" name="#id#" src="#src#" width="${opts.width || '100%'}" height="${opts.height || '100%'}" menu="false" wmode="transparent" type="application/x-shockwave-flash"></embed>`
				+ `</object>`).replace(/#(\w+)#/ig, (a, name)=> opts[name])
	    ;
	  }


	  function _css(el, css){
	    if( el && el.style ){
	      let key; let val;
	      for( key in css ){
	        val = css[key];
	        if( typeof val === 'number' ){
	          val += 'px';
	        }
	        try { el.style[key] = val; } catch (e) {}
	      }
				
	    }
	  }


	  function _inherit(obj, methods){
	    _each(methods, (fn, name)=> {
	      const prev = obj[name];
	      obj[name] = function (){
	        this.parent = prev;
	        return fn.apply(this, arguments);
	      };
	    });
	  }

	  function _isHtmlFile(file){
	    return	file && !file.flashId;
	  }

	  function _wrap(fn){
	    const id = fn.wid = api.uid();
	    flash._fn[id] = fn;
	    return	`FileAPI.Flash._fn.${id}`;
	  }


	  function _unwrap(fn){
	    try {
	      flash._fn[fn.wid] = null;
	      delete	flash._fn[fn.wid];
	    }
	    catch(e){}
	  }


	  function _getUrl(url, params){
	    if( !_rhttp.test(url) ){
	      if( /^\.\//.test(url) || url.charAt(0) != '/' ){
	        let path = location.pathname;
	        path = path.substr(0, path.lastIndexOf('/'));
	        url = (`${path }/${ url}`).replace('/./', '/');
	      }

	      if( url.substr(0, 2) != '//' ){
	        url = `//${  location.host  }${url}`;
	      }

	      if( !_rhttp.test(url) ){
	        url = location.protocol + url;
	      }
	    }

	    if( params ){
	      url += (/\?/.test(url) ? '&' : '?') + params;
	    }

	    return	url;
	  }


	  function _makeFlashImage(opts, base64, fn){
	    let
				  key
	      ; const flashId = api.uid()
	      ; let el = document.createElement('div')
	      ; let attempts = 10
			;

	    for( key in opts ){
	      el.setAttribute(key, opts[key]);
	      el[key] = opts[key];
	    }

	    _css(el, opts);

	    opts.width	= '100%';
	    opts.height	= '100%';

	    el.innerHTML = _makeFlashHTML(api.extend({
				  id: flashId
	      , src: _getUrl(api.flashImageUrl, `r=${ api.uid()}`)
	      , wmode: 'opaque'
	      , flashvars: `scale=${ opts.scale }&callback=${_wrap(function _(){
	        _unwrap(_);
	        if( --attempts > 0 ){
	          _setImage();
	        }
	        return true;
	      })}`
	    }, opts));

	    function _setImage(){
	      try {
	        // Get flash-object by id
	        const img = flash.get(flashId);
	        img.setImage(base64);
	      } catch (e){
	        api.log('[err] FlashAPI.Preview.setImage -- can not set "base64":', e);
	      }
	    }

	    fn(false, el);
	    el = null;
	  }


	  function _getFileDescr(file){
	    return	{
				  id: file.id
	      , name: file.name
	      , matrix: file.matrix
	      , flashId: file.flashId
	    };
	  }


	  function _getDimensions(el){
	    const
				  box = el.getBoundingClientRect()
	      ; const {body} = document
	      ; const docEl = (el && el.ownerDocument).documentElement
			;
			
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
			
	    return {
				  top:		getOffset(el).top
	      , left:		getOffset(el).left
	      , width:	el.offsetWidth
	      , height:	el.offsetHeight
	    };
	  }

	  // @export
	  api.Flash = flash;


	  // Check dataURI support
	  api.newImage('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', (err, img)=> {
	    api.support.dataURI = !(img.width != 1 || img.height != 1);
	    flash.init();
	  });
	})();
})(window, window.jQuery, FileAPI);

/**
 * FileAPI fallback to Flash
 *
 * @flash-developer  "Vladimir Demidov" <v.demidov@corp.mail.ru>
 */

/* global window, FileAPI */
(function (window, jQuery, api) {
  

  const _each = api.each;
  let _cameraQueue = [];


  if (api.support.flash && (api.media && !api.support.media)) {
    (function () {

      function _wrap(fn) {
        const id = fn.wid = api.uid();
        api.Flash._fn[id] = fn;
        return `FileAPI.Flash._fn.${  id}`;
      }


      function _unwrap(fn) {
        try {
          api.Flash._fn[fn.wid] = null;
          delete api.Flash._fn[fn.wid];
        } catch (e) {
        }
      }

      const flash = api.Flash;
      api.extend(api.Flash, {

        patchCamera () {
          api.Camera.fallback = function (el, options, callback) {
            const camId = api.uid();
            api.log(`FlashAPI.Camera.publish: ${  camId}`);
            flash.publish(el, camId, api.extend(options, {
              camera: true,
              onEvent: _wrap(function _(evt) {
                if (evt.type === 'camera') {
                  _unwrap(_);

                  if (evt.error) {
                    api.log(`FlashAPI.Camera.publish.error: ${  evt.error}`);
                    callback(evt.error);
                  } else {
                    api.log(`FlashAPI.Camera.publish.success: ${  camId}`);
                    callback(null);
                  }
                }
              })
            }));
          };
          // Run
          _each(_cameraQueue, (args) => {
            api.Camera.fallback.apply(api.Camera, args);
          });
          _cameraQueue = [];


          // FileAPI.Camera:proto
          api.extend(api.Camera.prototype, {
            _id () {
              return this.video.id;
            },

            start (callback) {
              const _this = this;
              flash.cmd(this._id(), 'camera.on', {
                callback: _wrap(function _(evt) {
                  _unwrap(_);

                  if (evt.error) {
                    api.log(`FlashAPI.camera.on.error: ${  evt.error}`);
                    callback(evt.error, _this);
                  } else {
                    api.log(`FlashAPI.camera.on.success: ${  _this._id()}`);
                    _this._active = true;
                    callback(null, _this);
                  }
                })
              });
            },

            stop () {
              this._active = false;
              flash.cmd(this._id(), 'camera.off');
            },

            shot () {
              api.log('FlashAPI.Camera.shot:', this._id());

              const shot = api.Flash.cmd(this._id(), 'shot', {});
              shot.type = 'image/png';
              shot.flashId = this._id();
              shot.isShot = true;

              return new api.Camera.Shot(shot);
            }
          });
        }
      });

      api.Camera.fallback = function () {
        _cameraQueue.push(arguments);
      };

    }());
  }
}(window, window.jQuery, FileAPI));
if( typeof define === "function" && define.amd ){ define("FileAPI", [], ()=> FileAPI); }