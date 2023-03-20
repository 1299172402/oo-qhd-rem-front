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



/**
 * General bootstrap of the application.
 */
angular.module('flowableModeler')
  .controller('EditorController', ['$rootScope', '$scope', '$http', '$q', '$routeParams', '$timeout', '$location', '$translate', '$modal', 'editorManager', 'FormBuilderService',
    function ($rootScope, $scope, $http, $q, $routeParams, $timeout, $location, $translate, $modal, editorManager, FormBuilderService) {

      $rootScope.editorFactory = $q.defer();

      $rootScope.forceSelectionRefresh = false;

      $rootScope.ignoreChanges = false; // by default never ignore changes
    
      $rootScope.validationErrors = [];

      $rootScope.staticIncludeVersion = Date.now();

      /**
     * Initialize the event bus: couple all Oryx events with a dispatch of the
     * event of the event bus. This way, it gets much easier to attach custom logic
     * to any event.
     */


      /* Helper method to fetch model from server (always needed) */
      function fetchModel() {

        let modelUrl;
        if ($routeParams.modelId) {
          modelUrl = FLOWABLE.URL.getModel($routeParams.modelId);
        } else {
          modelUrl = FLOWABLE.URL.newModelInfo();
        }

        $http({method: 'GET', url: modelUrl}).
          success((data, status, headers, config) => {
            $rootScope.editor = new ORYX.Editor(data);
            $rootScope.modelData = angular.fromJson(data);
            $rootScope.editorFactory.resolve();
          }).
          error((data, status, headers, config) => {
            $location.path("/processes/");
          });
      }


      function initScrollHandling() {
        const canvasSection = jQuery('#canvasSection');
        canvasSection.scroll(() => {

          // Hides the resizer and quick menu items during scrolling

          const selectedElements = editorManager.getSelection();
          const subSelectionElements = editorManager.getSubSelection();

          $scope.selectedElements = selectedElements;
          $scope.subSelectionElements = subSelectionElements;
          if (selectedElements && selectedElements.length > 0)
          {
            	$rootScope.selectedElementBeforeScrolling = selectedElements[0];
          }

          jQuery('.Oryx_button').each((i, obj) => {
            $scope.orginalOryxButtonStyle = obj.style.display;
            obj.style.display = 'none';
          });
          jQuery('.resizer_southeast').each((i, obj) => {
            $scope.orginalResizerSEStyle = obj.style.display;
            obj.style.display = 'none';
          });
          jQuery('.resizer_northwest').each((i, obj) => {
            $scope.orginalResizerNWStyle = obj.style.display;
            obj.style.display = 'none';
          });
          editorManager.handleEvents({type:ORYX.CONFIG.EVENT_CANVAS_SCROLL});
        });

        canvasSection.scrollStopped(()=> {

          // Puts the quick menu items and resizer back when scroll is stopped.

          editorManager.setSelection([]); // needed cause it checks for element changes and does nothing if the elements are the same
          editorManager.setSelection($scope.selectedElements, $scope.subSelectionElements);
          $scope.selectedElements = undefined;
          $scope.subSelectionElements = undefined;

          function handleDisplayProperty(obj) {
            if (jQuery(obj).position().top > 0) {
              obj.style.display = 'block';
            } else {
              obj.style.display = 'none';
            }
          }

          jQuery('.Oryx_button').each((i, obj) => {
            handleDisplayProperty(obj);
          });
          jQuery('.resizer_southeast').each((i, obj) => {
            handleDisplayProperty(obj);
          });
          jQuery('.resizer_northwest').each((i, obj) => {
            handleDisplayProperty(obj);
          });

        });
      }

      /**
     * Initialize the Oryx Editor when the content has been loaded
     */
      if (!$rootScope.editorInitialized) {
    
        const paletteHelpWrapper = jQuery('#paletteHelpWrapper');
        const paletteSectionFooter = jQuery('#paletteSectionFooter');
        const paletteSectionOpen = jQuery('#paletteSectionOpen');
        const contentCanvasWrapper = jQuery('#contentCanvasWrapper');

        paletteSectionFooter.on('click', () => {
          paletteHelpWrapper.addClass('close');
          contentCanvasWrapper.addClass('collapsedCanvasWrapper');
          paletteSectionOpen.removeClass('hidden');
        });

        paletteSectionOpen.on('click', () => {
          paletteHelpWrapper.removeClass('close');
          contentCanvasWrapper.removeClass('collapsedCanvasWrapper');
          paletteSectionOpen.addClass('hidden');
        });

        /**
         * A 'safer' apply that avoids concurrent updates (which $apply allows).
         */
        $rootScope.safeApply = function(fn) {
        	if (this.$root) {
	            const phase = this.$root.$$phase;
	            if(phase == '$apply' || phase == '$digest') {
	                if(fn && (typeof(fn) === 'function')) {
	                    fn();
	                }
	            } else {
	                this.$apply(fn);
	            }
	            
        	} else {
            this.$apply(fn);
          }
        };
        
        $rootScope.addHistoryItem = function(resourceId) {
        	const modelMetaData = editorManager.getBaseModelData();
        	
        	const historyItem = {
            id: modelMetaData.modelId, 
            name: modelMetaData.name,
            key: modelMetaData.key,
            stepId: resourceId,
            type: 'bpmnmodel'
          };
        	
        	if (editorManager.getCurrentModelId() != editorManager.getModelId()) {
            historyItem.subProcessId = editorManager.getCurrentModelId();
          }
        	
        	$rootScope.editorHistory.push(historyItem);
        };
        
        $rootScope.getStencilSetName = function() {
          const modelMetaData = editorManager.getBaseModelData();
          if (modelMetaData.model.stencilset.namespace == 'http://b3mn.org/stencilset/cmmn1.1#') {
            return 'cmmn1.1';
          } 
          return 'bpmn2.0';
            
        };

        /**
         * Initialize the event bus: couple all Oryx events with a dispatch of the
         * event of the event bus. This way, it gets much easier to attach custom logic
         * to any event.
         */

        $rootScope.editorFactory.promise.then(() => {

          $rootScope.formItems = undefined;

          FLOWABLE.eventBus.editor = $rootScope.editor;

          const eventMappings = [
            { oryxType : ORYX.CONFIG.EVENT_SELECTION_CHANGED, flowableType : FLOWABLE.eventBus.EVENT_TYPE_SELECTION_CHANGE },
            { oryxType : ORYX.CONFIG.EVENT_DBLCLICK, flowableType : FLOWABLE.eventBus.EVENT_TYPE_DOUBLE_CLICK },
            { oryxType : ORYX.CONFIG.EVENT_MOUSEOUT, flowableType : FLOWABLE.eventBus.EVENT_TYPE_MOUSE_OUT },
            { oryxType : ORYX.CONFIG.EVENT_MOUSEOVER, flowableType : FLOWABLE.eventBus.EVENT_TYPE_MOUSE_OVER },
            { oryxType: ORYX.CONFIG.EVENT_EDITOR_INIT_COMPLETED, flowableType:FLOWABLE.eventBus.EVENT_TYPE_EDITOR_READY},
            { oryxType: ORYX.CONFIG.EVENT_PROPERTY_CHANGED, flowableType: FLOWABLE.eventBus.EVENT_TYPE_PROPERTY_VALUE_CHANGED}

          ];

          eventMappings.forEach((eventMapping) => {
            editorManager.registerOnEvent(eventMapping.oryxType, (event) => {
              FLOWABLE.eventBus.dispatch(eventMapping.flowableType, event);
            });
          });

          // Show getting started if this is the first time (boolean true for use local storage)
          // FLOWABLE_EDITOR_TOUR.gettingStarted($scope, $translate, $q, true);
        });

        // Hook in resizing of main panels when window resizes
        // TODO: perhaps move to a separate JS-file?
        jQuery(window).resize(() => {

          // Calculate the offset based on the bottom of the module header
          const offset = jQuery("#editor-header").offset();
          const propSectionHeight = jQuery('#propertySection').height();
          const canvas = jQuery('#canvasSection');
          const mainHeader = jQuery('#main-header');

          if (offset == undefined || offset === null
                || propSectionHeight === undefined || propSectionHeight === null
                || canvas === undefined || canvas === null || mainHeader === null) {
            return;
          }

          if ($rootScope.editor) {
	        	const selectedElements = editorManager.getSelection();
            const subSelectionElements = editorManager.getSelection();

	            $scope.selectedElements = selectedElements;
	            $scope.subSelectionElements = subSelectionElements;
	            if (selectedElements && selectedElements.length > 0) {
	            	$rootScope.selectedElementBeforeScrolling = selectedElements[0];

	            	editorManager.setSelection([]); // needed cause it checks for element changes and does nothing if the elements are the same
	                editorManager.setSelection($scope.selectedElements, $scope.subSelectionElements);
	                $scope.selectedElements = undefined;
	                $scope.subSelectionElements = undefined;
	            }
        	}
        	
        	const totalAvailable = jQuery(window).height() - offset.top - mainHeader.height() - 21;
          canvas.height(totalAvailable - propSectionHeight);
          const footerHeight = jQuery('#paletteSectionFooter').height();
          const treeViewHeight = jQuery('#process-treeview-wrapper').height();
          jQuery('#paletteSection').height(totalAvailable - treeViewHeight - footerHeight);
      
          // Update positions of the resize-markers, according to the canvas

          let actualCanvas = null;
          if (canvas && canvas[0].children[1]) {
            actualCanvas = canvas[0].children[1];
          }

          const canvasTop = canvas.position().top;
          let canvasLeft = canvas.position().left;
          const canvasHeight = canvas[0].clientHeight;
          let canvasWidth = canvas[0].clientWidth;
          const iconCenterOffset = 8;
          let widthDiff = 0;

          let actualWidth = 0;
          if (actualCanvas) {
            // In some browsers, the SVG-element clientwidth isn't available, so we revert to the parent
            actualWidth = actualCanvas.clientWidth || actualCanvas.parentNode.clientWidth;
          }

          if (actualWidth < canvas[0].clientWidth) {
            widthDiff = actualWidth - canvas[0].clientWidth;
            // In case the canvas is smaller than the actual viewport, the resizers should be moved
            canvasLeft -= widthDiff / 2;
            canvasWidth += widthDiff;
          }

          const iconWidth = 17;
          const iconOffset = 20;

          let north = jQuery('#canvas-grow-N');
          north.css('top', `${canvasTop + iconOffset  }px`);
          north.css('left', `${canvasLeft - 10 + (canvasWidth - iconWidth) / 2  }px`);

          let south = jQuery('#canvas-grow-S');
          south.css('top', `${canvasTop + canvasHeight - iconOffset - iconCenterOffset   }px`);
          south.css('left', `${canvasLeft - 10 + (canvasWidth - iconWidth) / 2  }px`);

          let east = jQuery('#canvas-grow-E');
          east.css('top', `${canvasTop - 10 + (canvasHeight - iconWidth) / 2  }px`);
          east.css('left', `${canvasLeft + canvasWidth - iconOffset - iconCenterOffset  }px`);

          let west = jQuery('#canvas-grow-W');
          west.css('top', `${canvasTop -10 + (canvasHeight - iconWidth) / 2  }px`);
          west.css('left', `${canvasLeft + iconOffset  }px`);

          north = jQuery('#canvas-shrink-N');
          north.css('top', `${canvasTop + iconOffset  }px`);
          north.css('left', `${canvasLeft + 10 + (canvasWidth - iconWidth) / 2  }px`);

          south = jQuery('#canvas-shrink-S');
          south.css('top', `${canvasTop + canvasHeight - iconOffset - iconCenterOffset   }px`);
          south.css('left', `${canvasLeft +10 + (canvasWidth - iconWidth) / 2  }px`);

          east = jQuery('#canvas-shrink-E');
          east.css('top', `${canvasTop + 10 + (canvasHeight - iconWidth) / 2   }px`);
          east.css('left', `${canvasLeft + canvasWidth - iconOffset - iconCenterOffset  }px`);

          west = jQuery('#canvas-shrink-W');
          west.css('top', `${canvasTop + 10 + (canvasHeight - iconWidth) / 2  }px`);
          west.css('left', `${canvasLeft + iconOffset  }px`);
        });

        jQuery(window).trigger('resize');

        jQuery.fn.scrollStopped = function(callback) {
          jQuery(this).scroll(function(){
            const self = this; const $this = jQuery(self);
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,50,self));
          });
        };

        FLOWABLE.eventBus.addListener('ORYX-EDITOR-LOADED',function(){
          this.editorFactory.resolve();
          this.editorInitialized = true;
          this.modelData = editorManager.getBaseModelData();
			
        }, $rootScope);
		
        FLOWABLE.eventBus.addListener(FLOWABLE.eventBus.EVENT_TYPE_EDITOR_READY, () => {
          const url = window.location.href;
		    const regex = new RegExp("[?&]subProcessId(=([^&#]*)|&|#|$)");
		    const results = regex.exec(url);
		    if (results && results[2]) {
		    	editorManager.edit(decodeURIComponent(results[2].replace(/\+/g, " ")));
	    	}
	    });
      }

      $scope.$on('$locationChangeStart', (event, next, current) => {
    	if ($rootScope.editor && !$rootScope.ignoreChanges) {
    		const plugins = $rootScope.editor.loadedPlugins;

    		let savePlugin;
    		for (let i=0; i<plugins.length; i++) {
    			if (plugins[i].type == 'ORYX.Plugins.Save') {
    				savePlugin = plugins[i];
    				break;
    			}
    		}

    		if (savePlugin && savePlugin.hasChanges()) {
    			// Always prevent location from changing. We'll use a popup to determine the action we want to take
    			event.preventDefault();

    			if (!$scope.unsavedChangesModalInstance) {

    				const handleResponseFunction = function (discard) {
    					$scope.unsavedChangesModalInstance = undefined;
    					if (discard) {
    						$rootScope.ignoreChanges = true;
    		                $location.url(next.substring(next.indexOf('/#') + 2));
    					} else {
    		                $rootScope.ignoreChanges = false;
    		                $rootScope.setMainPageById('processes');
    					}
    				};

    				$scope.handleResponseFunction = handleResponseFunction;

              _internalCreateModal({
    					template: 'editor-app/popups/unsaved-changes.html',
    					scope: $scope
    				},  $modal, $scope);
    			}
    		}
    	}
      });

      // Always needed, cause the DOM element on wich the scroll event listeners are attached are changed for every new model
      initScrollHandling();
    
      const {modelId} = $routeParams;
      editorManager.setModelId(modelId);
      // we first initialize the stencilset used by the editor. The editorId is always the modelId.
      $http.get(FLOWABLE.URL.getModel(modelId),{
        headers: {'FtId': FLOWABLE.CONFIG.FtId}
      }).then((response) => {
	    editorManager.setModelData(response);
	    return response;
      }).then((modelData) => {
	    if(modelData.data.model.stencilset.namespace == 'http://b3mn.org/stencilset/cmmn1.1#') {
	       return $http.get(FLOWABLE.URL.getCmmnStencilSet(),{
            headers: {'FtId': FLOWABLE.CONFIG.FtId}
          });
	    } 
	       return $http.get(FLOWABLE.URL.getStencilSet(),{
          headers: {'FtId': FLOWABLE.CONFIG.FtId}
        });
	    
      }).then((response) => {
 		const baseUrl = "http://b3mn.org/stencilset/";
        editorManager.setStencilData(response.data);
        // the stencilset alters the data ref!
        const stencilSet = new ORYX.Core.StencilSet.StencilSet(baseUrl, response.data);
        ORYX.Core.StencilSet.loadStencilSet(baseUrl, stencilSet, modelId);
        // after the stencilset is loaded we make sure the plugins.xml is loaded.
        return $http.get(ORYX.CONFIG.PLUGINS_CONFIG);
      }).then((response) => {
        ORYX._loadPlugins(response.data);
        return response;
      }).then((response) => {
        editorManager.bootEditor();
      }).catch((error) => {
        console.log(error);
      });
 
 	// minihack to make sure mousebind events are processed if the modeler is used in an iframe.
      // selecting an element and pressing "del" could sometimes not trigger an event.
      jQuery(window).focus();

    }]);

angular.module('flowableModeler')
  .controller('EditorUnsavedChangesPopupCtrl', ['$rootScope', '$scope', '$http', '$location', '$window', function ($rootScope, $scope, $http, $location, $window) {

    $scope.discard = function () {
      if ($scope.handleResponseFunction) {
        $scope.handleResponseFunction(true);
        // Also clear any 'onbeforeunload', added by oryx
        $window.onbeforeunload = undefined;
      }
      $scope.$hide();
    };

    $scope.save = function () {
      if ($scope.handleResponseFunction) {
        $scope.handleResponseFunction(false);
      }
      $scope.$hide();
    };

    $scope.cancel = function () {
      if ($scope.handleResponseFunction) {
        $scope.handleResponseFunction(null);
      }
      $scope.$hide();
    };
  }]);

