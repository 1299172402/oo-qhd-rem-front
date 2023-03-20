/* Copyright 2005-2015 Alfresco Software, Ltd.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var FLOWABLE = FLOWABLE || {};

const pathname = window.location.pathname.replace(/^(\/[^\/]*)(\/.*)?$/, '$1').replace(/\/$/, '');

const FtId = window.location.href.substring(window.location.href.indexOf('=') + 1, window.location.href.length)

FLOWABLE.CONFIG = {
  'onPremise' : true,
  'contextRoot' : localStorage.getItem("contextRoot"),
  'webContextRoot' : `${window.origin  }/modeler`,
  'datesLocalization' : false,
  'loginPage' : "/login.html",
  'FtId' : FtId
};
