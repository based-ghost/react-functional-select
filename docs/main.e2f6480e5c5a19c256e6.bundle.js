(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"u",(function(){return mediaQueryIsMobileXS})),__webpack_require__.d(__webpack_exports__,"h",(function(){return Container})),__webpack_require__.d(__webpack_exports__,"q",(function(){return SelectContainer})),__webpack_require__.d(__webpack_exports__,"o",(function(){return ListWrapper})),__webpack_require__.d(__webpack_exports__,"m",(function(){return List})),__webpack_require__.d(__webpack_exports__,"n",(function(){return ListItem})),__webpack_require__.d(__webpack_exports__,"i",(function(){return Hr})),__webpack_require__.d(__webpack_exports__,"g",(function(){return Code})),__webpack_require__.d(__webpack_exports__,"t",(function(){return Title})),__webpack_require__.d(__webpack_exports__,"s",(function(){return SubTitle})),__webpack_require__.d(__webpack_exports__,"b",(function(){return ButtonGroup})),__webpack_require__.d(__webpack_exports__,"a",(function(){return Button})),__webpack_require__.d(__webpack_exports__,"k",(function(){return Label})),__webpack_require__.d(__webpack_exports__,"l",(function(){return LabelText})),__webpack_require__.d(__webpack_exports__,"f",(function(){return CheckboxGroup})),__webpack_require__.d(__webpack_exports__,"c",(function(){return Card})),__webpack_require__.d(__webpack_exports__,"e",(function(){return CardHeader})),__webpack_require__.d(__webpack_exports__,"d",(function(){return CardBody})),__webpack_require__.d(__webpack_exports__,"r",(function(){return Spacer})),__webpack_require__.d(__webpack_exports__,"p",(function(){return Paragraph})),__webpack_require__.d(__webpack_exports__,"j",(function(){return JsonContainer}));var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2);const mediaQueryIsMobile="@media only screen and (max-width: 768px)",mediaQueryIsMobileXS="@media only screen and (max-width: 525px)",Container=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.div`
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0.25rem 1.75rem;

  ${mediaQueryIsMobile} {
    font-size: 0.96em;
    padding: 0.25rem 1.25rem;
  }
`,SelectContainer=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.div`
  width: 60%;
  margin-top: 1rem;

  ${"@media only screen and (max-width: 991px) and (min-width: 769px)"} {
    width: 75%;
  }

  ${mediaQueryIsMobile} {
    width: 100%;
  }
`,ListWrapper=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.div`
  margin-top: 0;
  display: block;
  margin-bottom: 1rem;
  margin-block-end: 1em;
  margin-inline-end: 0px;
  margin-block-start: 1em;
  margin-inline-start: 0px;

  ${"@media only screen and (min-width: 992px)"} {
    max-width: 85%;
  }
`,List=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.ul`
  display: block;
  padding-left: 1.75rem;
  margin-block-end: 1em; 
  list-style-type: disc;
  margin-inline-end: 0px;
  margin-block-start: 1em;
  margin-inline-start: 0px;
  padding-inline-start: 30px;

  li + li {
    margin-top: .25em;
  }
  
  ${mediaQueryIsMobile} {
    padding-inline-start: 20px;
  }
`,ListItem=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.li`
  display: list-item;
  text-align: -webkit-match-parent;
`,Hr=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.hr`
  border: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
`,Code=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.code`
  font-size: 93%;
  border-radius: 0.3em;
  word-break: break-word;
  color: rgba(0, 0, 0, 0.9);
  padding: 0.15em 0.45em 0.15em;
  background-color: rgba(0, 0, 0, 0.065);
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;

  ${mediaQueryIsMobileXS} {
    padding: .1em .25em .1em;
  }
`,Title=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.h2`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  margin-top: .5rem;
  margin-bottom: .5rem;
`,SubTitle=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.h4`
  font-weight: 600;
  line-height: 1.2;
  font-size: 1.65rem;
  margin-top: 1.25rem;
  margin-bottom: .5rem;
`,ButtonGroup=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.div`
  > button {
    min-width: 4.5rem;
    margin-top: 0.5rem;
    
    :not(:last-of-type) {
      margin-right: .5rem;
    }
  }
`,Button=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.button`
  border: 0;
  color: #212529;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  overflow: visible;
  user-select: none;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  border-radius: 0.25rem;
  padding: .375rem .75rem;
  background-color: #EBECED;
  -webkit-appearance: button;
  transition: color 0.2s ease-out, background-color 0.2s ease-out;

  :focus {
    outline: 0;
  }

  :hover {
    background-color: #DEDFE0;
  }

  ${mediaQueryIsMobile} {
    display: block;
    width: 100%;
  }

  ${mediaQueryIsMobileXS} {
    font-size: 0.9em;
  }
`,Label=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.label`
  margin-top: 0.5rem;
  display: inline-block;

  > span {
    user-select: none;
    font-style: italic;
    margin-left: 0.4rem;
    color: rgb(102, 102, 102);
  }

  ${({$readOnly:$readOnly})=>$readOnly&&styled_components__WEBPACK_IMPORTED_MODULE_0__.c`
    opacity: 0.7;
    cursor: default;
    pointer-events: none;

    > input {
      opacity: 0.7;
    }
  `}
`,LabelText=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.span`
  margin-right: 1.15rem;
  vertical-align: middle;
`,CheckboxGroup=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.div`
  font-size: 1rem;

  > label {
    margin-top: 1rem;

    :not(:last-of-type) {
      margin-right: 1.35rem;
    }

    ${mediaQueryIsMobile} {
      margin-top: 0.75rem;
    }
  }
`,Card=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.div`
  min-width: 0;
  display: flex;
  margin: 1.25rem 0;
  position: relative;
  word-wrap: break-word;
  border-radius: 0.25rem;
  background-color: #fff;
  flex-direction: column;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
`,CardHeader=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.div`
  display: flex;
  font-weight: 600;
  font-size: 1.15rem;
  flex-flow: row wrap;
  background-color: #fff;
  padding: 0.75rem 1.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  ${mediaQueryIsMobile} {
    text-align: center;
  }

  ${({supportMobile:supportMobile})=>supportMobile&&styled_components__WEBPACK_IMPORTED_MODULE_0__.c`
    > * {
      ${mediaQueryIsMobile} {
        width: 100%;
        display: block;
        margin: 0 3.25rem 0.25rem;
      }

      ${mediaQueryIsMobileXS} {
        margin: 0 1.25rem 0.25rem;
      }
    }
  `}
`,CardBody=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.div`
  flex: 1 1 auto;
  min-height: 32rem;
  padding: 0.75rem 1.25rem;
`,Spacer=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.div`
  display: block;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`,_paragraphStyles=styled_components__WEBPACK_IMPORTED_MODULE_0__.c`
  margin-top: 0;
  display: block;
  margin-bottom: 1rem;
  margin-block-end: 1em;
  margin-inline-end: 0px;
  margin-block-start: 1em;
  margin-inline-start: 0px;

  ${"@media only screen and (min-width: 992px)"} {
    max-width: 85%;
  }
`,Paragraph=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.p`
  ${_paragraphStyles}
`,JsonContainer=styled_components__WEBPACK_IMPORTED_MODULE_0__.d.div`
  ${_paragraphStyles}
`},141:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);const Link=__webpack_require__(2).d.a`
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: none;
  font-weight: 600;
  line-height: 1.2;
  overflow: visible;
  user-select: none;
  padding: 0 .05rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  background-color: transparent;
  transition: box-shadow 0.2s ease-out;

  :hover {
    box-shadow: 0 1px 0 0 currentColor;
  }
`;__webpack_exports__.a=({name:name,href:href})=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Link,{href:href,rel:"noopener",target:"_blank","aria-label":name},name)},184:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2),_styled__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(1);const PrintJsonRoot=styled_components__WEBPACK_IMPORTED_MODULE_1__.d.div`
  font-size: 1rem;
  margin-top: 25px;
  overflow: hidden;
  border-radius: 9px;
  position: relative;
  background-color: #282c34;
  box-shadow: rgba(20, 20, 20, 0.23) 0.0555556rem 0.0555556rem 1.11111rem;
`,PrintJsonHeader=styled_components__WEBPACK_IMPORTED_MODULE_1__.d.div`
  color: #f5b83d;
  line-height: 3;
  font-weight: 700;
  padding: 0px 15px;
  font-size: 1.15rem;
  border-radius: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background-color: #1D2027;

  ${_styled__WEBPACK_IMPORTED_MODULE_2__.u} {
    font-size: 1.05rem;
    letter-spacing: 0.05em;
  }
`,PrintJsonPre=styled_components__WEBPACK_IMPORTED_MODULE_1__.d.pre`
  margin: 0;
  color: #fff;
  resize: none;
  font-size: 90%;
  padding: 10px 30px;
  display: inline-block;
  letter-spacing: 0.03em;
  touch-action: manipulation;
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;

  ${_styled__WEBPACK_IMPORTED_MODULE_2__.u} {
    font-size: 0.75em;
    padding: 10px 18px;
    letter-spacing: normal;
  }
`,PrettyPrintJson=react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(({data:data,header:header})=>{const jsonWithoutQuotes=JSON.stringify(data||{},null,2).toString().replace(/"/g,"").replace(/\\/g,"");return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PrintJsonRoot,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PrintJsonHeader,null,header),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PrintJsonPre,null,jsonWithoutQuotes))});__webpack_exports__.a=PrettyPrintJson},286:function(module,__webpack_exports__,__webpack_require__){"use strict";var _storybook_theming__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(71);__webpack_exports__.a=Object(_storybook_theming__WEBPACK_IMPORTED_MODULE_0__.create)({base:"dark",colorPrimary:"#f5b83d",colorSecondary:"rgba(252, 146, 158, 0.675)",appBorderRadius:4,appBg:"#1D2027",appBorderColor:"#535353",appContentBg:"#282c34",textColor:"#fff",textInverseColor:"rgba(255, 255, 255, 0.9)",barBg:"#1D2027",barTextColor:_storybook_theming__WEBPACK_IMPORTED_MODULE_0__.color.medium,barSelectedColor:"#fc929e",inputBorderRadius:4,inputBg:_storybook_theming__WEBPACK_IMPORTED_MODULE_0__.themes.light.inputBg,inputBorder:_storybook_theming__WEBPACK_IMPORTED_MODULE_0__.themes.light.inputBorder,inputTextColor:_storybook_theming__WEBPACK_IMPORTED_MODULE_0__.themes.light.inputTextColor,brandUrl:"https://based-ghost.github.io/react-functional-select/"})},290:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(63),__webpack_require__(106),__webpack_require__(107);var styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(2);function _templateObject(){var data=function _taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(['\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n\n  html {\n    -webkit-text-size-adjust: 100%;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  }\n\n  body {\n    flex: 1;\n    margin: 0;\n    display: flex;\n    color: #212529;\n    font-size: 1rem;\n    font-weight: 400;\n    text-align: left;\n    line-height: 1.5;\n    min-height: 120vh;\n    flex-direction: column;\n    background-color: #fff;\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;\n  }\n\n  em {\n    font-weight: 600;\n  }\n']);return _templateObject=function(){return data},data}__webpack_exports__.a=Object(styled_components__WEBPACK_IMPORTED_MODULE_3__.b)(_templateObject())},292:function(module,exports,__webpack_require__){__webpack_require__(293),__webpack_require__(406),module.exports=__webpack_require__(407)},314:function(module,exports){},407:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__(23),__webpack_require__(19),__webpack_require__(15),__webpack_require__(24),__webpack_require__(25);var react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),react_dom__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(133),react_dom__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_6__),_darkTheme__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(286),_globalStyle__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(290),_storybook_react__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(26),req=__webpack_require__(606);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_9__.addParameters)({options:{theme:_darkTheme__WEBPACK_IMPORTED_MODULE_7__.a,storySort:function storySort(a,b){return a[1].kind===b[1].kind?0:a[1].id.localeCompare(b[1].id,{numeric:!0})}}});var _ref=react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_globalStyle__WEBPACK_IMPORTED_MODULE_8__.a,null);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_9__.configure)((function(){var _setupGlobalStyle=function setupGlobalStyle(){var el,globalStyleEl=document.getElementById("gen3-global-style")||((el=document.createElement("div")).id="gen3-global-style",document.head.append(el),el);return{containerNode:globalStyleEl,cleanupContainerNode:function(){globalStyleEl&&document.head.removeChild(globalStyleEl)}}}(),containerNode=_setupGlobalStyle.containerNode,cleanupContainerNode=_setupGlobalStyle.cleanupContainerNode;react_dom__WEBPACK_IMPORTED_MODULE_6___default.a.render(_ref,containerNode,cleanupContainerNode),req.keys().forEach((function(file){return req(file)}))}),module)}.call(this,__webpack_require__(61)(module))},41:function(module,__webpack_exports__,__webpack_require__){"use strict";var react=__webpack_require__(0),react_default=__webpack_require__.n(react),styled_components_browser_esm=__webpack_require__(2);function isDocumentElement(el){return el===document.documentElement||el===document.body||el===window}function getScrollTop(el){return isDocumentElement(el)?window.pageYOffset:el.scrollTop}function smoothScrollTo(element,to,duration,callback){const start=getScrollTop(element),change=to-start;let currentTime=0;requestAnimationFrame((function smoothScroller(){(function scrollTo(el,top){isDocumentElement(el)?window.scrollTo(0,top):el.scrollTop=top})(element,function easeOutCubic(t,s,c,d){return c*((t=t/d-1)*t*t+1)+s}(currentTime+=5,start,change,duration)),currentTime<duration?requestAnimationFrame(smoothScroller):callback&&callback(element)}))}function isArrayWithLength(test){return Array.isArray(test)&&!!test.length}function isPlainObject(test){return test&&"object"==typeof test&&!Array.isArray(test)}function createID(idPrefix,idSuffix){if(idPrefix)return idSuffix?`${idPrefix}-${idSuffix}`:idPrefix}function trimAndFormatFilterStr(value,filterIsCaseSensitive){const formatVal=value.replace(/^\s+|\s+$/g,"");return filterIsCaseSensitive?formatVal:formatVal.toLowerCase()}function scrollMenuIntoViewOnOpen(menuEl,scrollMenuIntoView,onMenuOpen){if(!scrollMenuIntoView||!menuEl||!menuEl.getBoundingClientRect)return void(onMenuOpen&&onMenuOpen());const{top:menuTop,bottom:menuBottom,height:menuHeight}=menuEl.getBoundingClientRect(),viewHeight=window.innerHeight;if(viewHeight-menuTop>=menuHeight)return void(onMenuOpen&&onMenuOpen());const scrollParent=function getScrollParent(el){let style=getComputedStyle(el);const excludeStaticParent="absolute"===style.position;if("fixed"===style.position)return document.documentElement;for(let parent=el;parent=parent.parentElement;)if(style=getComputedStyle(parent),(!excludeStaticParent||"static"!==style.position)&&/(auto|scroll)/.test(`${style.overflow}${style.overflowY}${style.overflowX}`))return parent;return document.documentElement}(menuEl),scrollTop=getScrollTop(scrollParent);scrollParent.getBoundingClientRect().height-scrollTop-menuTop<menuHeight?onMenuOpen&&onMenuOpen():smoothScrollTo(scrollParent,menuBottom-viewHeight+scrollTop+parseInt(getComputedStyle(menuEl).marginBottom||"0",10),300,onMenuOpen)}function validateSetValueOption(option,menuOptions,getOptionValueCB){if(null==option||Array.isArray(option))return;const optionValue=option&&function isPrimitive(test){return test!==Object(test)}(option)?option:getOptionValueCB(option);return menuOptions.find(mOption=>mOption.value===optionValue)||void 0}const OPTIONS_DEFAULT=[],NO_SELECTED_OPTION=Object.freeze({}),FOCUSED_OPTION_DEFAULT=Object.freeze({index:-1}),SELECTED_OPTION_DEFAULT=Object.freeze({initFlag:!0}),useMenuOptions=(options,debouncedInputValue,getOptionValueCB,getOptionLabelCB,getIsOptionDisabledCB,getFilterOptionStringCB,filterIsCaseSensitive)=>{const[menuOptions,setMenuOptions]=Object(react.useState)(OPTIONS_DEFAULT);return Object(react.useEffect)(()=>{setMenuOptions((()=>{const cleanSearchInputValue=trimAndFormatFilterStr(debouncedInputValue,filterIsCaseSensitive),parseMenuOption=data=>{const menuOption={data:data,label:getOptionLabelCB(data),value:getOptionValueCB(data)};if(!cleanSearchInputValue||(menuOption=>{return trimAndFormatFilterStr(getFilterOptionStringCB(menuOption),filterIsCaseSensitive).indexOf(cleanSearchInputValue)>-1})(menuOption))return Object.assign({},menuOption,{},getIsOptionDisabledCB(data)&&{isDisabled:!0})};return options.reduce((accumulator,data)=>{const option=parseMenuOption(data);return option&&accumulator.push(option),accumulator},[])})()||OPTIONS_DEFAULT)},[options,filterIsCaseSensitive,debouncedInputValue,getFilterOptionStringCB,getOptionValueCB,getOptionLabelCB,getIsOptionDisabledCB]),menuOptions},fadeIn=styled_components_browser_esm.e`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`,fadeInAnimationCss=styled_components_browser_esm.c`
  animation: ${fadeIn} 0.225s ease-in-out forwards;
`;var index_esm=__webpack_require__(142);const Option=react_default.a.memo(({index:index,style:style,data:{idSuffix:idSuffix,menuOptions:menuOptions,selectOption:selectOption,renderOptionLabel:renderOptionLabel,focusedOptionIndex:focusedOptionIndex,selectedOptionValue:selectedOptionValue}})=>{const{data:data,value:value,label:label,isDisabled:isDisabled}=menuOptions[index],isSelected=value===selectedOptionValue,className=function createClassName(classNames){return classNames.filter(x=>x).join(" ")}(["rfs-option",isDisabled&&"rfs-option-disabled",isSelected&&"rfs-option-selected",index===focusedOptionIndex&&"rfs-option-focused"]);return react_default.a.createElement("div",{role:"button",style:style,className:className,id:idSuffix?createID(`rfs-option-${index}`,idSuffix):void 0,onClick:isDisabled?void 0:()=>selectOption({data:data,value:value,label:label},isSelected)},renderOptionLabel(data))},index_esm.b);Option.displayName="Option";var components_Option=Option;const NoOptionsMsg=styled_components_browser_esm.d.div`
  text-align: center;
  color: ${({theme:theme})=>theme.noOptions.color};
  margin: ${({theme:theme})=>theme.noOptions.margin};
  padding: ${({theme:theme})=>theme.noOptions.padding};
  font-size: ${({theme:theme})=>theme.noOptions.fontSize};
`,Menu=react_default.a.forwardRef(({width:width,itemSize:itemSize,idSuffix:idSuffix,maxHeight:maxHeight,menuOptions:menuOptions,selectOption:selectOption,noOptionsMsg:noOptionsMsg,overscanCount:overscanCount,renderOptionLabel:renderOptionLabel,focusedOptionIndex:focusedOptionIndex,selectedOptionValue:selectedOptionValue},ref)=>{const itemData=Object(react.useMemo)(()=>({idSuffix:idSuffix,menuOptions:menuOptions,selectOption:selectOption,renderOptionLabel:renderOptionLabel,focusedOptionIndex:focusedOptionIndex,selectedOptionValue:selectedOptionValue}),[idSuffix,menuOptions,focusedOptionIndex,selectedOptionValue,selectOption,renderOptionLabel]);return react_default.a.createElement(react.Fragment,null,react_default.a.createElement(index_esm.a,{ref:ref,width:width,itemSize:itemSize,itemData:itemData,overscanCount:overscanCount,itemCount:menuOptions.length,height:Math.min(maxHeight,menuOptions.length*itemSize)},components_Option),!isArrayWithLength(menuOptions)&&react_default.a.createElement(NoOptionsMsg,null,noOptionsMsg))});Menu.displayName="Menu";var components_Menu=Menu;const _valueDivCSS=styled_components_browser_esm.c`
  top: 50%;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  box-sizing: border-box;
  text-overflow: ellipsis;
  transform: translateY(-50%);
`,StyledValue=styled_components_browser_esm.d.div`
  ${_valueDivCSS}
  max-width: calc(100% - 0.5rem);
`,Placeholder=styled_components_browser_esm.d.div`
  ${_valueDivCSS}
  color: ${({theme:theme})=>theme.color.placeholder};
`,Value=react_default.a.memo(({inputValue:inputValue,placeholder:placeholder,renderOptionLabel:renderOptionLabel,selectedOptionData:selectedOptionData})=>inputValue?null:selectedOptionData?react_default.a.createElement(StyledValue,null,renderOptionLabel(selectedOptionData)):react_default.a.createElement(Placeholder,null,placeholder));Value.displayName="Value";var components_Value=Value;function _extends(){return(_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const _wrapperDivStyle=Object.freeze({display:"inline-block"}),_inputStaticAttributes=Object.freeze({type:"text",spellCheck:!1,autoCorrect:"off",autoComplete:"off",autoCapitalize:"none","aria-autocomplete":"list","data-testid":void 0}),StyledSizer=styled_components_browser_esm.d.div`
  top: 0;
  left: 0;
  height: 0;
  overflow: scroll;
  white-space: pre;
  position: absolute;
  visibility: hidden;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
`,StyledAutosizeInput=styled_components_browser_esm.d.input`
  border: 0;
  outline: 0;
  padding: 0;
  cursor: text;
  background: 0;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  box-sizing: content-box;

  :read-only {
    opacity: 0;
    cursor: default;
  }

  ${"@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)"} {
    ::-ms-clear { 
      display: none; 
    }
  }
`,AutosizeInput=react_default.a.memo(react_default.a.forwardRef(({id:id,onBlur:onBlur,onFocus:onFocus,onChange:onChange,disabled:disabled,ariaLabel:ariaLabel,inputValue:inputValue,isSearchable:isSearchable,addClassNames:addClassNames,ariaLabelledBy:ariaLabelledBy},ref)=>{const sizerRef=Object(react.useRef)(null),[inputWidth,setInputWidth]=Object(react.useState)(2);Object(react.useEffect)(()=>{sizerRef.current&&setInputWidth(sizerRef.current.scrollWidth+2)},[inputValue]);const inputAttributes=Object.assign({id:id,disabled:disabled},_inputStaticAttributes,{"aria-label":ariaLabel,"aria-labelledby":ariaLabelledBy});return react_default.a.createElement("div",{style:_wrapperDivStyle},react_default.a.createElement(StyledAutosizeInput,_extends({ref:ref,onBlur:onBlur,onFocus:onFocus,value:inputValue},inputAttributes,{readOnly:!isSearchable,style:{width:inputWidth},onChange:isSearchable?onChange:void 0,className:addClassNames?"rfs-autosize-input":void 0})),react_default.a.createElement(StyledSizer,{ref:sizerRef},inputValue))}));AutosizeInput.displayName="AutosizeInput";var components_AutosizeInput=AutosizeInput;const bounce=styled_components_browser_esm.e`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`,StyledLoadingDots=styled_components_browser_esm.d.div`
  display: flex;
  align-self: center;
  text-align: center;
  margin-right: 0.25rem;
  padding: ${({theme:theme})=>theme.loader.padding};

  > div {
    border-radius: 100%;
    display: inline-block;
    width: ${({theme:theme})=>theme.loader.size};
    height: ${({theme:theme})=>theme.loader.size};
    opacity: ${({theme:theme})=>theme.loader.opacity};
    background-color: ${({theme:theme})=>theme.loader.color};
    animation: ${bounce} 1.19s ease-in-out infinite;

    :nth-of-type(1) {
      animation-delay: -0.272s;
    }

    :nth-of-type(2) {
      animation-delay: -0.136s;
    }
  }
`;var components_LoadingDots=()=>react_default.a.createElement(StyledLoadingDots,{"aria-hidden":"true"},react_default.a.createElement("div",null),react_default.a.createElement("div",null),react_default.a.createElement("div",null));const IndicatorIconsWrapper=styled_components_browser_esm.d.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: stretch;
  box-sizing: border-box;
`,IndicatorIcon=styled_components_browser_esm.d.div`
  display: flex;
  box-sizing: border-box;
  color: ${({theme:theme})=>theme.icon.color};
  padding: ${({theme:theme})=>theme.icon.padding};

  :hover {
    color: ${({theme:theme})=>theme.icon.hoverColor};
  }
`,Clear=styled_components_browser_esm.d.div`
  overflow: hidden;
  ${fadeInAnimationCss}
  font-size: ${({theme:theme})=>theme.icon.clear.fontSize};
  transition: ${({theme:theme})=>theme.icon.clear.transition};
  font-weight: ${({theme:theme})=>theme.icon.clear.fontWeight};
  font-family: ${({theme:theme})=>theme.icon.clear.fontFamily};
`,Caret=styled_components_browser_esm.d.div`
  transition: ${({theme:theme})=>theme.icon.caret.transition};
  border-top: ${({theme:theme})=>theme.icon.caret.size} dashed;
  border-left: ${({theme:theme})=>theme.icon.caret.size} solid transparent;
  border-right: ${({theme:theme})=>theme.icon.caret.size} solid transparent;

  ${({menuOpen:menuOpen,isInvalid:isInvalid,theme:{color:color}})=>menuOpen&&styled_components_browser_esm.c`
      transform: rotate(180deg);
      color: ${isInvalid?color.invalid:color.caretActive||color.accent};
    `}
`,Separator=styled_components_browser_esm.d.div`
  width: 1px;
  margin: 0.5rem 0;
  align-self: stretch;
  box-sizing: border-box;
  background-color: ${({theme:{color:color}})=>color.iconSeparator||color.border};
`,IndicatorIcons=react_default.a.memo(({menuOpen:menuOpen,clearIcon:clearIcon,caretIcon:caretIcon,isInvalid:isInvalid,showClear:showClear,isLoading:isLoading,addClassNames:addClassNames,onClearMouseDown:onClearMouseDown})=>react_default.a.createElement(IndicatorIconsWrapper,null,showClear&&!isLoading&&react_default.a.createElement(IndicatorIcon,{"aria-hidden":"true",onTouchEnd:onClearMouseDown,onMouseDown:onClearMouseDown,"data-testid":void 0},clearIcon||react_default.a.createElement(Clear,{className:addClassNames?"rfs-clear-icon":void 0},"X")),isLoading&&react_default.a.createElement(components_LoadingDots,null),react_default.a.createElement(Separator,null),react_default.a.createElement(IndicatorIcon,{"aria-hidden":"true"},caretIcon||react_default.a.createElement(Caret,{menuOpen:menuOpen,isInvalid:isInvalid,className:addClassNames?"rfs-caret-icon":void 0}))));IndicatorIcons.displayName="IndicatorIcons";var components_IndicatorIcons=IndicatorIcons;const A11yText=styled_components_browser_esm.d.span`
  border: 0;
  padding: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
`;var components_AriaLiveRegion=({menuOpen:menuOpen,ariaLabel:ariaLabel,inputValue:inputValue,optionCount:optionCount,isSearchable:isSearchable,focusedOptionLabel:focusedOptionLabel,focusedOptionIndex:focusedOptionIndex,selectedOptionLabel:selectedOptionLabel,isFocusedOptionDisabled:isFocusedOptionDisabled})=>{const selectedOptionMsg=`Selected option: ${selectedOptionLabel||"N/A"}`,optionsMsg=`${optionCount} result(s) available${inputValue?` for search input ${inputValue}`:""}.`,focusedMsg=`Focused option: ${focusedOptionLabel||"N/A"}${isFocusedOptionDisabled?" - disabled":""}, ${focusedOptionIndex+1} of ${optionCount}.`,menuMsg=menuOpen?"Use Up and Down arrow keys to choose options, press Enter or Tab to select the currently focused option, press Escape to close the menu.":`${ariaLabel||"Select"} is focused${isSearchable?", type to filter options":""}, press Down arrow key to open the menu.`;return react_default.a.createElement(A11yText,{"aria-live":"polite"},react_default.a.createElement("p",null,selectedOptionMsg),react_default.a.createElement("p",null,focusedMsg+optionsMsg+menuMsg))};const _indexPositionEnum=Object.freeze({UP:0,DOWN:1,FIRST:2,LAST:3}),SelectWrapper=styled_components_browser_esm.d.div`
  position: relative;
  box-sizing: border-box;
  ${({theme:theme})=>theme.color.textColor&&styled_components_browser_esm.c`color: ${theme.color.textColor};`}
  ${({theme:theme})=>theme.select.fontSize&&styled_components_browser_esm.c`font-size: ${theme.select.fontSize};`}
`,ValueWrapper=styled_components_browser_esm.d.div`
  flex: 1 1 0%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  padding: ${({theme:theme})=>theme.control.padding};
`,ControlWrapper=styled_components_browser_esm.d.div`
  outline: 0;
  display: flex;
  flex-wrap: wrap;
  cursor: default;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;

  ${({theme:{control:control}})=>styled_components_browser_esm.c`
    height: ${control.height};
    transition: ${control.transition};
    border-style: ${control.borderStyle};
    border-width: ${control.borderWidth};
    border-radius: ${control.borderRadius};
    ${control.backgroundColor&&`background-color: ${control.backgroundColor};`}
  `}

  ${({isDisabled:isDisabled,theme:theme})=>isDisabled&&styled_components_browser_esm.c`
      pointer-events: none;
      background-color: ${theme.color.disabled};
    `}

  ${({isFocused:isFocused,isInvalid:isInvalid,theme:theme})=>((boxShadow,borderColor,invalidColor,invalidFocus,boxShadowColor,focusedBorderColor,isFocused,isInvalid)=>isFocused?styled_components_browser_esm.c`
      border-color: ${isInvalid?invalidColor:focusedBorderColor};
      box-shadow: ${boxShadow} ${isInvalid?invalidFocus:boxShadowColor};
    `:styled_components_browser_esm.c`
    border-color: ${isInvalid?invalidColor:borderColor};
  `)(theme.control.boxShadow,theme.color.border,theme.color.invalid,theme.color.invalidFocus,theme.control.boxShadowColor,theme.control.focusedBorderColor,isFocused,isInvalid)}
`,MenuWrapper=styled_components_browser_esm.d.div`
  z-index: 999;
  position: absolute;
  ${fadeInAnimationCss}
  
  ${({hideMenu:hideMenu,theme:{menu:menu}})=>styled_components_browser_esm.c`
    width: ${menu.width};
    margin: ${menu.margin};
    padding: ${menu.padding};
    box-shadow: ${menu.boxShadow};
    border-radius: ${menu.borderRadius};
    background-color: ${menu.backgroundColor};
    ${hideMenu&&"display: none;"}
  `}

  .${"rfs-option"} {
    display: block;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    padding: ${({theme:theme})=>theme.menu.option.padding};
    text-align: ${({theme:theme})=>theme.menu.option.textAlign};

    &.${"rfs-option-focused"},
    &:hover:not(.${"rfs-option-disabled"}):not(.${"rfs-option-selected"}) {
      background-color: ${({theme:theme})=>theme.menu.option.focusedBgColor};
    }

    &.${"rfs-option-selected"} {
      color: ${({theme:theme})=>theme.menu.option.selectedColor};
      background-color: ${({theme:theme})=>theme.menu.option.selectedBgColor};
    }

    &.${"rfs-option-disabled"} {
      opacity: 0.35;
    }
  }
`,Select=react_default.a.forwardRef(({inputId:inputId,selectId:selectId,idSuffix:idSuffix,isLoading:isLoading,onKeyDown:onKeyDown,clearIcon:clearIcon,caretIcon:caretIcon,isInvalid:isInvalid,ariaLabel:ariaLabel,menuWidth:menuWidth,isDisabled:isDisabled,inputDelay:inputDelay,onMenuOpen:onMenuOpen,onMenuClose:onMenuClose,onInputBlur:onInputBlur,isClearable:isClearable,onInputFocus:onInputFocus,initialValue:initialValue,addClassNames:addClassNames,ariaLabelledBy:ariaLabelledBy,onOptionChange:onOptionChange,getOptionLabel:getOptionLabel,getOptionValue:getOptionValue,openMenuOnFocus:openMenuOnFocus,isAriaLiveEnabled:isAriaLiveEnabled,menuOverscanCount:menuOverscanCount,blurInputOnSelect:blurInputOnSelect,renderOptionLabel:renderOptionLabel,getIsOptionDisabled:getIsOptionDisabled,filterIsCaseSensitive:filterIsCaseSensitive,getFilterOptionString:getFilterOptionString,isSearchable:isSearchable=!0,tabSelectsOption:tabSelectsOption=!0,closeMenuOnSelect:closeMenuOnSelect=!0,scrollMenuIntoView:scrollMenuIntoView=!0,backspaceClearsValue:backspaceClearsValue=!0,options:options=OPTIONS_DEFAULT,placeholder:placeholder="Select option..",noOptionsMsg:noOptionsMsg="No options",menuItemSize:menuItemSize=35,menuMaxHeight:menuMaxHeight=300},ref)=>{const prevMenuOptionsLen=Object(react.useRef)(),listRef=Object(react.useRef)(null),menuRef=Object(react.useRef)(null),inputRef=Object(react.useRef)(null),[inputValue,setInputValue]=Object(react.useState)(""),[menuOpen,setMenuOpen]=Object(react.useState)(!1),[isFocused,setIsFocused]=Object(react.useState)(!1),[focusedOption,setFocusedOption]=Object(react.useState)(FOCUSED_OPTION_DEFAULT),[selectedOption,setSelectedOption]=Object(react.useState)(SELECTED_OPTION_DEFAULT),debouncedInputValue=((value,delay)=>{const[debouncedValue,setDebouncedValue]=Object(react.useState)(value);return Object(react.useEffect)(()=>{if(void 0===delay)return;const handler=setTimeout(()=>{setDebouncedValue(value)},delay);return()=>{clearTimeout(handler)}},[value,delay]),void 0===delay?value:debouncedValue})(inputValue,inputDelay),{data:selectedOptionData,value:selectedOptionValue,label:selectedOptionLabel,initFlag:canAttemptInitValSet}=selectedOption,{data:focusedOptionData,value:focusedOptionValue,label:focusedOptionLabel,index:focusedOptionIndex,isDisabled:isFocusedOptionDisabled}=focusedOption,getOptionLabelCB=Object(react.useCallback)(data=>getOptionLabel?getOptionLabel(data):data.label,[getOptionLabel]),getOptionValueCB=Object(react.useCallback)(data=>getOptionValue?getOptionValue(data):data.value,[getOptionValue]),getIsOptionDisabledCB=Object(react.useCallback)(data=>getIsOptionDisabled?getIsOptionDisabled(data):!!data.isDisabled,[getIsOptionDisabled]),renderOptionLabelCB=Object(react.useCallback)(data=>renderOptionLabel?renderOptionLabel(data):getOptionLabelCB(data),[renderOptionLabel,getOptionLabelCB]),getFilterOptionStringCB=Object(react.useCallback)(option=>getFilterOptionString?getFilterOptionString(option):String(option.label),[getFilterOptionString]),menuOptions=useMenuOptions(options,debouncedInputValue,getOptionValueCB,getOptionLabelCB,getIsOptionDisabledCB,getFilterOptionStringCB,filterIsCaseSensitive),blurInput=()=>{inputRef.current&&inputRef.current.blur()},focusInput=()=>{inputRef.current&&inputRef.current.focus()},scrollToItemIndex=index=>{listRef.current&&listRef.current.scrollToItem(index)},selectOption=Object(react.useCallback)((option,isSelected)=>{isSelected?setMenuOpen(!1):setSelectedOption(option||NO_SELECTED_OPTION)},[]),openMenuAndFocusOption=Object(react.useCallback)(position=>{if(!isArrayWithLength(menuOptions))return void setMenuOpen(!0);const selectedIndex=selectedOption.value?menuOptions.findIndex(option=>option.value===selectedOption.value):-1,index=selectedIndex>-1?selectedIndex:position===_indexPositionEnum.FIRST?0:menuOptions.length-1;setMenuOpen(!0),setFocusedOption(Object.assign({index:index},menuOptions[index])),scrollToItemIndex(index)},[menuOptions,selectedOption]);Object(react.useImperativeHandle)(ref,()=>({blur:blurInput,focus:focusInput,clearValue:()=>{selectOption(),setFocusedOption(FOCUSED_OPTION_DEFAULT)},setValue:option=>{const validOptionOrUndefined=validateSetValueOption(option,menuOptions,getOptionValueCB);selectOption(validOptionOrUndefined)}})),Object(react.useEffect)(()=>{isFocused&&openMenuOnFocus&&openMenuAndFocusOption(_indexPositionEnum.FIRST)},[isFocused,openMenuOnFocus,openMenuAndFocusOption]),Object(react.useEffect)(()=>{canAttemptInitValSet&&isPlainObject(initialValue)&&selectOption({data:initialValue,value:getOptionValueCB(initialValue),label:getOptionLabelCB(initialValue)})},[selectOption,initialValue,canAttemptInitValSet,getOptionValueCB,getOptionLabelCB]),Object(react.useEffect)(()=>{onOptionChange&&onOptionChange(selectedOptionData||null),!selectedOptionData&&setFocusedOption(FOCUSED_OPTION_DEFAULT),blurInputOnSelect&&selectedOptionData?blurInput():closeMenuOnSelect&&(setMenuOpen(!1),setInputValue(""))},[selectedOptionData,onOptionChange,closeMenuOnSelect,blurInputOnSelect]),Object(react.useEffect)(()=>{menuOpen?scrollMenuIntoViewOnOpen(menuRef.current,scrollMenuIntoView,onMenuOpen):onMenuClose&&onMenuClose()},[menuOpen,onMenuClose,onMenuOpen,scrollMenuIntoView]),Object(react.useEffect)(()=>{(1===menuOptions.length||menuOptions.length&&(menuOptions.length!==options.length||0===prevMenuOptionsLen.current))&&(setFocusedOption(Object.assign({index:0},menuOptions[0])),scrollToItemIndex(0)),prevMenuOptionsLen.current=menuOptions.length},[options,menuOptions]);const selectOptionFromFocused=()=>{focusedOptionData&&!isFocusedOptionDisabled&&(closeMenuOnSelect&&selectedOptionValue===focusedOptionValue?setMenuOpen(!1):selectOption({data:focusedOptionData,value:focusedOptionValue,label:focusedOptionLabel}))},focusOptionOnArrowKey=position=>{if(!isArrayWithLength(menuOptions))return;const index=position===_indexPositionEnum.DOWN?(focusedOptionIndex+1)%menuOptions.length:focusedOptionIndex>0?focusedOptionIndex-1:menuOptions.length-1;setFocusedOption(Object.assign({index:index},menuOptions[index])),scrollToItemIndex(index)},handleOnControlMouseDown=e=>{isDisabled||(isFocused||focusInput(),menuOpen?"INPUT"!==e.currentTarget.tagName&&(setMenuOpen(!1),inputValue&&setInputValue("")):openMenuAndFocusOption(_indexPositionEnum.FIRST),"INPUT"!==e.currentTarget.tagName&&e.preventDefault())},handleOnInputBlur=Object(react.useCallback)(e=>{onInputBlur&&onInputBlur(e),setIsFocused(!1),setMenuOpen(!1),setInputValue("")},[onInputBlur]),handleOnInputFocus=Object(react.useCallback)(e=>{onInputFocus&&onInputFocus(e),setIsFocused(!0)},[onInputFocus]),handleOnInputChange=Object(react.useCallback)(e=>{setMenuOpen(!0),setInputValue(e.currentTarget.value||"")},[]),handleOnClearMouseDown=Object(react.useCallback)(e=>{e.stopPropagation(),"mousedown"===e.type&&e.preventDefault(),setSelectedOption(NO_SELECTED_OPTION),focusInput()},[]);return react_default.a.createElement(SelectWrapper,{id:selectId,onKeyDown:e=>{if(!(isDisabled||onKeyDown&&(onKeyDown(e),e.defaultPrevented))){switch(e.key){case"ArrowDown":menuOpen?focusOptionOnArrowKey(_indexPositionEnum.DOWN):openMenuAndFocusOption(_indexPositionEnum.FIRST);break;case"ArrowUp":menuOpen?focusOptionOnArrowKey(_indexPositionEnum.UP):openMenuAndFocusOption(_indexPositionEnum.LAST);break;case" ":if(inputValue)return;menuOpen?selectOptionFromFocused():openMenuAndFocusOption(_indexPositionEnum.FIRST);break;case"Enter":229!==e.keyCode&&selectOptionFromFocused();break;case"Escape":setMenuOpen(!1),setInputValue("");break;case"Tab":if(e.shiftKey||!menuOpen||!focusedOptionData)return;tabSelectsOption?selectOptionFromFocused():(setMenuOpen(!1),setInputValue(""));break;case"Delete":case"Backspace":if(inputValue||!backspaceClearsValue||!isClearable)return;selectOption();break;default:return}e.preventDefault()}},"data-testid":void 0,className:addClassNames?"rfs-select-container":void 0},react_default.a.createElement(ControlWrapper,{isInvalid:isInvalid,isFocused:isFocused,isDisabled:isDisabled,onTouchEnd:handleOnControlMouseDown,onMouseDown:handleOnControlMouseDown,"data-testid":void 0,className:addClassNames?"rfs-control-container":void 0},react_default.a.createElement(ValueWrapper,null,react_default.a.createElement(components_Value,{inputValue:inputValue,placeholder:placeholder,selectedOptionData:selectedOptionData,renderOptionLabel:renderOptionLabelCB}),react_default.a.createElement(components_AutosizeInput,{id:inputId,ref:inputRef,disabled:isDisabled,ariaLabel:ariaLabel,inputValue:inputValue,onBlur:handleOnInputBlur,isSearchable:isSearchable,onFocus:handleOnInputFocus,addClassNames:addClassNames,onChange:handleOnInputChange,ariaLabelledBy:ariaLabelledBy})),react_default.a.createElement(components_IndicatorIcons,{menuOpen:menuOpen,clearIcon:clearIcon,caretIcon:caretIcon,isInvalid:isInvalid,isLoading:isLoading,addClassNames:addClassNames,onClearMouseDown:handleOnClearMouseDown,showClear:!(!isClearable||isDisabled||!selectedOptionData)})),react_default.a.createElement(MenuWrapper,{ref:menuRef,hideMenu:!menuOpen,onMouseDown:e=>{e.stopPropagation(),e.preventDefault(),focusInput()},"data-testid":void 0,className:addClassNames?"rfs-menu-container":void 0},react_default.a.createElement(components_Menu,{ref:listRef,width:menuWidth,idSuffix:idSuffix,itemSize:menuItemSize,maxHeight:menuMaxHeight,menuOptions:menuOptions,noOptionsMsg:noOptionsMsg,selectOption:selectOption,overscanCount:menuOverscanCount,focusedOptionIndex:focusedOptionIndex,renderOptionLabel:renderOptionLabelCB,selectedOptionValue:selectedOptionValue})),isAriaLiveEnabled&&isFocused&&react_default.a.createElement(components_AriaLiveRegion,{menuOpen:menuOpen,ariaLabel:ariaLabel,inputValue:inputValue,isSearchable:isSearchable,optionCount:menuOptions.length,focusedOptionLabel:focusedOptionLabel,focusedOptionIndex:focusedOptionIndex,selectedOptionLabel:selectedOptionLabel,isFocusedOptionDisabled:isFocusedOptionDisabled}))});Select.displayName="Select";var src_Select=Select,src_theme=__webpack_require__(91);function SelectWrapper_extends(){return(SelectWrapper_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const SelectWrapper_SelectWrapper=react_default.a.forwardRef((_ref,ref)=>{let{inputId:inputId,selectId:selectId,idSuffix:idSuffix,menuWidth:menuWidth,themeConfig:themeConfig,blurInputOnSelect:blurInputOnSelect}=_ref,rest=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(_ref,["inputId","selectId","idSuffix","menuWidth","themeConfig","blurInputOnSelect"]);const theme=Object(react.useMemo)(()=>isPlainObject(themeConfig)?function mergeDeep(target,source){const output=Object.assign({},target);return Object.keys(source).forEach(key=>{isPlainObject(source[key])?output[key]=key in target?mergeDeep(target[key],source[key]):source[key]:output[key]=source[key]}),output}(src_theme.a,themeConfig):Object.assign({},src_theme.a),[themeConfig]),blurInputOnSelectOrDefault="boolean"==typeof blurInputOnSelect?blurInputOnSelect:(()=>window.matchMedia("(pointer: coarse)").matches)(),selectProps=Object.assign({},rest,{idSuffix:idSuffix,inputId:createID(inputId,idSuffix),selectId:createID(selectId,idSuffix),menuWidth:menuWidth||theme.menu.width,blurInputOnSelect:blurInputOnSelectOrDefault});return react_default.a.createElement(styled_components_browser_esm.a,{theme:theme},react_default.a.createElement(src_Select,SelectWrapper_extends({ref:ref},selectProps)))});SelectWrapper_SelectWrapper.displayName="SelectWrapper";var src_SelectWrapper=SelectWrapper_SelectWrapper;__webpack_require__.d(__webpack_exports__,"a",(function(){return src_SelectWrapper}))},606:function(module,exports,__webpack_require__){var map={"./BasicProps.story.tsx":607,"./ComplexProps.story.tsx":610,"./Methods.story.tsx":612,"./Styling.story.tsx":613,"./Windowing.story.tsx":614};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=606},607:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_src__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(41),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2),_helpers_Checkbox__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(72),_storybook_react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(26),_helpers_styled__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(1),withSourceLoader=__webpack_require__(89).withSource,__STORY__="import React, { useState, useEffect, useCallback } from 'react';\r\nimport { Select } from '../src';\r\nimport styled from 'styled-components';\r\nimport Checkbox from './helpers/Checkbox';\r\nimport { storiesOf } from '@storybook/react';\r\nimport { Hr, Title, Label, SubTitle, Container, SelectContainer, Paragraph, Code, CheckboxGroup, Card, CardHeader, CardBody } from './helpers/styled';\r\n\r\ntype CityOption = {\r\n  readonly id: number;\r\n  readonly city: string;\r\n  readonly state: string;\r\n};\r\n\r\nconst SelectedCode = styled(Code)`\r\n  font-weight: 400;\r\n  font-size: 0.875em;\r\n`;\r\n\r\nconst SelectedLabelText = styled.span`\r\n  margin-left: 0px;\r\n  font-weight: 600;\r\n`;\r\n\r\nconst _options: CityOption[] = [\r\n  { id: 1,  city: 'Austin', state: 'TX' },\r\n  { id: 2,  city: 'Denver', state: 'CO' },\r\n  { id: 3,  city: 'Chicago', state: 'IL' },\r\n  { id: 4,  city: 'Phoenix', state: 'AZ' },\r\n  { id: 5,  city: 'Houston', state: 'TX' },\r\n  { id: 6,  city: 'Las Vegas', state: 'NV' },\r\n  { id: 7,  city: 'Milwaukee', state: 'WI' },\r\n  { id: 8,  city: 'Louisville', state: 'KY' },\r\n  { id: 9,  city: 'Los Angeles', state: 'CA' },\r\n  { id: 10, city: 'Minneapolis', state: 'MN' },\r\n];\r\n\r\nstoriesOf('React Functional Select', module).add('Basic', () => {\r\n  const [isInvalid, setIsInvalid] = useState<boolean>(false);\r\n  const [isLoading, setIsLoading] = useState<boolean>(false);\r\n  const [isDisabled, setIsDisabled] = useState<boolean>(false);\r\n  const [isClearable, setIsClearable] = useState<boolean>(true);\r\n  const [isSearchable, setIsSearchable] = useState<boolean>(true);\r\n  const [selectedOption, setSelectedOption] = useState<CityOption | null>(null);\r\n\r\n  const onOptionChange = useCallback((option: CityOption | null): void => {\r\n    setSelectedOption(option);\r\n  }, []);\r\n  \r\n  const getOptionValue = useCallback((option: CityOption): number => (option.id), []);\r\n  const getOptionLabel = useCallback((option: CityOption): string => (`${option.city}, ${option.state}`), []);\r\n\r\n  useEffect(() => {\r\n    isDisabled && setIsInvalid(false);\r\n  }, [isDisabled]);\r\n\r\n  return (\r\n    <Container>\r\n      <Title>Basic Properties</Title>\r\n      <Hr />\r\n      <Paragraph>\r\n        In this story's source code, notice that the <Code>onOptionChange</Code>\r\n        , <Code>getOptionValue</Code> and <Code>getOptionLabel</Code> callback\r\n        props are wrapped in a <Code>useCallback</Code>. While not required,\r\n        <em> strongly prefer </em> memoization of any callback function props \r\n        whenever possible. This will greatly boost performance and limit re-renders \r\n        as these props are referenced in the dependency arrays \r\n        of <Code>useCallbacks</Code> and <Code>useEffects</Code>. When defined in a \r\n        functional component, wrap in a <Code>useCallback</Code>; when defined in a \r\n        legacy class component, ensure proper binding to <Code>this</Code>.\r\n      </Paragraph>\r\n      <Paragraph>\r\n        The <Code>options</Code> prop should also be memoized. Either consume it\r\n        directly from a state management store, or make sure it is stable by\r\n        avoiding inline or render-based mutations.\r\n      </Paragraph>\r\n      <SubTitle>Demo</SubTitle>\r\n      <Hr />\r\n      <Card>\r\n        <CardHeader>\r\n          <CheckboxGroup>\r\n            <Checkbox\r\n              label='Searchable'\r\n              checked={isSearchable}\r\n              onCheck={setIsSearchable}\r\n            />\r\n            <Checkbox\r\n              label='Clearable'\r\n              checked={isClearable}\r\n              onCheck={setIsClearable}\r\n            />\r\n            <Checkbox\r\n              label='Disabled'\r\n              checked={isDisabled}\r\n              onCheck={setIsDisabled}\r\n            />\r\n            <Checkbox\r\n              label='Invalid'\r\n              checked={isInvalid}\r\n              readOnly={isDisabled}\r\n              onCheck={setIsInvalid}\r\n            />\r\n            <Checkbox\r\n              label='Loading'\r\n              checked={isLoading}\r\n              onCheck={setIsLoading}\r\n            />\r\n            <Label>\r\n              <SelectedLabelText>Selected Option: </SelectedLabelText>\r\n              <SelectedCode>{JSON.stringify(selectedOption || {})}</SelectedCode>\r\n            </Label>\r\n          </CheckboxGroup>\r\n        </CardHeader>\r\n        <CardBody>\r\n          <SelectContainer>\r\n            <Select\r\n              options={_options}\r\n              isLoading={isLoading}\r\n              isInvalid={isInvalid}\r\n              isDisabled={isDisabled}\r\n              isClearable={isClearable}\r\n              isSearchable={isSearchable}\r\n              onOptionChange={onOptionChange}\r\n              getOptionValue={getOptionValue}\r\n              getOptionLabel={getOptionLabel}\r\n            />\r\n          </SelectContainer>\r\n        </CardBody>\r\n      </Card>\r\n    </Container>\r\n  );\r\n});",__ADDS_MAP__={"react-functional-select--basic":{startLoc:{col:49,line:37},endLoc:{col:1,line:131},startBody:{col:58,line:37},endBody:{col:1,line:131}}};const SelectedCode=Object(styled_components__WEBPACK_IMPORTED_MODULE_2__.d)(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.g)`
  font-weight: 400;
  font-size: 0.875em;
`,SelectedLabelText=styled_components__WEBPACK_IMPORTED_MODULE_2__.d.span`
  margin-left: 0px;
  font-weight: 600;
`,_options=[{id:1,city:"Austin",state:"TX"},{id:2,city:"Denver",state:"CO"},{id:3,city:"Chicago",state:"IL"},{id:4,city:"Phoenix",state:"AZ"},{id:5,city:"Houston",state:"TX"},{id:6,city:"Las Vegas",state:"NV"},{id:7,city:"Milwaukee",state:"WI"},{id:8,city:"Louisville",state:"KY"},{id:9,city:"Los Angeles",state:"CA"},{id:10,city:"Minneapolis",state:"MN"}];Object(_storybook_react__WEBPACK_IMPORTED_MODULE_4__.storiesOf)("React Functional Select",module).addParameters({storySource:{source:__STORY__,locationsMap:__ADDS_MAP__}}).addDecorator(withSourceLoader(__STORY__,__ADDS_MAP__,"/BasicProps.story.tsx",[],{},"C:\\Users\\matth\\Desktop\\react-functional-select\\__stories__",{})).add("Basic",()=>{const[isInvalid,setIsInvalid]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[isLoading,setIsLoading]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[isDisabled,setIsDisabled]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[isClearable,setIsClearable]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),[isSearchable,setIsSearchable]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),[selectedOption,setSelectedOption]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),onOptionChange=Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(option=>{setSelectedOption(option)},[]),getOptionValue=Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(option=>option.id,[]),getOptionLabel=Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(option=>`${option.city}, ${option.state}`,[]);return Object(react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{isDisabled&&setIsInvalid(!1)},[isDisabled]),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.h,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.t,null,"Basic Properties"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.i,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.p,null,"In this story's source code, notice that the ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.g,null,"onOptionChange"),", ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.g,null,"getOptionValue")," and ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.g,null,"getOptionLabel")," callback props are wrapped in a ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.g,null,"useCallback"),". While not required,",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null," strongly prefer ")," memoization of any callback function props whenever possible. This will greatly boost performance and limit re-renders as these props are referenced in the dependency arrays of ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.g,null,"useCallbacks")," and ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.g,null,"useEffects"),". When defined in a functional component, wrap in a ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.g,null,"useCallback"),"; when defined in a legacy class component, ensure proper binding to ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.g,null,"this"),"."),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.p,null,"The ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.g,null,"options")," prop should also be memoized. Either consume it directly from a state management store, or make sure it is stable by avoiding inline or render-based mutations."),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.s,null,"Demo"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.i,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.c,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.e,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.f,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_Checkbox__WEBPACK_IMPORTED_MODULE_3__.a,{label:"Searchable",checked:isSearchable,onCheck:setIsSearchable}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_Checkbox__WEBPACK_IMPORTED_MODULE_3__.a,{label:"Clearable",checked:isClearable,onCheck:setIsClearable}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_Checkbox__WEBPACK_IMPORTED_MODULE_3__.a,{label:"Disabled",checked:isDisabled,onCheck:setIsDisabled}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_Checkbox__WEBPACK_IMPORTED_MODULE_3__.a,{label:"Invalid",checked:isInvalid,readOnly:isDisabled,onCheck:setIsInvalid}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_Checkbox__WEBPACK_IMPORTED_MODULE_3__.a,{label:"Loading",checked:isLoading,onCheck:setIsLoading}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.k,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SelectedLabelText,null,"Selected Option: "),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SelectedCode,null,JSON.stringify(selectedOption||{}))))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.d,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_5__.q,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.a,{options:_options,isLoading:isLoading,isInvalid:isInvalid,isDisabled:isDisabled,isClearable:isClearable,isSearchable:isSearchable,onOptionChange:onOptionChange,getOptionValue:getOptionValue,getOptionLabel:getOptionLabel})))))})}.call(this,__webpack_require__(61)(module))},610:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_src__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(41),_storybook_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(26),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(2),_helpers_styled__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(1),withSourceLoader=__webpack_require__(89).withSource,__STORY__="import React, { useCallback } from 'react';\r\nimport { Select } from '../src';\r\nimport { storiesOf } from '@storybook/react';\r\nimport styled, { css, keyframes } from 'styled-components';\r\nimport { Hr, Title, List, ListItem, ListWrapper, SubTitle, Container, SelectContainer, Label, LabelText, Code, Card, CardHeader, CardBody } from './helpers/styled';\r\n\r\nconst reactLogo = require('./assets/react_logo.svg') as string;\r\n\r\ntype StyledImageProps = {\r\n  readonly isDisabled: boolean;\r\n};\r\n\r\ntype PackageOption = {\r\n  readonly id: number;\r\n  readonly packageName: string;\r\n};\r\n\r\nconst _themeConfig = Object.freeze({\r\n  menu: {\r\n    option: {\r\n      selectedColor: '#515151',\r\n      focusedBgColor: '#F2F2F2',\r\n      selectedBgColor: '#F2F2F2',\r\n    }\r\n  }\r\n});\r\n\r\nconst _spinLogo = keyframes`\r\n  from {\r\n    transform: rotate(0deg);\r\n  } to {\r\n    transform: rotate(360deg);\r\n  }\r\n`;\r\n\r\nconst _spinLogoAnimation = css`\r\n  animation: ${_spinLogo} infinite 8s linear;\r\n`;\r\n\r\nconst StyledDiv = styled.div`\r\n  height: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  flex-direction: row;\r\n`;\r\n\r\nconst StyledSpan = styled.span`\r\n  color: #515151;\r\n  font-size: 1em;\r\n  font-weight: 600;\r\n  margin-left: 2px;\r\n  margin-bottom: 1px;\r\n  letter-spacing: .01em;\r\n`;\r\n\r\nconst StyledImg = styled.img<StyledImageProps>`\r\n  height: 30px;\r\n  border-style: none;\r\n  display: inline-block;\r\n  ${({ isDisabled }) => (!isDisabled &&  _spinLogoAnimation)}\r\n`;\r\n\r\nconst _options: PackageOption[] = [\r\n  { id: 1, packageName: 'react' },\r\n  { id: 2, packageName: 'react-dom' },\r\n  { id: 3, packageName: 'reactstrap' },\r\n  { id: 4, packageName: 'react-scripts' },\r\n  { id: 5, packageName: 'react-window' },\r\n];\r\n\r\nstoriesOf('React Functional Select', module).add('Complex', () => {\r\n  const getOptionValue = useCallback((option: PackageOption): number => (option.id), []);\r\n  const getIsOptionDisabled = useCallback((option: PackageOption): boolean => (option.packageName === _options[3].packageName), []);\r\n\r\n  const renderOptionLabel = useCallback((option: PackageOption): JSX.Element => {\r\n    const isDisabled = getIsOptionDisabled(option);\r\n    return (\r\n      <StyledDiv>\r\n        <StyledImg src={reactLogo} isDisabled={isDisabled} />\r\n        <StyledSpan>{option.packageName}</StyledSpan>\r\n      </StyledDiv>\r\n    );\r\n  }, [getIsOptionDisabled]);\r\n\r\n  return (\r\n    <Container>\r\n      <Title>Complex Properties</Title>\r\n      <Hr />\r\n      <ListWrapper>\r\n        Implementation using a couple of the more specialized properties.\r\n        <List>\r\n          <ListItem>\r\n            <Code>renderOptionLabel(option)</Code><em> => ReactNode</em> - Callback function \r\n            with a return type of <em>ReactNode</em>. Use this property in cases where the \r\n            standard <Code>getOptionLabel</Code> property won't meet your needs (for instance, \r\n            you want to render each option's label using custom <Code>JSX</Code>).\r\n          </ListItem>\r\n          <ListItem>\r\n            <Code>getIsOptionDisabled(option)</Code><em> => Boolean</em> - Callback function \r\n            with a return type of <em>Boolean</em>. When it evaluates to a value of <em>true</em>, \r\n            that option iteration will be rendered <em>disabled</em>. As an alternative, you can \r\n            also pass a property of <em>isDisabled</em> with each option. Use of these two options \r\n            - they cannot both be specified.\r\n          </ListItem>\r\n        </List>\r\n      </ListWrapper>\r\n      <SubTitle>Demo</SubTitle>\r\n      <Hr />\r\n      <Card>\r\n        <CardHeader>\r\n          <Label>\r\n            <LabelText>JSX labels &amp; disabled option..</LabelText>\r\n          </Label>\r\n        </CardHeader>\r\n        <CardBody>\r\n          <SelectContainer>\r\n            <Select\r\n              options={_options}\r\n              isSearchable={false}\r\n              themeConfig={_themeConfig}\r\n              getOptionValue={getOptionValue}\r\n              renderOptionLabel={renderOptionLabel}\r\n              getIsOptionDisabled={getIsOptionDisabled}\r\n            />\r\n          </SelectContainer>\r\n        </CardBody>\r\n      </Card>\r\n    </Container>\r\n  );\r\n});",__ADDS_MAP__={"react-functional-select--complex":{startLoc:{col:49,line:71},endLoc:{col:1,line:130},startBody:{col:60,line:71},endBody:{col:1,line:130}}};const reactLogo=__webpack_require__(611),_themeConfig=Object.freeze({menu:{option:{selectedColor:"#515151",focusedBgColor:"#F2F2F2",selectedBgColor:"#F2F2F2"}}}),_spinLogo=styled_components__WEBPACK_IMPORTED_MODULE_3__.e`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`,_spinLogoAnimation=styled_components__WEBPACK_IMPORTED_MODULE_3__.c`
  animation: ${_spinLogo} infinite 8s linear;
`,StyledDiv=styled_components__WEBPACK_IMPORTED_MODULE_3__.d.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`,StyledSpan=styled_components__WEBPACK_IMPORTED_MODULE_3__.d.span`
  color: #515151;
  font-size: 1em;
  font-weight: 600;
  margin-left: 2px;
  margin-bottom: 1px;
  letter-spacing: .01em;
`,StyledImg=styled_components__WEBPACK_IMPORTED_MODULE_3__.d.img`
  height: 30px;
  border-style: none;
  display: inline-block;
  ${({isDisabled:isDisabled})=>!isDisabled&&_spinLogoAnimation}
`,_options=[{id:1,packageName:"react"},{id:2,packageName:"react-dom"},{id:3,packageName:"reactstrap"},{id:4,packageName:"react-scripts"},{id:5,packageName:"react-window"}];Object(_storybook_react__WEBPACK_IMPORTED_MODULE_2__.storiesOf)("React Functional Select",module).addParameters({storySource:{source:__STORY__,locationsMap:__ADDS_MAP__}}).addDecorator(withSourceLoader(__STORY__,__ADDS_MAP__,"/ComplexProps.story.tsx",[],{},"C:\\Users\\matth\\Desktop\\react-functional-select\\__stories__",{})).add("Complex",()=>{const getOptionValue=Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(option=>option.id,[]),getIsOptionDisabled=Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(option=>option.packageName===_options[3].packageName,[]),renderOptionLabel=Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(option=>{const isDisabled=getIsOptionDisabled(option);return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledDiv,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledImg,{src:reactLogo,isDisabled:isDisabled}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledSpan,null,option.packageName))},[getIsOptionDisabled]);return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.h,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.t,null,"Complex Properties"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.i,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.o,null,"Implementation using a couple of the more specialized properties.",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.m,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.n,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.g,null,"renderOptionLabel(option)"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null," => ReactNode")," - Callback function with a return type of ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null,"ReactNode"),". Use this property in cases where the standard ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.g,null,"getOptionLabel")," property won't meet your needs (for instance, you want to render each option's label using custom ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.g,null,"JSX"),")."),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.n,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.g,null,"getIsOptionDisabled(option)"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null," => Boolean")," - Callback function with a return type of ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null,"Boolean"),". When it evaluates to a value of ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null,"true"),", that option iteration will be rendered ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null,"disabled"),". As an alternative, you can also pass a property of ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null,"isDisabled")," with each option. Use of these two options - they cannot both be specified."))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.s,null,"Demo"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.i,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.c,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.e,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.k,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.l,null,"JSX labels & disabled option.."))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.d,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.q,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.a,{options:_options,isSearchable:!1,themeConfig:_themeConfig,getOptionValue:getOptionValue,renderOptionLabel:renderOptionLabel,getIsOptionDisabled:getIsOptionDisabled})))))})}.call(this,__webpack_require__(61)(module))},611:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/react_logo.9f16557d.svg"},612:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_src__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(41),_storybook_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(26),_helpers_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(70),_helpers_styled__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(1),withSourceLoader=__webpack_require__(89).withSource,__STORY__="import React, { useRef, useState } from 'react';\r\nimport { Select, SelectRef } from '../src';\r\nimport { storiesOf } from '@storybook/react';\r\nimport { Option, createSelectOptions } from './helpers/utils';\r\nimport { Hr, List, Code, Title, Button, LabelText, ListItem, SubTitle, Label, Container, ListWrapper, ButtonGroup, Card, CardHeader, CardBody, SelectContainer } from './helpers/styled';\r\n\r\nstoriesOf('React Functional Select', module).add('Methods', () => {\r\n  const selectRef = useRef<SelectRef | null>(null);\r\n  const [options] = useState<Option[]>(() => createSelectOptions(5));\r\n\r\n  const blurSelect = (): void => {\r\n    selectRef.current && selectRef.current.blur();\r\n  };\r\n\r\n  const focusSelect = (): void => {\r\n    selectRef.current && selectRef.current.focus();\r\n  };\r\n\r\n  const clearValue = (): void => {\r\n    selectRef.current && selectRef.current.clearValue();\r\n  };\r\n\r\n  const updateSelectedOption = (): void => {\r\n    selectRef.current && selectRef.current.setValue(options[0]);\r\n  };\r\n\r\n  return (\r\n    <Container>\r\n      <Title>Methods</Title>\r\n      <Hr />\r\n      <ListWrapper>\r\n        Four public methods are exposed to wrapping components and are\r\n        accessible via <Code>ref</Code>.\r\n        <List>\r\n          <ListItem>\r\n            <Code>blur()</Code> - blur the control programatically\r\n          </ListItem>\r\n          <ListItem>\r\n            <Code>focus()</Code> - focus the control programatically\r\n          </ListItem>\r\n          <ListItem>\r\n            <Code>clearValue()</Code> - clear the current value programatically\r\n            <em> (if an option is selected)</em>\r\n          </ListItem>\r\n          <ListItem>\r\n            <Code>setValue(option?: any)</Code> - set the value programatically\r\n            <em> (option will be validated)</em>\r\n          </ListItem>\r\n        </List>\r\n      </ListWrapper>\r\n      <SubTitle>Demo</SubTitle>\r\n      <Hr />\r\n      <Card>\r\n        <CardHeader supportMobile>\r\n          <Label>\r\n            <LabelText>Simulate Methods</LabelText>\r\n          </Label>\r\n          <ButtonGroup>\r\n            <Button onClick={focusSelect}>Focus</Button>\r\n            <Button onClick={blurSelect}>Blur</Button>\r\n            <Button onClick={clearValue}>Clear Value</Button>\r\n            <Button onClick={updateSelectedOption}>Set Value (1st Option)</Button>\r\n          </ButtonGroup>\r\n        </CardHeader>\r\n        <CardBody>\r\n          <SelectContainer>\r\n            <Select\r\n              ref={selectRef}\r\n              options={options}\r\n              initialValue={options[0]}\r\n            />\r\n          </SelectContainer>\r\n        </CardBody>\r\n      </Card>\r\n    </Container>\r\n  );\r\n});",__ADDS_MAP__={"react-functional-select--methods":{startLoc:{col:49,line:7},endLoc:{col:1,line:77},startBody:{col:60,line:7},endBody:{col:1,line:77}}};Object(_storybook_react__WEBPACK_IMPORTED_MODULE_2__.storiesOf)("React Functional Select",module).addParameters({storySource:{source:__STORY__,locationsMap:__ADDS_MAP__}}).addDecorator(withSourceLoader(__STORY__,__ADDS_MAP__,"/Methods.story.tsx",[],{},"C:\\Users\\matth\\Desktop\\react-functional-select\\__stories__",{})).add("Methods",()=>{const selectRef=Object(react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),[options]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(()=>Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_3__.a)(5));return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.h,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.t,null,"Methods"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.i,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.o,null,"Four public methods are exposed to wrapping components and are accessible via ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.g,null,"ref"),".",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.m,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.n,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.g,null,"blur()")," - blur the control programatically"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.n,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.g,null,"focus()")," - focus the control programatically"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.n,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.g,null,"clearValue()")," - clear the current value programatically",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null," (if an option is selected)")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.n,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.g,null,"setValue(option?: any)")," - set the value programatically",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null," (option will be validated)")))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.s,null,"Demo"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.i,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.c,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.e,{supportMobile:!0},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.k,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.l,null,"Simulate Methods")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.b,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.a,{onClick:()=>{selectRef.current&&selectRef.current.focus()}},"Focus"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.a,{onClick:()=>{selectRef.current&&selectRef.current.blur()}},"Blur"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.a,{onClick:()=>{selectRef.current&&selectRef.current.clearValue()}},"Clear Value"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.a,{onClick:()=>{selectRef.current&&selectRef.current.setValue(options[0])}},"Set Value (1st Option)"))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.d,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_4__.q,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.a,{ref:selectRef,options:options,initialValue:options[0]})))))})}.call(this,__webpack_require__(61)(module))},613:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_src__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(41),_src_theme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(91),_storybook_react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(26),_helpers_PrettyPrintJson__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(184),_helpers_PackageLink__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(141),_helpers_styled__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(1),withSourceLoader=__webpack_require__(89).withSource,__STORY__="import React, { useEffect, useCallback, useState } from 'react';\r\nimport { Select, Theme } from '../src';\r\nimport { Option } from './helpers/utils';\r\nimport DefaultThemeObj from '../src/theme';\r\nimport { storiesOf } from '@storybook/react';\r\nimport PrettyPrintJson from './helpers/PrettyPrintJson';\r\nimport PackageLink, { PackageLinkProps } from './helpers/PackageLink';\r\nimport { Hr, Code, Title, SubTitle, Spacer, Paragraph, JsonContainer, LabelText, Label, Container, Card, CardHeader, CardBody, SelectContainer } from './helpers/styled';\r\n\r\nconst _themeEnum = Object.freeze<{ [key: string]: string }>({\r\n  DEFAULT: 'Default',\r\n  LARGE_TEXT: 'Large Text',\r\n  DARK_COLORS: 'Dark Colors',\r\n  ZERO_BORDER_RADIUS: 'No Border-Radius',\r\n});\r\n\r\nconst _styledComponentsLink = Object.freeze<PackageLinkProps>({\r\n  name: 'styled-components',\r\n  href: 'https://www.styled-components.com',\r\n});\r\n\r\nconst _themeConfigMap = Object.freeze<{ [key: string]: any }>({\r\n  [_themeEnum.DEFAULT]: undefined,\r\n  [_themeEnum.DARK_COLORS]: {\r\n    color: {\r\n      accent: '#555555',\r\n      border: '#A8AEB4',\r\n      textColor: '#000',\r\n    },\r\n    control: {\r\n      boxShadowColor: 'rgba(85, 85, 85, 0.25)',\r\n      focusedBorderColor: 'rgba(85, 85, 85, 0.75)',\r\n    },\r\n    icon: {\r\n      color: '#A6A6A6',\r\n    },\r\n    menu: {\r\n      option: {\r\n        selectedColor: '#fff',\r\n        selectedBgColor: '#555555',\r\n        focusedBgColor: 'rgba(85, 85, 85, 0.225)',\r\n      }\r\n    }\r\n  },\r\n  [_themeEnum.LARGE_TEXT]: {\r\n    select: {\r\n      fontSize: '1.25rem',\r\n    },\r\n  },\r\n  [_themeEnum.ZERO_BORDER_RADIUS]: {\r\n    control: {\r\n      borderRadius: '0',\r\n    },\r\n    menu: {\r\n      borderRadius: '0',\r\n    },\r\n  },\r\n});\r\n\r\nstoriesOf('React Functional Select', module).add('Styling', () => {\r\n  const [selectedOption, setSelectedOption] = useState<Option | null>(null);\r\n  const [themeConfig, setThemeConfig] = useState<Theme | undefined>(undefined);\r\n\r\n  // Create theme options based upon key-value pairs in _themeEnum object defined above\r\n  const [options] = useState<Option[]>(() => {\r\n    const _options: Option[] = [];\r\n    Object.keys(_themeEnum).forEach((key: string): void => {\r\n      _options.push({\r\n        value: _themeEnum[key],\r\n        label: _themeEnum[key],\r\n      });\r\n    });\r\n    return _options;\r\n  });\r\n\r\n  // Adjust the react-window itemSize (height of menu option) from default of 35 to 44 for 'Large Text'\r\n  const menuItemSize = (selectedOption && selectedOption.value === _themeEnum.LARGE_TEXT) ? 44 : 35;\r\n\r\n  const onOptionChange = useCallback((option: Option | null): void => {\r\n    setSelectedOption(option);\r\n  }, []);\r\n\r\n  useEffect(() => {\r\n    if (selectedOption) {\r\n      const mappedThemeConfig = _themeConfigMap[selectedOption.value];\r\n      setThemeConfig(mappedThemeConfig);\r\n    }\r\n  }, [selectedOption]);\r\n\r\n  return (\r\n    <Container>\r\n      <Title>Styling</Title>\r\n      <Hr />\r\n      <SubTitle>Theming</SubTitle>\r\n      <Paragraph>\r\n        react-functional-select uses <PackageLink {..._styledComponentsLink} /> to \r\n        handle its styling. The root node is wrapped in styled-component's\r\n        <Code>&lt;ThemeProvider /&gt;</Code> wrapper component which gives all child \r\n        styled-components access to the provided theme via React's context API. To\r\n        override react-functional-select's default theme, pass an object to\r\n        the <Code>themeConfig</Code> prop - any matching properties will replace those\r\n        in the default theme.\r\n      </Paragraph>\r\n      <JsonContainer>\r\n        <PrettyPrintJson\r\n          header='Default Theme'\r\n          data={DefaultThemeObj}\r\n        />\r\n      </JsonContainer>\r\n      <SubTitle>Using classNames</SubTitle>\r\n      <Paragraph>\r\n        If you want to style the component using CSS classes, set the \r\n        <Code>addClassNames</Code> prop to true and it will then generate className\r\n        attributes for that specific instance of the component. These are the classNames \r\n        that are available for targeting: rfs-select-container, rfs-control-container, \r\n        rfs-menu-container, rfs-autosize-input, rfs-caret-icon, rfs-clear-icon, rfs-option.\r\n      </Paragraph>\r\n      <SubTitle>Demo</SubTitle>\r\n      <Hr />\r\n      <Card>\r\n        <CardHeader>\r\n          <Label>\r\n            <LabelText>Select themes below..</LabelText>\r\n          </Label>\r\n        </CardHeader>\r\n        <CardBody>\r\n          <SelectContainer>\r\n            <Select\r\n              options={options}\r\n              isClearable={false}\r\n              isSearchable={false}\r\n              themeConfig={themeConfig}\r\n              initialValue={options[0]}\r\n              menuItemSize={menuItemSize}\r\n              onOptionChange={onOptionChange}\r\n            />\r\n            <Spacer />\r\n            <PrettyPrintJson\r\n              data={themeConfig}\r\n              header='Theme Config'\r\n            />\r\n          </SelectContainer>\r\n        </CardBody>\r\n      </Card>\r\n    </Container>\r\n  );\r\n});",__ADDS_MAP__={"react-functional-select--styling":{startLoc:{col:49,line:60},endLoc:{col:1,line:147},startBody:{col:60,line:60},endBody:{col:1,line:147}}};const _themeEnum=Object.freeze({DEFAULT:"Default",LARGE_TEXT:"Large Text",DARK_COLORS:"Dark Colors",ZERO_BORDER_RADIUS:"No Border-Radius"}),_styledComponentsLink=Object.freeze({name:"styled-components",href:"https://www.styled-components.com"}),_themeConfigMap=Object.freeze({[_themeEnum.DEFAULT]:void 0,[_themeEnum.DARK_COLORS]:{color:{accent:"#555555",border:"#A8AEB4",textColor:"#000"},control:{boxShadowColor:"rgba(85, 85, 85, 0.25)",focusedBorderColor:"rgba(85, 85, 85, 0.75)"},icon:{color:"#A6A6A6"},menu:{option:{selectedColor:"#fff",selectedBgColor:"#555555",focusedBgColor:"rgba(85, 85, 85, 0.225)"}}},[_themeEnum.LARGE_TEXT]:{select:{fontSize:"1.25rem"}},[_themeEnum.ZERO_BORDER_RADIUS]:{control:{borderRadius:"0"},menu:{borderRadius:"0"}}});Object(_storybook_react__WEBPACK_IMPORTED_MODULE_3__.storiesOf)("React Functional Select",module).addParameters({storySource:{source:__STORY__,locationsMap:__ADDS_MAP__}}).addDecorator(withSourceLoader(__STORY__,__ADDS_MAP__,"/Styling.story.tsx",[],{},"C:\\Users\\matth\\Desktop\\react-functional-select\\__stories__",{})).add("Styling",()=>{const[selectedOption,setSelectedOption]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[themeConfig,setThemeConfig]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(void 0),[options]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(()=>{const _options=[];return Object.keys(_themeEnum).forEach(key=>{_options.push({value:_themeEnum[key],label:_themeEnum[key]})}),_options}),menuItemSize=selectedOption&&selectedOption.value===_themeEnum.LARGE_TEXT?44:35,onOptionChange=Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(option=>{setSelectedOption(option)},[]);return Object(react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{if(selectedOption){const mappedThemeConfig=_themeConfigMap[selectedOption.value];setThemeConfig(mappedThemeConfig)}},[selectedOption]),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.h,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.t,null,"Styling"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.i,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.s,null,"Theming"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.p,null,"react-functional-select uses ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_PackageLink__WEBPACK_IMPORTED_MODULE_5__.a,_styledComponentsLink)," to handle its styling. The root node is wrapped in styled-component's",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"<ThemeProvider />")," wrapper component which gives all child styled-components access to the provided theme via React's context API. To override react-functional-select's default theme, pass an object to the ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"themeConfig")," prop - any matching properties will replace those in the default theme."),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.j,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_PrettyPrintJson__WEBPACK_IMPORTED_MODULE_4__.a,{header:"Default Theme",data:_src_theme__WEBPACK_IMPORTED_MODULE_2__.a})),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.s,null,"Using classNames"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.p,null,"If you want to style the component using CSS classes, set the",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"addClassNames")," prop to true and it will then generate className attributes for that specific instance of the component. These are the classNames that are available for targeting: rfs-select-container, rfs-control-container, rfs-menu-container, rfs-autosize-input, rfs-caret-icon, rfs-clear-icon, rfs-option."),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.s,null,"Demo"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.i,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.c,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.e,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.k,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.l,null,"Select themes below.."))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.d,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.q,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.a,{options:options,isClearable:!1,isSearchable:!1,themeConfig:themeConfig,initialValue:options[0],menuItemSize:menuItemSize,onOptionChange:onOptionChange}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.r,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_PrettyPrintJson__WEBPACK_IMPORTED_MODULE_4__.a,{data:themeConfig,header:"Theme Config"})))))})}.call(this,__webpack_require__(61)(module))},614:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_src__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(41),_storybook_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(26),_helpers_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(70),_helpers_OptionsCountButton__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(92),_helpers_PackageLink__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(141),_helpers_styled__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(1),withSourceLoader=__webpack_require__(89).withSource,__STORY__="import React, { useRef, useCallback, useEffect, useState } from 'react';\r\nimport { Select, SelectRef } from '../src';\r\nimport { storiesOf } from '@storybook/react';\r\nimport { Option, createSelectOptions } from './helpers/utils';\r\nimport OptionsCountButton from './helpers/OptionsCountButton';\r\nimport PackageLink, { PackageLinkProps } from './helpers/PackageLink';\r\nimport { Hr, Title, SubTitle, List, ListWrapper, ListItem, LabelText, Label, Container, Code, ButtonGroup, Card, CardHeader, CardBody, SelectContainer } from './helpers/styled';\r\n\r\nconst _reactWindowLink = Object.freeze<PackageLinkProps>({\r\n  name: 'react-window',\r\n  href: 'https://github.com/bvaughn/react-window',\r\n});\r\n\r\nstoriesOf('React Functional Select', module).add('Windowing', () => {\r\n  const selectRef = useRef<SelectRef | null>(null);\r\n  const [options, setOptions] = useState<Option[]>([]);\r\n  const [optionsCount, setOptionsCount] = useState<number>(100);\r\n\r\n  const handleSetOptionsCount = useCallback((count: number): void => {\r\n    setOptionsCount(count); \r\n  }, []);\r\n\r\n  useEffect(() => {\r\n    const handler = setTimeout(() => {\r\n      setOptions(createSelectOptions(optionsCount));\r\n    }, 120);\r\n\r\n    return () => {\r\n      clearTimeout(handler);\r\n    };\r\n  }, [optionsCount]);\r\n\r\n  useEffect(() => {\r\n    selectRef.current && selectRef.current.clearValue();\r\n  }, [options]);\r\n\r\n  return (\r\n    <Container>\r\n      <Title>Integrated Windowing</Title>\r\n      <Hr />\r\n      <ListWrapper>\r\n        Option data is 'windowed' using the <PackageLink {..._reactWindowLink} /> package. \r\n        Aside from the obvious benefits provided by only rendering a small subset of your \r\n        enumerable data (rather than bloating the DOM with an excessive amount of nodes),\r\n        'windowing' can also assist with:\r\n        <List>\r\n          <ListItem>\r\n            <strong>Efficient memory allocation</strong>. 'Windowing' naturally\r\n            lends itself to the dynamic generation of attributes/values as each\r\n            object comes into your renderer's scope (as opposed to allocating\r\n            this data upfront for each object in your list). This way you can\r\n            perform this work just when you absolutely need to and then can\r\n            immediately release it for the GC to cleanup. As an example I am\r\n            generating the <Code>onClick</Code>, <Code>id</Code>, \r\n            and <Code>className</Code> attributes for each <Code>menuOption</Code> as \r\n            they get passed to the <Code>&lt;Option /&gt;</Code> renderer component.\r\n          </ListItem>\r\n          <ListItem>\r\n            <strong>Functional architecture</strong>. The flexibility provided\r\n            through only having to manage subsets of your list allows for a more\r\n            dynamic application. By breaking your code out into smaller, 'pure'\r\n            child components, you can write code that scales well and becomes\r\n            open to performance optimizations - most notably, memoization.\r\n            Simple components that rely on the props passed to it (rather than\r\n            its own managed state) to generate its JSX are likely candidates for\r\n            memoization (testing &amp; debugging becomes much easier as well).\r\n          </ListItem>\r\n        </List>\r\n        <em>Note: </em>The only time any noticeable performance degradation will\r\n        be observed is during search input updates when the <Code>options</Code> count \r\n        reaches the high tens of thousands. To work around this, the <Code>inputDelay</Code> (\r\n        type number in milliseconds) can be set to debounce the input value. That way, \r\n        the <Code>menuOptions</Code> will not be recalculated on every keystroke.\r\n      </ListWrapper>\r\n      <SubTitle>Demo</SubTitle>\r\n      <Hr />\r\n      <Card>\r\n        <CardHeader supportMobile>\r\n          <Label>\r\n            <LabelText>Load Testing Tiers</LabelText>\r\n          </Label>\r\n          <ButtonGroup>\r\n            <OptionsCountButton\r\n              count={100}\r\n              optionsCount={optionsCount}\r\n              handleSetOptionsCount={handleSetOptionsCount}\r\n            />\r\n            <OptionsCountButton\r\n              count={1000}\r\n              optionsCount={optionsCount}\r\n              handleSetOptionsCount={handleSetOptionsCount}\r\n            />\r\n            <OptionsCountButton\r\n              count={5000}\r\n              optionsCount={optionsCount}\r\n              handleSetOptionsCount={handleSetOptionsCount}\r\n            />\r\n            <OptionsCountButton\r\n              count={25000}\r\n              optionsCount={optionsCount}\r\n              handleSetOptionsCount={handleSetOptionsCount}\r\n            />\r\n          </ButtonGroup>\r\n        </CardHeader>\r\n        <CardBody>\r\n          <SelectContainer>\r\n            <Select\r\n              ref={selectRef}\r\n              options={options}\r\n            />\r\n          </SelectContainer>\r\n        </CardBody>\r\n      </Card>\r\n    </Container>\r\n  );\r\n});",__ADDS_MAP__={"react-functional-select--windowing":{startLoc:{col:49,line:14},endLoc:{col:1,line:116},startBody:{col:62,line:14},endBody:{col:1,line:116}}};const _reactWindowLink=Object.freeze({name:"react-window",href:"https://github.com/bvaughn/react-window"});Object(_storybook_react__WEBPACK_IMPORTED_MODULE_2__.storiesOf)("React Functional Select",module).addParameters({storySource:{source:__STORY__,locationsMap:__ADDS_MAP__}}).addDecorator(withSourceLoader(__STORY__,__ADDS_MAP__,"/Windowing.story.tsx",[],{},"C:\\Users\\matth\\Desktop\\react-functional-select\\__stories__",{})).add("Windowing",()=>{const selectRef=Object(react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),[options,setOptions]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),[optionsCount,setOptionsCount]=Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(100),handleSetOptionsCount=Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(count=>{setOptionsCount(count)},[]);return Object(react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{const handler=setTimeout(()=>{setOptions(Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_3__.a)(optionsCount))},120);return()=>{clearTimeout(handler)}},[optionsCount]),Object(react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{selectRef.current&&selectRef.current.clearValue()},[options]),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.h,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.t,null,"Integrated Windowing"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.i,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.o,null,"Option data is 'windowed' using the ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_PackageLink__WEBPACK_IMPORTED_MODULE_5__.a,_reactWindowLink)," package. Aside from the obvious benefits provided by only rendering a small subset of your enumerable data (rather than bloating the DOM with an excessive amount of nodes), 'windowing' can also assist with:",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.m,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.n,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong",null,"Efficient memory allocation"),". 'Windowing' naturally lends itself to the dynamic generation of attributes/values as each object comes into your renderer's scope (as opposed to allocating this data upfront for each object in your list). This way you can perform this work just when you absolutely need to and then can immediately release it for the GC to cleanup. As an example I am generating the ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"onClick"),", ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"id"),", and ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"className")," attributes for each ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"menuOption")," as they get passed to the ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"<Option />")," renderer component."),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.n,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong",null,"Functional architecture"),". The flexibility provided through only having to manage subsets of your list allows for a more dynamic application. By breaking your code out into smaller, 'pure' child components, you can write code that scales well and becomes open to performance optimizations - most notably, memoization. Simple components that rely on the props passed to it (rather than its own managed state) to generate its JSX are likely candidates for memoization (testing & debugging becomes much easier as well).")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em",null,"Note: "),"The only time any noticeable performance degradation will be observed is during search input updates when the ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"options")," count reaches the high tens of thousands. To work around this, the ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"inputDelay")," ( type number in milliseconds) can be set to debounce the input value. That way, the ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.g,null,"menuOptions")," will not be recalculated on every keystroke."),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.s,null,"Demo"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.i,null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.c,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.e,{supportMobile:!0},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.k,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.l,null,"Load Testing Tiers")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.b,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_OptionsCountButton__WEBPACK_IMPORTED_MODULE_4__.a,{count:100,optionsCount:optionsCount,handleSetOptionsCount:handleSetOptionsCount}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_OptionsCountButton__WEBPACK_IMPORTED_MODULE_4__.a,{count:1e3,optionsCount:optionsCount,handleSetOptionsCount:handleSetOptionsCount}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_OptionsCountButton__WEBPACK_IMPORTED_MODULE_4__.a,{count:5e3,optionsCount:optionsCount,handleSetOptionsCount:handleSetOptionsCount}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_OptionsCountButton__WEBPACK_IMPORTED_MODULE_4__.a,{count:25e3,optionsCount:optionsCount,handleSetOptionsCount:handleSetOptionsCount}))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.d,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_styled__WEBPACK_IMPORTED_MODULE_6__.q,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.a,{ref:selectRef,options:options})))))})}.call(this,__webpack_require__(61)(module))},70:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return numberWithCommas})),__webpack_require__.d(__webpack_exports__,"a",(function(){return createSelectOptions}));const numberWithCommas=value=>value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),createSelectOptions=optionCount=>{const tempOptions=[];for(let i=0;i<optionCount;i+=1)tempOptions.push({value:i+1,label:`Option ${i+1}`});return tempOptions}},72:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1);const Input=__webpack_require__(2).d.input`
  cursor: default;
  display: inline-block;
  box-sizing: border-box;
  background-color: initial;
  -webkit-appearance: checkbox;
  margin: 0.1875rem 0.1875rem 0.1875rem 0.25rem;
`;__webpack_exports__.a=({label:label,checked:checked,onCheck:onCheck,readOnly:readOnly})=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styled__WEBPACK_IMPORTED_MODULE_1__.k,{$readOnly:readOnly},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input,{type:"checkbox",checked:checked,onChange:e=>onCheck(e.target.checked)}),label&&react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span",null,label))},91:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_exports__.a=Object.freeze({color:{accent:"#007bff",border:"#ced4da",invalid:"#dc3545",disabled:"#e9ecef",placeholder:"#6E7276",invalidFocus:"rgba(220, 53, 69, 0.25)"},select:{},loader:{opacity:"0.42",size:"0.625rem",color:"#007bff",padding:"0.375rem 0.75rem"},icon:{color:"#cccccc",padding:"0.5rem 0.9375rem",hoverColor:"#A6A6A6",clear:{fontWeight:900,fontSize:"0.85em",transition:"color 0.15s ease-in-out",fontFamily:'"Helvetica", "Arial", sans-serif'},caret:{size:"7px",transition:"transform 0.225s ease-in-out, color 0.15s ease-in-out"}},control:{borderWidth:"1px",borderStyle:"solid",borderRadius:"0.25rem",boxShadow:"0 0 0 0.2rem",padding:"0.375rem 0.75rem",height:"calc(1.5em + 0.75rem + 2px)",boxShadowColor:"rgba(0, 123, 255, 0.25)",focusedBorderColor:"rgba(0, 123, 255, 0.75)",transition:"box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out"},menu:{width:"100%",margin:"0.5rem 0",padding:"0.15rem 0",borderRadius:"0.25rem",backgroundColor:"#fff",boxShadow:"0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px rgba(0, 0, 0, 0.1)",option:{textAlign:"left",selectedColor:"#fff",selectedBgColor:"#007bff",padding:"0.375rem 0.75rem",focusedBgColor:"rgba(0, 123, 255, 0.20)"}},noOptions:{fontSize:"1.25rem",margin:"0.25rem 0",color:"hsl(0, 0%, 60%)",padding:"0.375rem 0.75rem"}})},92:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1),_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(70),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(2);const StyledButton=Object(styled_components__WEBPACK_IMPORTED_MODULE_3__.d)(_styled__WEBPACK_IMPORTED_MODULE_1__.a)`
  transition: color 0.115s ease, background-color 0.115s ease;

  ${({isActive:isActive})=>isActive&&styled_components__WEBPACK_IMPORTED_MODULE_3__.c`
    color: #fff;
    background-color: #007bff;
    :hover {
      background-color: #0067EB;
    }
  `}

  :focus {
    color: #fff !important;
    background-color: #007bff !important;
  }
`;__webpack_exports__.a=({count:count,optionsCount:optionsCount,handleSetOptionsCount:handleSetOptionsCount})=>{const isActive=!(count!==optionsCount),onClick=isActive?void 0:()=>handleSetOptionsCount(count);return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledButton,{isActive:isActive,onClick:onClick},`${Object(_utils__WEBPACK_IMPORTED_MODULE_2__.b)(count)} Options`)}}},[[292,1,2]]]);
//# sourceMappingURL=main.e2f6480e5c5a19c256e6.bundle.js.map