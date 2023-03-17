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
function _bpmnGetColor(element, defaultColor)
{
  let strokeColor;
  if(element.current) {
    strokeColor = CURRENT_COLOR;
  } else if(element.completed) {
    strokeColor = COMPLETED_COLOR;
  } else {
    strokeColor = defaultColor;
  }
  return strokeColor;
}

function _drawPool(pool)
{
  const rect = paper.rect(pool.x, pool.y, pool.width, pool.height);

  rect.attr({"stroke-width": 1,
    "stroke": "#000000",
    "fill": "white"
 	});

  if (pool.name)
  {
    const poolName = paper.text(pool.x + 14, pool.y + (pool.height / 2), pool.name).attr({
	        "text-anchor" : "middle",
	        "font-family" : "Arial",
	        "font-size" : "12",
	        "fill" : "#000000"
	  	});

    poolName.transform("r270");
  }

  if (pool.lanes)
  {
    for (let i = 0; i < pool.lanes.length; i++)
    {
      const lane = pool.lanes[i];
      _drawLane(lane);
    }
  }
}

function _drawLane(lane)
{
  const rect = paper.rect(lane.x, lane.y, lane.width, lane.height);

  rect.attr({"stroke-width": 1,
    "stroke": "#000000",
    "fill": "white"
 	});

  if (lane.name)
  {
    const laneName = paper.text(lane.x + 10, lane.y + (lane.height / 2), lane.name).attr({
	        "text-anchor" : "middle",
	        "font-family" : "Arial",
	        "font-size" : "12",
	        "fill" : "#000000"
	  	});

    laneName.transform("r270");
  }
}

function _drawSubProcess(element)
{
  const rect = paper.rect(element.x, element.y, element.width, element.height, 4);

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  rect.attr({"stroke-width": 1,
    "stroke": strokeColor,
    "fill": "white"
 	});
}

function _drawTransaction(element)
{
  const rect = paper.rect(element.x, element.y, element.width, element.height, 4);

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  rect.attr({"stroke-width": 1,
    "stroke": strokeColor,
    "fill": "white"
 	});

  const borderRect = paper.rect(element.x + 2, element.y + 2, element.width - 4, element.height -4, 4);

  borderRect.attr({"stroke-width": 1,
    "stroke": "black",
    "fill": "none"
 	});
}

function _drawEventSubProcess(element)
{
  const rect = paper.rect(element.x, element.y, element.width, element.height, 4);
  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  rect.attr({"stroke-width": 1,
    "stroke": strokeColor,
    "stroke-dasharray": ".",
    "fill": "white"
 	});
}

function _drawAdhocSubProcess(element)
{
  const rect = paper.rect(element.x, element.y, element.width, element.height, 4);

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  rect.attr({"stroke-width": 1,
    "stroke": strokeColor,
    "fill": "white"
 	});

 	paper.text(element.x + (element.width / 2), element.y + element.height - 8).attr({
    "text-anchor" : "middle",
    "font-family" : "Arial",
    "font-size" : 20,
    "text" : "~",
    "fill" : "#373e48"
  	});
}

function _drawStartEvent(element)
{
  const startEvent = _drawEvent(element, NORMAL_STROKE, 15);
  startEvent.click(() => {
    _zoom(true);
  });
  _addHoverLogic(element, "circle", MAIN_STROKE_COLOR);
}

function _drawEndEvent(element)
{
  const endEvent = _drawEvent(element, ENDEVENT_STROKE, 14);
  endEvent.click(() => {
    _zoom(false);
  });
  _addHoverLogic(element, "circle", MAIN_STROKE_COLOR);
}

function _drawEvent(element, strokeWidth, radius)
{
  const x = element.x + (element.width / 2);
  const y = element.y + (element.height / 2);

  const circle = paper.circle(x, y, radius);

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  // Fill
  const eventFillColor = _determineCustomFillColor(element, "#ffffff");

  // Opacity
  let eventOpacity = 1.0;
  if (customActivityBackgroundOpacity) {
    eventOpacity = customActivityBackgroundOpacity;
  }

  if (element.interrupting === undefined || element.interrupting) {
    circle.attr({
		    "stroke-width": strokeWidth,
      "stroke": strokeColor,
      "fill": eventFillColor,
	        "fill-opacity": eventOpacity
	 	});

  } else {
    circle.attr({
		    "stroke-width": strokeWidth,
      "stroke": strokeColor,
      "stroke-dasharray": ".",
      "fill": eventFillColor,
	        "fill-opacity": eventOpacity
	 	});
  }

  circle.id = element.id;

  _drawEventIcon(paper, element);

  return circle;
}

function _drawServiceTask(element)
{
  _drawTask(element);
  if (element.taskType === "mail")
  {
    _drawSendTaskIcon(paper, element.x + 4, element.y + 4);
  }
  else if (element.taskType === "camel")
  {
    _drawCamelTaskIcon(paper, element.x + 4, element.y + 4);
  }
  else if (element.taskType === "mule")
  {
    _drawMuleTaskIcon(paper, element.x + 4, element.y + 4);
  }
  else if (element.taskType === "http")
  {
    _drawHttpTaskIcon(paper, element.x + 4, element.y + 4);
  }
  else if (element.taskType === "shell")
  {
    _drawShellTaskIcon(paper, element.x + 4, element.y + 4);
  }
  else if (element.taskType === "dmn") {
    _drawDecisionTaskIcon(paper, element.x + 4, element.y + 4);
  }
  else if (element.stencilIconId)
  {
    paper.image(`../service/stencilitem/${  element.stencilIconId  }/icon`, element.x + 4, element.y + 4, 16, 16);
  }
  else
  {
    _drawServiceTaskIcon(paper, element.x + 4, element.y + 4);
  }
  _addHoverLogic(element, "rect", ACTIVITY_STROKE_COLOR);
}

function _drawHttpServiceTask(element)
{
  _drawTask(element);
  _drawHttpTaskIcon(paper, element.x + 4, element.y + 4);
  _addHoverLogic(element, "rect", ACTIVITY_STROKE_COLOR);
}

function _drawCallActivity(element)
{
  const width = element.width - (CALL_ACTIVITY_STROKE / 2);
  const height = element.height - (CALL_ACTIVITY_STROKE / 2);

  const rect = paper.rect(element.x, element.y, width, height, 4);

  const strokeColor = _bpmnGetColor(element, ACTIVITY_STROKE_COLOR);

  // Fill
  const callActivityFillColor = _determineCustomFillColor(element, ACTIVITY_FILL_COLOR);

  // Opacity
  let callActivityOpacity = 1.0;
  if (customActivityBackgroundOpacity) {
    callActivityOpacity = customActivityBackgroundOpacity;
  }

  rect.attr({"stroke-width": CALL_ACTIVITY_STROKE,
    "stroke": strokeColor,
    "fill": callActivityFillColor,
    "fill-opacity": callActivityOpacity
  });

  rect.id = element.id;

  if (element.name) {
    this._drawMultilineText(element.name, element.x, element.y, element.width, element.height, "middle", "middle", 11);
  }
  _addHoverLogic(element, "rect", ACTIVITY_STROKE_COLOR);
}

function _drawScriptTask(element)
{
  _drawTask(element);
  _drawScriptTaskIcon(paper, element.x + 4, element.y + 4);
  _addHoverLogic(element, "rect", ACTIVITY_STROKE_COLOR);
}

function _drawUserTask(element)
{
  _drawTask(element);
  _drawUserTaskIcon(paper, element.x + 4, element.y + 4);
  _addHoverLogic(element, "rect", ACTIVITY_STROKE_COLOR);
}

function _drawBusinessRuleTask(element)
{
  _drawTask(element);
  _drawBusinessRuleTaskIcon(paper, element.x + 4, element.y + 4);
  _addHoverLogic(element, "rect", ACTIVITY_STROKE_COLOR);
}

function _drawManualTask(element)
{
  _drawTask(element);
  _drawManualTaskIcon(paper, element.x + 4, element.y + 4);
  _addHoverLogic(element, "rect", ACTIVITY_STROKE_COLOR);
}

function _drawSendTask(element)
{
  _drawTask(element);
  _drawSendTaskIcon(paper, element.x + 4, element.y + 4);
  _addHoverLogic(element, "rect", ACTIVITY_STROKE_COLOR);
}

function _drawReceiveTask(element)
{
  _drawTask(element);
  _drawReceiveTaskIcon(paper, element.x, element.y);
  _addHoverLogic(element, "rect", ACTIVITY_STROKE_COLOR);
}

function _drawTask(element)
{
  const rectAttrs = {};

  // Stroke
  const strokeColor = _bpmnGetColor(element, ACTIVITY_STROKE_COLOR);
  rectAttrs.stroke = strokeColor;

  let strokeWidth;
  if (strokeColor === ACTIVITY_STROKE_COLOR) {
    strokeWidth = TASK_STROKE;
  } else {
    strokeWidth = TASK_HIGHLIGHT_STROKE;
  }

  const width = element.width - (strokeWidth / 2);
  const height = element.height - (strokeWidth / 2);

  const rect = paper.rect(element.x, element.y, width, height, 4);
  rectAttrs['stroke-width'] = strokeWidth;

  // Fill
  const fillColor = _determineCustomFillColor(element, ACTIVITY_FILL_COLOR);
  rectAttrs.fill = fillColor;

  // Opacity
  if (customActivityBackgroundOpacity) {
    rectAttrs['fill-opacity'] = customActivityBackgroundOpacity;
  }

  rect.attr(rectAttrs);
  rect.id = element.id;

  if (element.name) {
    this._drawMultilineText(element.name, element.x, element.y, element.width, element.height, "middle", "middle", 11);
  }
}

function _drawExclusiveGateway(element)
{
  _drawGateway(element);
  const quarterWidth = element.width / 4;
  const quarterHeight = element.height / 4;

  const iks = paper.path(
    `M${  element.x + quarterWidth + 3  } ${  element.y + quarterHeight + 3 
    }L${  element.x + 3 * quarterWidth - 3  } ${  element.y + 3 * quarterHeight - 3 
    }M${  element.x + quarterWidth + 3  } ${  element.y + 3 * quarterHeight - 3 
    }L${  element.x + 3 * quarterWidth - 3  } ${  element.y + quarterHeight + 3}`
  );

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  // Fill
  const gatewayFillColor = _determineCustomFillColor(element, ACTIVITY_FILL_COLOR);

  // Opacity
  let gatewayOpacity = 1.0;
  if (customActivityBackgroundOpacity) {
    gatewayOpacity = customActivityBackgroundOpacity;
  }


  iks.attr({"stroke-width": 3, "stroke": strokeColor, "fill": gatewayFillColor, "fill-opacity": gatewayOpacity});

  _addHoverLogic(element, "rhombus", MAIN_STROKE_COLOR);
}

function _drawParallelGateway(element)
{
  _drawGateway(element);

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  const path1 = paper.path("M 6.75,16 L 25.75,16 M 16,6.75 L 16,25.75");

  // Fill
  const gatewayFillColor = _determineCustomFillColor(element, ACTIVITY_FILL_COLOR);

  // Opacity
  let gatewayOpacity = 1.0;
  if (customActivityBackgroundOpacity) {
    gatewayOpacity = customActivityBackgroundOpacity;
  }

  path1.attr({
    "stroke-width": 3,
    "stroke": strokeColor,
    "fill": gatewayFillColor,
    "fill-opacity": gatewayOpacity
  });

  path1.transform(`T${  element.x + 4  },${  element.y + 4}`);

  _addHoverLogic(element, "rhombus", MAIN_STROKE_COLOR);
}

function _drawInclusiveGateway(element)
{
  _drawGateway(element);

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  const circle1 = paper.circle(element.x + (element.width / 2), element.y + (element.height / 2), 9.75);

  // Fill
  const gatewayFillColor = _determineCustomFillColor(element, ACTIVITY_FILL_COLOR);

  // Opacity
  let gatewayOpacity = 1.0;
  if (customActivityBackgroundOpacity) {
    gatewayOpacity = customActivityBackgroundOpacity;
  }

  circle1.attr({
    "stroke-width": 2.5,
    "stroke": strokeColor,
    "fill": gatewayFillColor,
    "fill-opacity": gatewayOpacity
  });

  _addHoverLogic(element, "rhombus", MAIN_STROKE_COLOR);
}

function _drawEventGateway(element)
{
  _drawGateway(element);

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  const circle1 = paper.circle(element.x + (element.width / 2), element.y + (element.height / 2), 10.4);

  // Fill
  const gatewayFillColor = _determineCustomFillColor(element, ACTIVITY_FILL_COLOR);

  // Opacity
  let gatewayOpacity = 1.0;
  if (customActivityBackgroundOpacity) {
    gatewayOpacity = customActivityBackgroundOpacity;
  }

  circle1.attr({
    "stroke-width": 0.5,
    "stroke": strokeColor,
    "fill": gatewayFillColor,
    "fill-opacity": gatewayOpacity
  });

  const circle2 = paper.circle(element.x + (element.width / 2), element.y + (element.height / 2), 11.7);
  circle2.attr({
    "stroke-width": 0.5,
    "stroke": strokeColor,
    "fill": gatewayFillColor,
    "fill-opacity": gatewayOpacity
  });

  const path1 = paper.path("M 20.327514,22.344972 L 11.259248,22.344216 L 8.4577203,13.719549 L 15.794545,8.389969 L 23.130481,13.720774 L 20.327514,22.344972 z");
  path1.attr({
    "stroke-width": 1.39999998,
    "stroke": strokeColor,
    "fill": gatewayFillColor,
    "fill-opacity": gatewayOpacity,
    "stroke-linejoin": "bevel"
  });

  path1.transform(`T${  element.x + 4  },${  element.y + 4}`);

  _addHoverLogic(element, "rhombus", MAIN_STROKE_COLOR);
}

function _drawGateway(element)
{
  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  const rhombus = paper.path(`M${  element.x  } ${  element.y + (element.height / 2) 
  }L${  element.x + (element.width / 2)  } ${  element.y + element.height 
  }L${  element.x + element.width  } ${  element.y + (element.height / 2) 
  }L${  element.x + (element.width / 2)  } ${  element.y  }z`
  );

  // Fill
  const gatewayFillColor = _determineCustomFillColor(element, ACTIVITY_FILL_COLOR);

  // Opacity
  let gatewayOpacity = 1.0;
  if (customActivityBackgroundOpacity) {
    gatewayOpacity = customActivityBackgroundOpacity;
  }

  rhombus.attr("stroke-width", 2);
  rhombus.attr("stroke", strokeColor);
  rhombus.attr("fill", gatewayFillColor);
  rhombus.attr("fill-opacity", gatewayOpacity);

  rhombus.id = element.id;

  return rhombus;
}

function _drawBoundaryEvent(element)
{
  const x = element.x + (element.width / 2);
  const y = element.y + (element.height / 2);

  const circle = paper.circle(x, y, 15);

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

 	if (element.cancelActivity)  {
    circle.attr({
		    "stroke-width": 1,
      "stroke": strokeColor,
      "fill": "white"
	 	});

  } else {
    circle.attr({
		    "stroke-width": 1,
		    "stroke-dasharray": ".",
      "stroke": strokeColor,
      "fill": "white"
	 	});
  }

  const innerCircle = paper.circle(x, y, 12);

  if (element.cancelActivity)  {
    innerCircle.attr({"stroke-width": 1,
      "stroke": strokeColor,
      "fill": "none"
	 	});

  } else {
    innerCircle.attr({
		    "stroke-width": 1,
		    "stroke-dasharray": ".",
      "stroke": strokeColor,
      "fill": "none"
	 	});
  }

  _drawEventIcon(paper, element);
  _addHoverLogic(element, "circle", MAIN_STROKE_COLOR);

  circle.id = element.id;
  innerCircle.id = `${element.id  }_inner`;
}

function _drawIntermediateCatchEvent(element)
{
  const x = element.x + (element.width / 2);
  const y = element.y + (element.height / 2);

  const circle = paper.circle(x, y, 15);

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  circle.attr({"stroke-width": 1,
    "stroke": strokeColor,
    "fill": "white"
 	});

  const innerCircle = paper.circle(x, y, 12);

  innerCircle.attr({"stroke-width": 1,
    "stroke": strokeColor,
    "fill": "none"
 	});

  _drawEventIcon(paper, element);
  _addHoverLogic(element, "circle", MAIN_STROKE_COLOR);

  circle.id = element.id;
  innerCircle.id = `${element.id  }_inner`;
}

function _drawThrowEvent(element)
{
  const x = element.x + (element.width / 2);
  const y = element.y + (element.height / 2);

  const circle = paper.circle(x, y, 15);

  const strokeColor = _bpmnGetColor(element, MAIN_STROKE_COLOR);

  circle.attr({"stroke-width": 1,
    "stroke": strokeColor,
    "fill": "white"
 	});

  const innerCircle = paper.circle(x, y, 12);

  innerCircle.attr({"stroke-width": 1,
    "stroke": strokeColor,
    "fill": "none"
 	});

  _drawEventIcon(paper, element);
  _addHoverLogic(element, "circle", MAIN_STROKE_COLOR);

  circle.id = element.id;
  innerCircle.id = `${element.id  }_inner`;
}

function _drawMultilineText(text, x, y, boxWidth, boxHeight, horizontalAnchor, verticalAnchor, fontSize)
{
  if (!text || text == "")
  {
    return;
  }

  let textBoxX; let textBoxY;
  const width = boxWidth - (2 * TEXT_PADDING);

  if (horizontalAnchor === "middle")
  {
    	textBoxX = x + (boxWidth / 2);
  }
  else if (horizontalAnchor === "start")
  {
    	textBoxX = x;
  }

  textBoxY = y + (boxHeight / 2);

 	const t = paper.text(textBoxX + TEXT_PADDING, textBoxY + TEXT_PADDING).attr({
    "text-anchor" : horizontalAnchor,
    "font-family" : "Arial",
    "font-size" : fontSize,
    "fill" : "#373e48"
  	});

  const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  t.attr({
    "text" : abc
  });
  const letterWidth = t.getBBox().width / abc.length;

  t.attr({
    "text" : text
  });
  const removedLineBreaks = text.split("\n");
  var x = 0; const s = [];
  for (let r = 0; r < removedLineBreaks.length; r++)
  {
  	    const words = removedLineBreaks[r].split(" ");
  	    for ( let i = 0; i < words.length; i++) {

  	        const l = words[i].length;
  	        if (x + (l * letterWidth) > width) {
  	            s.push("\n");
  	            x = 0;
  	        }
  	        x += l * letterWidth;
  	        s.push(`${words[i]  } `);
  	    }
	  	s.push("\n");
    x = 0;
  }
  t.attr({
    	"text" : s.join("")
  });

  if (verticalAnchor && verticalAnchor === "top")
  {
    	t.attr({"y": y + (t.getBBox().height / 2)});
  }
}

function _drawTextAnnotation(element)
{
  const path1 = paper.path("M20,1 L1,1 L1,50 L20,50");
  path1.attr({
    "stroke": "#585858",
    "fill": "none"
 	});

  const annotation = paper.set();
  annotation.push(path1);

  annotation.transform(`T${  element.x  },${  element.y}`);

  if (element.text) {
    this._drawMultilineText(element.text, element.x + 2, element.y, element.width, element.height, "start", "middle", 11);
  }
}

function _drawFlow(flow){

  const polyline = new Polyline(flow.id, flow.waypoints, SEQUENCEFLOW_STROKE, paper);

  const strokeColor = _bpmnGetColor(flow, MAIN_STROKE_COLOR);

  polyline.element = paper.path(polyline.path);
  polyline.element.attr({"stroke-width":SEQUENCEFLOW_STROKE});
  polyline.element.attr({"stroke":strokeColor});

  polyline.element.id = flow.id;

  const lastLineIndex = polyline.getLinesCount() - 1;
  const line = polyline.getLine(lastLineIndex);

  if (line == undefined) return;

  if (flow.type == "connection" && flow.conditions)
  {
    const middleX = (line.x1 + line.x2) / 2;
    const middleY = (line.y1 + line.y2) / 2;
    const image = paper.image("../editor/images/condition-flow.png", middleX - 8, middleY - 8, 16, 16);
  }

  const polylineInvisible = new Polyline(flow.id, flow.waypoints, SEQUENCEFLOW_STROKE, paper);

  polylineInvisible.element = paper.path(polyline.path);
  polylineInvisible.element.attr({
    "opacity": 0,
    "stroke-width": 8,
    "stroke" : "#000000"
  });

  if (flow.name) {
    const firstLine = polyline.getLine(0);

    let angle;
    if (firstLine.x1 !== firstLine.x2) {
      angle = Math.atan((firstLine.y2 - firstLine.y1) / (firstLine.x2 - firstLine.x1));
    } else if (firstLine.y1 < firstLine.y2) {
      angle = Math.PI / 2;
    } else {
      angle = -Math.PI / 2;
    }
    const flowName = paper.text(firstLine.x1, firstLine.y1, flow.name).attr({
      "text-anchor": "middle",
      "font-family" : "Arial",
      "font-size" : "12",
      "fill" : "#000000"
    });

    let offsetX = (flowName.getBBox().width / 2 + 5);
    const offsetY = -(flowName.getBBox().height / 2 + 5);

    if (firstLine.x1 > firstLine.x2) {
      offsetX = -offsetX;
    }
    const rotatedOffsetX = offsetX * Math.cos(angle) - offsetY * Math.sin(angle);
    const rotatedOffsetY = offsetX * Math.sin(angle) + offsetY * Math.cos(angle);

    flowName.attr({
      x: firstLine.x1 + rotatedOffsetX,
      y: firstLine.y1 + rotatedOffsetY
    });

    flowName.transform(`r${  ((angle) * 180) / Math.PI}`);
  }

  _showTip(jQuery(polylineInvisible.element.node), flow);

  polylineInvisible.element.mouseover(() => {
    paper.getById(polyline.element.id).attr({"stroke":"blue"});
  });

  polylineInvisible.element.mouseout(() => {
    paper.getById(polyline.element.id).attr({"stroke":"#585858"});
  });

  _drawArrowHead(line);
}

function _drawAssociation(flow){

  const polyline = new Polyline(flow.id, flow.waypoints, ASSOCIATION_STROKE, paper);

  polyline.element = paper.path(polyline.path);
  polyline.element.attr({"stroke-width": ASSOCIATION_STROKE});
  polyline.element.attr({"stroke-dasharray": ". "});
  polyline.element.attr({"stroke":"#585858"});

  polyline.element.id = flow.id;

  const polylineInvisible = new Polyline(flow.id, flow.waypoints, ASSOCIATION_STROKE, paper);

  polylineInvisible.element = paper.path(polyline.path);
  polylineInvisible.element.attr({
    "opacity": 0,
    "stroke-width": 8,
    "stroke" : "#000000"
  });

  _showTip(jQuery(polylineInvisible.element.node), flow);

  polylineInvisible.element.mouseover(() => {
    paper.getById(polyline.element.id).attr({"stroke":"blue"});
  });

  polylineInvisible.element.mouseout(() => {
    paper.getById(polyline.element.id).attr({"stroke":"#585858"});
  });
}

function _drawArrowHead(line, connectionType)
{
  const doubleArrowWidth = 2 * ARROW_WIDTH;

  const arrowHead = paper.path(`M0 0L-${  ARROW_WIDTH / 2 + .5  } -${  doubleArrowWidth  }L${  ARROW_WIDTH/2 + .5  } -${  doubleArrowWidth  }z`);

  // anti smoothing
  if (this.strokeWidth%2 == 1)
    line.x2 += .5, line.y2 += .5;

  arrowHead.transform(`t${  line.x2  },${  line.y2  }`);
  arrowHead.transform(`...r${  Raphael.deg(line.angle - Math.PI / 2)  } ${  0  } ${  0}`);

  arrowHead.attr("fill", "#585858");

  arrowHead.attr("stroke-width", SEQUENCEFLOW_STROKE);
  arrowHead.attr("stroke", "#585858");

  return arrowHead;
}

function _determineCustomFillColor(element, defaultColor) {

  let color;

  // By name
  if (customActivityColors && customActivityColors[element.name]) {
    color = customActivityColors[element.name];
  }

  if (color !== null && color !== undefined) {
    return color;
  }

  // By id
  if (customActivityColors && customActivityColors[element.id]) {
    color = customActivityColors[element.id];
  }

  if (color !== null && color !== undefined) {
    return color;
  }

  return defaultColor;
}
