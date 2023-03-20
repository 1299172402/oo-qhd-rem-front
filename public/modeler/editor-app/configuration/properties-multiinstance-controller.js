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

angular.module('flowableModeler').controller('FlowableMultiInstanceCtrl', [ '$scope', function($scope) {

  if ($scope.property.value == undefined && $scope.property.value == null)
  {
    	$scope.property.value = 'None';
  }
        
  $scope.multiInstanceChanged = function() {
    	$scope.updatePropertyInModel($scope.property);

    	// 扩展逻辑如果是多实例设置多实例的集合和变量
    $scope.updatePropertyInModel({key: "multiinstance_cardinality", value: "", mode: null});
    	if ($scope.property.value !== "None" ) {
      $scope.updatePropertyInModel({key: "multiinstance_collection", value: "${flow_multi_assigns}", mode: null});
      $scope.updatePropertyInModel({key: "multiinstance_variable", value: "flow_multi_assign", mode: null});
    } else {
      $scope.updatePropertyInModel({key: "multiinstance_collection", value: "", mode: null});
      $scope.updatePropertyInModel({key: "multiinstance_collection", value: "", mode: null});
    }
  };
}]);