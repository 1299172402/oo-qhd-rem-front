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

/*
 * Input parameters for call activity
 */

angular.module('flowableModeler').controller('FlowableOutParametersCtrl',
  ['$scope', '$modal', '$timeout', '$translate', function ($scope, $modal, $timeout, $translate) {

    // Config for the modal window
    const opts = {
      template: `editor-app/configuration/properties/out-parameters-popup.html?version=${  Date.now()}`,
      scope: $scope
    };

    // Open the dialog
    _internalCreateModal(opts, $modal, $scope);
  }]);

angular.module('flowableModeler').controller('FlowableOutParametersPopupCtrl',
  ['$scope', '$q', '$translate', '$timeout', function ($scope, $q, $translate, $timeout) {

    // Put json representing form properties on scope
    if ($scope.property.value !== undefined && $scope.property.value !== null
            && $scope.property.value.outParameters !== undefined
            && $scope.property.value.outParameters !== null) {
      // Note that we clone the json object rather then setting it directly,
      // this to cope with the fact that the user can click the cancel button and no changes should have happened
      $scope.parameters = angular.copy($scope.property.value.outParameters);
    } else {
      $scope.parameters = [];
    }

    $scope.translationsRetrieved = false;
    $scope.labels = {};

    const sourcePromise = $translate('PROPERTY.PARAMETER.SOURCE');
    const sourceExpressionPromise = $translate('PROPERTY.PARAMETER.SOURCEEXPRESSION');
    const targetPromise = $translate('PROPERTY.PARAMETER.TARGET');
    const targetExpressionPromise = $translate('PROPERTY.PARAMETER.TARGETEXPRESSION');

    $q.all([sourcePromise, sourceExpressionPromise, targetPromise, targetExpressionPromise]).then((results) => {
      $scope.labels.sourceLabel = results[0];
      $scope.labels.sourceExpressionLabel = results[1];
      $scope.labels.targetLabel = results[2];
      $scope.labels.targetExpressionLabel = results[3];
      $scope.translationsRetrieved = true;

      // Config for grid
      $scope.gridOptions = {
        data: $scope.parameters,
        headerRowHeight: 28,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        enableHorizontalScrollbar: 0,
        enableColumnMenus: false,
        enableSorting: false,
        columnDefs: [{field: 'source', displayName: $scope.labels.sourceLabel},
          {field: 'sourceExpression', displayName: $scope.labels.sourceExpressionLabel},
          {field: 'target', displayName: $scope.labels.targetLabel},
          {field: 'targetExpression', displayName: $scope.labels.targetExpressionLabel}]
      };

      $scope.gridOptions.onRegisterApi = function (gridApi) {
        // set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, (row) => {
          $scope.selectedParameter = row.entity;
        });
      };
    });

    // Click handler for add button
    $scope.addNewParameter = function () {
      const newParameter = {
        source: '',
        sourceExpression: '',
        target: '',
        targetExpression: ''};

      $scope.parameters.push(newParameter);
      $timeout(() => {
        $scope.gridApi.selection.toggleRowSelection(newParameter);
      });
    };

    // Click handler for remove button
    $scope.removeParameter = function () {
      const selectedItems = $scope.gridApi.selection.getSelectedRows();
      if (selectedItems && selectedItems.length > 0) {
        const index = $scope.parameters.indexOf(selectedItems[0]);
        $scope.gridApi.selection.toggleRowSelection(selectedItems[0]);
        $scope.parameters.splice(index, 1);

        if ($scope.parameters.length == 0) {
          $scope.selectedParameter = undefined;
        }

        $timeout(() => {
          if ($scope.parameters.length > 0) {
            $scope.gridApi.selection.toggleRowSelection($scope.parameters[0]);
          }
        });
      }
    };

    // Click handler for up button
    $scope.moveParameterUp = function () {
      const selectedItems = $scope.gridApi.selection.getSelectedRows();
      if (selectedItems && selectedItems.length > 0) {
        const index = $scope.parameters.indexOf(selectedItems[0]);
        if (index != 0) { // If it's the first, no moving up of course
          const temp = $scope.parameters[index];
          $scope.parameters.splice(index, 1);
          $timeout(() => {
            $scope.parameters.splice(index + -1, 0, temp);
            $timeout(() => {
              $scope.gridApi.selection.toggleRowSelection(temp);
            });
          });
        }
      }
    };

    // Click handler for down button
    $scope.moveParameterDown = function () {
      const selectedItems = $scope.gridApi.selection.getSelectedRows();
      if (selectedItems && selectedItems.length > 0) {
        const index = $scope.parameters.indexOf(selectedItems[0]);
        if (index != $scope.parameters.length - 1) { // If it's the last element, no moving down of course
          const temp = $scope.parameters[index];
          $scope.parameters.splice(index, 1);
          $timeout(() => {
            $scope.parameters.splice(index + 1, 0, temp);
            $timeout(() => {
              $scope.gridApi.selection.toggleRowSelection(temp);
            });
          });
        }
      }
    };

    // Click handler for save button
    $scope.save = function () {

      if ($scope.parameters.length > 0) {
        $scope.property.value = {};
        $scope.property.value.outParameters = $scope.parameters;
      } else {
        $scope.property.value = null;
      }

      $scope.updatePropertyInModel($scope.property);
      $scope.close();
    };

    $scope.cancel = function () {
      $scope.close();
    };

    // Close button handler
    $scope.close = function () {
      $scope.property.mode = 'read';
      $scope.$hide();
    };

  }]);