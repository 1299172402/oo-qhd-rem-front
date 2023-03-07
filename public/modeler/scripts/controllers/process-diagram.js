/* Licensed under the Apache License, Version 2.0 (the "License");
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
angular.module('flowableModeler')
  .controller('ProcessDiagramCtrl', ['$rootScope', '$scope', '$translate', '$http', '$location', '$routeParams','$modal', '$popover', '$timeout', 'appResourceRoot', 'ResourceService',
                              function ($rootScope, $scope, $translate, $http, $location, $routeParams, $modal, $popover, $timeout, appResourceRoot, ResourceService) {

    // Main page (needed for visual indicator of current page)
    $rootScope.setMainPageById('processes');

    // Initialize model
    $scope.model = {
        // Store the main model id, this points to the current version of a model,
        // even when we're showing history
        latestModelId: $routeParams.modelId
    };
    
    $scope.loadProcess = function() {
        $scope.model.process = {id : $routeParams.modelId};

        $rootScope.$on('$routeChangeStart', function(event, next, current) {
          jQuery('.qtip').qtip('destroy', true);
        });

        $timeout(function() {
        jQuery("#bpmnModel").attr('data-model-id', $routeParams.modelId);
        jQuery("#bpmnModel").attr('data-model-type', 'design');

        var viewerUrl = appResourceRoot + "display/displaymodel.html?version=" + Date.now();

        // If Flowable has been deployed inside an AMD environment Raphael will fail to register
        // itself globally until displaymodel.js (which depends ona global Raphale variable) is running,
        // therefore remove AMD's define method until we have loaded in Raphael and displaymodel.js
        // and assume/hope its not used during.
        var amdDefine = window.define;
        window.define = undefined;
        ResourceService.loadFromHtml(viewerUrl, function(){
            // Restore AMD's define method again
            window.define = amdDefine;
        });
        });
    };
    
    $scope.loadProcess();
}]);
