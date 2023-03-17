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
const NORMAL_STROKE = 1;
const SEQUENCEFLOW_STROKE = 1.5;
const ASSOCIATION_STROKE = 2;
const TASK_STROKE = 1;
const TASK_HIGHLIGHT_STROKE = 2;
const CALL_ACTIVITY_STROKE = 2;
const ENDEVENT_STROKE = 3;

const COMPLETED_COLOR= "#2632aa";
const TEXT_COLOR= "#373e48";
const CURRENT_COLOR= "#017501";
const HOVER_COLOR= "#666666";
const ACTIVITY_STROKE_COLOR = "#bbbbbb";
const ACTIVITY_FILL_COLOR = "#f9f9f9";
const MAIN_STROKE_COLOR = "#585858";

const TEXT_PADDING = 3;
const ARROW_WIDTH = 4;
const MARKER_WIDTH = 12;

const TASK_FONT = {font: "11px Arial", opacity: 1, fill: Raphael.rgb(0, 0, 0)};

// icons
const ICON_SIZE = 16;
const ICON_PADDING = 4;

let INITIAL_CANVAS_WIDTH;
let INITIAL_CANVAS_HEIGHT;

let paper;
let viewBox;
let viewBoxWidth;
let viewBoxHeight;

let canvasWidth;
let canvasHeight;

const modelDiv = jQuery('#bpmnModel');
const modelId = modelDiv.attr('data-model-id');
const historyModelId = modelDiv.attr('data-history-id');
const processDefinitionId = modelDiv.attr('data-process-definition-id');
const modelType = modelDiv.attr('data-model-type');

// Support for custom background colors for activities
let customActivityColors = modelDiv.attr('data-activity-color-mapping');
if (customActivityColors !== null && customActivityColors !== undefined && customActivityColors.length > 0) {
  // Stored on the attribute as a string
  customActivityColors = JSON.parse(customActivityColors);
}

let customActivityToolTips = modelDiv.attr('data-activity-tooltips');
if (customActivityToolTips !== null && customActivityToolTips !== undefined && customActivityToolTips.length > 0) {
  // Stored on the attribute as a string
  customActivityToolTips = JSON.parse(customActivityToolTips);
}

// Support for custom opacity for activity backgrounds
const customActivityBackgroundOpacity = modelDiv.attr('data-activity-opacity');

const elementsAdded = [];
const elementsRemoved = [];

function _showTip(htmlNode, element)
{

  // Custom tooltip
  var documentation = undefined;
  if (customActivityToolTips) {
    if (customActivityToolTips[element.name]) {
      documentation = customActivityToolTips[element.name];
    } else if (customActivityToolTips[element.id]) {
      documentation = customActivityToolTips[element.id];
    } else {
      documentation = ''; // Show nothing if custom tool tips are enabled
    }
  }

  // Default tooltip, no custom tool tip set
  if (documentation === undefined) {
    var documentation = "";
    if (element.name && element.name.length > 0) {
      documentation += `<b>Name</b>: <i>${  element.name  }</i><br/><br/>`;
    }

    if (element.properties) {
      for (let i = 0; i < element.properties.length; i++) {
        const propName = element.properties[i].name;
        if (element.properties[i].type && element.properties[i].type === 'list') {
          documentation += `<b>${  propName  }</b>:<br/>`;
          for (let j = 0; j < element.properties[i].value.length; j++) {
            documentation += `<i>${  element.properties[i].value[j]  }</i><br/>`;
          }
        }
        else {
          documentation += `<b>${  propName  }</b>: <i>${  element.properties[i].value  }</i><br/>`;
        }
      }
    }
  }

  let text = `${element.type  } `;
  if (element.name && element.name.length > 0)
  {
    text += element.name;
  }
  else
  {
    text += element.id;
  }

  htmlNode.qtip({
    content: {
      text: documentation,
      title: {
        text
      }
    },
    position: {
      my: 'top left',
      at: 'bottom center',
      viewport: jQuery('#bpmnModel')
    },
    hide: {
      fixed: true, delay: 500,
      event: 'click mouseleave'
    },
    style: {
      classes: 'ui-tooltip-kisbpm-bpmn'
    }
  });
}

function _addHoverLogic(element, type, defaultColor)
{
  const strokeColor = _bpmnGetColor(element, defaultColor);
  let topBodyRect = null;
  if (type === "rect")
  {
    topBodyRect = paper.rect(element.x, element.y, element.width, element.height);
  }
  else if (type === "circle")
  {
    const x = element.x + (element.width / 2);
    const y = element.y + (element.height / 2);
    topBodyRect = paper.circle(x, y, 15);
  }
  else if (type === "rhombus")
  {
    topBodyRect = paper.path(`M${  element.x  } ${  element.y + (element.height / 2) 
    }L${  element.x + (element.width / 2)  } ${  element.y + element.height 
    }L${  element.x + element.width  } ${  element.y + (element.height / 2) 
    }L${  element.x + (element.width / 2)  } ${  element.y  }z`
    );
  }

  let opacity = 0;
  let fillColor = "#ffffff";
  if (jQuery.inArray(element.id, elementsAdded) >= 0)
  {
    opacity = 0.2;
    fillColor = "green";
  }

  if (jQuery.inArray(element.id, elementsRemoved) >= 0)
  {
    opacity = 0.2;
    fillColor = "red";
  }

  topBodyRect.attr({
    "opacity": opacity,
    "stroke" : "none",
    "fill" : fillColor
  });
  _showTip(jQuery(topBodyRect.node), element);

  topBodyRect.mouseover(() => {
    paper.getById(element.id).attr({"stroke":HOVER_COLOR});
  });

  topBodyRect.mouseout(() => {
    paper.getById(element.id).attr({"stroke":strokeColor});
  });
}

function _zoom(zoomIn)
{
  let tmpCanvasWidth; let tmpCanvasHeight;
  if (zoomIn)
  {
    tmpCanvasWidth = canvasWidth * (1.0/0.90);
    tmpCanvasHeight = canvasHeight * (1.0/0.90);
  }
  else
  {
    tmpCanvasWidth = canvasWidth * (1.0/1.10);
    tmpCanvasHeight = canvasHeight * (1.0/1.10);
  }

  if (tmpCanvasWidth != canvasWidth || tmpCanvasHeight != canvasHeight)
  {
    canvasWidth = tmpCanvasWidth;
    canvasHeight = tmpCanvasHeight;
    paper.setSize(canvasWidth, canvasHeight);
  }
}

let modelUrl;

if (modelType == 'runtime') {
  if (historyModelId) {
    	modelUrl = FLOWABLE.APP_URL.getProcessInstanceModelJsonHistoryUrl(historyModelId);
  } else {
    	modelUrl = FLOWABLE.APP_URL.getProcessInstanceModelJsonUrl(modelId);
  }
} else if (modelType == 'design') {
  if (historyModelId) {
    	modelUrl = FLOWABLE.APP_URL.getModelHistoryModelJsonUrl(modelId, historyModelId);
  } else {
    	modelUrl = FLOWABLE.APP_URL.getModelModelJsonUrl(modelId);
  }
} else if (modelType == 'process-definition') {
  modelUrl = FLOWABLE.APP_URL.getProcessDefinitionModelJsonUrl(processDefinitionId);
}

const request = jQuery.ajax({
  type: 'get',
  beforeSend(xhr) {
    xhr.setRequestHeader("Authorization", localStorage.getItem("current_user_token"));
  },
  url: `${modelUrl  }?nocaching=${  new Date().getTime()}`
});

request.success((data, textStatus, jqXHR) => {

  if ((!data.elements || data.elements.length == 0) && (!data.pools || data.pools.length == 0)) return;

  INITIAL_CANVAS_WIDTH = data.diagramWidth;

  if (modelType == 'design') {
    	INITIAL_CANVAS_WIDTH += 20;
  } else {
    INITIAL_CANVAS_WIDTH += 30;
  }

  INITIAL_CANVAS_HEIGHT = data.diagramHeight + 50;
  canvasWidth = INITIAL_CANVAS_WIDTH;
  canvasHeight = INITIAL_CANVAS_HEIGHT;
  viewBoxWidth = INITIAL_CANVAS_WIDTH;
  viewBoxHeight = INITIAL_CANVAS_HEIGHT;

  if (modelType == 'design') {
    	const headerBarHeight = 170;
    	let offsetY = 0;
    	if (jQuery(window).height() > (canvasHeight + headerBarHeight))
    	{
        	offsetY = (jQuery(window).height() - headerBarHeight - canvasHeight) / 2;
    	}

    	if (offsetY > 50) {
        	offsetY = 50;
    	}

    	jQuery('#bpmnModel').css('marginTop', offsetY);
  }

  jQuery('#bpmnModel').width(INITIAL_CANVAS_WIDTH);
  jQuery('#bpmnModel').height(INITIAL_CANVAS_HEIGHT);
  paper = Raphael(document.getElementById('bpmnModel'), canvasWidth, canvasHeight);
  paper.setViewBox(0, 0, viewBoxWidth, viewBoxHeight, false);
  paper.renderfix();

  if (data.pools)
  {
    for (var i = 0; i < data.pools.length; i++)
    {
      const pool = data.pools[i];
      _drawPool(pool);
    }
  }

  const modelElements = data.elements;
  for (var i = 0; i < modelElements.length; i++)
  {
    const element = modelElements[i];
    // try {
    const drawFunction = eval(`_draw${  element.type}`);
    drawFunction(element);
    // } catch(err) {console.log(err);}
  }

  if (data.flows)
  {
    for (var i = 0; i < data.flows.length; i++)
    {
      const flow = data.flows[i];
      if (flow.type === 'sequenceFlow') {
        _drawFlow(flow);
      } else if (flow.type === 'association') {
        _drawAssociation(flow);
      }
    }
  }
});

request.error((jqXHR, textStatus, errorThrown) => {
  alert("error");
});
