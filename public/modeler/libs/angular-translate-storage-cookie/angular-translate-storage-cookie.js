/*!
 * angular-translate - v2.15.1 - 2017-03-04
 * 
 * Copyright (c) 2017 The angular-translate team, Pascal Precht; Licensed MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], () => (factory()));
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    factory();
  }
}(this, () => {

  $translateCookieStorageFactory.$inject = ['$injector'];
  angular.module('pascalprecht.translate')

  /**
 * @ngdoc object
 * @name pascalprecht.translate.$translateCookieStorage
 * @requires $cookieStore
 *
 * @description
 * Abstraction layer for cookieStore. This service is used when telling angular-translate
 * to use cookieStore as storage.
 *
 */
    .factory('$translateCookieStorage', $translateCookieStorageFactory);

  function $translateCookieStorageFactory($injector) {

    

    // Since AngularJS 1.4, $cookieStore is deprecated
    let delegate;
    if (angular.version.major === 1 && angular.version.minor >= 4) {
      const $cookies = $injector.get('$cookies');
      delegate = {
        get (key) {
          return $cookies.get(key);
        },
        put (key, value) {
          $cookies.put(key, value);
        }
      };
    } else {
      const $cookieStore = $injector.get('$cookieStore');
      delegate = {
        get (key) {
          return $cookieStore.get(key);
        },
        put (key, value) {
          $cookieStore.put(key, value);
        }
      };
    }

    const $translateCookieStorage = {

      /**
     * @ngdoc function
     * @name pascalprecht.translate.$translateCookieStorage#get
     * @methodOf pascalprecht.translate.$translateCookieStorage
     *
     * @description
     * Returns an item from cookieStorage by given name.
     *
     * @param {string} name Item name
     * @return {string} Value of item name
     */
      get (name) {
        return delegate.get(name);
      },

      /**
     * @ngdoc function
     * @name pascalprecht.translate.$translateCookieStorage#set
     * @methodOf pascalprecht.translate.$translateCookieStorage
     *
     * @description
     * Sets an item in cookieStorage by given name.
     *
     * @deprecated use #put
     *
     * @param {string} name Item name
     * @param {string} value Item value
     */
      set (name, value) {
        delegate.put(name, value);
      },

      /**
     * @ngdoc function
     * @name pascalprecht.translate.$translateCookieStorage#put
     * @methodOf pascalprecht.translate.$translateCookieStorage
     *
     * @description
     * Sets an item in cookieStorage by given name.
     *
     * @param {string} name Item name
     * @param {string} value Item value
     */
      put (name, value) {
        delegate.put(name, value);
      }
    };

    return $translateCookieStorage;
  }

  $translateCookieStorageFactory.displayName = '$translateCookieStorage';
  return 'pascalprecht.translate';

}));
