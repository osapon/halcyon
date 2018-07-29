if(typeof jQuery !== 'undefined'){
(function ($, win) {
'use strict';
var emoji = lsxEmojiData;
var settings = {};
$.fn.lsxEmojiPicker = function(options) {
if(options == "destroy") {
$(this).off("click");
$(this).children().remove();
}
else {
settings = $.extend({
width: 265,
height: 200,
twemoji: false,
closeOnSelect: true,
onSelect: function(em){}
}, options);
var appender = $('<div></div>')
.addClass('lsx-emojipicker-appender');
var container = $('<div></div>')
.addClass('lsx-emojipicker-container')
var wrapper = $('<div></div>')
.addClass('lsx-emojipicker-wrapper');
var spinnerContainer = $('<div></div>')
.addClass('spinner-container');
var spinner = $('<div></div>')
.addClass('loader');
spinnerContainer.append(spinner);
var customemojis = JSON.parse(localStorage.current_custom_emojis);
var addhide = "";
if(customemojis.length > 0) {
addhide = " hidden";
var emojiCustomContainer = $('<div></div>')
.addClass('lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-custom')
.css({'width': settings.width, 'height': settings.height});
}
var emojiPeopleContainer = $('<div></div>')
.addClass('lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-people'+addhide)
.css({'width': settings.width, 'height': settings.height});
var emojiNatureContainer = $('<div></div>')
.addClass('lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-nature hidden')
.css({'width': settings.width, 'height': settings.height});
var emojiFoodsContainer = $('<div></div>')
.addClass('lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-foods hidden')
.css({'width': settings.width, 'height': settings.height});
var emojiActivityContainer = $('<div></div>')
.addClass('lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-activity hidden')
.css({'width': settings.width, 'height': settings.height});
var emojiPlacesContainer = $('<div></div>')
.addClass('lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-places hidden')
.css({'width': settings.width, 'height': settings.height});
var emojiObjectsContainer = $('<div></div>')
.addClass('lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-objects hidden')
.css({'width': settings.width, 'height': settings.height});
var emojiSymbolsContainer = $('<div></div>')
.addClass('lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-symbols hidden')
.css({'width': settings.width, 'height': settings.height});
var emojiFlagsContainer = $('<div></div>')
.addClass('lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-flags hidden')
.css({'width': settings.width, 'height': settings.height});
var tabs = $('<ul></ul>')
.addClass('lsx-emojipicker-tabs');
if(customemojis.length > 0) {
var customEmoji = $('<li></li>')
.addClass('selected')
.html("&#x2A;&#x20E3")
.click(function(e){
e.preventDefault();
$('ul.lsx-emojipicker-tabs li').removeClass('selected');
$(this).addClass('selected');
$('.lsx-emoji-tab').addClass('hidden');
emojiCustomContainer.removeClass('hidden');
});
}
var peopleEmoji = $('<li></li>')
.html("😀")
.click(function(e){
e.preventDefault();
$('ul.lsx-emojipicker-tabs li').removeClass('selected');
$(this).addClass('selected');
$('.lsx-emoji-tab').addClass('hidden');
emojiPeopleContainer.removeClass('hidden');
});
if(customemojis.length == 0) {
peopleEmoji.addClass("selected");
}
var natureEmoji = $('<li></li>')
.html("🐶")
.click(function(e){
e.preventDefault();
$('ul.lsx-emojipicker-tabs li').removeClass('selected');
$(this).addClass('selected');
$('.lsx-emoji-tab').addClass('hidden');
emojiNatureContainer.removeClass('hidden');
});
var foodsEmoji = $('<li></li>')
.html("🍏")
.click(function(e){
e.preventDefault();
$('ul.lsx-emojipicker-tabs li').removeClass('selected');
$(this).addClass('selected');
$('.lsx-emoji-tab').addClass('hidden');
emojiFoodsContainer.removeClass('hidden');
});
var activityEmoji = $('<li></li>')
.html("⚽")
.click(function(e){
e.preventDefault();
$('ul.lsx-emojipicker-tabs li').removeClass('selected');
$(this).addClass('selected');
$('.lsx-emoji-tab').addClass('hidden');
emojiActivityContainer.removeClass('hidden');
});
var placesEmoji = $('<li></li>')
.html("🚗")
.click(function(e){
e.preventDefault();
$('ul.lsx-emojipicker-tabs li').removeClass('selected');
$(this).addClass('selected');
$('.lsx-emoji-tab').addClass('hidden');
emojiPlacesContainer.removeClass('hidden');
});
var objectsEmoji = $('<li></li>')
.html("⌚")
.click(function(e){
e.preventDefault();
$('ul.lsx-emojipicker-tabs li').removeClass('selected');
$(this).addClass('selected');
$('.lsx-emoji-tab').addClass('hidden');
emojiObjectsContainer.removeClass('hidden');
});
var symbolsEmoji = $('<li></li>')
.html("💯")
.click(function(e){
e.preventDefault();
$('ul.lsx-emojipicker-tabs li').removeClass('selected');
$(this).addClass('selected');
$('.lsx-emoji-tab').addClass('hidden');
emojiSymbolsContainer.removeClass('hidden');
});
var flagsEmoji = $('<li></li>')
.html("🇦🇫")
.click(function(e){
e.preventDefault();
$('ul.lsx-emojipicker-tabs li').removeClass('selected');
$(this).addClass('selected');
$('.lsx-emoji-tab').addClass('hidden');
emojiFlagsContainer.removeClass('hidden');
});
if(customemojis.length > 0) {
tabs.append(customEmoji);
}
tabs.append(peopleEmoji)
.append(natureEmoji)
.append(placesEmoji)
.append(foodsEmoji)
.append(activityEmoji)
.append(objectsEmoji)
.append(symbolsEmoji)
.append(flagsEmoji);
if(customemojis.length > 0) {
createCustomEmojiTab(emojiCustomContainer,container);
}
createEmojiTab('people',emojiPeopleContainer,container);
createEmojiTab('nature',emojiNatureContainer,container);
createEmojiTab('foods',emojiFoodsContainer,container);
createEmojiTab('activity',emojiActivityContainer,container);
createEmojiTab('places',emojiPlacesContainer,container);
createEmojiTab('objects',emojiObjectsContainer,container);
createEmojiTab('symbols',emojiSymbolsContainer,container);
createEmojiTab('flags',emojiFlagsContainer,container);
//wrapper.append(spinnerContainer);
wrapper.append(tabs);
if(customemojis.length > 0) {
wrapper.append(emojiCustomContainer);
}
wrapper.append(emojiPeopleContainer)
.append(emojiNatureContainer)
.append(emojiFoodsContainer)
.append(emojiActivityContainer)
.append(emojiPlacesContainer)
.append(emojiObjectsContainer)
.append(emojiSymbolsContainer)
.append(emojiFlagsContainer);
container.append(wrapper);
appender.append(container);
this.append(appender);
if(settings.twemoji){
twemoji.parse(emojiPeopleContainer[0],{base:(location.protocol==="https:"?"https:":"http:")+"//cdn.staticfile.org/twemoji/2.2.5/"});
twemoji.parse(emojiNatureContainer[0],{base:(location.protocol==="https:"?"https:":"http:")+"//cdn.staticfile.org/twemoji/2.2.5/"});
twemoji.parse(emojiFoodsContainer[0],{base:(location.protocol==="https:"?"https:":"http:")+"//cdn.staticfile.org/twemoji/2.2.5/"});
twemoji.parse(emojiActivityContainer[0],{base:(location.protocol==="https:"?"https:":"http:")+"//cdn.staticfile.org/twemoji/2.2.5/"});
twemoji.parse(emojiPlacesContainer[0],{base:(location.protocol==="https:"?"https:":"http:")+"//cdn.staticfile.org/twemoji/2.2.5/"});
twemoji.parse(emojiObjectsContainer[0],{base:(location.protocol==="https:"?"https:":"http:")+"//cdn.staticfile.org/twemoji/2.2.5/"});
twemoji.parse(emojiSymbolsContainer[0],{base:(location.protocol==="https:"?"https:":"http:")+"//cdn.staticfile.org/twemoji/2.2.5/"});
twemoji.parse(emojiFlagsContainer[0],{base:(location.protocol==="https:"?"https:":"http:")+"//cdn.staticfile.org/twemoji/2.2.5/"});
twemoji.parse(tabs[0],{base:(location.protocol==="https:"?"https:":"http:")+"//cdn.staticfile.org/twemoji/2.2.5/"});
}
this.click(function(e){
e.preventDefault();
if(!$(e.target).parent().hasClass('lsx-emojipicker-tabs') 
&& !$(e.target).parent().parent().hasClass('lsx-emojipicker-tabs') 
&& !$(e.target).parent().hasClass('lsx-emoji-tab')
&& !$(e.target).parent().parent().hasClass('lsx-emoji-tab')){
if(container.is(':visible')){
container.hide();
} else {
container.show();
}
}
});
return this;
}
}
function createEmojiTab(type,container,wrapper) {
for(var i = 0;i < emoji[type].length;i++){
var selectedEmoji = emoji[type][i];
var emoticon = $('<span></span>')
.data('value',selectedEmoji.value)
.attr('title',selectedEmoji.name)
.html(selectedEmoji.value);
emoticon.click(function(e){
e.preventDefault();
settings.onSelect({
'name':$(this).attr('title'),
'value':$(this).data('value')
});
if(settings.closeOnSelect){
wrapper.hide();
}
});
container.append(emoticon);
}
}
function createCustomEmojiTab(container,wrapper) {
var customemojis = JSON.parse(localStorage.current_custom_emojis);
for(var i = 0;i < customemojis.length;i++){
var selectedEmoji = customemojis[i];
var emoticon = $('<span></span>')
.data('value',selectedEmoji.url)
.attr('title',selectedEmoji.code)
.html($("<img>").addClass("emoji").attr("src",selectedEmoji.url));
emoticon.click(function(e){
e.preventDefault();
settings.onSelect({
'name':$(this).attr('title'),
'value':$(this).data('value')
});
if(settings.closeOnSelect){
wrapper.hide();
}
});
container.append(emoticon);
}
}
}(jQuery, window));
}