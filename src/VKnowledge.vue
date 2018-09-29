<template>
    <el-main>
        <div class="asideimage" :style ="asideimage">
            <div style="height:208px"></div>
            <div id="detailsArea">
                <section id="generalDetails">
                      <div style="display:none">
                        <h1 id="title"></h1>
                        <span><a id="about" href=""></a></span>
                        <h5>Version: <span id="version"></span></h5>
                        <h5>Author(s): <span id="authors"></span></h5>
                        <h5>
                            <label>Language: <select id="language" name="language" size="1"></select></label>
                        </h5>
                        <h3 class="accordion-trigger noselect accordion-trigger-active">Description</h3>
                        <div class="accordion-container scrollable">
                            <p id="description"></p>
                        </div>
                        <h3 class="accordion-trigger noselect">Metadata</h3>
                        <div id="ontology-metadata" class="accordion-container"></div>
                        <h3 class="accordion-trigger noselect">Statistics</h3>
                    </div>
                    <div class="accordion-container" style="display:none">
                        <p class="statisticDetails">Classes: <span id="classCount"></span></p>
                        <p class="statisticDetails">Object prop.: <span id="objectPropertyCount"></span></p>
                        <p class="statisticDetails">Datatype prop.: <span id="datatypePropertyCount"></span></p>
                        <div class="small-whitespace-separator"></div>
                        <p class="statisticDetails">Individuals: <span id="individualCount"></span></p>
                        <div class="small-whitespace-separator"></div>
                        <p class="statisticDetails">Nodes: <span id="nodeCount"></span></p>
                        <p class="statisticDetails">Edges: <span id="edgeCount"></span></p>
                    </div>


                    <h3 class="accordion-trigger noselect" id="selection-details-trigger">Selection Details</h3>
                    <div class="accordion-container" id="selection-details">
                        <div id="classSelectionInformation" class="hidden">
                            <p class="propDetails">Name: <span id="name"></span></p>
                            <p class="propDetails">Type: <span id="typeNode"></span></p>
                            <p class="propDetails">Equiv.: <span id="classEquivUri"></span></p>
                            <p class="propDetails">Disjoint: <span id="disjointNodes"></span></p>
                            <p class="propDetails">Charac.: <span id="classAttributes"></span></p>
                            <p class="propDetails">Individuals: <span id="individuals"></span></p>
                            <p class="propDetails">Description: <span id="nodeDescription"></span></p>
                            <p class="propDetails">Comment: <span id="nodeComment"></span></p>
                        </div>
                        <div id="propertySelectionInformation" class="hidden">
                            <p class="propDetails">Name: <span id="propname"></span></p>
                            <p class="propDetails">Type: <span id="typeProp"></span></p>
                            <p id="inverse" class="propDetails">Inverse: <span></span></p>
                            <p class="propDetails">Domain: <span id="domain"></span></p>
                            <p class="propDetails">Range: <span id="range"></span></p>
                            <p class="propDetails">Subprop.: <span id="subproperties"></span></p>
                            <p class="propDetails">Superprop.: <span id="superproperties"></span></p>
                            <p class="propDetails">Equiv.: <span id="propEquivUri"></span></p>
                            <p id="infoCardinality" class="propDetails">Cardinality: <span></span></p>
                            <p id="minCardinality" class="propDetails">Min. cardinality: <span></span></p>
                            <p id="maxCardinality" class="propDetails">Max. cardinality: <span></span></p>
                            <p class="propDetails">Charac.: <span id="propAttributes"></span></p>
                            <p class="propDetails">Description: <span id="propDescription"></span></p>
                            <p class="propDetails">Comment: <span id="propComment"></span></p>
                        </div>
                        <div id="noSelectionInformation">
                            <p><span>Select an element in the visualization.</span></p>
                        </div>
                    </div>
                </section>
            </div>


        </div>

        <div class="ribbonimage" :style ="ribbonimage" style="text-align:left;">
            <div style="position:relative;top:20px;left:40px;font-size:20px;font-weight:bold">知识管理</div>
            <span style="position:relative;top:35px;left:65px;display:block;padding-right:80px;">知识管理包括几个方面，即IP路径库管理、漏洞信息管理和事件指纹管理。
            <br/>
            <span style="font-size:80%;color:#999;">
            Knowledge management contains several parts.e.g. IP path management, vulnerability management and event fingerprint management</span></span>
        </div>


        <div class="graphMainDiv">
           <section id="canvasArea">
           

            <div id="loading-info" class="hidden">


                <div id="loading-progress">
                    <div class="hidden">Loading ontology... </div>
                    <div id="layoutLoadingProgressBarContainer" style="padding-bottom: 0;	white-space: nowrap;	overflow: hidden;	text-overflow: ellipsis;">
                        <h4 id="currentLoadingStep" style="margin: 0;font-style: italic; padding-bottom:0 ;	white-space: nowrap;	overflow: hidden;	text-overflow: ellipsis;">Layout optimization</h4>
                        <div id="progressBarContext">
                            <div id="progressBarValue" class="busyProgressBar"></div>
                        </div>
                    </div>
                    <div id="loadingInfo_msgBox" style="padding-bottom: 0;padding-top:0">
                        <div id="show-loadingInfo-button" class="accordion-trigger noselect">Details </div>
                        <div id="loadingInfo-container">
                            <ul id="bulletPoint_container"></ul>
                        </div>
                    </div>
                    <div>
                        <span id="loadingIndicator_closeButton" class="">Close Warning</span>
                    </div>
                </div>

            </div>

            <div id="graph"></div>

            
            <div id="menuContainer">
                <!--Ontology Menu-->
                <ul id="m_select" class="toolTipMenu noselect">
                    <li><a href="#foaf" id="foaf">Friend of a Friend (FOAF) vocabulary</a></li>
                    <li><a href="#muto" id="muto">Modular and Unified Tagging Ontology (MUTO)</a></li>
                    <li><a href="#personasonto" id="personasonto">Personas Ontology (PersonasOnto)</a></li>
                    <li><a href="#goodrelations" id="goodrelations">GoodRelations Vocabulary for E-Commerce</a></li>
                    <li><a href="#sioc" id="sioc">SIOC (Semantically-Interlinked Online Communities) Core Ontology</a></li>
                    <li><a href="#ontovibe" id="ontovibe">Ontology Visualization Benchmark (OntoViBe)</a></li>

                    <li class="option" id="converter-option">
                        <form class="converter-form" id="iri-converter-form">
                            <label for="iri-converter-input">Custom Ontology:</label>
                            <input type="text" id="iri-converter-input" placeholder="Enter ontology IRI">
                            <button type="submit" id="iri-converter-button" disabled>Visualize</button>
                        </form>
                        <div class="converter-form">
                            <input class="hidden" type="file" id="file-converter-input" autocomplete="off">
                            <label class="truncate" id="file-converter-label" for="file-converter-input">Select ontology file</label>
                            <button type="submit" id="file-converter-button" disabled>
                                Upload
                            </button>
                        </div>
                    </li>
                </ul>
                <!--Export Menu-->
                <ul id="m_export" class="toolTipMenu noselect">
                    <li><a href="#" download id="exportJson">Export as JSON</a></li>
                    <li><a href="#" download id="exportSvg">Export as SVG</a></li>
                    <li class="option">
                        <div>
                            <form class="converter-form" id="url-copy-form">
                                <label for="exportedUrl">Export as URL:</label>
                                <input type="text" id="exportedUrl" placeholder="#">
                                <span id="copyBt" title="Copy to Clipboard">Copy</span>
                            </form>
                        </div>
                    </li>
                </ul>
                <!--Filter Menu-->
                <ul id="m_filter" class="toolTipMenu noselect">
                    <li class="toggleOption" id="datatypeFilteringOption"></li>
                    <li class="toggleOption" id="objectPropertyFilteringOption"></li>
                    <li class="toggleOption" id="subclassFilteringOption"></li>
                    <li class="toggleOption" id="disjointFilteringOption"></li>
                    <li class="toggleOption" id="setOperatorFilteringOption"></li>
                    <li class="slideOption" id="nodeDegreeFilteringOption"></li>
                </ul>
                <!--Modes Menu -->
                <ul id="m_modes" class="toolTipMenu noselect">
                    <li class="toggleOption" id="dynamicLabelWidth"></li>
                    <li class="toggleOption" id="pickAndPinOption"></li>
                    <li class="toggleOption" id="nodeScalingOption"></li>
                    <li class="toggleOption" id="compactNotationOption"></li>
                    <li class="toggleOption" id="colorExternalsOption"></li>
                </ul>
                <!--Config Menu -->
                <ul id="m_config" class="toolTipMenu noselect">
                    <li class="toggleOption" id="zoomSliderOption"></li>
                    <li class="slideOption" id="classSliderOption"></li>
                    <li class="slideOption" id="datatypeSliderOption"></li>
                    <li class="slideOption" id="maxLabelWidthSliderOption"></li>
                </ul>
                <!--About Menu-->
                <ul id="m_about" class="toolTipMenu">
                    <li><a href="license.txt" target="_blank">MIT License &copy; 2014-2018</a></li>
                    <li id="credits" class="option">WebVOWL Developers:<br />
                        Vincent Link, Steffen Lohmann, Eduard Marbach, Stefan Negru, Vitalis Wiens
                    </li>

                    <li><a href="http://vowl.visualdataweb.org/webvowl.html#releases" target="_blank">Version: 1.1.2<br />(release history)</a></li>

                    <li><a href="http://purl.org/vowl/" target="_blank">VOWL Specification &raquo;</a></li>
                </ul>
                <ul id="m_search" class="toolTipMenu"></ul>
            </div>
            <div class="noselect" id="swipeBarContainer">
                <ul  id="menuElementContainer" style="display:none">
                    <li id="c_search" class="inner-addon left-addon">
                        <input class="searchInputText" type="text" id="search-input-text" placeholder="Search">
                    </li>
                    <li id="c_locate" >
                        <a style="padding: 0 8px 5px 8px;" draggable="false" title="Nothing to locate, enter search term."
                            href="#" id="locateSearchResult">&#8982;
                        </a>
                    </li>
                    <li id="c_select"><a draggable="false" href="#"></a></li>
                    <li id="c_export"><a draggable="false" href="#"></a></li>
                    <li id="c_filter"><a draggable="false" href="#"></a></li>
                    <li id="c_modes"><a draggable="false" href="#"></a></li>
                    <li id="c_reset"><a draggable="false" id="reset-button" href="#" type="reset">Reset</a></li>
                    <li id="c_pause"><a draggable="false" id="pause-button" href="#" style="padding: 9px 8px 12px 8px;">Pause</a></li>
                    <li id="c_config"><a draggable="false" href="#">Options</a>
                    <li id="c_about"><a draggable="false" href="#">About</a></li>
                </ul>
            </div>
            <div class="noselect" id="scrollRightButton" style="display:none;"> </div>
            <div class="noselect" id="scrollLeftButton" style="display:none;"> </div>
            <div id="zoomSlider" style="display:none;">
                <p class="noselect" id="centerGraphButton">&#8982;</p>
                <p class="noselect" id="zoomInButton">+</p>
                <p class="noselect" id="zoomSliderParagraph"> </p>
                <p class="noselect" id="zoomOutButton">-</p>
            </div>
        </section>
            
        </div>
        
    </el-main>
</template>


<script>
import Vue from 'vue';
import Mock from 'mockjs';
import axios from 'axios';

import {getServiceIP, mockAll} from './mockdata.js';

import './assets/js/d3.min.js';
import './assets/js/webvowl.js';
import './assets/js/webvowl.app.js';

Vue.component('node-item', {
  data() {
    return {
    }
  },
  props: ['domain','ip','containers','images'],
  template: '<div><div class="d-domain">{{domain}}</div><div class="d-ip">{{ip}}</div><div class="d-containers">{{containers}}</div></div>'
})

export default {
    name: 'infomgmt',
    data() {
        return {
            nodes:[],
            events:[],
            ribbonimage: {
                backgroundImage: "url("+require("./assets/images/ribbon.png") + ")",
                position:"absolute",
                left:"324px",
                top:"158px",
                width:"1257px",
                height:"153px"
            },
            entitybackground: {
                backgroundImage: "url("+require("./assets/images/animated-turbine.gif") + ")",
                left:"190px",
                top:"474px",
                width:"790px",
                height:"694px",
                backgroundRepeat:"no-repeat"
            },
            asideimage: {
                backgroundImage: "url("+require("./assets/images/aside-image.png") + ")",
                position:"absolute",
                top:"50px",
                right:"0px",
                width:"340px",
                height:"1000px",
                paddingLeft:"4px"
            },
            blocknode: {
                backgroundImage: "url("+require("./assets/images/block-node.png") + ")",
                width:"340px",
                height:"60px"
            },
            formLabelWidth: '120px'
        }
     },
     methods:{

     },
     mounted() {
        var self=this;
        mockAll();


        webvowl.app().initialize();
        
    }
}


</script>

<style>

@import './assets/css/webvowl.css';
@import './assets/css/webvowl.app.css';


.blocknode {text-align:left;font-size:13px;}
.blocknode div {position:relative;float:left;margin-top:22px;}

.blocknode .d-domain   { left:26px;font-size:16px; }
.blocknode .d-ip { left:65px;padding-top:3px }
.blocknode .d-containers{left:168px}

.blocknode:hover, .activenode
{
    box-shadow:inset 0px 0px 8px #AAA;
    -webkit-filter: contrast(1.5);
    cursor: pointer;
}
.el-table--border::after, .el-table--group::after, .el-table::before { background-color: transparent !important;}
.el-table tr, .el-table th, .cell {
  background-color: transparent !important;
  color:#bde8ff;
  height:18px;
}
.el-table td, .el-table th.is-leaf{
    border-bottom-color: #006AA7 !important;
    border-bottom:1px solid #006AA7;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color:#222 !important;
    opacity: 0.7;
}
</style>








