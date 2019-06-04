(function($) {
var blurredEle, theStartKey;
var ulNode=document.createElement('ul');
$(ulNode).addClass("dropDown").addClass("account_list")
.attr('id','autoCompleteDropDown');
function getCaretPosition(domElement) {
var iCaretPos = 0;
if(document.selection) {
domElement.focus();
var oSel = document.selection.createRange();
oSel.moveStart('character', -domElement.value.length);
iCaretPos = oSel.text.length;
}
else if(domElement.selectionStart || domElement.selectionStart === '0') {
iCaretPos = domElement.selectionStart;
}
return iCaretPos;
}
function setCaretPosition(domElement, pos) {
if(domElement.setSelectionRange) {
domElement.focus();
domElement.setSelectionRange(pos, pos);
}
else if(domElement.createTextRange) {
var range = domElement.createTextRange();
range.collapse(true);
range.moveEnd('character', pos);
range.moveStart('character', pos);
range.select();
}
}
function getLastestPositionOfStartKey(ele, startKey) {
return ele.value.slice(0, getCaretPosition(ele)).lastIndexOf(startKey);
}
function extractNewInputs(node, startKey) {
if(getLastestPositionOfStartKey(node, startKey) >= 0) {
return node.value.slice(getLastestPositionOfStartKey(node, startKey), getCaretPosition(node));
}
return '';
}
function filterData(originData,resultName,matchedInputs) {
  return !!matchedInputs && originData.filter(function(data) {
    return data.name.slice(0,matchedInputs.length-1).toLowerCase() === matchedInputs.substr(1).toLowerCase();
  });
}
function fillDropDown(node,data,resultname,prepend,instance,callback) {
getDropDown().data("instance",instance);
getDropDown().find('li').remove();
data = data.slice(0,5);
data &&
data.forEach(function(ele) {
if(ele) {
var liNode = document.createElement('li');
$(liNode).hover(function() {
$(this).parent().find('li.hoverLi').removeClass('hoverLi');
$(this).addClass("hoverLi");
},function() {
$(this).removeClass("hoverLi");
}).click(function() {
blurredEle && addToken(blurredEle,prepend,callback);
blurredEle = null;
getDropDown().removeClass('showDropDown').addClass('hideDropDown');
});
if(resultname) {
  if(resultname == "acct") {
    if(ele.display_name == "") ele.display_name = ele.username;
    ele.display_name = htmlEscape(ele.display_name);
    for(var i=0;i<ele.emojis.length;i++) {
      ele.display_name = ele.display_name.replace(new RegExp(":"+ele.emojis[i].shortcode+":","g"),"<img src='"+ele.emojis[i].url+"' class='emoji'>");
    }
    $(liNode).data("value",prepend+ele[resultname]+" ");
    $(liNode).addClass("account_box").append($("<div>").addClass("icon_box").append($("<img>").attr("src",ele.avatar).css("float","left")))
    .append($("<div>").addClass("label_box").append($("<span>").addClass("dn").append($("<h3>").html(ele.display_name).addClass("emoji_poss"))).append($("<span>").addClass("un").html(prepend+ele.acct)));
  }
  else {
    $(liNode).data("value",prepend+ele[resultname]+": ");
    if(ele.value) {
      $(liNode).addClass("account_box").append($("<div>").addClass("icon_box").append($("<span>").addClass("emoji_poss").html(ele.value).css("float","left").css("font-size","32px")))
      .append($("<div>").addClass("label_box").append($("<span>").addClass("dn").append($("<h3>").html(ele.name))));
    }
    else {
      $(liNode).addClass("account_box").append($("<div>").addClass("icon_box").append($("<img>").attr("src",ele.url).css("float","left")))
      .append($("<div>").addClass("label_box").append($("<span>").addClass("dn").append($("<h3>").html(ele.name))));
    }
  }
}
else {
$(liNode).data("value",prepend+ele+" ");
$(liNode).addClass("account_box").append($("<div>").addClass("icon_box").append($("<span>").addClass("emoji_poss").html("#️⃣").css("float","left").css("font-size","32px")))
.append($("<div>").addClass("label_box").append($("<span>").addClass("dn").append($("<h3>").html(prepend+ele))));
}
node.append(liNode);
}
});
replace_emoji();
}
function getDropDown() {
return $("#autoCompleteDropDown");
}
function belongsTo(instance) {
if(getDropDown().data("instance") == instance) return true;
else return false;
}
function getHoveredLi() {
return getDropDown().find('li.hoverLi');
}
function addToken(node,startKey,callback) {
var token = getHoveredLi().data("value");
var inputsUtilCaret = node.value
.slice(0, getLastestPositionOfStartKey(node,startKey))
.concat(token);
node.value = inputsUtilCaret
.concat(node.value.slice(getCaretPosition(node)));
setCaretPosition(node, inputsUtilCaret.length);
getDropdownRemoved();
if(callback && typeof callback == "function") {
callback();
}
}
function hasDropDown() {
return getDropDown().length;
}
function hasHoveredList() {
return getHoveredLi().length;
}
function getDropdownRemoved() {
if(hasDropDown()) {
setTimeout(function() {getDropDown().remove()},0);
}
}
function figureKeycodeOption(e,instance) {
if((e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) && hasDropDown() && getDropDown().css('opacity') === '1') {
// 38: arrowUp; 40: arrowDown; 13: Enter;
e.preventDefault();
}
switch(e.keyCode) {
case 38:
if(hasHoveredList() && belongsTo(instance)) {
var preLi = getHoveredLi().removeClass('hoverLi').prev();
preLi ? preLi.addClass('hoverLi') : getDropDown().last().addClass('hoverLi');
}
else if(hasDropDown() && !hasHoveredList() && belongsTo(instance)) {
getDropDown().children().last().addClass('hoverLi');
}
break;
case 40:
if(hasHoveredList() && belongsTo(instance)) {
var nextLi = getHoveredLi().removeClass('hoverLi').next();
nextLi ? nextLi.addClass('hoverLi') : getDropDown().first().addClass('hoverLi');
}
else if(hasDropDown() && !hasHoveredList() && belongsTo(instance)) {
getDropDown().children().first().addClass('hoverLi');
}
break;
default:
break;
}
}
function filterSourceData(e,node,config) {
  var startKey = config.startkey;
  var endKey = config.endkey;
  if((e.keyCode === 38 || e.keyCode === 40) && hasDropDown()&& getDropDown().css('opacity') === '1' || e.keyCode === 16) {
    //38: arrowUp; 40: arrowDown; 16: shift;
    e.preventDefault();
    return;
  }
  else if(e.keyCode === 27 && hasDropDown() && getDropDown().css('opacity') === '1') {
    // 27: Esc;
    getDropdownRemoved();
    return;
  }
  switch(e.keyCode){
    case 13:
    if(hasHoveredList() && belongsTo(config.instance)) {
      addToken(node,startKey,config.callback);
    }
    return;
    default:
    break;
  }
  if(node.value.slice(getCaretPosition(node)-1, getCaretPosition(node)) === endKey){
    getDropdownRemoved();
    return;
  }
  if(extractNewInputs(node,startKey).length > 1 && extractNewInputs(node,startKey).indexOf(endKey) == -1) {
    if(config.arrayname) {
      api.get("search?q="+encodeURIComponent(extractNewInputs(node,startKey))+"&resolve=false&limit=5",function(matchedData) {
        matchedData = matchedData[config.arrayname];
        if(matchedData.length) {
          if(hasDropDown()){
            getDropDown().find('li').remove();
          }
          else {
            $(ulNode).insertAfter(node);
          }
          fillDropDown(getDropDown(),matchedData,config.resultname,config.startkey,config.instance,config.callback);
          getDropDown().removeClass('hideDropDown').addClass('showDropDown');
        }
        else {
          getDropdownRemoved();
        }
        if(hasDropDown()){
          var pos = $(node).getCaretPixelPosition();
          getDropDown().css({
            'left': node.offsetLeft + pos.left,
            'top': node.offsetTop + pos.top
          });
        }
      });
    }
    else {
      var matchedData = filterData(config.source,config.resultname,extractNewInputs(node,startKey));
      if(matchedData.length) {
        if(hasDropDown()){
          getDropDown().find('li').remove();
        }
        else {
          $(ulNode).insertAfter(node);
        }
        fillDropDown(getDropDown(),matchedData,config.resultname,config.startkey,config.instance,config.callback);
        getDropDown().removeClass('hideDropDown').addClass('showDropDown');
      }
      else {
        getDropdownRemoved();
      }
      if(hasDropDown()){
        var pos = $(node).getCaretPixelPosition();
        getDropDown().css({
          'left': node.offsetLeft + pos.left,
          'top': node.offsetTop + pos.top
        });
      }
    }
  }
}
$.fn.autoCompleteToken = function(config) {
if(config == "destroy") {
this.off("keydown");
this.off("keyup");
this.off("blur");
}
else {
this.keydown(function(e) {
figureKeycodeOption(e,config.instance);
});
this.keyup(function(e) {
filterSourceData(e,this,config);
});
this.blur(function() {
blurredEle = this;
theStartKey = config.startkey;
});
}
}
}(jQuery));
$(document).click(function(e) {
if(!$(e.target).closest('#autoCompleteDropDown').length) {
$("#autoCompleteDropDown").removeClass('showDropDown').addClass('hideDropDown');
}
});
(function($, window, document) {
// @license under Apache license
// * @author Bevis Zhao (i@bevis.me, http://bevis.me)
$(function() {
var calculator = {
primaryStyles: ['fontFamily', 'fontSize', 'fontWeight', 'fontVariant', 'fontStyle',
'paddingLeft', 'paddingTop', 'paddingBottom', 'paddingRight',
'marginLeft', 'marginTop', 'marginBottom', 'marginRight',
'borderLeftColor', 'borderTopColor', 'borderBottomColor', 'borderRightColor',
'borderLeftStyle', 'borderTopStyle', 'borderBottomStyle', 'borderRightStyle',
'borderLeftWidth', 'borderTopWidth', 'borderBottomWidth', 'borderRightWidth',
'line-height', 'outline'],
specificStyle: {
'word-wrap': 'break-word',
'overflow-x': 'hidden',
'overflow-y': 'auto'
},
simulator: $('<div id="textarea_simulator" contenteditable="true"/>').css({
position: 'absolute',
top: 0,
left: 0,
visibility: 'hidden'
}).appendTo(document.body),
toHtml : function(text) {
return text.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g, '<br>')
.replace(/(\s)/g,'<span style="white-space:pre-wrap;">$1</span>');
},
getCaretPixelPosition:function() {
var cal = calculator, self = this, element = self[0], elementOffset = self.offset();
cal.simulator.empty();
$.each(cal.primaryStyles, function(index, styleName) {
self.cloneStyle(cal.simulator, styleName);
});
cal.simulator.css($.extend({
'width': self.width(),
'height': self.height()
},cal.specificStyle));
var value = self.val(), cursorPosition = self.getCursorPosition();
var beforeText = value.substring(0, cursorPosition),
afterText = value.substring(cursorPosition);
var before = $('<span class="before"/>').html(cal.toHtml(beforeText)),
focus = $('<span class="focus"/>'),
after = $('<span class="after"/>').html(cal.toHtml(afterText));
cal.simulator.append(before).append(focus).append(after);
var focusOffset = focus.offset(), simulatorOffset = cal.simulator.offset();
// alert(focusOffset.left+ ',' +simulatorOffset.left + ',' + element.scrollLeft);
return {
top: focusOffset.top - simulatorOffset.top - element.scrollTop + parseInt(self.getComputedStyle("fontSize")),
left: focus[0].offsetLeft -cal.simulator[0].offsetLeft - element.scrollLeft
};
}
};
$.fn.extend({
getComputedStyle:function(styleName) {
if(this.length == 0) return;
var thiz = this[0];
var result = this.css(styleName);
result = result || document.defaultView.getComputedStyle(thiz, null)[styleName];
return result;
},
cloneStyle:function(target, styleName) {
var styleVal = this.getComputedStyle(styleName);
if (!!styleVal) {
$(target).css(styleName, styleVal);
}
},
cloneAllStyle:function(target, style) {
var thiz = this[0];
for (var styleName in thiz.style) {
var val = thiz.style[styleName];
typeof val == 'string' || typeof val == 'number'
? this.cloneStyle(target, styleName)
: NaN;
}
},
getCursorPosition:function() {
var thiz = this[0], result = 0;
if('selectionStart' in thiz) {
result = thiz.selectionStart;
}
else if('selection' in document) {
var range = document.selection.createRange();
if(parseInt($.browser.version) > 6) {
thiz.focus();
var length = document.selection.createRange().text.length;
range.moveStart('character', - thiz.value.length);
result = range.text.length - length;
}
else {
var bodyRange = document.body.createTextRange();
bodyRange.moveToElementText(thiz);
for(; bodyRange.compareEndPoints("StartToStart", range) < 0; result++)
bodyRange.moveStart('character', 1);
for(var i = 0; i <= result; i ++){
if (thiz.value.charAt(i) == '\n')
result++;
}
var enterCount = thiz.value.split('\n').length - 1;
result -= enterCount;
return result;
}
}
return result;
},
getCaretPixelPosition: calculator.getCaretPixelPosition
});
});
})(jQuery, window, document);
