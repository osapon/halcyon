if(window.location.pathname == "/settings") {
$('#js-settings_nav_general').toggleClass('view');
$(function() {
$(".post_privacy_wrap input[name='post_privacy'][value='"+localStorage.getItem("setting_post_privacy")+"']")[0].checked = true;
$(".local_instance_wrap input[name='local_instance']").val(localStorage.getItem("setting_local_instance"));
$(".search_filter_wrap input[name='search_filter'][value='"+localStorage.getItem("setting_search_filter")+"']")[0].checked = true;
if(localStorage.setting_post_sensitive == "true") {
$("#setting_post_sensitive")[0].checked = true;
}
if(localStorage.setting_who_to_follow == "true") {
$("#setting_who_to_follow")[0].checked = true;
}
});
$(document).on('change',".language_wrap select[name='language']", function(e) {
$.cookie("language",$(this).val(),{path:'/',expires:3650});
});
$(document).on('change',".post_privacy_wrap input[name='post_privacy']:checked", function(e) {
localStorage.setItem("setting_post_privacy", $(this).val());
putMessage(__("Changed setting to")+" "+$(this).val());
});
$("#setting_post_sensitive").change(function() {
if(this.checked) {
localStorage.setItem("setting_post_sensitive","true");
putMessage(__("Mark as NSFW by default enabled"));
}
else {
localStorage.setItem("setting_post_sensitive","false");
putMessage(__("Mark as NSFW by default disabled"));
}
});
$(document).on('change',".local_instance_wrap input[name='local_instance']", function(e) {
if($(this).val()) {
localStorage.setItem("setting_local_instance","https://"+$(this).val());
}
else {
localStorage.setItem("setting_local_instance","default");
}
putMessage(__("Changed setting to")+" "+$(this).val());
});
$(document).on('change',".search_filter_wrap input[name='search_filter']:checked", function(e) {
localStorage.setItem("setting_search_filter", $(this).val());
putMessage(__("Changed setting to")+" "+$(this).val());
});
$("#setting_who_to_follow").change(function() {
if(this.checked) {
localStorage.setItem("setting_who_to_follow","true");
putMessage(__("Who to follow enabled"));
}
else {
localStorage.setItem("setting_who_to_follow","false");
putMessage(__("Who to follow disabled"));
}
});
$('.selectbox').each(function() {
var $this = $(this),
numberOfOptions = $(this).children('option').length;
$this.addClass('s-hidden');
$this.wrap('<div class="select"></div>');
$this.after('<div class="halcyon_button styledselect"></div>');
var $styledSelect = $this.next('div.styledselect');
var $selectText = $("<span>").css("margin","auto").text($this.children('option[selected]').eq(0).text()+" ⏷");
$styledSelect.append($selectText);
var $list = $('<ul/>',{'class':'options'}).insertAfter($styledSelect);
for(var i=0;i<numberOfOptions;i++) {
$('<li/>',{text:$this.children('option').eq(i).text(),rel:$this.children('option').eq(i).val()}).appendTo($list);
}
var $listItems = $list.children('li');
$styledSelect.click(function(e) {
e.stopPropagation();
if($(this).hasClass("active")) {
xthis = $(this);
$(this).next('ul.options').slideUp(function() {xthis.removeClass('active')});
}
else {
$(this).addClass('active').next('ul.options').slideDown();
}
});
$listItems.click(function(e) {
e.stopPropagation();
$selectText.text($(this).text()+" ⏷");
$this.val($(this).attr('rel'));
$this.change();
$list.slideUp(function() {$styledSelect.removeClass('active')});
});
$(document).click(function() {
$list.slideUp(function() {$styledSelect.removeClass('active')});
});
});
}
else if(window.location.pathname == "/settings/profile") {
$('#js-settings_nav_profile').toggleClass('view');
$(function() {
api.get("accounts/verify_credentials",function(AccountObj) {
$(".display_name_wrap input[name='display_name']").val(AccountObj["display_name"]);
if(AccountObj["source"]["note"].length != 0) {
$(".about_me_wrap textarea[name='about_me']").val(AccountObj["source"]["note"]);
}
else {
$(".about_me_wrap textarea[name='about_me']").val(AccountObj["note"]);
}
if(AccountObj["locked"] == true) {
$("#setting_lock_account")[0].checked = true;
}
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
});
});
$(document).on('change',".display_name_wrap input[name='display_name']", function(e) {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
api.patch("accounts/update_credentials","display_name="+$(this).val(),function() {
$.removeCookie("session");
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Changed setting to")+" "+$(this).val());
});
});
$(document).on('change',".about_me_wrap textarea[name='about_me']", function(e) {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
api.patch("accounts/update_credentials","note="+$(this).val(),function() {
$.removeCookie("session");
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Changed about me setting"));
});
});
$("#setting_avatar").change(function() {
if($('#setting_avatar').prop('files')[0]) {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
var formdata = new FormData();
formdata.append('avatar',$('#setting_avatar').prop('files')[0]);
api.patch("accounts/update_credentials",formdata,function() {
$.removeCookie("session");
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Uploaded new avatar"));
})
}
});
$("#setting_header").change(function() {
if($('#setting_header').prop('files')[0]) {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
var formdata = new FormData();
formdata.append('header',$('#setting_header').prop('files')[0]);
api.patch("accounts/update_credentials",formdata,function() {
$.removeCookie("session");
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Uploaded new header"));
})
}
});
$("#setting_lock_account").change(function() {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
if(this.checked) {
api.patch("accounts/update_credentials","locked=1",function() {
$.removeCookie("session");
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Account locked"));
});
}
else {
api.patch("accounts/update_credentials","locked=0",function() {
$.removeCookie("session");
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Account unlocked"));
});
}
})
}
else if(window.location.pathname == "/settings/appearance") {
$('#js-settings_nav_appearance').toggleClass('view');
$(function() {
$(".post_streaming_wrap input[name='post_streaming'][value='"+localStorage.getItem("setting_post_stream")+"']")[0].checked = true;
if(localStorage.setting_link_previews == "true") {
$("#setting_link_previews")[0].checked = true;
}
if(localStorage.setting_desktop_notifications == "true") {
$("#setting_desktop_notifications")[0].checked = true;
if (Notification.permission === 'default') {
Notification.requestPermission(function(p) {
if (p === 'denied') {
$("#setting_desktop_notifications")[0].checked = false;
}
});
}
else if(Notification.permission == "denied") {
$("#setting_desktop_notifications")[0].checked = false;
}
}
if(localStorage.setting_show_replies == "true") {
$("#setting_show_replies")[0].checked = true;
}
if(localStorage.setting_show_content_warning == "true") {
$("#setting_show_content_warning")[0].checked = true;
}
if(localStorage.setting_show_nsfw == "true") {
$("#setting_show_nsfw")[0].checked = true;
}
});
$(document).on('change',".post_streaming_wrap input[name='post_streaming']:checked", function(e) {
localStorage.setItem("setting_post_stream", $(this).val());
putMessage(__("Changed setting to")+" "+$(this).val());
});
$("#setting_dark_theme").change(function() {
if(this.checked) {
$.cookie("darktheme","true",{path:'/',expires:3650});
$(document.body).append($("<link>").attr("rel","stylesheet").attr("href","/assets/css/dark.css"));
putMessage(__("Dark theme enabled"));
}
else {
$.cookie("darktheme","false",{path:'/',expires:3650});
$("link[href='/assets/css/dark.css']").remove();
putMessage(__("Dark theme disabled"));
}
});
$("#setting_link_previews").change(function() {
if(this.checked) {
localStorage.setItem("setting_link_previews","true");
putMessage(__("Link previews enabled"));
}
else {
localStorage.setItem("setting_link_previews","false");
putMessage(__("Link previews disabled"));
}
});
$("#setting_desktop_notifications").change(function() {
if(this.checked) {
localStorage.setItem("setting_desktop_notifications","true");
if (Notification.permission === 'default') {
Notification.requestPermission(function(p) {
if (p === 'denied') {
localStorage.setItem("setting_desktop_notifications","false");
$("#setting_desktop_notifications")[0].checked = false;
putMessage(__("You didn't allow notifications"));
}
else {
putMessage(__("Desktop notifications enabled"));
}
});
}
else if(Notification.permission == "denied") {
localStorage.setItem("setting_desktop_notifications","false");
$("#setting_desktop_notifications")[0].checked = false;
putMessage(__("You didn't allow notifications"));
}
else {
putMessage(__("Desktop notifications enabled"));
}
}
else {
localStorage.setItem("setting_desktop_notifications","false");
putMessage(__("Desktop notifications disabled"));
}
});
$("#setting_show_replies").change(function() {
if(this.checked) {
localStorage.setItem("setting_show_replies","true");
putMessage(__("Replies shown"));
}
else {
localStorage.setItem("setting_show_replies","false");
putMessage(__("Replies hidden"));
}
});
$("#setting_show_content_warning").change(function() {
if(this.checked) {
localStorage.setItem("setting_show_content_warning","true");
putMessage(__("CW content shown"));
}
else {
localStorage.setItem("setting_show_content_warning","false");
putMessage(__("CW content hidden"));
}
});
$("#setting_show_nsfw").change(function() {
if(this.checked) {
localStorage.setItem("setting_show_nsfw","true");
putMessage(__("NSFW content shown"));
}
else {
localStorage.setItem("setting_show_nsfw","false");
putMessage(__("NSFW content hidden"));
}
});
}
