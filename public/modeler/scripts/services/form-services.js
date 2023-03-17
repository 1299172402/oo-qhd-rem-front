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



// Form service
angular.module('flowableModeler').service('FormBuilderService', ['$http', '$q', '$rootScope', '$translate',
  function ($http, $q, $rootScope, $translate) {

    // Removes all properties starting with '_', used before json serialization
    function removePrivateFields(fields) {
      fields.forEach((field, i)=> {
        for (const attr in field) {
          if (attr.indexOf('_') === 0) {
            delete field[attr];
          }
        }
        if (field.fields) {
          for (const fieldsName in field.fields) {
            removePrivateFields(field.fields[fieldsName]);
          }
        }
      });
      return fields;
    }

    /**
         * Remove the given step from the given container.
         */
    this.saveForm = function (data, name, formKey, description, saveCallback, errorCallback) {

      let fieldIndex = 0;
      data.formRepresentation = $rootScope.currentForm;
      data.formRepresentation.name = name;
      data.formRepresentation.key = formKey;

      if (description && description.length > 0) {
        data.formRepresentation.description = description;
      }
      for (let i = 0; i < $rootScope.formItems.length; i++) {
        const field = $rootScope.formItems[i];
        this._cleanFormField(field, fieldIndex++);
      }

      const currentActiveTab = $rootScope.formBuilder.activeTab;
      if (currentActiveTab != 'design') {
        $rootScope.formBuilder.activeTab = 'design';
      }

      data.formRepresentation.formDefinition = {
            	name,
            	key: formKey,
            	fields: removePrivateFields(angular.copy($rootScope.formItems)), 
            	outcomes: $rootScope.currentOutcomes
      };

      html2canvas(jQuery('#canvasSection'), {
        onrendered (canvas) {
          const scale = canvas.width / 300.0;
          const extra_canvas = document.createElement("canvas");
          extra_canvas.setAttribute('width', 300);
          extra_canvas.setAttribute('height', canvas.height / scale);
          const ctx = extra_canvas.getContext('2d');
          ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 300, canvas.height / scale);
          data.formImageBase64 = extra_canvas.toDataURL("image/png");

          $http({method: 'PUT', url: FLOWABLE.APP_URL.getFormModelUrl($rootScope.currentForm.id), data}).
            success((response, status, headers, config) => {

              if (saveCallback) {
                saveCallback();
              }
            }).
            error((response, status, headers, config) => {
              if (errorCallback) {
                errorCallback(response);
              }
            });

          if (currentActiveTab != 'design') {
            $rootScope.formBuilder.activeTab = currentActiveTab;
          }
        }
      });
    };
        
    this._cleanFormField = function(field, fieldIndex) {
      if (!field.overrideId) {
        let fieldId;
        if (field.name && field.name.length > 0) {
          fieldId = field.name.toLowerCase();
          fieldId = fieldId.replace(new RegExp(' ', 'g'), '');
          fieldId = fieldId.replace(/[&\/\\#,+~%.'":*?!<>{}()$@;]/g, '');
        } else {
          fieldId = `field${  fieldIndex}`;
        }
        field.id = fieldId;
      }
    };

    /**
         * Updates the form cache for a specific step
         * @param {String} stepId
         * @param {Object} formDefinition
         */
    this.updateFormsCache = function (stepId, formDefinition) {
      if (stepId) {
        if (formDefinition && formDefinition.id) {
          _updateFormCache(stepId, formDefinition.id);
        } else {
          _updateFormCache(stepId);
        }
      }
    };

    /**
         * Fetches forms from cache up to the given step (and not after)
         * @param {Array} steps all steps in sequential order
         * @param {String} stepId the current step
         * @return {Array} flattened list of all forms up to given step
         */
    this.getFormsForStep = function (steps, stepId) {
      const forms = [];

      if (stepId !== '__startform') {
        // check start for start form
        forms.push(_getFormForStep('__startform'));

        if (stepId && steps && steps.length > 0) {
          for (let i = 0; i < steps.length; i++) {
            if (steps[i].id != stepId) {
              forms.push(_getFormForStep(steps[i].id));
            } else {
              break;
            }
          }
        }
      }

      // only unique forms
      const uniqueIds = [];
      const uniqueForms = [];

      forms.forEach((item) => {
        if (item && item.id) {
          if (uniqueIds.indexOf(item.id) < 0) {
            uniqueIds.push(item.id);
            uniqueForms.push(item);
          }
        }
      });

      uniqueForms.sort((a,b)=> a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);

      return uniqueForms;
    };

    /**
         * Fetches form outcomes from cache for specific form
         * @param {String} formId
         * @return {Array} flattened list of all form outcomes
         */
    this.getFormOutcomesForForm = function (formId) {
      let outcomes = [];
      if (formId) {
        outcomes = _getFormOutcomesForForm(formId);
      }

      outcomes.sort((a,b)=> a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);

      return outcomes;
    };

    /**
         * Fetches form fields from cache for specific form
         * @param {String} formId
         * @return {Array} flattened list of all form form fields
         */
    this.getFormFieldsForForm = function (formId) {
      let formFields = [];
      if (formId) {
        formFields = _getFormFieldsForForm(formId);
      }
      return formFields;
    };

    var _updateFormCache = function (stepId, formId) {
      if (stepId && formId) {
        $http({method: 'GET', url: FLOWABLE.APP_URL.getFormModelUrl(formId)}).
          success((response) => {
            if (response) {
              let outcomes;
              let formFields;
              if (response.formDefinition) {
                if (response.formDefinition.fields) {
                  formFields = response.formDefinition.fields;
                }

                if (response.formDefinition.outcomes) {
                  outcomes = response.formDefinition.outcomes;
                }
              }
              const filteredFormFields = _filterFormFields(formFields);
              const formFieldInfo = {id: response.id, name: response.name, description: response.description, outcomes, fields: filteredFormFields};
              _addFormFieldsForStepToCache(stepId, formFieldInfo);
            }
          });
      }
      if (stepId && !formId) {
        _deleteFormFieldsForStepFromCache(stepId);
      }
    };

    const _getFormDefinitions = function (formIds, callback) {

      if (formIds.length > 0) {

        let formIdParams = '';
        for (let i = 0; i < formIds.length; i++) {
          if (formIdParams.length > 0) {
            formIdParams += '&';
          }
          formIdParams += `formId=${  formIds[i]}`;
        }
        if (formIdParams.length > 0) {
          formIdParams += '&';
        }
        formIdParams += `version=${  Date.now()}`;

        $http({method: 'GET', url: FLOWABLE.APP_URL.getFormModelValuesUrl(formIdParams)}).
          success((data) => {
            if (callback) {
              callback(data);
            }
          }).

          error((data) => {
            console.log(`Something went wrong when fetching form values:${  JSON.stringify(data)}`);
          });
      }
    };
  }
]);
