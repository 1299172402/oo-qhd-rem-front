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
  .controller('FormToolbarController', ['$scope', '$http', '$modal', '$q', '$rootScope', '$translate', '$location', 'FormBuilderService', function ($scope, $http, $modal, $q, $rootScope, $translate, $location, FormBuilderService) {

    	const toolbarItems = FORM_TOOLBAR_CONFIG.items;
    $scope.items = [];
        
    for (let i = 0; i < toolbarItems.length; i++)
    {
        	$scope.items.push(toolbarItems[i]);
    }
        
    $scope.secondaryItems = FORM_TOOLBAR_CONFIG.secondaryItems;

    // Call configurable click handler (From http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string)
    const executeFunctionByName = function(functionName, context /* , args */) {
      const args = Array.prototype.slice.call(arguments).splice(2);
      const namespaces = functionName.split(".");
      const func = namespaces.pop();
      for(let i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
      }
      return context[func].apply(this, args);
    };

    // Click handler for toolbar buttons
    $scope.toolbarButtonClicked = function(buttonIndex) {

      // Default behaviour
      const buttonClicked = $scope.items[buttonIndex];
      const services = { '$scope' : $scope, '$rootScope' : $rootScope, '$http' : $http, '$modal' : $modal, '$q' : $q, '$translate' : $translate, 'FormBuilderService': FormBuilderService};
      executeFunctionByName(buttonClicked.action, window, services);
    };
        
    // Click handler for secondary toolbar buttons
    $scope.toolbarSecondaryButtonClicked = function(buttonIndex) {
      const buttonClicked = $scope.secondaryItems[buttonIndex];
      const services = { '$scope' : $scope, '$rootScope' : $rootScope, '$http' : $http, '$modal' : $modal, '$q' : $q, '$translate' : $translate, '$location': $location, 'FormBuilderService': FormBuilderService};
      executeFunctionByName(buttonClicked.action, window, services);
    };
  }]);