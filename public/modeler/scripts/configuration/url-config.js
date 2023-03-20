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
var FLOWABLE = FLOWABLE || {};

/*
 * Contains methods to retrieve the (mostly) base urls of the different end points.
 * Two of the methods #getImageUrl and #getModelThumbnailUrl are exposed in the $rootScope for usage in the HTML views.
 */
FLOWABLE.APP_URL = {

  /* ACCOUNT URLS */

  getAccountUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/account`;
  },

  getLogoutUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/logout`;
  },

  /* MODEL URLS */

  getModelsUrl (query) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models${  query || ""}`;
  },

  getModelUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId}`;
  },

  getModelModelJsonUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId  }/model-json`;
  },

  getModelBpmn20ExportUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId  }/bpmn20?version=${  Date.now()}`;
  },

  getCloneModelsUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId  }/clone`;
  },

  getModelHistoriesUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId  }/history`;
  },

  getModelHistoryUrl (modelId, modelHistoryId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId  }/history/${  modelHistoryId}`;
  },

  getModelHistoryModelJsonUrl (modelId, modelHistoryId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId  }/history/${  modelHistoryId  }/model-json`;
  },

  getModelHistoryBpmn20ExportUrl (modelId, modelHistoryId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId  }/history/${  modelHistoryId  }/bpmn20?version=${  Date.now()}`;
  },

  getCmmnModelDownloadUrl (modelId, modelHistoryId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId  }${modelHistoryId ? `/history/${  modelHistoryId}` : ''  }/cmmn?version=${  Date.now()}`;
  },

  getModelParentRelationsUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId  }/parent-relations`;
  },

  /* APP DEFINITION URLS  */

  getAppDefinitionImportUrl (renewIdmIds) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/app-definitions/import?renewIdmEntries=${  renewIdmIds}`;
  },

  getAppDefinitionTextImportUrl (renewIdmIds) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/app-definitions/text/import?renewIdmEntries=${  renewIdmIds}`;
  },

  getAppDefinitionUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/app-definitions/${  modelId}`;
  },

  getAppDefinitionModelImportUrl (modelId, renewIdmIds) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/app-definitions/${  modelId  }/import?renewIdmEntries=${  renewIdmIds}`;
  },

  getAppDefinitionModelTextImportUrl (modelId, renewIdmIds) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/app-definitions/${  modelId  }/text/import?renewIdmEntries=${  renewIdmIds}`;
  },

  getAppDefinitionPublishUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/app-definitions/${  modelId  }/publish`;
  },

  getAppDefinitionExportUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/app-definitions/${  modelId  }/export?version=${  Date.now()}`;
  },

  getAppDefinitionBarExportUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/app-definitions/${  modelId  }/export-bar?version=${  Date.now()}`;
  },

  getAppDefinitionHistoryUrl (modelId, historyModelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/app-definitions/${  modelId  }/history/${  historyModelId}`;
  },

  getModelsForAppDefinitionUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models-for-app-definition`;
  },

  getCmmnModelsForAppDefinitionUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/cmmn-models-for-app-definition`;
  },

  /* PROCESS INSTANCE URLS */

  getProcessInstanceModelJsonUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/process-instances/${  modelId  }/model-json`;
  },

  getProcessInstanceModelJsonHistoryUrl (historyModelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/process-instances/history/${  historyModelId  }/model-json`;
  },

  /* PROCESS DEFINITION URLS */

  getProcessDefinitionModelJsonUrl (processDefinitionId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/process-definitions/${  processDefinitionId  }/model-json`;
  },

  /* PROCESS MODEL URLS */

  getImportProcessModelUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/import-process-model`;
  },

  getImportProcessModelTextUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/import-process-model/text`;
  },

  /* DECISION TABLE URLS */

  getDecisionTableModelsUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/decision-table-models`;
  },

  getDecisionTableImportUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/decision-table-models/import-decision-table`;
  },

  getDecisionTableTextImportUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/decision-table-models/import-decision-table-text`;
  },

  getDecisionTableModelUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/decision-table-models/${  modelId}`;
  },

  getDecisionTableModelValuesUrl (query) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/decision-table-models/values?${  query}`;
  },

  getDecisionTableModelsHistoryUrl (modelHistoryId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/decision-table-models/history/${  modelHistoryId}`;
  },

  getDecisionTableModelHistoryUrl (modelId, modelHistoryId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/decision-table-models/${  modelId  }/history/${  modelHistoryId}`;
  },

  /* FORM MODEL URLS */

  getFormModelsUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/form-models`;
  },

  getFormModelValuesUrl (query) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/form-models/values?${  query}`;
  },

  getFormModelUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/form-models/${  modelId}`;
  },

  getFormModelHistoryUrl (modelId, modelHistoryId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/form-models/${  modelId  }/history/${  modelHistoryId}`;
  },

  /* CASE MODEL URLS */

  getCaseModelsUrl (query) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/case-models${  query || ""}`;
  },

  getCaseModelImportUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/import-case-model`;
  },

  getCaseModelTextImportUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/import-case-model/text`;
  },

  getCaseInstancesHistoryModelJsonUrl (modelHistoryId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/case-instances/history/${  modelHistoryId  }/model-json`;
  },

  getCaseInstancesModelJsonUrl (modelId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/case-instances/${  modelId  }/model-json`;
  },

  getCaseDefinitionModelJsonUrl (caseDefinitionId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/case-definitions/${  caseDefinitionId  }/model-json`;
  },

  /* IMAGE URLS (exposed in rootscope in app.js */

  getImageUrl (imageId) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/image/${  imageId}`;
  },

  getModelThumbnailUrl (modelId, version) {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/models/${  modelId  }/thumbnail${  version ? `?version=${  version}` : ""}`;
  },

  /* OTHER URLS */

  getEditorUsersUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/editor-users`;
  },

  getEditorGroupsUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/editor-groups`;
  },

  getAboutInfoUrl () {
    return `${FLOWABLE.CONFIG.contextRoot  }/app/rest/about-info`;
  }

};
