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
  .controller('FormReadonlyViewController', ['$rootScope', '$scope', '$translate', '$http', '$timeout', '$location', '$modal', '$routeParams', '$popover',
    function ($rootScope, $scope, $translate, $http, $timeout, $location, $modal, $routeParams, $popover) {

      // Main page (needed for visual indicator of current page)
      $rootScope.setMainPageById('forms');
      
      let guidSequence = 0;
      
      function setFieldDragDropAttributes (field, prefix) {
        if (!field._guid) {
          field._guid = prefix + guidSequence++;
        }
          
        if (!field._width) {
          field._width = 1;
        }
      }

      if ($routeParams.modelId) {

        let url;
        if ($routeParams.modelHistoryId) {
          url = FLOWABLE.APP_URL.getFormModelHistoryUrl($routeParams.modelId,$routeParams.modelHistoryId);
        } else {
          url = FLOWABLE.APP_URL.getFormModelUrl($routeParams.modelId);
        }

        $http({method: 'GET', url}).
          success((response, status, headers, config) => {
            if (response.formDefinition.fields) {
              for (let i = 0; i < response.formDefinition.fields.length; i++) {
                const field = response.formDefinition.fields[i];
                if (!field.params) {
                  field.params = {};
                }
                setFieldDragDropAttributes(field, 'savedField');
              }

              $scope.formElements = response.formDefinition.fields;
            } else {
              $scope.formElements = [];
            }
            
            $scope.formItems = $scope.formElements;
                  
            $timeout(() => {
              // Flip switch in timeout to start watching all form-related models
              // after next digest cycle, to prevent first false-positive
              $scope.formLoaded = true;
            }, 200);
          }).
          error((response, status, headers, config) => {
            $scope.model.loading = false;
          });
          
      } else {
        $scope.formLoaded = true;
      }

    }]);
