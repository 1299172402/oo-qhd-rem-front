<template>
  <div style="height: 100%;">
    <professional-drawing-header @onClickPath="getOnClickPath"></professional-drawing-header>
    <el-container style="width:100%;height:100%;padding:0;min-width:1100px;">
      <div class="cloud-home">
        <div class="layout-container">
          <div class="layout-left" v-show="cloudSideBarShow">
            <CloudSideBar @onClickPath="getOnClickPath" :message="cloudSideBarShowType"></CloudSideBar>
          </div>
        </div>
      </div>
      <el-container style="padding:0px;height:100%;">
        <div      id="contentDiv"   style="position:relative;left:0px;top:0px;width:100%;height:95%;overflow:hidden;background:#fff"        >
          <div style="position:relative;width: 100%;height:30px;z-index:1">
            <span
              @mouseenter="spanMouseenter('pointer',$event)"
              @mouseleave="spanMouseleave('pointer',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="选择" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  autofocus
                  :class="icon.pointer"
                  @click="setSelect()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('magnifying',$event)"
              @mouseleave="spanMouseleave('magnifying',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="放大" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.magnifying"
                  @click="setZoomout()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('shrink',$event)"
              @mouseleave="spanMouseleave('shrink',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="缩小" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.shrink"
                  @click="setZoomin()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('allmap',$event)"
              @mouseleave="spanMouseleave('allmap',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="全图" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.allmap"
                  @click="setZoomAll()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('selectAll',$event)"
              @mouseleave="spanMouseleave('selectAll',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="全选" placement="bottom-start">
                <el-button
                  style="width:24px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.selectAll"
                  @click="selectAll()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('straightLine',$event)"
              @mouseleave="spanMouseleave('straightLine',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="直线选择" placement="bottom-start">
                <el-button
                  style="width:24px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.straightLine"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('rect',$event)"
              @mouseleave="spanMouseleave('rect',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="图框" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.rect"
                  @click="FrameAttribute(1)"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('look',$event)"
              @mouseleave="spanMouseleave('look',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="可视化查询" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.look"
                  @click="lookWell()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              style="color: rgba(200,200,200,200);font-size: 18px;margin-left:10px;margin-right:10px;"
            >|</span>
            <span
              @mouseenter="spanMouseenter('Copy',$event)"
              @mouseleave="spanMouseleave('Copy',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="复制" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.Copy"
                  @click="copy()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('Paste',$event)"
              @mouseleave="spanMouseleave('Paste',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="粘贴" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.Paste"
                  @click="paste()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('Cut',$event)"
              @mouseleave="spanMouseleave('Cut',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="剪切" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.Cut"
                  @click="cut()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('Delete',$event)"
              @mouseleave="spanMouseleave('Delete',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.Delete"
                  @click="deletes()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              style="color: rgba(200,200,200,200);font-size: 18px;margin-left:10px;margin-right:10px;"
            >|</span>
            <span
              @mouseenter="spanMouseenter('Undo',$event)"
              @mouseleave="spanMouseleave('Undo',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="撤销" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.Undo"
                  @click="Undo()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              @mouseenter="spanMouseenter('Redo',$event)"
              @mouseleave="spanMouseleave('Redo',$event)"
              style="margin-right:5px"
            >
              <el-tooltip class="item" effect="dark" content="恢复" placement="bottom-start">
                <el-button
                  style="width:26px !important;height:24px !important; padding:0px 0px !important;"
                  :class="icon.Redo"
                  @click="Redo()"
                ></el-button>
              </el-tooltip>
            </span>
            <span
              style="color: rgba(200,200,200,200);font-size: 18px;margin-left:10px;margin-right:10px;"
            >|</span>

            <!-- <el-input  style="width:160px !important;height:24px !important; padding:0px 0px !important;" size="mini" placeholder="请输入内容" v-model="input5" class="input-with-select">
              <el-button   size="mini" slot="append" icon="el-icon-search" ></el-button>
            </el-input>-->
            <span>
              比例尺:
              <el-select
                v-model="cbDepthScale"
                slot="prepend"
                placeholder="请选择"
                size="mini"
                style="width:100px"
                @change="cbDepthScaleChange"
              >
                <el-option
                  v-for="item in cbDepthScaleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </span>
            <span>
              显示比例:
              <el-select
                v-model="cbScaling"
                slot="prepend"
                placeholder="请选择"
                size="mini"
                style="width:100px"
                @change="cbScalingChange"
              >
                <el-option
                  v-for="item in cbScalingOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </span>
          </div>
          <div id="canvasTool_MapCanvas">
            <canvas
              id="MapCanvas"
              width="100%"
              height="100%"
              style="position:absolute;left:0;top:0;"
              tabindex="0"
            ></canvas>
          </div>
        </div>
      </el-container>
      <div style="background:#fff;width:300px;height:100%;">
        <div class="summary" style="height:330px;background:#fff">
          <div
            style="text-align:left;padding-top:5px;padding-bottom:5px;padding-left:10px;background:#fff;font-size:12px;"
          >
            <!-- <span>|图件概述</span> -->
          </div>
          <div style="text-align:left;height:250px;">
            <div style="padding-top:5px;padding-bottom:5px;padding-left:20px;">
              <li style="text-align:left;display:inline;"></li>
              <li
                v-if="flag1"
                style="text-align:left;display:inline;font-size:14px;color:#00BFFF;"
                @dblclick="edit1()"
              ></li>
              <input id="GQMC" type="text" v-else @change="input1()" hidden />
            </div>
            <div style="padding-top:5px;padding-bottom:10px;padding-left:20px;">
              <!-- <li style="text-align:left;display:inline;">图件名称:</li> -->
              <li
                v-if="flag"
                style="text-align:left;display:inline;color:#FFA500;font-weight:bold;"
                @mouseleave="edit()"
              >{{this.TJMC}}</li>
              <input id="TJMC" type="text" v-model="TJMC" v-else @mouseout="input()" />
            </div>
            <div style="padding-top:5px;padding-left:20px;">
              <li style="text-align:left;display:inline;font-size:12px;">图件分类：</li>
              <li v-if="flag2" style="text-align:left;display:inline;font-size:12px;">{{this.TJLB}}</li>
              <input id="Author" type="text" v-else />
            </div>
            <div style="padding-top:5px;padding-left:20px;">
              <li style="text-align:left;display:inline;font-size:12px;">创建日期:</li>
              <li
                v-if="flag3"
                style="text-align:left;display:inline;font-size:12px;"
                @dblclick="edit3()"
              >{{this.CJRQ}}</li>
              <input id="CJRQ" type="text" v-else @change="input3()" />
            </div>
            <div style="padding-top:5px;padding-left:20px;">
              <li style="text-align:left;display:inline;font-size:12px;">PAD:</li>
              <li v-if="flag2" style="text-align:left;display:inline;font-size:12px;">{{this.PAD}}</li>
              <input id="Author" type="text" v-else />
            </div>
            <div style="padding-top:5px;padding-left:20px;">
              <li style="text-align:left;display:inline;font-size:12px;">油田:</li>
              <li v-if="flag2" style="text-align:left;display:inline;font-size:12px;">{{this.YTMC}}</li>
              <input id="Author" type="text" v-else />
            </div>
            <div style="padding-top:5px;padding-left:20px;">
              <li style="text-align:left;display:inline;font-size:12px;">图件说明:</li>
              <li
                v-if="flag4"
                style="text-align:left;display:inline;font-size:12px;"
                @dblclick="edit4()"
              >{{this.TEXT}}</li>
              <input id="TEXT" type="text" v-else @change="input4()" />
            </div>
            <div style="padding-top:5px;padding-left:20px;">
              <li style="text-align:left;display:inline;font-size:12px;">作者:&ensp;&ensp;</li>
              <li
                v-if="flag2"
                style="text-align:left;display:inline;font-size:12px;"
                @dblclick="edit2()"
              >{{this.Author}}</li>
              <input id="Author" type="text" v-else @change="input2()" />
              <li
                style="text-align:left;display:inline;font-size:12px;"
              >&ensp;&ensp;&ensp;&ensp;浏览量:&ensp;&ensp;</li>
              <li
                v-if="flag2"
                style="text-align:left;display:inline;font-size:12px;"
              >{{this.VISITNUM}}</li>
              <input id="Author" type="text" v-else />
            </div>
          </div>
          <el-row style="padding-left:20px;padding-top:17px;">
            <el-button type="info" @click="ViewShare">分享</el-button>
            <!-- <el-button type="primary" @click="handleLayer">编辑</el-button> -->
            <el-button type="success" @click="saveMap">保存</el-button>
            <el-button type="success" @click="cutRectSelect">截取缩略图</el-button>
          </el-row>
        </div>

        <el-tabs style="width:300px;min-height:335px;background:#fff">
          <el-tab-pane label="|图层">
            <el-tree
              :data="coverageData"
              :props="defaultProps"
              show-checkbox
              draggable
              @dblclick="editTC"
              :allow-drop="allowDrop"
              node-key="id"
              default-expand-all
              :default-checked-keys="checkedKeys"
              :render-content="renderContentTC"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              ref="tree"
              style="height:300px"
              @check-change="handleCheckChange"
            ></el-tree>
          </el-tab-pane>
          <el-tab-pane label="/可能用到的图件">
            <el-table :data="treedata" height="550" style="width: 100%;">
              <el-table-column type="index" width="30" align="right"></el-table-column>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item
                      label="图件名称:"
                      style="text-align:left;display:inline;font-size:12px;"
                    >
                      <li
                        style="text-align:left;display:inline;font-size:12px;"
                      >{{ props.row.TJMC }}</li>
                    </el-form-item>
                    <el-form-item
                      label="图件类别:"
                      style="text-align:left;display:inline;font-size:12px;"
                    >
                      <li
                        style="text-align:left;display:inline;font-size:12px;"
                      >{{ props.row.TJLB }}</li>
                    </el-form-item>
                    <el-form-item
                      label="图件说明:"
                      style="text-align:left;display:inline;font-size:12px;"
                    >
                      <li
                        style="text-align:left;display:inline;font-size:12px;"
                      >{{ props.row.TEXT }}</li>
                    </el-form-item>
                    <el-form-item
                      label="创建人:"
                      style="text-align:left;display:inline;font-size:12px;"
                    >
                      <li
                        style="text-align:left;display:inline;font-size:12px;"
                      >{{ props.row.Author }}</li>
                    </el-form-item>
                    <el-form-item
                      label="创建日期:"
                      style="text-align:left;display:inline;font-size:12px;"
                    >
                      <li
                        style="text-align:left;display:inline;font-size:12px;"
                      >{{ props.row.CJRQ }}</li>
                    </el-form-item>
                    <el-form-item
                      label="油田名称:"
                      style="text-align:left;display:inline;font-size:12px;"
                    >
                      <li
                        style="text-align:left;display:inline;font-size:12px;"
                      >{{ props.row.YTMC }}</li>
                    </el-form-item>
                    <el-form-item
                      label="PAD:"
                      style="text-align:left;display:inline;font-size:12px;"
                    >
                      <li style="text-align:left;display:inline;font-size:12px;">{{ props.row.PAD }}</li>
                    </el-form-item>
                    <el-form-item
                      label="浏览次数:"
                      style="text-align:left;display:inline;font-size:12px;"
                    >
                      <li
                        style="text-align:left;display:inline;font-size:12px;"
                      >{{ props.row.VISITNUM }}</li>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label prop="TJMC">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="probablyClick(scope.row)"
                  >{{scope.row.TJMC}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="/专业模板">
            <div v-loading.body="loading" class="tree">
              <el-tree
                class="filter-tree"
                :data="TemplateData"
                :props="defaultPropsTemplate"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent"
              ></el-tree>
            </div>
          </el-tab-pane>
          <el-tab-pane label="/颜色模板"></el-tab-pane>
        </el-tabs>
      </div>
      <!-- <div style="cursor:pointer;position:fixed;top:300px;right:10px;background:#33cde5;color:#fff;font-weight:600;width:30px;text-align:center;font-size:16px;padding:5px;z-index:99">
        <el-tooltip class="item" effect="light" placement="left">
          <div slot="content">山东胜软科技股份有限公司<br/>http://www.victorysoft.com.cn/</div>
          <span>咨询与建议</span>
        </el-tooltip>
      </div>-->
    </el-container>
    <el-dialog
      title="创建新的成果图"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
    >
      <div class="item-box" style="margin-left:10px">
        成果图名称：
        <el-input style="width: 50%;" placeholder="井口井位图" v-model="input21"></el-input>
      </div>
      <div class="item-box" style="margin:20px 10px">
        <div>
          <el-radio class="item-box" v-model="radio2" label="1">井口井位图</el-radio>
        </div>
        <div>
          <el-radio class="item-box" v-model="radio2" label="2">全井井位图（含井轨迹）</el-radio>
        </div>
        <div>
          <el-radio v-model="radio2" label="3">指定跟端/趾端深度井位图（含井轨迹）</el-radio>
        </div>
      </div>
      <div class="item-box check-box" style="margin:0px 10px 0px 10px">
        <el-radio-group v-model="checkList">
          <el-radio :disabled="radio2!=='3'" class="item-box" style="margin:0px 10px" :label="1">跟端</el-radio>
          <el-radio :disabled="radio2!=='3'" class="item-box" style="margin:0px 10px" :label="2">趾端</el-radio>
        </el-radio-group>
      </div>
      <span style="margin-right:43px;" class="text-label">比例尺:</span>
      <el-input v-model="mapScale" type="number" size="smale" style="width:200px"></el-input>
      <div class="area-box">
        <div class="left-area">
          <div class="item-box">油田选择：</div>
          <div class="left-area-checklist">
            <el-radio-group v-model="workArea">
              <el-radio
                v-for="item in leftCheckData"
                :key="item.ID"
                :label="item.MC"
                @click.native.prevent="clickLeftCheckData(item)"
                style="width:100px"
              >{{ item.MC }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="right-area">
          <div class="item-box">选择Pad/井场</div>
          <div class="right-area-checklist">
            <el-radio-group v-model="slectArea">
              <el-radio
                v-for="item in rightCheckData"
                :key="item.ID"
                @click.native.prevent="clickitem(item)"
                :label="item.MC"
                style="width:100px"
              >{{ item.MC }}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreate" size="small" style="margin:10px">创 建</el-button>
      </span>
    </el-dialog>
    <el-dialog title="测试" :visible.sync="showVisible" width="30%">
      <span>测试</span>
    </el-dialog>
    <el-dialog title="新建开采现状图模版" :visible.sync="saveKCXZTDialog" width="30%">
      <span style="margin-left:20px">
        模版名称:
        <el-select
          v-model="templateKCXZT"
          filterable
          allow-create
          default-first-option
          placeholder="请选择"
          size="small"
          style="width:300px;margin-left:20px"
        >
          <el-option
            v-for="item in SaveTemplateData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveKCXZTDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="saveKCXZTBUtton" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建井位模版" :visible.sync="saveWellDialog" width="30%">
      <span style="margin-left:20px">
        模版名称:
        <el-select
          v-model="templateWell"
          filterable
          allow-create
          default-first-option
          placeholder="请选择"
          size="small"
          style="width:300px;margin-left:20px"
        >
          <el-option
            v-for="item in SaveWellTemplateData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveWellDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="saveWellBUtton" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建图框模版" :visible.sync="saveViewDialog" width="30%">
      <span style="margin-left:20px">
        模版名称:
        <el-select
          v-model="templateView"
          filterable
          allow-create
          default-first-option
          placeholder="请选择"
          size="small"
          style="width:300px;margin-left:20px"
        >
          <el-option
            v-for="item in SaveViewTemplateData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveViewDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="saveViewBUtton" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="图层属性" :visible.sync="editTcNameDialog" width="30%">
      <span style="margin-left:20px">图层名称:</span>
      <el-input
        v-model="tcName"
        placeholder="请输入内容"
        style="margin-left:20px;width:200px"
        size="small"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editTcNameDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editTcName" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增图层" :visible.sync="layer.addTcNameDialog" width="30%">
      <span class="item-custom" style="display:flex">
      <span  style="margin-top:6px;margin-right:15px">图层名称:</span>
      <el-input
        v-model="layer.layerName"
        placeholder="请输入内容"
        style="width:150px"
        size="small"
      ></el-input>
      </span>
       <span class="item-custom" style="display:flex">
        <span  style="margin-top:6px;margin-right:15px">
          图层列表:
          <el-select
            v-model="layer.layerType"
            filterable
            allow-create
            default-first-option
            placeholder="请选择"
            size="small"
            style="margin-left:10px;width:150px"
          >
            <el-option
              v-for="item in layer.TcStyleOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
       </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="layer.addTcNameDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addTcNames" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="井号定位查找" :visible.sync="findWell.wellVisible" width="30%">
      <span  style="margin-top:6px;margin-right:15px">选择/输入井号:</span>
        <el-select
          v-model="findWell.WellName"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in findWell.WellList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button  icon="el-icon-search" @click="selectWellClick"></el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="searchPre" size="small" type="primary" plain>上一个</el-button>
        <el-button @click="searchNext" size="small" type="success" plain>下一个</el-button>
        <el-button @click="findWell.wellVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <coverage v-if="coverageVisible" :visible.sync="coverageVisible"></coverage>
    <loadingData
      v-if="loadingDataVisible"
      :visible.sync="loadingDataVisible"
      :type="loadingDataType"
      :message="_fView"
      @loadingForm="getLoading"
    ></loadingData>
    <jsx
      v-if="addJsxVisible"
      :visible.sync="addJsxVisible"
      :type="loadingDataType"
      :message="_fView"
    ></jsx>
    <jgjsx v-if="addJgjsxVisible" :visible.sync="addJgjsxVisible" :message="_fView"></jgjsx>
    <IsometricLineGenerator
      v-if="IsometricLineGeneratorVisible"
      :visible.sync="IsometricLineGeneratorVisible"
      :type="KHType"
      :message="_fView"
      @tcInit="tcInit"
    ></IsometricLineGenerator>
    <IsometricLineAttribute
      v-if="IsometricLineAttributeVisible"
      :visible.sync="IsometricLineAttributeVisible"
      :message="_fView"
    ></IsometricLineAttribute>
    <OutlineAttribute
      v-if="OutlineAttributeVisible"
      :visible.sync="OutlineAttributeVisible"
      :message="_fView"
    ></OutlineAttribute>
    <kcxztsx v-if="kcxztsxVisible" :visible.sync="kcxztsxVisible" :message="_fView"></kcxztsx>
    <MiningSituationChartApplication
      v-if="createKCXZTVisible"
      :visible.sync="createKCXZTVisible"
      :message="_fView"
      @formDataKCXZT="getCoverageKCXZT"
    ></MiningSituationChartApplication>
    <RouteMapImage
      v-if="createdRouteMapVisible"
      :visible.sync="createdRouteMapVisible"
      :message="_fView"
      @tcInit="tcInit"
    ></RouteMapImage>
    <RouteMapImageAttribute
      v-if="RouteMapImageAttributeVisible"
      :visible.sync="RouteMapImageAttributeVisible"
      :message="_fView"
    ></RouteMapImageAttribute>
    <RouteMapImageProperty
      v-if="RouteMapImagePropertyVisible"
      :visible.sync="RouteMapImagePropertyVisible"
      :message="_fView"
      @tcInit="tcInit"
    ></RouteMapImageProperty>
    <FrameAttribute
      v-if="FrameAttributeVisible"
      :visible.sync="FrameAttributeVisible"
      :message="createBorder"
      :tjmc="TJMC"
      @picture="getPicture"
    ></FrameAttribute>
    <isoplethFill
      v-if="isoplethFillDialog"
      :visible.sync="isoplethFillDialog"
      :message="_fView"
      @tcInit="tcInit"
    ></isoplethFill>
    <isometricLineFillingColor
      v-if="isometricLineFillingColorDialog"
      :visible.sync="isometricLineFillingColorDialog"
      :message="_fView"
    ></isometricLineFillingColor>
    <isometricLineFilling
      v-if="isometricLineFillingDialog"
      :visible.sync="isometricLineFillingDialog"
      :message="_fView"
    ></isometricLineFilling>
    <isometricLineFillingLegendAttribute
      v-if="IsometricLineLegendAttributeVisible"
      :visible.sync="IsometricLineLegendAttributeVisible"
      :message="_fView"
    ></isometricLineFillingLegendAttribute>
  </div>
</template>

<script>
import professionalDrawingHeader from "../../../common/professionalDrawingHeader";
import CloudSideBar from "../../../common/CloudSideBar";
import CloudSideBarExploitation from "../../../common/CloudSideBarExploitation";
import CloudSideBarWell from "../../../common/CloudSideBarWell";
import CloudSideBarYaLi from "../../../common/CloudSideBarYaLi";
import CloudContainer from "../../../common/CloudContainer";
import isoplethFill from "../../../dialog/IsometricLineFilling";
import isometricLineFillingColor from "../../../dialog/IsometricLineFillingColor";
import isometricLineFillingLegendAttribute from "../../../dialog/IsometricLineFillingLegendAttribute";
import isometricLineFilling from "../../../dialog/IsometricLineFillingPro";
import axios from "../../../../axios";
import require from "requirejss";
import $ from "jquery";
import coverage from "../../../dialog/coverage";
import jsx from "../../../dialog/jsx";
import jgjsx from "../../../dialog/jgjsx";
import loadingData from "../../../dialog/loadingData";
import IsometricLineGenerator from "../../../dialog/IsometricLineGenerator";
import IsometricLineAttribute from "../../../dialog/IsometricLineAttribute";
import OutlineAttribute from "../../../dialog/OutlineAttribute";
import kcxztsx from "../../../dialog/kcxztsx";
import MiningSituationChartApplication from "../../../dialog/MiningSituationChartApplication";
import RouteMapImage from "../../../dialog/RouteMapImage";
import RouteMapImageAttribute from "../../../dialog/RouteMapImageAttribute";
import RouteMapImageProperty from "../../../dialog/RouteMapImageProperty";
import FrameAttribute from "../../../dialog/FrameAttribute";
import { getUrlParam } from "../../../../lib/directive/GetUrlParam"; //vue中使用getUrlParam()方法来获取URL的值
import data_api from "../../../../assets/api/commonfunc_api";
export default {
  name: "CloudHome",
  data() {
    return {
      findWell:{
         wellVisible:false,
         WellName:'',
         WellList:[],
         loading:false,
      },
      layer:{
        layerType:0,
        layerName:'',
        TcStyleOption:[{
          value: 0,
          label: '通用图层'
        }, {
          value: 3,
          label: '断层线图层'
        }, {
          value: 4,
          label: '尖灭线图层'
        },{
          value: 5,
          label: '储层面积图层'
        },{
          value: 6,
          label: '含油零线图层'
        }, {
          value: 7,
          label: '含油面积图层'
        },{
          value: 8,
          label: '等值线图层'
        },{
          value: 22,
          label: '相控边界图层'
        }],
        addTcNameDialog:false,
      },
      coverageData: [
        {
          id: 1,
          label: "图层列表",
          status: "",
          children: []
        }
      ],
      checkedKeys: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tcName: "",
      editTc: {},
      editTcNameDialog: false,
      usercode: "",
      src: "12",
      dialogVisible: false,
      cloudSideBarShow: false,
      cloudSideBarShowType: 1,
      radio2: "3",
      mapScale: 5000,
      input21: "",
      resultPict: "",
      frameViewType: "",
      YTORPAD: "",
      YTORPADID: "",
      YTID: "",
      PADID: "",
      checkList: 2,
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      tableData: [],
      _fView: null,
      createBorder: null,
      loadingDataType: 1,
      icon: {
        pointer: "icon-pointer",
        Drag: "icon-Drag",
        magnifying: "icon-magnifying",
        shrink: "icon-shrink",
        allmap: "icon-allmap",
        selectAll: "icon-selectAll",
        straightLine: "icon-straightLine",
        rect: "icon-rect",
        look: "icon-look",
        Copy: "icon-Copy",
        Paste: "icon-Paste",
        Cut: "icon-Cut",
        Delete: "icon-Delete",
        Undo: "icon-Undo",
        Redo: "icon-Redo"
      },
      TemplateData: [
        {
          id: 100,
          label: "井位模版",
          status: "",
          children: []
        },
        {
          id: 102,
          label: "开采现状图模版",
          status: "",
          children: []
        },
        {
          id: 103,
          label: "图框模版",
          status: "",
          children: []
        }
      ],
      SaveTemplateData: [],
      SaveWellTemplateData: [],
      SaveViewTemplateData: [],
      templateKCXZT: "",
      templateWell: "",
      templateView: "",
      TJMC: "",
      GQMC: "",
      Author: "",
      CJRQ: "",
      PAD: "",
      VISITNUM: "",
      YTMC: "",
      TJLB: "",
      TEXT: "",
      isCollapse: true,
      menu: null,
      treedata: [],
      leftCheckData: [],
      rightCheckData: [],
      defaultPropsTemplate: {
        children: "children",
        label: "label"
      },
      cbDepthScale: "",
      cbScaling: "",
      cbDepthScaleOptions: [
        { value: 5000, label: "5000" },
        { value: 10000, label: "10000" },
        { value: 20000, label: "20000" },
        { value: 30000, label: "30000" },
        { value: 40000, label: "40000" },
        { value: 50000, label: "50000" }
      ],
      cbScalingOptions: [
        { value: "0.25", label: "25%" },
        { value: "0.5", label: "50%" },
        { value: "0.75", label: "75%" },
        { value: "1", label: "100%" },
        { value: "1.25", label: "125%" },
        { value: "1.5", label: "150%" },
        { value: "2", label: "200%" }
      ],
      workArea: null,
      slectArea: null,
      showVisible: false,
      coverageVisible: false, //图层列表
      loadingDataVisible: false, //加载属性数据
      addJsxVisible: false, //井属性
      addJgjsxVisible: false, //井轨迹属性
      IsometricLineGeneratorVisible: false, //生成等值线
      IsometricLineAttributeVisible: false, //等值线属性
      OutlineAttributeVisible: false, //轮廓线属性
      kcxztsxVisible: false, //开采现状图属性
      createKCXZTVisible: false, //开采现状图设置
      createdRouteMapVisible:false,//沿程图
      RouteMapImageAttributeVisible:false,//沿程图属性设置
      FrameAttributeVisible: false, //图框
      _fCommon: null, //fCommon
      saveKCXZTDialog: false, //新建开采现状图模版名称设置
      saveWellDialog: false, //新建井位模版
      saveViewDialog: false, //新建图框模版
      KHType: true, //是否采用趋势线图层
      isoplethFillDialog: false, //等值线填充
      isometricLineFillingColorDialog: false, //等值线填充颜色
      isometricLineFillingDialog: false, //等值线填充属性
      IsometricLineLegendAttributeVisible: false, //等值线填充颜色属性设置
      RouteMapImagePropertyVisible:false,//沿程图属性设置保存
    };
  },
  components: {
    professionalDrawingHeader,
    CloudSideBar,
    CloudSideBarWell,
    CloudSideBarYaLi,
    CloudSideBarExploitation,
    CloudContainer,
    coverage, //图层列表
    jsx, //井属性
    jgjsx, //井轨迹属性
    loadingData, //加载属性数据
    IsometricLineGenerator, //生成等值线
    IsometricLineAttribute, //等值线属性
    OutlineAttribute, //轮廓线属性
    kcxztsx, //开采现状图属性
    MiningSituationChartApplication, //开采现状图应用
    RouteMapImage,//沿程图
    RouteMapImageAttribute,//沿程图
    FrameAttribute, //图框
    isoplethFill, //等值线填充
    isometricLineFillingColor, //等值线颜色填充
    isometricLineFilling, //等值线填充属性
    isometricLineFillingLegendAttribute, //等值线填充设置
    RouteMapImageProperty,//沿程图属性设置
  },
  created() {
    const userInfo = this.$store.getters["APP/getLoginUser"];
    if (null != userInfo) {
      this.usercode = userInfo.usercode;
    }
    // 画布初始化
    this.handleCanvasInit();
    // 获取油田、井场信息
    this.getWorkAreaInfo();
    // 初始化专业模版信息
    this.initializeTemplate();

    this.loadingDataType = Number(this.$route.query.type);
    this.input21 = this.$route.query.name;
    this.frameViewType = this.$route.query.name;
    this.resultPict = this.$route.query.name;
    //获取路由中的type == 1 压力 or type == 2 注气量
    //type == 3 开采现状图
    //type == 4 产量分级图不需要显示 左侧操作菜单
    //type == 5 井口井位图 无业务流程 无等值线流程
    //type == 6 沿程图
    if (Number(this.$route.query.type) == 1) {
      this.cloudSideBarShow = true;
      this.cloudSideBarShowType = 1;
    } else if (Number(this.$route.query.type) == 2) {
      this.cloudSideBarShow = true;
      this.cloudSideBarShowType = 2;
    } else if (Number(this.$route.query.type) == 3) {
      this.cloudSideBarShow = true;
      this.cloudSideBarShowType = 3;
    } else if (Number(this.$route.query.type) == 4) {
      this.createCLFJMap(this.$route.query.jd);
    } else if (Number(this.$route.query.type) == 5) {
      this.cloudSideBarShow = true;
      this.cloudSideBarShowType = 5;
    } else if (Number(this.$route.query.type) == 6) {
      this.cloudSideBarShow = true;
      this.cloudSideBarShowType = 6;
    } else {
    }
    //from == 1 创建新的成果图
    //from == 2 则是 成果图呈现过来的 ，不需要创建新的成果图
    //from == 3 则是 钻遇砂体分析-绘制过来的 ，不需要创建新的成果图
    //否则不显示成果图 0
    if (Number(this.$route.query.from) == 1) {
      this.dialogVisible = true;
    } else if (Number(this.$route.query.from) == 2) {
      this.createdMap(this.$route.query.TJID);
    } else if (Number(this.$route.query.from) == 3) {
      this.createdYCT(this.$route.query.ycparam);
    } else {
    }
  },
  methods: {
    //井属性
    onClickJsx() {
      // 参数
      this.addJsxVisible = true;
    },
    //井轨迹属性
    onClickJgjsx() {
      this.addJgjsxVisible = true;
    },
    //样式驶入
    spanMouseenter(val, eve) {
      if (val == "pointer") {
        this.icon.pointer = "icon-pointer1";
      } else if (val == "Drag") {
        this.icon.Drag = "icon-Drag1";
      } else if (val == "magnifying") {
        this.icon.magnifying = "icon-magnifying1";
      } else if (val == "shrink") {
        this.icon.shrink = "icon-shrink1";
      } else if (val == "allmap") {
        this.icon.allmap = "icon-allmap1";
      } else if (val == "selectAll") {
        this.icon.selectAll = "icon-selectAll1";
      } else if (val == "straightLine") {
        this.icon.straightLine = "icon-straightLine1";
      } else if (val == "rect") {
        this.icon.rect = "icon-rect1";
      } else if (val == "look") {
        this.icon.look = "icon-look1";
      } else if (val == "Copy") {
        this.icon.Copy = "icon-Copy1";
      } else if (val == "Paste") {
        this.icon.Paste = "icon-Paste1";
      } else if (val == "Cut") {
        this.icon.Cut = "icon-Cut1";
      } else if (val == "Delete") {
        this.icon.Delete = "icon-Delete1";
      } else if (val == "Undo") {
        this.icon.Undo = "icon-Undo1";
      } else if (val == "Redo") {
        this.icon.Redo = "icon-Redo1";
      } else {
      }
    },
    //样式驶出
    spanMouseleave(val, eve) {
      if (val == "pointer") {
        this.icon.pointer = "icon-pointer";
      } else if (val == "Drag") {
        this.icon.Drag = "icon-Drag";
      } else if (val == "magnifying") {
        this.icon.magnifying = "icon-magnifying";
      } else if (val == "shrink") {
        this.icon.shrink = "icon-shrink";
      } else if (val == "allmap") {
        this.icon.allmap = "icon-allmap";
      } else if (val == "selectAll") {
        this.icon.selectAll = "icon-selectAll";
      } else if (val == "straightLine") {
        this.icon.straightLine = "icon-straightLine";
      } else if (val == "rect") {
        this.icon.rect = "icon-rect";
      } else if (val == "look") {
        this.icon.look = "icon-look";
      } else if (val == "Copy") {
        this.icon.Copy = "icon-Copy";
      } else if (val == "Paste") {
        this.icon.Paste = "icon-Paste";
      } else if (val == "Cut") {
        this.icon.Cut = "icon-Cut";
      } else if (val == "Delete") {
        this.icon.Delete = "icon-Delete";
      } else if (val == "Undo") {
        this.icon.Undo = "icon-Undo";
      } else if (val == "Redo") {
        this.icon.Redo = "icon-Redo";
      } else {
      }
    },
    //移动
    setSelect() {
      this._fCommon.SetSelect();
    },
    //放大
    setZoomout() {
      this._fCommon.ZoomOut();
    },
    //缩小
    setZoomin() {
      this._fCommon.ZoomIn();
    },
    //全图
    setZoomAll() {
      this._fCommon.ZoomAll();
    },
    //全选
    selectAll() {
      this._fCommon.SelectAll();
    },
    //图层列表
    coverage() {
      this.coverageVisible = true;
    },
    //复制
    copy() {
      this._fCommon.Copy();
    },
    //粘贴
    paste() {
      this._fCommon.Paste();
    },
    //剪切
    cut() {
      this._fCommon.Cut();
    },
    //删除
    deletes() {
      this._fCommon.Delete();
    },
    //撤销
    Undo() {
      this._fView.View.RUManager.Undo(); //撤销
      this._fView.View.Repaint();
    },
    //恢复
    Redo() {
      this._fView.View.RUManager.Redo(); //恢复
      this._fView.View.Repaint();
    },
    //深度比例尺下拉框初始化
    cbDepthScaleChange: function(rec) {
      //平移回最初
      this._fView.View.ScrollView(
        this._fView.View.HScrollValue,
        this._fView.View.VScrollValue
      );
      this._fView.View.Repaint();
      //设置新的比例尺
      this._fView.View.MapData.SetMapToEarthScale(rec, rec);
      this._fView.View.MapData.UpdateTransform();
      this._fView.View.Repaint();
      //根据当前屏幕的大小和实际视图的大小，移动
      var width =
        this._fView.View.m_clientRect.Right -
        this._fView.View.m_clientRect.Left;
      var height =
        this._fView.View.m_clientRect.Bottom -
        this._fView.View.m_clientRect.Top;
      this._fView.View.ScrollView(
        0.5 * (width - this._fView.View.MapData.ViewWidth),
        0.5 * (height - this._fView.View.MapData.ViewHeight)
      );
      this._fView.View.Repaint();
    },
    //缩放比例尺下拉框初始化
    cbScalingChange: function(rec) {
      fView.View.MapData.ViewScale = rec;
      fView.View.MapData.UpdateTransform();
      fView.View.Repaint();
    },
    // 初始化专业模版
    initializeTemplate: function() {
      for (let i = 0; i < this.TemplateData.length; i++) {
        var style = this.TemplateData[i].id;
        let params = {
          style: style
        };
        data_api
          .getTemplateNoData(params)
          .then(res => {
            if (res.data.State == "success") {
              this.TemplateData[i].children = [];
              for (let l = 0; l < res.data.Data.length; l++) {
                let obj = new Object();
                obj.id = res.data.Data[l].ID;
                obj.label = res.data.Data[l].Name;
                obj.IsEnabled = res.data.Data[l].IsEnabled;
                obj.Style = res.data.Data[l].Style;
                obj.status = "1";
                obj.children = [];
                this.TemplateData[i].children.push(obj);
              }
            } else {
              this.$message({
                type: "error",
                message: res.data.Message
              });
            }
          })
          .catch(error => {
            // console.log(error);
          });
      }
    },
    //修改专业模版
    updateTemplate: function(data) {
      for (let i = 0; i < this.TemplateData.length; i++) {
        if (Number(data.Style) == this.TemplateData[i].id) {
          var children = this.TemplateData[i].children;
          this.TemplateData[i].children = [];
          for (let l = 0; l < children.length; l++) {
            let obj = new Object();
            obj.id = children[l].id;
            obj.label = children[l].label;
            if (data.id == children[l].id) {
              obj.IsEnabled = true;
            } else {
              obj.IsEnabled = false;
            }
            obj.Style = children[l].Style;
            obj.status = "1";
            obj.children = [];
            this.TemplateData[i].children.push(obj);
          }
        }
      }
    },
    // 画布初始化
    handleCanvasInit: function() {
      let _this = this;
      require.config({
        baseUrl: "",
        waitSeconds: 0,
        paths: {
          myCanvas: "static/frameView/IsoFrameCom/jquery/myCanvas",
          easyui: "static/frameView/IsoFrameCom/jquery/jquery.easyui.min",
          WGAD: "static/frameView/IsoFrameCom"
        },
        shim: {
          myCanvas: [],
          "WGAD/Scripts/WGADPlatGraph2D/WGADPlatGraph2D": [],
          "WGAD/Scripts/WGADPlatGMEngineTools/WGADPlatGMEngineTools": []
        }
      });

      var deps = [
        "myCanvas",
        "WGAD/Scripts/WGADPlatConfig/WGADPlatConfig",
        "WGAD/Scripts/WGADPlatGMEngine",
        "WGAD/Scripts/WGADPlatGMEngineTools",
        "WGAD/Scripts/WGADPlatGraph2D",
        "WGAD/Scripts/WGADPlatGraph2DFrame",
        "WGAD/Scripts/WGADPlatSystemTools",
        "WGAD/Com/WGADPlatComFrame",
        "WGAD/Com/com-common"
      ];
      require(deps, function(
        mc,
        WGADPlatConfig,
        WGADPlatGMEngine,
        WGADPlatGMEngineTools,
        WGADPlatGraph2D,
        WGADPlatGraph2DFrame,
        WGADPlatSystemTools,
        Com,
        commonJs
      ) {
        var viewSetting = {};
        viewSetting.CanvasID = "MapCanvas";
        viewSetting.CanvasStyle = "Html5 Canvas 2D";
        // 设置画布的宽高
        let mapCanvas = document.getElementById("MapCanvas");
        let contentDiv = document.getElementById("contentDiv");
        let panelMenu = document.getElementById("panelMenu");
        mapCanvas.width = contentDiv.offsetWidth;
        mapCanvas.height = contentDiv.offsetHeight;

        fView = new Com.WGADPlatComFrame(viewSetting, this);
        fCommon = new commonJs.ViewCommonJs(fView, this);

        WGADPlatGMEngineTools.Canvas = fView.View;
        // fView.openMidWinFun = _this.showAttributeDialog();
        _this._fView = fView;
        _this._fCommon = fCommon;
        fView.openMidWinFunJSX = _this.onClickJsx;
        fView.openMidWinFunJGJSX = _this.onClickJgjsx;
        fView.openMidWinFunDZX = _this.propertyDZX;
        fView.openMidWinFunLKX = _this.propertyLKX;
        fView.openMidWinFunRouteMapImage = _this.editRouteMapImage;
        fView.openMidWinFunKCXZT = _this.kcxztsx;
        fView.openMidWinFunBorder = _this.FrameAttribute;
        fView.openMidWinFunLineFill = _this.IsometricLineLegendAttribute;
        fView.openMidWinFunIsoLineFill = _this.IsometricLineFilling;
        fView.openCutOutImage = _this.cutOutImage;
      });
    },
    // 获取油田、井场信息
    getWorkAreaInfo() {
      let params = {
        type: "油田"
      };
      data_api
        .getAllName(params)
        .then(res => {
          if (res && res.data) {
            if (res.data.State == "success") {
              this.leftCheckData = res.data.Data;
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          } else {
          }
        })
        .catch(error => {
          // console.log(error);
        });
    },
    handleCreate() {
      if (this.workArea == null) {
        this.$message({
          type: "warning",
          message: "请选择油田"
        });
        return;
      }

      this.dialogVisible = false;
      // 创建图层信息
      this.createMap();
    },
    // 创建图层信息
    createMap() {
      debugger;
      //加载延迟时页面 loading
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      var url = "";
      var mapname = "";
      var frametype = "";
      var type = this.YTORPAD;
      var id = this.YTORPADID;
      var mc = this.YTMC;
      var frameViewType = this.frameViewType;
      var cjr = this.usercode;
      if (this.radio2 == "1") {
        mapname = "井口井位图";
        frametype = "wellmap";
      } else if (this.radio2 == "2") {
        mapname = "全井轨迹图";
        frametype = "allwellmap";
      } else if (this.radio2 == "3") {
        if (this.checkList == "1") {
          mapname = "跟端轨迹图";
          frametype = "wellmapG";
        } else if (this.checkList == "2") {
          mapname = "趾端轨迹图";
          frametype = "wellmapZ";
        }
      }
      let params = {
        mapname: this.input21,
        frametype: frametype,
        type: type,
        id: id,
        mc: mc,
        frameViewType: frameViewType,
        cjr: cjr,
        mapScale: Number(this.mapScale)
      };
      data_api
        .createWellMap(params)
        .then(res => {
          // console.log(JSON.stringify(res.data.Data));
          if (res.data.State == "success") {
            this._fView["PageKey"] = res.data.Data.PageKey;
            this._fView["TJID"] = res.data.Data.TJID;

             this._fView.View.EventObjectDataChange = function(obj) {
               this._fView.UpdataRedis(
                "http://192.152.1.10:7001/commonfunc/saveRedisByObjChange",
                res.data.Data.PageKey,
                obj
              );
            };
             this._fView.View.EventObjectDrawAfter = function(obj) {
               this._fView.UpdataRedis(
                "http://192.152.1.10:7001/commonfunc/saveRedisByObjChange",
                res.data.Data.PageKey,
                obj.HiteObj
              );
            };
             this._fView.View.EventObjectDeleteAfter = function(objs) {
              var deleteArr = [];
              for (var i = 0; i < objs.length; i++) {
                deleteArr.push(objs[i].ObjID);
              }
              var obj = objs[0];
              obj.DeleteObjID = deleteArr;
               this._fView.UpdataRedis(
                "http://192.152.1.10:7001/commonfunc/saveRedisByObjChange",
                res.data.Data.PageKey,
                obj
              );
            };
             this._fView.View.RUManager.RecordCommond = false;
             this._fView.LoadFrameData(res.data.Data.TJData);
             this._fView.ApplyWellTemplate(res.data.Data.Template, 0);//应用模版
             this._fView.View.MakeAviod();//井号避让
             this._fView.ZoomAll();//全图
             this._fView.View.MapData.SetChanged(false);
             this._fView.View.RUManager.RecordCommond = true;
            this.cbDepthScale = res.data.Data.TJData.XScaleMapToEarth;
            this.cbScaling = String(res.data.Data.TJData.ViewScale);
            //查询 图形列表
            var LayerList = res.data.Data.TJData.LayerList;
            for (let i = 0, l = LayerList.length; i < l; i++) {
              // 1  井位图层
              if (LayerList[i].LayerType == "1") {
                this._fView["WellTCID"] = LayerList[i].ObjID;
              }
              // 2 井轨迹图层
              if (LayerList[i].LayerType == "2") {
                this._fView["JgjTCID"] = LayerList[i].ObjID;
              }
              // 8 生成等值线
              if (LayerList[i].LayerType == "8") {
                this._fView["IsoTCID"] = LayerList[i].ObjID;
                this._fView["IsoName"] = LayerList[i].LayerName;
              }
            }
            //图件概述
            this.TJDetail(res.data.Data.TJMS);

            //得到SJGL 后获取当前  可能用到的图件信息
            this.selectTreeData(res.data.Data.TJData.SJGL);

            //图层初始化
            this.tcInit();
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
          //loading 结束
          loading.close();
        })
        .catch(error => {
          this.$message({
            type: "warning",
            message: "与后方沟通超时"
          });
          //loading 结束
          loading.close();
        });
    },
    //获取当前所有的 数据进行H5 呈图
    createdMap(TJID) {
      let params = {
        tjid: TJID,
        account: this.usercode
      };
      data_api
        .openTJ(params)
        .then(res => {
          if (res.data.State == "success") {
            this._fView["PageKey"] = res.data.Data.PageKey;
            this._fView["TJID"] = res.data.Data.TJID;
            //查询 图形列表
            var LayerList = res.data.Data.TJData.LayerList;
            for (let i = 0, l = LayerList.length; i < l; i++) {
              if (LayerList[i].LayerType == "10") {
                this._fView["KCTCID"] = LayerList[i].ObjID;
              }
            }
            // this.createdMapRes(res);
            this._fView.View.RUManager.RecordCommond = false;
            this._fView.LoadFrameData(res.data.Data.TJData);
            this._fView.View.MakeAviod();//井号避让
            this._fView.ZoomAll();
            this._fView.View.MapData.SetChanged(false);
            this._fView.View.Repaint();
            this._fView.View.RUManager.RecordCommond = true;
            //图件概述
            this.TJDetail(res.data.Data.TJMS);
            //得到SJGL 后获取当前  可能用到的图件信息
            this.selectTreeData(res.data.Data.TJData.SJGL);
          } else {
            this.$message({
              type: "error",
              message: res.data.Message
            });
          }
        })
        .catch(res => {});
    },
    createdYCT(params){
      data_api
        .createYCMap(JSON.parse(params))
        .then(res => {
          if (res.data.State == "success") {
            this._fView["PageKey"] = res.data.Data.PageKey;
            this._fView["TJID"] = res.data.Data.TJID;

            fView.View.EventObjectDataChange = function(obj) {
              fView.UpdataRedis(
                "http://192.152.1.10:7001/commonfunc/saveRedisByObjChange",
                res.data.Data.PageKey,
                obj
              );
            };
            fView.View.EventObjectDrawAfter = function(obj) {
              fView.UpdataRedis(
                "http://192.152.1.10:7001/commonfunc/saveRedisByObjChange",
                res.data.Data.PageKey,
                obj.HiteObj
              );
            };
            fView.View.EventObjectDeleteAfter = function(objs) {
              var deleteArr = [];
              for (var i = 0; i < objs.length; i++) {
                deleteArr.push(objs[i].ObjID);
              }
              var obj = objs[0];
              obj.DeleteObjID = deleteArr;
              fView.UpdataRedis(
                "http://192.152.1.10:7001/commonfunc/saveRedisByObjChange",
                res.data.Data.PageKey,
                obj
              );
            };
            fView.View.RUManager.RecordCommond = false;
            fView.LoadFrameData(res.data.Data.TJData);
            fView.ApplyWellTemplate(res.data.Data.Template, 0);//应用模版
            fView.View.MakeAviod();//井号避让
            fView.ZoomAll();
            fView.View.MapData.SetChanged(false);
            fView.View.RUManager.RecordCommond = true;
            this.cbDepthScale = res.data.Data.TJData.XScaleMapToEarth;
            this.cbScaling = String(res.data.Data.TJData.ViewScale);
            //查询 图形列表
            var LayerList = res.data.Data.TJData.LayerList;
            for (let i = 0, l = LayerList.length; i < l; i++) {
              // 1  井位图层
              if (LayerList[i].LayerType == "1") {
                this._fView["WellTCID"] = LayerList[i].ObjID;
              }
              // 2 井轨迹图层
              if (LayerList[i].LayerType == "2") {
                this._fView["JgjTCID"] = LayerList[i].ObjID;
              }
              // 8 生成等值线
              if (LayerList[i].LayerType == "8") {
                this._fView["IsoTCID"] = LayerList[i].ObjID;
                this._fView["IsoName"] = LayerList[i].LayerName;
              }
            }
            //图件概述
            this.TJDetail(res.data.Data.TJMS);

            //得到SJGL 后获取当前  可能用到的图件信息
            this.selectTreeData(res.data.Data.TJData.SJGL);

            //图层初始化
            this.tcInit();
          } else {
            this.$message({
              type: "error",
              message: res.data.Message
            });
          }
        })
        .catch(res => {});
    },
    //可能用到的图件
    selectTreeData(SJGL) {
      let params = {
        sjgl: SJGL
      };
      data_api
        .getSameFrameViewTypeTJ(params)
        .then(response => {
          if (response.data.State == "success") {
            this.treedata = response.data.Data;
          } else {
            this.$message({
              type: "error",
              message: response.data.Message
            });
          }
        })
        .catch(response => {});
    },
    showAttributeDialog() {
      this.showVisible = true;
    },
    //PAD 单选按钮 取消反选
    clickitem(e) {
      e.MC === this.slectArea ? (this.slectArea = "") : (this.slectArea = e.MC);
      this.input21 =
        this.slectArea == ""
          ? this.workArea + "-" + this.resultPict
          : this.slectArea + "-" + this.resultPict;
      this.YTMC = this.slectArea == "" ? this.workArea : this.slectArea;
      this.YTORPADID = this.slectArea == "" ? this.YTID : e.ID;
      this.YTORPAD = this.slectArea == "" ? "油田" : "Pad";
    },
    //点击油田选择 触发 找到对应的PAD/井场
    clickLeftCheckData(e) {
      for (let i = 0; i < this.leftCheckData.length; i++) {
        if (this.leftCheckData[i].ID == e.ID) {
          this.workArea = e.MC;
          this.input21 = this.workArea + "-" + this.resultPict;
          this.YTMC = this.workArea;
          this.YTORPAD = "油田";
          this.YTORPADID = this.leftCheckData[i].ID;
          this.YTID = this.leftCheckData[i].ID;
          this.rightCheckData = this.leftCheckData[i].Pad;
        }
      }
    },
    handleLayer() {
      fView.ShowLayerList();
    },
    //保存图件
    saveMap() {
      var objjson = {};
      this._fView.View.MapData.JsonObjSave(objjson);
      var PageKey = this._fView.PageKey;
      var TJID = this._fView.TJID;
      var TJData = objjson;
      var TJMC = this.TJMC;

      //判断图件名称是否重复
      let params = {
        tjid: TJID,
        tjmc: TJMC
      };
      data_api
        .isExistMapName(params)
        .then(response => {
          if (response.data.State == "success") {
            if (response.data.Data == "false") {
              let params = new Object();
              params.PageKey = PageKey;
              params.TJID = TJID;
              params.TJMC = TJMC;
              params.CJR = this.usercode;
              params.TEXT = this.TEXT;
              params.TJData = TJData;
              data_api
                .saveMap(params)
                .then(response => {
                  if (response.data.State == "success") {
                    if (response.data.Data == "success") {
                      this.$message({
                        type: "success",
                        message: "保存成功"
                      });
                    } else {
                      this.$message({
                        type: "error",
                        message: "保存失败"
                      });
                    }
                  } else {
                    this.$message({
                      type: "error",
                      message: response.data.Message
                    });
                  }
                })
                .catch(response => {
                  // console.log(response);
                });
            } else {
              this.$message({
                type: "warning",
                message: "图件名称重复"
              });
            }
          } else {
            this.$message({
              type: "error",
              message: response.data.Message
            });
          }
        })
        .catch(response => {
          // console.log(response);
        });
    },
    recursive: function(_data) {
      for (let i = 0, l = _data.length; i < l; i++) {
        if (_data[i].Maps && _data[i].Maps.length > 0) {
          _data[i].Maps = this.formatterJson(_data[i].Maps);
          _data[i].Folders = _data[i].Folders.concat(_data[i].Maps);
        }
        if (_data[i].Folders && _data[i].Folders.length > 0) {
          this.recursive(_data[i].Folders);
        }
      }
      return _data;
    },
    formatterJson: function(data) {
      for (var i = 0, l = data.length; i < l; i++) {
        data[i] = data[i];
        data[i]["MLMC"] = data[i]["TJMC"];
        data[i]["MLID"] = data[i]["TJID"];
      }
      return data;
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    edit() {
      this.flag = false;
    },
    input() {
      var oText = document.getElementById("TJMC");
      this.TJMC = oText.value;
      this.flag = true;
    },
    edit1() {
      this.flag1 = false;
    },
    input1() {
      var oText = document.getElementById("GQMC");
      this.GQMC = oText.value;
      this.flag1 = true;
    },
    edit2() {
      this.flag2 = false;
    },
    input2() {
      var oText = document.getElementById("Author");
      this.Author = oText.value;
      this.flag2 = true;
    },
    edit3() {
      this.flag3 = false;
    },
    input3() {
      var oText = document.getElementById("CJRQ");
      this.CJRQ = oText.value;
      this.flag3 = true;
    },
    edit4() {
      this.flag4 = false;
    },
    input4() {
      var oText = document.getElementById("TEXT");
      this.TEXT = oText.value;
      this.flag4 = true;
    },

    ViewShare() {
      this.$confirm("确认分享该图件？")
        .then(_ => {
          //done();
        })
        .catch(_ => {});
    },
    //截取缩略图
    cutRectSelect(){
       var SLT = this._fCommon.RectSelect();
    },
    //截取缩略图
    cutOutImage(SLT){
      let params = {
        TJID: this._fView.TJID,
        SLT: SLT
      };
      data_api
        .saveMapThumbnail(params)
        .then(response => {
            if (response.data.State == "success") {
              if (response.data.Data == "success") {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "保存失败"
                });
              }
            } else {
              this.$message({
                type: "error",
                message: response.data.Message
              });
            }
          })
          .catch(response => {
            // console.log(response);
          });
    },
    //获取 CloudSideBar 子组件返回的点击事件 当前点击的参数
    getOnClickPath(path) {
      //loadingData -- 加载属性数据
      if (path == "loadingData") {
        this.loadingDataVisible = true;
      } else if (path == "createDZX") {
        //生成等值线
        this.createDZX();
      } else if (path == "propertyDZX") {
        //等值线属性
        this.propertyDZX();
      } //轮廓线属性
      else if (path == "propertyLKX") {
        this.propertyLKX();
      } //开采现状图属性
      else if (path == "kcxztsx") {
        this.kcxztsx();
      } else if (path == "createKCXZT") {
        //开采现状图应用
        this.createKCXZT();
      } else if (path == "createdRouteMap") {
        //沿程图
        this.createdRouteMap();
      } else if (path == "AddPoint") {
        //加点
        this._fCommon.AddPoint();
      } else if (path == "DeletePoint") {
        //减点
        this._fCommon.DeletePoint();
      } else if (path == "DeleteManyPoint") {
        //区域减多点
        this._fCommon.DeleteManyPoint();
      } else if (path == "DrawBreak") {
        //绘制断层线
        this._fCommon.DrawBreak();
      } else if (path == "DrawJMX") {
        //绘制尖灭线
        this._fCommon.DrawJMX();
      } else if (path == "DrawHYLX") {
        //绘制含油零线
        this._fCommon.DrawHYLX();
      } else if (path == "DrawIso") {
        //绘制等值线
        this._fCommon.DrawIso();
      } else if (path == "DrawCCMJ") {
        //绘制储层面积
        this._fCommon.DrawCCMJ();
      } else if (path == "DrawHYMJ") {
        //绘制含油面积
        this._fCommon.DrawHYMJ();
      } else if (path == "DrawLKX") {
        //绘制轮廓线
        this._fCommon.DrawLKX();
      } else if (path == "DrawQSX") {
        //绘制趋势线
        this._fCommon.DrawQSX();
      } else if (path == "DrawQSD") {
        //绘制趋势点
        this._fCommon.DrawQSD();
      } else if (path == "DrawJW") {
        //绘制井位
        this._fCommon.DrawJW();
      } else if (path == "DrawAriHole") {
        //面积圈空
        this._fCommon.DrawAriHole();
      } else if (path == "DrawRect") {
        //矩形
        this._fCommon.DrawRect();
      } else if (path == "SelectAll") {
        //全选
        this._fCommon.SelectAll();
      } else if (path == "RectSelect") {
        //矩形选择
        this._fCommon.RectSelect();
      } else if (path == "AreaSelect") {
        //多边形区域选择
        this._fCommon.AreaSelect();
      } else if (path == "DrawPoint") {
        //绘制点
        this._fCommon.DrawPoint();
      } else if (path == "DrawLine") {
        //绘制直线
        this._fCommon.DrawLine();
      } else if (path == "DrawPolyLine") {
        //绘制折线
        this._fCommon.DrawPolyLine();
      } else if (path == "DrawArc") {
        //绘制圆弧
        this._fCommon.DrawArc();
      } else if (path == "DrawRect") {
        //绘制矩形
        this._fCommon.DrawRect();
      } else if (path == "DrawPolygon") {
        //绘制多边形
        this._fCommon.DrawPolygon();
      } else if (path == "DrawCircle") {
        //绘制圆
        this._fCommon.DrawCircle();
      } else if (path == "DrawEllipse") {
        //绘制椭圆
        this._fCommon.DrawEllipse();
      } else if (path == "DrawPie") {
        //绘制饼图
        this._fCommon.DrawPie();
      } else if (path == "DrawPic") {
        //绘制图片
        this._fCommon.DrawPic();
      } else if (path == "DrawTable") {
        //绘制表格
        this._fCommon.DrawTable();
      } else if (path == "DrawText") {
        //绘制普通文本
        this._fCommon.DrawText();
      } else if (path == "saveKCXZTTemplate") {
        //保存开采现状图模版
        this.saveKCXZTTemplate();
      } else if (path == "updateKCXZTTemplate") {
        //更新开采现状图模版
        this.updateKCXZTTemplate();
      } else if (path == "setProWell") {
        //设置井位属性
        this.onClickJsx();
      } else if (path == "saveWellTemplate") {
        //保存井位模版
        this.saveWellTemplate();
      } else if (path == "updateAllWellTemplate") {
        //应用本样式到所有井位-全部井 type:0
        this.updateWellTemplate(0);
      } else if (path == "updateSameWellTypeTemplate") {
        //应用本样式到所有井位-同种井别 type:2
        this.updateWellTemplate(2);
      } else if (path == "updateSameJsjgTemplate") {
        //应用本样式到所有井位-同种解释 type:3
        this.updateWellTemplate(3);
      } else if (path == "saveViewTemplate") {
        //保存图框模版
        this.saveViewTemplate();
      } else if (path == "updateViewTemplate") {
        //应用本样式到图框
        this.updateViewTemplate();
      } else if (path == "exportAchievement") {
        //导出成果图
        this.exportAchievement();
      } else if (path == "contourLineHide") {
        //轮廓线隐藏
        this.contourLine(true);
      } else if (path == "contourLineShow") {
        //轮廓线显示
        this.contourLine(false);
      } else if (path == "isoplethFill") {
        //等值线填充
        this.isoplethFillDialog = true;
      } else if (path == "isometricLineFilling") {
        //等值线填充颜色
        this.isometricLineFillingDialog = true;
      } else if (path == "isometricLineFillingColor") {
        //等值线填充颜色
        this.isometricLineFillingColorDialog = true;
      } else if (path == "RouteMapImageProperty") {
        //沿程图 模版设置
        this.RouteMapImagePropertyVisible = true;
      } else {

      }
    },
    contourLine(verdict) {
      //查询 图形列表
      var LayerList = this._fView.View.MapData.LayerList;
      for (let i = 0; i < LayerList.length; i++) {
        if (LayerList[i].ObjType == 101) {
          for (let l = 0; l < LayerList[i].Childrens.length; l++) {
            if (LayerList[i].Childrens[l].ObjType == 135) {
              this._fView.View.MapData.LayerList[i].Childrens[
                l
              ].Hidden = verdict;
              this._fView.View.Repaint();
              return;
            }
          }
        }
      }
    },
    //保存开采现状图模版
    saveKCXZTTemplate() {
      this.SaveTemplateData = [];
      for (let i = 0; i < this.TemplateData.length; i++) {
        if (this.TemplateData[i].id == 102) {
          var childrens = this.TemplateData[i].children;
          for (let l = 0; l < childrens.length; l++) {
            var obj = new Object();
            obj.label = childrens[l].label;
            obj.value = childrens[l].label;
            obj.id = this.TemplateData[i].id;
            obj.status = "1";
            this.SaveTemplateData.push(obj);
          }
        }
      }
      this.saveKCXZTDialog = true;
    },
    saveViewTemplate() {
      this.SaveViewTemplateData = [];
      for (let i = 0; i < this.TemplateData.length; i++) {
        if (this.TemplateData[i].id == 103) {
          var childrens = this.TemplateData[i].children;
          for (let l = 0; l < childrens.length; l++) {
            var obj = new Object();
            obj.label = childrens[l].label;
            obj.value = childrens[l].label;
            obj.id = this.TemplateData[i].id;
            obj.status = "1";
            this.SaveViewTemplateData.push(obj);
          }
        }
      }
      this.saveViewDialog = true;
    },
    //保存井位模版
    saveWellTemplate() {
      this.SaveWellTemplateData = [];
      for (let i = 0; i < this.TemplateData.length; i++) {
        if (this.TemplateData[i].id == 100) {
          var childrens = this.TemplateData[i].children;
          for (let l = 0; l < childrens.length; l++) {
            var obj = new Object();
            obj.label = childrens[l].label;
            obj.value = childrens[l].label;
            obj.id = this.TemplateData[i].id;
            obj.status = "1";
            this.SaveWellTemplateData.push(obj);
          }
        }
      }
      this.saveWellDialog = true;
    },
    updateKCXZTTemplate() {
      if (this._fView.View.HiteResult.SelectObjs.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择一个视图作为模版"
        });
        return;
      }
      var objjson = {};
      this._fView.View.HiteResult.SelectObjs[0].JsonObjSave(objjson);
      var PageKey = this._fView.PageKey;
      var TJID = this._fView.TJID;
      var KCTCID = this._fView.KCTCID;

      let params = new Object();
      params.PageKey = PageKey;
      params.TJID = TJID;
      params.KCTCID = KCTCID;
      params.KCTemplate = objjson;
      data_api
        .useCurrentExpTemplate(params)
        .then(response => {
          if (response.data.State == "success") {
            this._fView.ExpLayerLoad(response.data.Data);
          } else {
            this.$message({
              type: "error",
              message: response.data.Message
            });
          }
        })
        .catch(response => {
          // console.log(response);
        });
    },
    updateWellTemplate(type) {
      var objs = null;
      var obj = this._fView.View.HiteResult.SelectObjs[0];
      if (obj.ObjType == 110) {
        objs = obj;
      } else {
        objs = obj.Parent;
      }
      var objjson = {};
      objs.JsonObjSave(objjson);
      fView.ApplyWellTemplate(objjson, type);
    },
    //产量分级图
    createCLFJMap(data) {
      debugger;
      //加载延迟时页面 loading
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      let params = {
        JD: JSON.parse(data),
        CJR: this.usercode
      };
      data_api
        .createCLFJMap(params)
        .then(res => {
          if (res.data.State == "success") {
            this._fView["PageKey"] = res.data.Data.PageKey;
            this._fView["TJID"] = res.data.Data.TJID;
            fView.View.EventObjectDataChange = function(obj) {
              fView.UpdataRedis(
                "http://192.152.1.10:7001/commonfunc/saveRedisByObjChange",
                res.data.Data.PageKey,
                obj
              );
            };
            fView.View.EventObjectDrawAfter = function(obj) {
              fView.UpdataRedis(
                "http://192.152.1.10:7001/commonfunc/saveRedisByObjChange",
                res.data.Data.PageKey,
                obj.HiteObj
              );
            };
            fView.View.EventObjectDeleteAfter = function(obj) {
              fView.UpdataRedis(
                "http://192.152.1.10:7001/commonfunc/saveRedisByObjChange",
                res.data.Data.PageKey,
                obj
              );
            };
            fView.View.RUManager.RecordCommond = false;
            fView.LoadFrameData(res.data.Data.TJData);
            fView.ApplyWellTemplate(res.data.Data.Template, 0);//应用模版
            fView.View.MakeAviod();//井号避让
            fView.ZoomAll();
            fView.View.MapData.SetChanged(false);
            fView.View.RUManager.RecordCommond = true;
            //查询 图形列表
            var LayerList = res.data.Data.TJData.LayerList;
            //初始化 图形列表
            for (let i = 0, l = LayerList.length; i < l; i++) {
              // 1  井位图层
              if (LayerList[i].LayerType == "1") {
                this._fView["WellTCID"] = LayerList[i].ObjID;
              }
              // 2 井轨迹图层
              if (LayerList[i].LayerType == "2") {
                this._fView["JgjTCID"] = LayerList[i].ObjID;
              }
              // 8 生成等值线
              if (LayerList[i].LayerType == "8") {
                this._fView["IsoTCID"] = LayerList[i].ObjID;
                this._fView["IsoName"] = LayerList[i].LayerName;
              }
            }
            //图件概述
            this.TJDetail(res.data.Data.TJMS);
          } else {
            this.$message({
              type: "error",
              message: res.data.Message
            });
          }
          //loading 结束
          loading.close();
        })
        .catch(error => {
          // console.log(error);
          this.$message({
            type: "warning",
            message: "与后方沟通超时"
          });
          //loading 结束
          loading.close();
        });
    },
    //图件概述详情
    TJDetail(TJMS) {
      this.GQMC = TJMS.YTMC;
      this.TJMC = TJMS.TJMC;
      this.TJLB = TJMS.TJLB;
      this.CJRQ = TJMS.CJRQ;
      this.PAD = TJMS.PAD;
      this.YTMC = TJMS.YTMC;
      this.TEXT = TJMS.TEXT;
      this.Author = TJMS.Author;
      this.VISITNUM = TJMS.VISITNUM;
    },
    //图层初始化 ------------------------------------------图层start -------------------------------
    //tcInit 初始化当前图层
    tcInit() {
      //记录当前图层顺序
      this.recordTcOrder();
      //查询 图形列表
      var LayerList = this._fView.View.MapData.LayerList;
      //初始化 图形列表
      this.coverageData[0].children = [];
      this.checkedKeys = [];
      var checkedKeys = [];
      for (let i = 0; i < LayerList.length; i++) {
        var formData = new Object();
        formData.id = 1 + i;
        formData.label = LayerList[i].LayerName;
        formData.status = LayerList[i].Actived;
        formData.objId = LayerList[i].ObjID;
        formData.layer = LayerList[i];
        this.coverageData[0].children.push(formData);
        if (LayerList[i].Display == true) {
          checkedKeys.push(1 + i);
        }
      }
      // 换一种写法 重新生成 当前默认选中的 对象
      this.$nextTick(function() {
        this.$refs.tree.setCheckedKeys(checkedKeys);
      });
      this.useTcOrder();
    },
    //记录当前图层顺序
    recordTcOrder(){
      //查询 图形列表
      var LayerList = this._fView.View.MapData.LayerList;
      for (let i = 0; i < LayerList.length; i++) {
        LayerList[i].LayerIndex = i;
      }
    },
    //使用当前图层顺序
    useTcOrder(){
      var LayerList = this._fView.View.MapData.LayerList;
      LayerList.sort(function(a,b){
        return a.LayerIndex - b.LayerIndex;
      })
    },
    //拖拽完成之后要重新排序
    /* 
    *  draggingNode：被拖拽节点对应的 Node
    *  dropNode：结束拖拽时最后进入的节点
    *  type: 被拖拽节点的放置位置（before、after、inner）
    */
    allowDrop(draggingNode, dropNode, type) {
      var draggingNodeObjId = '';
      var dropNodeObjId = '';
      if (draggingNode.level === dropNode.level) {
        if (draggingNode.parent.id === dropNode.parent.id) {
          draggingNodeObjId = draggingNode.data.objId;
          dropNodeObjId = dropNode.data.objId;
        }
        
        //查询 图形列表
        var LayerList = fView.View.MapData.LayerList;
        //初始化 图形列表
        this.checkedKeys = [];
        var checkedKeys = [];
        var draggingNodeIndex = 0;
        var dropNodeIndex = 0;
        for (let i = 0; i < LayerList.length; i++) {
          if(LayerList[i].ObjID == draggingNodeObjId){
            draggingNodeIndex = i
          }
          if(LayerList[i].ObjID == dropNodeObjId){
            dropNodeIndex = i
          }
          if (LayerList[i].Display == true) {
            checkedKeys.push(1 + i);
          }
        }
        var t = LayerList[draggingNodeIndex];
        LayerList[draggingNodeIndex]=LayerList[dropNodeIndex];
        LayerList[dropNodeIndex]=t;
        // 换一种写法 重新生成 当前默认选中的 对象
        this.$nextTick(function() {
          this.$refs.tree.setCheckedKeys(checkedKeys);
        });
        this.recordTcOrder();
        return type === "prev";
      } else {
        // 不同级进行处理
      }

    },
    renderContentTC(h, { node, data, store }) {
      var status = data.status;
      if (status === false) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span style="display: block;width: 140px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
              <span title={node.label}>{node.label}</span>
            </span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                content="解锁"
                placement="left-start"
              >
                <el-button
                  style="font-size: 12px; margin-right:5px;"
                  type="text"
                  on-click={() => this.activate(node, data)}
                >
                  <i class="iconfont icon-lock" style="font-size: 24px;"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="重命名"
                placement="left-start"
              >
                <el-button
                  style="font-size: 12px; margin-right:5px;"
                  type="text"
                  on-click={() => this.editTC(node, data)}
                >
                  <i
                    class="iconfont icon-zhongmingming"
                    style="font-size: 18px;"
                  ></i>
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="left-start"
              >
                <el-button
                  style="font-size: 12px; margin-right:5px;"
                  type="text"
                  on-click={() => this.deleteTc(node, data)}
                >
                  <i
                    class="iconfont icon-shanchu1"
                    style="font-size: 18px;"
                  ></i>
                </el-button>
              </el-tooltip>
            </span>
          </span>
        );
      } else if (status === true) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span style="display: block;width: 140px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
              <span title={node.label}>{node.label}</span>
            </span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                content="锁定"
                placement="left-start"
              >
                <el-button
                  style="font-size: 12px; margin-right:5px;"
                  type="text"
                  on-click={() => this.already(node, data)}
                >
                  <i class="iconfont icon-kaisuo" style="font-size: 24px;"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="重命名"
                placement="left-start"
              >
                <el-button
                  style="font-size: 12px; margin-right:5px;"
                  type="text"
                  on-click={() => this.editTC(node, data)}
                >
                  <i
                    class="iconfont icon-zhongmingming"
                    style="font-size: 18px;"
                  ></i>
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="left-start"
              >
                <el-button
                  style="font-size: 12px; margin-right:5px;"
                  type="text"
                  on-click={() => this.deleteTc(node, data)}
                >
                  <i
                    class="iconfont icon-shanchu1"
                    style="font-size: 18px;"
                  ></i>
                </el-button>
              </el-tooltip>
            </span>
          </span>
        );
      } else if (status == "") {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span style="display: block;width: 140px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
              <span title={node.label}>{node.label}</span>
            </span>
              <span>
              <el-tooltip
                class="item"
                effect="dark"
                content="新增图层"
                placement="left-start"
              >
                <el-button
                  style="font-size: 12px; margin-right:5px;"
                  type="text"
                  on-click={() => this.addTcName(node, data)}
                >
                  <i class="el-icon-plus" style="font-size: 18px;"></i>
                </el-button>
              </el-tooltip>
              </span>
          </span>
        );
      }
    },
    //图层显示隐藏
    handleCheckChange: function(data, checked, indeterminate) {
      if (data.objId != null) {
        this._fView.handleCheckChange(data.objId, checked);
      }
    },
    //激活 fView 为全局变量。可以直接使用所有的Js方法
    activate(node, data) {
      data.status = !data.layer.Actived; //false
      var layer = "";
      this._fView.SetLayerActiveByLayerId(data.objId, true);
      this.useTcOrder();
      this.tcInit();
    },
    //已激活
    already(node, data) {
      data.status = !data.layer.Actived; //true
      var layer = "";
      this._fView.SetLayerActiveByLayerId(data.objId, false);
      this.useTcOrder();
      this.tcInit();
    },
    addTcName(){
      this.layer.addTcNameDialog = true;
    },
    addTcNames(){
      this._fView.View.MapData.AddLayerWithNameAndType(this.layer.layerName, Number(this.layer.layerType)) 
      this.layer.addTcNameDialog = false;
      this.tcInit();
    },
    //删除图层
    deleteTc(node, data) {
      this.$confirm(data.label + "删除!是否继续?继续的话将删除该图层", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this._fView.RemoveLayer(data.objId);
          this.tcInit();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    editTC(node, data) {
      this.tcName = data.label;
      this.editTc = data;
      this.editTcNameDialog = true;
    },
    editTcName() {
      this.editTc.label = this.tcName;
      this.editTcNameDialog = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //-----------------------------------------图层end--------------------------------------------
    saveKCXZTBUtton() {
      if (this.templateKCXZT == null || this.templateKCXZT == "") {
        this.$message({
          type: "warning",
          message: "请填写模版名称"
        });
        return;
      }
      let params = {
        name: this.templateKCXZT,
        style: 102
      };
      data_api
        .isExistTemplateName(params)
        .then(response => {
          if (response.data.State == "success") {
            if (response.data.Data == "true") {
              this.$confirm("与已有开采现状图名称重复，是否覆盖？")
                .then(_ => {
                  //false 代表覆盖
                  this.saveExpTemplate(false);
                })
                .catch(_ => {});
            } else {
              //true代表新增
              this.saveExpTemplate(true);
            }
          } else {
            this.$message({
              type: "error",
              message: response.data.Message
            });
          }
        })
        .catch(response => {});
    },
    //保存开采现状图
    saveExpTemplate(IsAdd) {
      var _this = this;
      if (_this._fView.View.HiteResult.SelectObjs.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择一个视图作为模版"
        });
        return;
      }
      var objjson = {};
      _this._fView.View.HiteResult.SelectObjs[0].JsonObjSave(objjson);
      if (objjson.ObjType != 134) {
        this.$message({
          type: "warning",
          message: "请选择一个开采现状图作为模版"
        });
        return;
      }
      var Name = _this.templateKCXZT;
      let params = new Object();
      params.Name = Name;
      params.CJR = this.usercode;
      params.Style = "102";
      params.Data = objjson;
      params.IsAdd = IsAdd;
      data_api
        .saveTemplate(params)
        .then(response => {
          if (response.data.State == "success") {
            if (response.data.Data == "success") {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              // 初始化专业模版信息
              this.initializeTemplate();
            } else {
              this.$message({
                type: "warning",
                message: "保存失败"
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: response.data.Message
            });
          }
        })
        .catch(response => {
          this.$message({
            type: "warning",
            message: "与后方沟通超时"
          });
        });
      this.saveKCXZTDialog = false;
    },
    //保存图框模版
    saveViewBUtton() {
      if (this.templateView == null || this.templateView == "") {
        this.$message({
          type: "warning",
          message: "请填写模版名称"
        });
        return;
      }
      let params = {
        name: this.templateView,
        style: 103
      };
      data_api
        .isExistTemplateName(params)
        .then(response => {
          if (response.data.State == "success") {
            if (response.data.Data == "true") {
              this.$confirm("与已有图框名称重复，是否覆盖？")
                .then(_ => {
                  //false代表覆盖
                  this.saveViewTemplates(false);
                })
                .catch(_ => {});
            } else {
              //true代表新增
              this.saveViewTemplates(true);
            }
          } else {
            this.$message({
              type: "error",
              message: response.data.Message
            });
          }
        })
        .catch(response => {});
    },
    //保存图框模版
    saveViewTemplates(IsAdd) {
      var _this = this;
      if (_this._fView.View.HiteResult.SelectObjs.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择一个视图作为模版"
        });
        return;
      }
      var objjson = {};
      _this._fView.View.HiteResult.SelectObjs[0].JsonObjSave(objjson);
      if (objjson.ObjType != 136) {
        this.$message({
          type: "warning",
          message: "请选择一个图框作为模版"
        });
        return;
      }
      var Name = _this.templateView;

      let params = new Object();
      params.Name = Name;
      params.CJR = this.usercode;
      params.Style = "103";
      params.Data = objjson;
      params.IsAdd = IsAdd;
      data_api
        .saveTemplate(params)
        .then(response => {
          if (response.data.State == "success") {
            if (response.data.Data == "success") {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              // 初始化专业模版信息
              this.initializeTemplate();
            } else {
              this.$message({
                type: "warning",
                message: "保存失败"
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: response.data.Message
            });
          }
        })
        .catch(response => {
          this.$message({
            type: "warning",
            message: "与后方沟通超时"
          });
        });
      this.saveViewDialog = false;
    },
    //保存井位模版
    saveWellBUtton() {
      if (this.templateWell == null || this.templateWell == "") {
        this.$message({
          type: "warning",
          message: "请填写模版名称"
        });
        return;
      }
      let params = {
        name: this.templateWell,
        style: 100
      };
      data_api
        .isExistTemplateName(params)
        .then(response => {
          if (response.data.State == "success") {
            if (response.data.Data == "true") {
              this.$confirm("与已有井位名称重复，是否覆盖？")
                .then(_ => {
                  //false代表覆盖
                  this.saveWellTemplates(false);
                })
                .catch(_ => {});
            } else {
              //true代表新增
              this.saveWellTemplates(true);
            }
          } else {
            this.$message({
              type: "error",
              message: response.data.Message
            });
          }
        })
        .catch(response => {});
    },
    //保存井位模版
    saveWellTemplates(IsAdd) {
      var _this = this;
      if (_this._fView.View.HiteResult.SelectObjs.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择一个视图作为模版"
        });
        return;
      }
      var objjson = {};
      _this._fView.View.HiteResult.SelectObjs[0].JsonObjSave(objjson);
      if (objjson.ObjType != 110) {
        this.$message({
          type: "warning",
          message: "请选择一个井位作为模版"
        });
        return;
      }
      var Name = _this.templateWell;

      let params = new Object();
      params.Name = Name;
      params.CJR = this.usercode;
      params.Style = "100";
      params.Data = objjson;
      params.IsAdd = IsAdd;
      data_api
        .saveTemplate(params)
        .then(response => {
          if (response.data.State == "success") {
            if (response.data.Data == "success") {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              // 初始化专业模版信息
              this.initializeTemplate();
            } else {
              this.$message({
                type: "warning",
                message: "保存失败"
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: response.data.Message
            });
          }
        })
        .catch(response => {
          this.$message({
            type: "warning",
            message: "与后方沟通超时"
          });
        });
      this.saveWellDialog = false;
    },

    //生成等值线开采现状图图层
    getCoverageKCXZT(formData) {
      this._fView["KCTCID"] = formData.objId;
    },
    //加载属性数据
    getLoading(loadingForm) {
      this.KHType = loadingForm.KHType;
      //加载延迟时页面 loading
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      if (this._fView.PageKey != null) {
        var PageKey = this._fView.PageKey;
        var TJID = this._fView.TJID;
        var TCID = "";
        //查询 图形列表
        var LayerList = this._fView.View.MapData.LayerList;
        for (let i = 0, l = LayerList.length; i < l; i++) {
          // 1  井位图层
          if (LayerList[i].LayerType == "1") {
            TCID = LayerList[i].ObjID;
          }
        }

        var params = new Object();
        params.PageKey = PageKey;
        params.TJID = TJID;
        params.TCID = TCID;
        params.PropertyName = loadingForm.PropertyName;
        params.RQ = loadingForm.RQ + "-01 00:00:00";

        if (loadingForm.KHType == true) {
          params.CJR = this.usercode;
          params.FDVal = loadingForm.FDVal;
          data_api
            .getPropertyDataByKH(params)
            .then(response => {
              //查询 图形列表
              var LayerList = response.data.Data.TCData.LayerList;
              //初始化 图形列表
              for (let i = 0, l = LayerList.length; i < l; i++) {
                // 1  井位图层
                if (LayerList[i].ObjTag == TCID) {
                  this._fView["QSYSTCID"] = LayerList[i].ObjID;
                }
              }
              this._fView.WellDataSet(response.data.Data);
              this.tcInit();
              //loading 结束
              loading.close();
            })
            .catch(response => {
              // console.log(response);
              this.$message({
                type: "warning",
                message: "与后方沟通超时"
              });
              //loading 结束
              loading.close();
            });
        } else {
          data_api
            .getPropertyData(params)
            .then(response => {
              this._fView.WellDataSet(response.data.Data);
              //loading 结束
              loading.close();
            })
            .catch(response => {
              // console.log(response);
              this.$message({
                type: "warning",
                message: "与后方沟通超时"
              });
              //loading 结束
              loading.close();
            });
        }
      }
    },
    //图框属性设置
    getPicture(data) {
      //加载图框
      var e = {};
      //标签属性设置
      e.title = data.labelSetting.label.title.value; //标题
      e.bzr = data.labelSetting.label.creator.value; //编制人
      e.qhr = data.labelSetting.label.creator.value; //审核人
      e.shr = data.labelSetting.label.reviewer.value; //审核人
      e.jsfzr = data.labelSetting.label.technicalDirector.value; //标题
      e.date = data.labelSetting.label.date.value; //标题
      e.dw = data.labelSetting.label.enterprise.value; //标题

      //图框属性设置
      e.Left = data.basicSetting.startPointCoordX; //起点横坐标X
      e.Top = data.basicSetting.startPointCoordY; //起点横坐标Y
      e.XLength = data.basicSetting.xAxisWidth; //X轴宽度(M)
      e.YLength = data.basicSetting.yAxisWidth; //Y轴宽度(M)
      e.Interval = Number(data.basicSetting.frameInterval); //线框间隔(M)
      e.InLineWidth = Number(data.basicSetting.innerFrame.lineWidth); //内框线宽
      e.InLineColor = data.basicSetting.innerFrame.color
        .substring(5, data.basicSetting.innerFrame.color.length - 4)
        .split(","); //内框颜色

      e.InLineStyle = data.basicSetting.innerFrame.lineType; //内框线型
      e.OutLineWidth = Number(data.basicSetting.outerFrame.lineWidth); //外框线宽
      e.OutLineColor = data.basicSetting.outerFrame.color
        .substring(5, data.basicSetting.outerFrame.color.length - 4)
        .split(","); //外框颜色

      e.OutLineStyle = data.basicSetting.outerFrame.lineType; //外框线型
      //网格及刻度属性设置
      e.ShowGrid = data.gridAndScaleSetting.grid.showGrid; //是否显示网格
      e.GridX = data.gridAndScaleSetting.grid.xAxisGridInterval; //X轴网格间隔
      e.GridY = data.gridAndScaleSetting.grid.yAxisGridInterval; //Y轴网格间隔
      e.GridLineWidth = data.gridAndScaleSetting.grid.lineWidth; //网格线宽
      e.GridLineColor = data.gridAndScaleSetting.grid.color
        .substring(5, data.gridAndScaleSetting.grid.color.length - 4)
        .split(","); //网格颜色
      e.GridLineStyle = data.gridAndScaleSetting.grid.lineType; //网格线型

      e.IsSetHVValue = data.gridAndScaleSetting.scale.enableInitialValue; //启用起始值
      e.HValue = data.gridAndScaleSetting.scale.xAxisInitialValue; //X轴起始值
      e.VValue = data.gridAndScaleSetting.scale.yAxisInitialValue; //Y轴起始值

      e.ShowMark = data.gridAndScaleSetting.scale.showScaleMark; //显示刻度
      e.SpaceX = data.gridAndScaleSetting.scale.xAxisInterval; //X轴刻度间隔
      e.SpaceY = data.gridAndScaleSetting.scale.yAxisInterval; //Y轴刻度间隔
      e.CutFrontNumX = data.gridAndScaleSetting.scale.xAxisFrontLength; //X轴刻度前端截长
      e.CutFrontNumY = data.gridAndScaleSetting.scale.yAxisFrontLength; //Y轴刻度前端截长
      e.CutBackNumX = data.gridAndScaleSetting.scale.xAxisRearLength; //X轴刻度后端截长
      e.CutBackNumY = data.gridAndScaleSetting.scale.yAxisRearLength; //Y轴刻度后端截长
      e.FrontFont = data.FrontFont; //分割线前文字
      e.BackFont = data.BackFont; //分割线后文字
      e.HAlignStyle = 0; //水平对齐方式   居中: 3,左对齐: 1, 不对齐" 0, 右对齐": 2
      e.VAlignStyle = 0; //垂直对齐方式   下对齐 2   居中 3 不对齐 0 上对齐 1

      e.titleFont = data.titleFont;
      e.qhrFont = data.qhrFont;
      e.shrFont = data.shrFont;
      e.jsfzrFont = data.jsfzrFont;
      e.dateFont = data.dateFont;
      e.dwFont = data.dwFont;
      fCommon.SetBorderObjProperty(this.createBorder, e);
      fCommon.SetBorder(this.createBorder);
    },
    //生成等值线
    createDZX() {
      if (this._fView.PageKey != null) {
        var PageKey = this._fView.PageKey;
        var TJID = this._fView.TJID;
        var WellTCID = "";
        //查询 图形列表
        var LayerList = this._fView.View.MapData.LayerList;
        for (let i = 0, l = LayerList.length; i < l; i++) {
          // 1  井位图层
          if (LayerList[i].LayerType == "1") {
            WellTCID = LayerList[i].ObjID;
          }
        }
        var QSYSTCID = this._fView.QSYSTCID;

        var params = new Object();
        params.PageKey = PageKey;
        params.TJID = TJID;
        if (this.KHType == true) {
          params.TCID = QSYSTCID;
          data_api
            .getIsolinePropertyByKHJqz(params)
            .then(response => {
              if (response.data.State == "success") {
                this.IsometricLineGeneratorVisible = true;
                this._fView["IsometricLineGenerator"] = response.data.Data;
              } else {
                this.$message({
                  type: "error",
                  message: response.data.Message
                });
              }
            })
            .catch(response => {
              // console.log(response);
            });
        } else {
          params.WellTCID = WellTCID;
          data_api
            .getIsolinePropertys(params)
            .then(response => {
              if (response.data.State == "success") {
                this.IsometricLineGeneratorVisible = true;
                this._fView["IsometricLineGenerator"] = response.data.Data;
              } else {
                this.$message({
                  type: "error",
                  message: response.data.Message
                });
              }
            })
            .catch(response => {
              // console.log(response);
            });
        }
      }
    },
    //等值线属性
    propertyDZX() {
      this.IsometricLineAttributeVisible = true;
    },
    //轮廓线属性
    propertyLKX() {
      this.OutlineAttributeVisible = true;
    },
    //开采现状图属性
    kcxztsx() {
      this.kcxztsxVisible = true;
    },
    //开采现状图应用
    createKCXZT() {
      this.createKCXZTVisible = true;
    },
    //沿程图
    createdRouteMap(){
      this.createdRouteMapVisible = true;
    },
    editRouteMapImage(){
      this.RouteMapImageAttributeVisible = true;
    },
    //图框
    FrameAttribute(obj) {
      if (obj == 1) {
        this.createBorder = fCommon.CreateBorder();
      } else {
        this.createBorder = this._fView.SelectedObj;
      }

      this.FrameAttributeVisible = true;
    },
    //等值线填充图例颜色
    IsometricLineLegendAttribute() {
      this.IsometricLineLegendAttributeVisible = true;
    },
    IsometricLineFilling() {
      //等值线填充颜色
      this.isometricLineFillingDialog = true;
    },
    renderContent(h, { node, data, store }) {
      if (data.status == "1") {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <el-checkbox v-model={data.IsEnabled}></el-checkbox>
              <span style="margin-left:5px">{node.label}</span>
            </span>
            <span>
              <el-button
                style="font-size: 12px;"
                type="text"
                on-click={() => this.append(data)}
              >
                应用模版
              </el-button>
              <el-button
                style="font-size: 12px;"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除模版
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
          </span>
        );
      }
    },
    append(data) {
      var _this = this;
      if (Number(data.Style) == 102) {
        if (this._fView.KCTCID == null) {
          this.$message({
            type: "error",
            message: "无开采现状图"
          });
          return;
        }
        var PageKey = this._fView.PageKey;
        var TJID = this._fView.TJID;
        var KCTCID = this._fView.KCTCID;
        var KCTemplateID = data.id;

        let params = new Object();
        params.PageKey = PageKey;
        params.TJID = TJID;
        params.KCTCID = KCTCID;
        params.KCTemplateID = KCTemplateID;
        data_api
          .useExpTemplate(params)
          .then(response => {
            if (response.data.State == "success") {
              _this._fView.ExpLayerLoad(response.data.Data);
            } else {
              this.$message({
                type: "error",
                message: response.data.Message
              });
            }
          })
          .catch(response => {
            // console.log(response);
          });
      } else if (Number(data.Style) == 100) {
        let params = {
          id: data.id
        };
        data_api
          .getTemplateByID(params)
          .then(response => {
            if (response.data.State == "success") {
              fView.ApplyWellTemplate(response.data.Data, 0);
            } else {
              this.$message({
                type: "error",
                message: response.data.Message
              });
            }
          })
          .catch(response => {
            // console.log(response);
          });
      } else if (Number(data.Style) == 103) {
        let params = {
          id: data.id
        };
        data_api
          .getTemplateByID(params)
          .then(response => {
            if (response.data.State == "success") {
              var obj = this._fView.View.HiteResult.SelectObjs[0];
              if (obj == null) {
                this.$message({
                  type: "error",
                  message: "请选择一个图框作为应用的对象"
                });
                return;
              }
              fView.BorderApplyTemplate(obj, response.data.Data);
            } else {
              this.$message({
                type: "error",
                message: response.data.Message
              });
            }
          })
          .catch(response => {
            // console.log(response);
          });
      } else {
      }
      //重置当前选中模版
      this.updateTemplate(data);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      {
        let params = new FormData();
        params.append("id", data.id);
        params.append("account", this.usercode);

        data_api
          .deleteTemplate(params)
          .then(response => {
            if (response.data.State == "success") {
              if (response.data.Data == "success") {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
            } else {
              this.$message({
                type: "error",
                message: response.data.Message
              });
            }
          })
          .catch(response => {
            // console.log(response);
            this.$message({
              type: "error",
              message: "删除失败"
            });
          });
      }
    },
    // 导出成果图
    exportAchievement() {
      this._fView.SaveToPng();
    },
    //可能用到的图件 行点击
    probablyClick(row) {
      // console.log(row);
      debugger;
      var path = "";
      var type = "";
      var name = "";
      var from = "";
      if (row.TJLB == "压力等值图") {
        path = "/drawpressureimage";
        type = 1;
        name = "压力等值图";
        from = 2;
      } else if (row.TJLB == "注汽量等值图") {
        path = "/drawpressureimage";
        type = 2;
        name = "注汽量等值图";
        from = 2;
      } else if (row.TJLB == "开采现状图") {
        path = "/drawpressureimage";
        type = 3;
        name = "开采现状图";
        from = 2;
      } else if (row.TJLB == "沿程图") {
        path = "/drawpressureimage";
        type = 0;
        name = "沿程图";
        from = 2;
      } else {
        this.$message({
          type: "warning",
          message: "未找到对应图件"
        });
        return;
      }
      const { href } = this.$router.resolve({
        path: path,
        query: {
          type: type,
          name: name,
          from: from,
          TJID: row.TJID
        }
      });
      window.open(href, "_blank");
    },
    //激活井位定位
    lookWell(){
      this.findWell.wellVisible = true;
    },
    //执行 井位定位查询
    selectWellClick(){
      this._fView.SearchWellByName(this.findWell.WellName);
    },
    //上一个
    searchPre(){
       this._fView.searchPre();
    },
    //下一个
    searchNext(){
       this._fView.searchNext();
    },
    remoteMethod(query) {
        if (query !== '') {
          this.findWell.loading = true;
          setTimeout(() => {
            this.findWell.loading = false;
            this.findWell.WellList = this._fView.GetWellByName(query);
          }, 200);
        } else {
          this.findWell.WellList = [];
        }
      },
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "/static/frameView/IsoFrameCom/css/buttonslco.css";
.cloud-home {
  //width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .layout-header {
    height: 50px;
  }
  .layout-container {
    flex: 1;
    display: flex;
    // .layout-left {
    // }
    .layout-right {
      flex: 1;
      overflow-y: auto;
    }
  }
}
.item-box {
  margin-bottom: 10px;
}
.check-box {
  display: inline-flex;
  padding: 10px;
  border: 1px solid #ccc;
  background: #eee;
}
.area-box {
  width: 100%;
  padding: 10px;
  .left-area {
    width: 29%;
    float: left;
    .left-area-checklist {
      border: 1px solid #ccc;
      width: 100%;
      padding: 10px;
      height: 200px;
    }
  }
  .right-area {
    width: 70%;
    float: right;
    .right-area-checklist {
      border: 1px solid #ccc;
      padding: 10px;
      width: 100%;
      height: 200px;
    }
  }
}
.el-main {
  padding: 0px;
}
.el-tabs__item {
  padding: 0 0px;
}
.el-radio-group {
  width: 100%;
}
.item-custom {
  padding: 0 0 10px 10px;
  min-width: 100%;
}
.el-tree {
  min-width: 100%;
  font-size: 14px;
  display: inline-block;
}
.tree {
  overflow-y: auto;
  overflow-x: scroll;
  height: 550px;
  /*width:200px;*/
  border: 0px solid blue;
}
.text-label {
  margin: 0 15px 0 6%;
}
</style>
