$(window).resize(function() {
if($(window).width() < 1200 && responsive_design == false) {
responsive_design = true;
$(".left_column").append($("<div>").attr("class","responsive_left").append($(".right_column").children()));
$(".right_column").remove();
}
else if($(window).width() >= 1200 && responsive_design == true) {
responsive_design = false;
$(".article_wrap").append($("<div>").attr("class","right_column").append($(".responsive_left").children()));
$(".responsive_left").remove();
}
});
$(function() {
$('input[type="file"]').val('');
});
$(function() {
$(document).on('click','a', function(e) {
e.stopPropagation();
});
$(document).on('keypress',"input.disallow_enter[type='text']", function(e) {
if((e.which == 13) || (e.keyCode == 13)){ return false; }
});
$(document).on('click','.follow_button', function(e) {
e.stopPropagation();
if ($(this).attr('mid') !== null) {
api.post('accounts/'+$(this).attr('mid')+'/follow', function (data) {
});
} else if ($(this).attr('data')!== null) {
api.post("follows", {uri:$(this).attr('data')}, function (data) {
});
}
$(this).toggleClass('follow_button');
$(this).toggleClass('following_button');
$(this).html('<span>'+__('Following')+'</span>');
return false;
});
$(document).on('click','.following_button', function(e) {
e.stopPropagation();
if ($(this).attr('mid') !== null) {
api.post('accounts/'+$(this).attr('mid')+'/unfollow', function (data) {
});
}
$(this).toggleClass('following_button');
$(this).toggleClass('follow_button');
$(this).html('<i class="fa fa-fw fa-user-plus"></i><span>'+__('Follow')+'</span>');
return false;
});
$(document).on('click','.mute_button', function(e) {
e.stopPropagation();
const mid = $(this).attr('mid');
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_confirm').removeClass('invisible');
$('.overlay_confirm_text').text(__("Are you sure that you want to mute this user?"));
$('.overlay_confirm_yes').click(function() {
$('.close_button').click();
api.post('accounts/'+mid+'/mute', function (data) {
putMessage(__("You'll no longer receive notifications from this user"));
return false;
});
});
});
$(document).on('click','.muting_button', function(e) {
if($(this).attr('mid')!=null) {
api.post('accounts/'+$(this).attr('mid')+'/unmute', function (data) {
});
}
$(this).toggleClass('muting_button');
$(this).toggleClass('follow_button');
$(this).html('<i class="fa fa-fw fa-user-plus"></i><span>'+__('Follow')+'</span>');
putMessage(__("Unmuted this user"));
return false;
});
$(document).on('click','.block_button', function(e) {
e.stopPropagation();
const mid = $(this).attr('mid');
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_confirm').removeClass('invisible');
$('.overlay_confirm_text').text(__("Are you sure that you want to block this user?"));
$('.overlay_confirm_yes').click(function() {
$('.close_button').click();
api.post('accounts/'+mid+'/block', function (data) {
putMessage(__("This user has been blocked"));
return false;
});
});
});
$(document).on('click','.blocking_button', function(e) {
e.stopPropagation();
if ($(this).attr('mid') !== null) {
api.post('accounts/'+$(this).attr('mid')+'/unblock', function (data) {
});
}
$(this).toggleClass('blocking_button');
$(this).toggleClass('follow_button');
$(this).html('<i class="fa fa-fw fa-user-plus"></i><span>'+__('Follow')+'</span>');
putMessage(__("Unblocked this user"));
return false;
});
$(document).on('click','.boost_button', function(e) {
e.stopPropagation();
if($(this).attr('reblogged') !== 'true'){
api.post("statuses/"+$(this).attr('tid')+"/reblog", function (data) {
});
$(this).attr('reblogged', "true");
$(this).toggleClass('active');
} else {
api.post("statuses/"+$(this).attr('tid')+"/unreblog", function (data) {
});
$(this).attr('reblogged', "hold");
$(this).toggleClass('active');
$(this).mouseout(function(e) {
$(this).attr('reblogged', "null");
});
}
return false;
});
$(document).on('click','.fav_button', function(e) {
e.stopPropagation();
if($(this).attr('favourited') !== 'true'){
api.post("statuses/"+$(this).attr('tid')+"/favourite", function (data) {
});
$(this).attr('favourited', "true");
$(this).toggleClass('active');
} else {
api.post("statuses/"+$(this).attr('tid')+"/unfavourite", function (data) {
});
$(this).attr('favourited', "hold");
$(this).toggleClass('active');
$(this).mouseout(function(e) {
$(this).attr('favourited', "null");
});
}
return false;
});
$(document).on('click','.delete_button', function(e) {
const sid = $(this).attr('tid');
e.stopPropagation();
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_confirm').removeClass('invisible');
$('.overlay_confirm_text').text(__("Are you sure that you want to delete this toot?"));
$('.overlay_confirm_yes').click(function() {
$('.close_button').click();
api.delete("statuses/"+sid, function (data) {
$('.toot_entry[sid="'+sid+'"]').remove();
putMessage(__("Your Toot has been deleted"));
});
});
});
$(document).on('click','.pin_button', function(e) {
const sid = $(this).attr('tid');
api.post("statuses/"+sid+"/pin", function (data) {
$('.toot_entry[sid="'+sid+'"] .pin_button').removeClass("pin_button").addClass("unpin_button").text(__("Unpin Toot"));
putMessage(__("Your Toot has been pinned"));
});
});
$(document).on('click','.unpin_button', function(e) {
const sid = $(this).attr('tid');
api.post("statuses/"+sid+"/unpin", function (data) {
$('.toot_entry[sid="'+sid+'"] .unpin_button').removeClass("unpin_button").addClass("pin_button").text(__("Pin Toot"));
putMessage(__("Your Toot has been unpinned"));
});
});
$(document).on('click','.addlist_button',function(e) {
const mid = $(this).attr('mid');
e.stopPropagation();
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_addlist').removeClass('invisible');
$('.overlay_addlist .overlay_simple_header span').html(__('Add to list')+": "+$(this).attr('display_name'));
replace_emoji();
api.get("lists",function(data) {
api.get("accounts/"+mid+"/lists",function(data2) {
var inlists = new Array();
if(typeof data2 == "object") {
for(var i=0;i<data2.length;i++) {
inlists.push(data2[i].id);
}
}
for(var i=0;i<data.length;i++) {
var list_id = data[i].id;
(function(i,list_id) {
if(inlists.indexOf(data[i].id) == -1) {
$(".overlay_addlist_body").append(
$("<div>").addClass("overlay_addlist_item").append(
$("<span>").addClass("emoji_poss").text(data[i].title)).append(
$("<button>").addClass("halcyon_button").append(
$("<i>").addClass("fa").addClass("fa-fw").addClass("fa-user-plus")).append(
$("<span>").text(__('Add'))).click(function(e) {
api.post("lists/"+list_id+"/accounts?account_ids[]="+mid,"",function() {
putMessage(__('Added this account to the list'));
},function(xhr) {
if(xhr.status == 422) {
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_confirm').removeClass('invisible');
$('.overlay_confirm_text').text(__("You need to follow this user to add him/her to the list. Do you want to do that now?"));
$('.overlay_confirm_yes').click(function() {
$('.close_button').click();
api.post('accounts/'+mid+'/follow',function(data) {
putMessage(__("You successfully followed this user."));
api.post("lists/"+list_id+"/accounts?account_ids[]="+mid,"",function() {
putMessage(__('Added this account to the list'));
});
});
});
}
});
$(".close_button").click();
})));
}
else {
$(".overlay_addlist_body").append(
$("<div>").addClass("overlay_addlist_item").append(
$("<span>").addClass("emoji_poss").text(data[i].title)).append(
$("<button>").addClass("halcyon_button").append(
$("<i>").addClass("fa").addClass("fa-fw").addClass("fa-user-times")).append(
$("<span>").text(__('Remove'))).click(function(e) {
api.delete("lists/"+list_id+"/accounts?account_ids[]="+mid,function() {
putMessage(__('Removed this account from the list'));
});
$(".close_button").click();
})));
}
})(i,list_id);
}
replace_emoji();
});
});
});
$(document).on('click','.cw_button', function(e) {
e.stopPropagation();
const article = $(this).parent();
if ( article.hasClass('content_warning') ) {
$(this).text(__('SHOW LESS'));
article.removeClass('content_warning');
} else {
$(this).text(__('SHOW MORE'));
article.addClass('content_warning');
}
return false;
});
$(document).on('click','.sensitive_alart', function(e) {
e.stopPropagation();
$(this).toggleClass('invisible');
return false;
});
$(document).on('click','.header_account_avatar', function(e) {
e.stopPropagation();
$(this).next('.header_my_account_nav').toggleClass('invisible');
});
$(document).on('click','.expand_button', function(e) {
e.stopPropagation();
$(this).next('.expand_menu').toggleClass('invisible');
return false;
});
$(document).on('click','.status_form.ready .active_submit_button', function(e) {
e.stopImmediatePropagation()
return false;
});
});
$(function() {
$(document).on('click', function(e) {
$('.header_my_account_nav').addClass('invisible');
$('.expand_menu').addClass('invisible');
});
});
function setTimeline(level,load_options,show_replies) {
if(show_replies === undefined) {
var show_replies = localStorage.setting_show_replies;
}
let isSyncing = true;
if(load_options === undefined) {
var load_options = [];
}
api.get(level, load_options, function(statuses) {
timeline_hide_status = new Array;
for(let i in statuses) {
var filterstatus = false;
for(var a=0;a<current_filters.length;a++) {
if(((level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("home") != -1 && current_filters[a].irreversible == false) || (!(level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("public") != -1)) {
if(current_filters[a].whole_word == false) {
if(statuses[i].content.match(new RegExp(current_filters[a].phrase))) filterstatus = true;
}
else {
if(statuses[i].content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterstatus = true;
}
}
}
if(filterstatus == false && !(show_replies == "false" && statuses[i].in_reply_to_id) && !(localStorage.setting_show_bots == "false" && statuses[i].account.bot == true && !level.match(/accounts\/\d+\/statuses/)) && !(statuses[i].visibility == "direct" && level == "timelines/home")) {
timeline_template(statuses[i]).appendTo("#js-timeline");
if(statuses[i].in_reply_to_id && level === "timelines/home" | level === "timelines/public") {
if(localStorage.setting_thread_view == "true") {
(function(this_id) {
api.get('statuses/'+statuses[i].id+"/context", function(context) {
console.log(this_id);
for(var b=0;b<context.ancestors.length;b++) {
var filterreplystatus = false;
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("thread") != -1) {
if(current_filters[a].whole_word == false) {
if(context.ancestors[b].content.match(new RegExp(current_filters[a].phrase))) filterreplystatus = true;
}
else {
if(context.ancestors[b].content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterreplystatus = true;
}
}
}
if(filterreplystatus == false) {
$("#js-timeline .toot_entry[sid='"+context.ancestors[b].id+"']").remove();
$("#js-timeline .toot_entry[sid='"+this_id+"']").before(context_template(context.ancestors[b], 'ancestors_status default_padding'));
timeline_hide_status.push(context.ancestors[b].id);
replace_emoji();
}
}
});
})(statuses[i].id);
}
}
}
}
links = getLinkFromXHRHeader(responce_headers);
replaceInternalLink();
replace_emoji();
if (!statuses.length) {
$('#js-timeline_footer > i').css({"display":"none"});
}
isSyncing = false;
});
$(window).scroll(function () {
if ( $(window).scrollTop()+window.innerHeight >= $(document).height()-700 ) {
if (!isSyncing) {
isSyncing = true;
load_options.unshift( {name:"max_id",data:links['next'].match(/max_id=(.+)&?/)[1]} );
api.get(level, load_options, function(statuses) {
if (statuses.length) {
for(let i in statuses) {
var filterstatus = false;
for(var a=0;a<current_filters.length;a++) {
if(((level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("home") != -1 && current_filters[a].irreversible == false) || (!(level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("public") != -1)) {
if(current_filters[a].whole_word == false) {
if(statuses[i].content.match(new RegExp(current_filters[a].phrase))) filterstatus = true;
}
else {
if(statuses[i].content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterstatus = true;
}
}
}
if(filterstatus == false && timeline_hide_status.indexOf(statuses[i]) == -1 && !(show_replies == "false" && statuses[i].in_reply_to_id) && !(localStorage.setting_show_bots == "false" && statuses[i].account.bot == true && !level.match(/accounts\/\d+\/statuses/)) && !(statuses[i].visibility == "direct" && level == "timelines/home")) {
timeline_template(statuses[i]).appendTo("#js-timeline");
if(statuses[i].in_reply_to_id && level === "timelines/home" | level === "timelines/public") {
if(localStorage.setting_thread_view == "true") {
(function(this_id) {
api.get('statuses/'+statuses[i].id+"/context", function(context) {
console.log(this_id);
for(var b=0;b<context.ancestors.length;b++) {
var filterreplystatus = false;
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("thread") != -1) {
if(current_filters[a].whole_word == false) {
if(context.ancestors[b].content.match(new RegExp(current_filters[a].phrase))) filterreplystatus = true;
}
else {
if(context.ancestors[b].content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterreplystatus = true;
}
}
}
if(filterreplystatus == false) {
$("#js-timeline .toot_entry[sid='"+context.ancestors[b].id+"']").remove();
$("#js-timeline .toot_entry[sid='"+this_id+"']").before(context_template(context.ancestors[b], 'ancestors_status default_padding'));
timeline_hide_status.push(context.ancestors[b].id);
replace_emoji();
}
}
});
})(statuses[i].id);
}
}
}
}
links = getLinkFromXHRHeader(responce_headers);
replaceInternalLink();
replace_emoji();
isSyncing = false;
} else {
$('.timeline_footer > i').css({"display":"none"});
$('.timeline_footer').append('<img style="width: 30%;opacity: .3;" src="/assets/images/halcyon.png">');
isSyncing = true;
}
});
load_options.shift();
};
};
});
$(function() {
if(level === "timelines/home") {
var streamscope = "user",
scope = "home";
}
else if(level === "timelines/public" & load_options.length) {
var streamscope = "public:local",
scope = "local";
}
else if(level === "timelines/public" & !load_options.length) {
var streamscope = "public",
scope = "federated";
}
else if(level === "timelines/direct") {
var streamscope = "direct",
scope = "direct";
}
else if(level.indexOf("timelines/tag/") != -1) {
var streamscope = "hashtag&tag="+level.substr(14),
scope = "hashtag";
}
else if(level.indexOf("timelines/list/") != -1) {
var streamscope = "list&list="+level.substr(15),
scope = "lists";
}
let statuses = [];
const original_title = $('title').text();
if(streamscope) {
api.stream(streamscope, function(userstream) {
const streaming_option = localStorage.getItem("setting_post_stream");
if(userstream.event === "update") {
if(streaming_option === "manual") {
if(!$('.toot_entry[sid="'+userstream.payload.id+'"]').length) {
var filterstatus = false;
for(var a=0;a<current_filters.length;a++) {
if(((level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("home") != -1 && current_filters[a].irreversible == false) || (!(level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("public") != -1)) {
if(current_filters[a].whole_word == false) {
if(userstream.payload.content.match(new RegExp(current_filters[a].phrase))) filterstatus = true;
}
else {
if(userstream.payload.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterstatus = true;
}
}
}
if(filterstatus == false && !(show_replies == "false" && userstream.payload.in_reply_to_id) && !(localStorage.setting_show_bots == "false" && userstream.payload.account.bot == true && !level.match(/accounts\/\d+\/statuses/)) && !(userstream.payload.visibility == "direct" && level == "timelines/home")) {
$('#js-stream_update').css({'display':'block','height':'auto','padding':'10px'});
statuses.unshift(userstream.payload);
$('#js-stream_update > button > span').text(statuses.length);
$('title').text("("+statuses.length+") "+original_title);
$('#header .header_nav_list .'+scope+'_badge').removeClass('invisible');
}
}
}
else if (streaming_option === "auto") {
if(!$('.toot_entry[sid="'+userstream.payload.id+'"]').length) {
var filterstatus = false;
for(var a=0;a<current_filters.length;a++) {
if(((level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("home") != -1 && current_filters[a].irreversible == false) || (!(level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("public") != -1)) {
if(current_filters[a].whole_word == false) {
if(userstream.payload.content.match(new RegExp(current_filters[a].phrase))) filterstatus = true;
}
else {
if(userstream.payload.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterstatus = true;
}
}
}
if(filterstatus == false && !(show_replies == "false" && userstream.payload.in_reply_to_id) && !(localStorage.setting_show_bots == "false" && userstream.payload.account.bot == true && !level.match(/accounts\/\d+\/statuses/)) && !(userstream.payload.visibility == "direct" && level == "timelines/home")) {
timeline_template(userstream.payload).prependTo("#js-timeline");
replaceInternalLink();
replace_emoji();
if(level === "timelines/home" | level === "timelines/public") {
if(userstream.payload.in_reply_to_id & !$(".toot_entry[sid='"+userstream.in_reply_to_id+"']").length) {
let reply_source = userstream.payload.id;
api.get('statuses/'+userstream.payload.in_reply_to_id, function(in_reply_statuses) {
var filterreplystatus = false;
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("thread") != -1) {
if(current_filters[a].whole_word == false) {
if(in_reply_statuses.content.match(new RegExp(current_filters[a].phrase))) filterreplystatus = true;
}
else {
if(in_reply_statuses.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterreplystatus = true;
}
}
}
if(filterreplystatus == false) {
$("#js-timeline .toot_entry[sid='"+reply_source+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
replaceInternalLink();
replace_emoji();
}
});
}
}
}
}
}
else if(streaming_option == "ontop") {
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
if(scrollTop == 0) {
if(!$('.toot_entry[sid="'+userstream.payload.id+'"]').length) {
var filterstatus = false;
for(var a=0;a<current_filters.length;a++) {
if(((level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("home") != -1 && current_filters[a].irreversible == false) || (!(level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("public") != -1)) {
if(current_filters[a].whole_word == false) {
if(userstream.payload.content.match(new RegExp(current_filters[a].phrase))) filterstatus = true;
}
else {
if(userstream.payload.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterstatus = true;
}
}
}
if(filterstatus == false && !(show_replies == "false" && userstream.payload.in_reply_to_id) && !(localStorage.setting_show_bots == "false" && userstream.payload.account.bot == true && !level.match(/accounts\/\d+\/statuses/)) && !(userstream.payload.visibility == "direct" && level == "timelines/home")) {
timeline_template(userstream.payload).prependTo("#js-timeline");
replaceInternalLink();
replace_emoji();
if(level === "timelines/home" | level === "timelines/public") {
if(userstream.payload.in_reply_to_id & !$(".toot_entry[sid='"+userstream.in_reply_to_id+"']").length) {
let reply_source = userstream.payload.id;
api.get('statuses/'+userstream.payload.in_reply_to_id, function(in_reply_statuses) {
var filterreplystatus = false;
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("thread") != -1) {
if(current_filters[a].whole_word == false) {
if(in_reply_statuses.content.match(new RegExp(current_filters[a].phrase))) filterreplystatus = true;
}
else {
if(in_reply_statuses.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterreplystatus = true;
}
}
}
if(filterreplystatus == false) {
$("#js-timeline .toot_entry[sid='"+reply_source+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
replaceInternalLink();
replace_emoji();
}
});
}
}
}
}
}
else {
if(!$('.toot_entry[sid="'+userstream.payload.id+'"]').length) {
if(!(show_replies == "false" && userstream.payload.in_reply_to_id) && !(userstream.payload.visibility == "direct" && scope == "home")) {
statuses.unshift(userstream.payload);
$('title').text("("+statuses.length+") "+original_title);
}
}
}
}
}
else if(userstream.event === "delete") {
$('.toot_entry[sid="'+userstream.payload+'"]').remove();
if(streaming_option == "manual") {
for(var i=0;i<statuses.length;i++) {
if(statuses[i].id == userstream.payload) {
statuses.splice(i,1);
if(statuses.length == 0) {
$('#js-stream_update').css({'display':'none','height':'0','padding':'0px'});
$('title').text(original_title);
}
else {
$('#js-stream_update > button > span').text(statuses.length);
$('title').text("("+statuses.length+") "+original_title);
}
}
}
}
else if(streaming_option == "ontop") {
for(var i=0;i<statuses.length;i++) {
if(statuses[i].id == userstream.payload) {
statuses.splice(i,1);
if(statuses.length == 0) {
$('title').text(original_title);
}
else {
$('title').text("("+statuses.length+") "+original_title);
}
}
}
}
}
});
}
if(localStorage.getItem("setting_post_stream") == "ontop") {
$(document).scroll(function() {
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
if(scrollTop == 0) {
statuses.reverse();
for(let i in statuses) {
timeline_template(statuses[i]).prependTo("#js-timeline");
replace_emoji();
if ( level === "timelines/home" | level === "timelines/public" ) {
if (statuses[i].in_reply_to_id) {
const reply_source = statuses[i].id;
api.get('statuses/'+statuses[i].in_reply_to_id, function(in_reply_statuses) {
$("#js-timeline .toot_entry[sid='"+reply_source+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
replace_emoji();
});
}
}
$('title').text(original_title);
};
statuses = [];
}
});
}
$(document).on('click','#js-stream_update', function(e) {
$('#header .header_nav_list .'+scope+'_badge').addClass('invisible');
$('#js-stream_update').css({'display':'none','height':'0','padding':'0px'});
statuses.reverse();
for(let i in statuses) {
timeline_template(statuses[i]).prependTo("#js-timeline");
replace_emoji();
if ( level === "timelines/home" | level === "timelines/public" ) {
if (statuses[i].in_reply_to_id) {
const reply_source = statuses[i].id;
api.get('statuses/'+statuses[i].in_reply_to_id, function(in_reply_statuses) {
var filterreplystatus = false;
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("thread") != -1) {
if(current_filters[a].whole_word == false) {
if(in_reply_statuses.content.match(new RegExp(current_filters[a].phrase))) filterreplystatus = true;
}
else {
if(in_reply_statuses.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterreplystatus = true;
}
}
}
if(filterreplystatus == false) {
$("#js-timeline .toot_entry[sid='"+reply_source+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
replace_emoji();
}
});
}
}
$('title').text(original_title);
};
statuses = [];
});
});
};
function setOtherTimeline(instance, load_options) {
var show_replies = localStorage.setting_show_replies;
let isSyncing = true;
if(load_options === undefined) {
var load_options = [];
}
const loadstatus = instance + "timelines/public"
api.getOther(loadstatus, load_options, function(statuses) {
let reply_sources = {};
for(let i in statuses) {
var filterstatus = false;
for(var a=0;a<current_filters.length;a++) {
if(((level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("home") != -1 && current_filters[a].irreversible == false) || (!(level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("public") != -1)) {
if(current_filters[a].whole_word == false) {
if(statuses[i].content.match(new RegExp(current_filters[a].phrase))) filterstatus = true;
}
else {
if(statuses[i].content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterstatus = true;
}
}
}
if(filterstatus == false && !(show_replies == "false" && statuses[i].in_reply_to_id) && !(localStorage.setting_show_bots == "false" && statuses[i].account.bot == true)) {
timeline_template(statuses[i]).appendTo("#js-timeline");
if(statuses[i].in_reply_to_id ) {
if(!reply_sources[statuses[i].in_reply_to_id]) {
reply_sources[statuses[i].in_reply_to_id] = statuses[i].id;
api.getOther(instance + 'statuses/'+statuses[i].in_reply_to_id, function(in_reply_statuses) {
var filterreplystatus = false;
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("thread") != -1) {
if(current_filters[a].whole_word == false) {
if(in_reply_statuses.content.match(new RegExp(current_filters[a].phrase))) filterreplystatus = true;
}
else {
if(in_reply_statuses.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterreplystatus = true;
}
}
}
if(filterreplystatus == false) {
$("#js-timeline .toot_entry[sid='"+reply_sources[in_reply_statuses.id]+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
replace_emoji();
}
});
}
}
}
}
$('.toot_entry .toot_footer').addClass('invisible');
links = getLinkFromXHRHeader(responce_headers);
replaceInternalLink();
replace_emoji();
if (!statuses.length) {
$('#js-timeline_footer > i').css({"display":"none"});
}
isSyncing = false;
});
$(window).scroll(function () {
if($(window).scrollTop()+window.innerHeight >= $(document).height()-700) {
if(!isSyncing) {
isSyncing = true;
load_options.unshift( {name:"max_id",data:links['next'].match(/max_id=(.+)&?/)[1]} );
api.getOther(loadstatus, load_options, function(statuses) {
if(statuses.length) {
let reply_sources = {};
for(let i in statuses) {
var filterstatus = false;
for(var a=0;a<current_filters.length;a++) {
if(((level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("home") != -1 && current_filters[a].irreversible == false) || (!(level == "timelines/home" || level.indexOf("timelines/list/") != -1) && current_filters[a].context.indexOf("public") != -1)) {
if(current_filters[a].whole_word == false) {
if(statuses[i].content.match(new RegExp(current_filters[a].phrase))) filterstatus = true;
}
else {
if(statuses[i].content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterstatus = true;
}
}
}
if(filterstatus == false && !(show_replies == "false" && statuses[i].in_reply_to_id) && !(localStorage.setting_show_bots == "false" && statuses[i].account.bot == true)) {
timeline_template(statuses[i]).appendTo("#js-timeline");
if(statuses[i].in_reply_to_id ) {
if(!reply_sources[statuses[i].in_reply_to_id]) {
reply_sources[statuses[i].in_reply_to_id] = statuses[i].id;
api.getOther(instance+'statuses/'+statuses[i].in_reply_to_id, function(in_reply_statuses) {
var filterreplystatus = false;
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("thread") != -1) {
if(current_filters[a].whole_word == false) {
if(in_reply_statuses.content.match(new RegExp(current_filters[a].phrase))) filterreplystatus = true;
}
else {
if(in_reply_statuses.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterreplystatus = true;
}
}
}
if(filterreplystatus == false) {
$("#js-timeline .toot_entry[sid='"+reply_sources[in_reply_statuses.id]+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
replace_emoji();
}
});
}
}
}
}
$('.toot_entry .toot_footer').addClass('invisible');
links = getLinkFromXHRHeader(responce_headers);
replaceInternalLink();
replace_emoji();
isSyncing = false;
}
else {
$('.timeline_footer > i').css({"display":"none"});
$('.timeline_footer').append('<img style="width: 30%;opacity: .3;" src="/assets/images/halcyon.png">');
isSyncing = true;
}
});
load_options.shift();
};
};
});
};
function setNotifications(load_options) {
let isSyncing = true;
if (load_options === undefined) {
var load_options = [];
}
api.get('notifications', load_options, function(NotificationObj) {
for(let i in NotificationObj) {
var filterstatus = false;
if(NotificationObj[i].type == "mention") {
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("notifications") != -1 && current_filters[a].irreversible == false) {
if(current_filters[a].whole_word == false) {
if(NotificationObj[i].status.content.match(new RegExp(current_filters[a].phrase))) filterstatus = true;
}
else {
if(NotificationObj[i].status.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterstatus = true;
}
}
}
}
if(filterstatus == false) notifications_template(NotificationObj[i]).appendTo("#js-timeline");
};
links = getLinkFromXHRHeader(responce_headers);
replaceInternalLink();
replace_emoji();
if (!NotificationObj.length) {
$('#js-timeline_footer > i').css({"display":"none"});
}
isSyncing = false;
});
$(window).scroll(function () {
if($(window).scrollTop() + window.innerHeight >= $(document).height()-700) {
if( !isSyncing ){
isSyncing = true;
load_options.unshift( {name:"max_id",data:links['next'].match(/max_id=(.+)&?/)[1]} );
api.get('notifications', load_options, function(NotificationObj) {
if (NotificationObj.length) {
for (let i in NotificationObj) {
var filterstatus = false;
if(NotificationObj[i].type == "mention") {
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("notifications") != -1 && current_filters[a].irreversible == false) {
if(current_filters[a].whole_word == false) {
if(NotificationObj[i].status.content.match(new RegExp(current_filters[a].phrase))) filterstatus = true;
}
else {
if(NotificationObj[i].status.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterstatus = true;
}
}
}
}
if(filterstatus == false) notifications_template(NotificationObj[i]).appendTo("#js-timeline");
};
links = getLinkFromXHRHeader(responce_headers);
replaceInternalLink();
replace_emoji();
isSyncing = false;
} else {
$('.timeline_footer > i').css({"display":"none"});
$('.timeline_footer').append('<img style="width: 30%;opacity: .3;" src="/assets/images/halcyon.png" />');
isSyncing = true;
}
});
load_options.shift();
};
};
});
api.stream("user", function(userstream) {
const original_title = $('title').text();
if (userstream.event === "notification") {
const streaming_option = localStorage.getItem("setting_post_stream");
if ( streaming_option === "manual" ) {
} else if ( streaming_option === "auto" ) {
var filterstatus = false;
if(userstream.payload.type == "mention") {
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("notifications") != -1 && current_filters[a].irreversible == false) {
if(current_filters[a].whole_word == false) {
if(userstream.payload.status.content.match(new RegExp(current_filters[a].phrase))) filterstatus = true;
}
else {
if(userstream.payload.status.content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterstatus = true;
}
}
}
}
if(filterstatus == false) notifications_template(userstream.payload).prependTo("#js-timeline");
replaceInternalLink();
replace_emoji();
}
}
});
}
function setFollows(mid, param, load_options) {
let isSyncing = true,
followsList = [];
api.get('accounts/'+mid+'/'+param, load_options, function(follows) {
for (let i in follows) {
follows_template(follows[i]).appendTo("#js-follows_profile");
followsList.unshift(follows[i].id);
};
api.getArray('accounts/relationships', [{name:'id', data:followsList}], function(RelationshipsObj) {
for ( let i in RelationshipsObj ) {
if ( RelationshipsObj[i].following ) {
const button = $('#js-follows_profile .follow_button[mid="'+RelationshipsObj[i].id+'"]');
button.removeClass("follow_button");
button.addClass("following_button");
button.children("span").text(__('Following'));
button.children("i").removeClass("fa-user-plus").addClass("fa-user-times");
}
}
});
links = getLinkFromXHRHeader(responce_headers);
replace_emoji();
$("#js-follows_footer > i").css({"display":"none"});
isSyncing = false;
});
$(window).scroll(function () {
if ($(window).scrollTop() + window.innerHeight >= $(document).height()-700) {
if( !isSyncing ){
isSyncing = true;
load_options.unshift( {name:"max_id",data:links['next'].match(/max_id=(.+)&?/)[1]} );
api.get('accounts/'+mid+'/'+param, load_options, function(follows) {
let followsList = [];
if (follows.length) {
for(let i in follows) {
follows_template(follows[i]).appendTo("#js-follows_profile");
followsList.unshift(follows[i].id);
};
api.getArray('accounts/relationships', [{name:'id', data:followsList}], function(RelationshipsObj) {
for ( let i in RelationshipsObj ) {
if ( RelationshipsObj[i].following ) {
const button = $('#js-follows_profile .follow_button[mid="'+RelationshipsObj[i].id+'"]');
button.removeClass("follow_button");
button.addClass("following_button");
button.children("span").text(__('Following'));
button.children("i").removeClass("fa-user-plus").addClass("fa-user-times");
}
}
});
links = getLinkFromXHRHeader(responce_headers);
replace_emoji();
isSyncing = false;
} else {
isSyncing = true;
}
});
load_options.shift();
};
};
});
};
function setUserSearch(query) {
api.get('search', [{name:'q',data:query},{name:'resolve',data:'true'}], function(search) {
for(let i in search.accounts) {
follows_template(search.accounts[i]).appendTo("#js-follows_profile");;
}
$("#js-follows_footer > i").css({"display":"none"});
replace_emoji();
});
};
function setAccount(AccountObj) {
if(AccountObj.display_name.length == 0) {
AccountObj.display_name = AccountObj.username;
}
AccountObj.display_name = htmlEscape(AccountObj.display_name);
for(i=0;i<AccountObj.emojis.length;i++) {
AccountObj.display_name = AccountObj.display_name.replace(new RegExp(":"+AccountObj.emojis[i].shortcode+":","g"),"<img src='"+AccountObj.emojis[i].url+"' class='emoji'>");
}
const calendar = [__("Jan"),__("Feb"),__("Mar"),__("Apr"),__("May"),__("Jun"),__("Jul"),__("Aug"),__("Sep"),__("Oct"),__("Nov"),__("Dec")];
var creation_date = new Date(AccountObj.created_at);
creation_date = calendar[creation_date.getUTCMonth()]+" "+creation_date.getUTCFullYear();
var account_state_icons = "";
if(AccountObj.locked == true) account_state_icons += " <i class='fa fa-lock'></i>";
if(AccountObj.bot == true) account_state_icons += " <img src='/assets/images/robot.svg' class='emoji'>";
$("#js_header_image").attr('src', AccountObj.header);
$("#js_profile_image").attr('src', AccountObj.avatar);
$("#js_toots_count").text(AccountObj.statuses_count);
$("#js_following_count").text(AccountObj.following_count);
$("#js_followers_count").text(AccountObj.followers_count);
$("#js_profile_displayname").addClass("emoji_poss").html(AccountObj.display_name);
$("#js_profile_username").html(AccountObj.acct+account_state_icons);
$("#js_profile_bio").addClass("emoji_poss").html(AccountObj.note);
$("#js_profile_bio .emojione").removeClass("emojione").addClass("emoji");
$('#js_profile_public_link a').attr('href',AccountObj.url);
$('#js_profile_joined_date span span').text(__("Joined at")+" "+creation_date);
for(var i=0;i<AccountObj.fields.length;i++) {
if(AccountObj.fields[i].verified_at != null) var verified = $("<i>").addClass("fa fa-check-circle").addClass("profile_field_verified");
else var verified = "";
$("#js_profile_fields").append(
$("<div>").addClass("profile_field").append(
$("<span>").addClass("profile_field_header").addClass("emoji_poss").text(AccountObj.fields[i].name).prepend(verified)).append($("<br>")).append(
$("<span>").addClass("profile_field_value").addClass("emoji_poss").html(AccountObj.fields[i].value)));
}
console.log(AccountObj.id);
console.log(current_id);
if(AccountObj.acct.indexOf("@") != -1) {
$('#js_profile_public_link').removeClass("invisible");
}
if( AccountObj.id == current_id ) {
$(`<a href="/settings/profile">
<button class="profile_edit_button relationship_button">
<span>${__('Edit profile')}</span>
</button
</a>`).appendTo('.profile_button_box');
$(`<a href="${current_favourites_link}">
<h2>${__('FAVOURITES')}</h2>
<span>${__('Show')}</span>
</a>`).appendTo("#js-profile_nav_favourites");
} else {
$("#profile_toot_buttons").show();
api.get('accounts/relationships', [{name:'id', data:String(AccountObj.id)}], function(RelationshipObj) {
if (RelationshipObj[0].followed_by) {
$('#main .profile_username .profile_followed_by').removeClass('invisible');
}
if (RelationshipObj[0].blocking) {
$(`<button class="blocking_button relationship_button" mid="${AccountObj.id}">
<span>${__('Blocking')}</span>
</button>`).appendTo('.profile_button_box');
} else if (RelationshipObj[0].muting) {
$(`<button class="muting_button relationship_button" mid="${AccountObj.id}">
<span>${__('Muting')}</span>
</button>`).appendTo('.profile_button_box');
} else if (RelationshipObj[0].requested) {
$(`<!-- wont work -->
<button class="requested_button relationship_button" mid="${AccountObj.id}">
<span>${__('Requested')}</span>
</button>`).appendTo('.profile_button_box');
} else if(RelationshipObj[0].following){
$(`<button class="following_button relationship_button" mid="${AccountObj.id}">
<span>${__('Following')}</span>
</button>`).appendTo('.profile_button_box');
} else {
$(`<button class="follow_button relationship_button" mid="${AccountObj.id}">
<i class="fa fa-fw fa-user-plus"></i>
<span>${__('Follow')}</span>
</button>`).appendTo('.profile_button_box');
}
});
};
replace_emoji();
}
function setRecentImages(mid) {
api.get("accounts/"+mid+"/statuses", [{name:'only_media',data:'true'},{name:'limit',data:'6'}], function(statuses) {
if ( statuses.length ) {
$('#js_profile_recent_images span').text(`${statuses[0].account.statuses_count} ${__('Photos and toots')}`);
$('#js_profile_recent_images a').attr('href', $("#media_link").attr('href'));
for ( i in statuses ) {
$(`<div class="profile_recent_images_item media_attachment" otype="image" sid="${statuses[i].id}" url="${statuses[i].media_attachments[0].preview_url}">
<img src="${statuses[i].media_attachments[0].preview_url}" />
</div>`).appendTo('#js_profile_recent_images_box');
};
}
});
};
function setInstance() {
api.get("instance",function(data) {
$("#instance_title").html(data.title);
$("#instance_description").html(data.description);
$("#instance_thumbnail").attr("src",data.thumbnail);
$("#js-follows_profile").append(follows_template(data.contact_account));
api.get('accounts/relationships',[{name:'id',data:data.contact_account.id}],function(RelationshipsObj) {
if(RelationshipsObj[0].following) {
const button = $('#js-follows_profile .follow_button[mid="'+RelationshipsObj[0].id+'"]');
button.removeClass("follow_button");
button.addClass("following_button");
button.children("span").text(__('Following'));
button.children("i").removeClass("fa-user-plus").addClass("fa-user-times");
}
});
$("#instance_users").text(data.stats.user_count);
$("#instance_posts").text(data.stats.status_count);
$("#instance_domains").text(data.stats.domain_count);
$("#instance_version").text(data.version);
$("#instance_contact").attr("href","mailto:"+data.email).text(data.email);
$("#js-timeline_footer").remove();
});
}
function badges_update(){
let current_count = Number(localStorage.getItem("notification_count"));
if ( current_count ) {
$('#header .header_nav_list .notification_badge').removeClass('invisible');
$('#header .header_nav_list .notification_badge').text( current_count );
}
api.stream("user", function(userstream) {
if(userstream.event === "update" & location.pathname !== "/") {
$('#header .header_nav_list .home_badge').removeClass('invisible');
}
else if(userstream.event === "notification" & location.pathname !== "/notifications") {
current_count += 1;
localStorage.setItem("notification_count",current_count);
$('#header .header_nav_list .notification_badge').text(current_count );
if($('#header .header_nav_list .notification_badge').hasClass('invisible')) {
$('#header .header_nav_list .notification_badge').removeClass('invisible')
}
}
if(userstream.event === "notification") {
if(userstream.payload.account.display_name.length == 0) {
userstream.payload.account.display_name = userstream.payload.account.username;
}
switch(userstream.payload.type) {
case "favourite":pushNotification(__("New favourite"),userstream.payload.account.display_name+" "+__("favourited your toot"));break;
case "reblog":pushNotification(__("New boost"),userstream.payload.account.display_name+" "+__("boosted your toot"));break;
case "follow":pushNotification(__("New follower"),userstream.payload.account.display_name+" "+__("followed you"));$(".js_current_followers_count").html(++localStorage.current_followers_count);break;
case "mention":pushNotification(__("New mention"),userstream.payload.account.display_name+" "+__("mentioned you"));break;
}
}
});
if(localStorage.setting_service_worker == "true") {
if("serviceWorker" in navigator) {
navigator.serviceWorker.register("/assets/js/halcyon/halcyonWorker.js").then(function(worker) {
console.log("Service worker successfully registered",worker);
if(worker.active) {
var translation = new Object();
translation["New favourite"] = __("New favourite");
translation["New boost"] = __("New boost");
translation["New follower"] = __("New follower");
translation["New mention"] = __("New mention");
translation["favourited your toot"] = __("favourited your toot");
translation["boosted your toot"] = __("boosted your toot");
translation["followed you"] = __("followed you");
translation["mentioned you"] = __("mentioned you");
worker.active.postMessage({instance:current_instance,authtoken:authtoken,translation:translation});
}
}).catch(function(error) {
console.log("There was an error when registering the service worker",error);
});
}
}
}
function setOverlayStatus(sid) {
if ( !window.getSelection().toString() ) {
$("#js-overlay_content .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_05');
api.get('statuses/'+sid+'/', function(status) {
$('<div class="toot_detail_wrap"></div>').appendTo("#js-overlay_content .temporary_object");
status_template(status, 'main_status').appendTo('#js-overlay_content .toot_detail_wrap');
replaceInternalLink();
replace_emoji();
api.get('statuses/'+sid+'/context', function(status) {
if (status.ancestors.length) {
status.ancestors.reverse();
for(let i in status.ancestors) {
var filterreplystatus = false;
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("thread") != -1) {
if(current_filters[a].whole_word == false) {
if(status.ancestors[i].content.match(new RegExp(current_filters[a].phrase))) filterreplystatus = true;
}
else {
if(status.ancestors[i].content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterreplystatus = true;
}
}
}
if(filterreplystatus == false) context_template(status.ancestors[i], 'ancestors_status').prependTo("#js-overlay_content .temporary_object .toot_detail_wrap");
}
}
if(status.descendants.length) {
for(let i in status.descendants) {
var filterreplystatus = false;
for(var a=0;a<current_filters.length;a++) {
if(current_filters[a].context.indexOf("thread") != -1) {
if(current_filters[a].whole_word == false) {
if(status.descendants[i].content.match(new RegExp(current_filters[a].phrase))) filterreplystatus = true;
}
else {
if(status.descendants[i].content.match(new RegExp("[^a-zA-Z1-9]"+current_filters[a].phrase+"[^a-zA-Z1-9]"))) filterreplystatus = true;
}
}
}
if(filterreplystatus == false) {
if(i < status.descendants.length-1 && status.descendants[i].id == status.descendants[parseInt(i)+1].in_reply_to_id) {
context_template(status.descendants[i], 'descendants_status direct_answer').appendTo("#js-overlay_content .temporary_object .toot_detail_wrap");
}
else context_template(status.descendants[i], 'descendants_status').appendTo("#js-overlay_content .temporary_object .toot_detail_wrap");
}
}
}
replaceInternalLink();
replace_emoji();
});
});
}
}
$(function() {
$(document).on('click','.toot_entry.ancestors_status, .toot_entry.descendants_status', function(e) {
$("#js-overlay_content .temporary_object").empty();
});
$(document).on('click','.player',function(e) {
e.stopPropagation();
});
$(document).on('click','.toot_entry', function(e) {
setOverlayStatus($(this).attr('sid'));
});
})
function setOverlayMedia(sid,mediacount) {
$("#js-overlay_content .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('#js-overlay_content .temporary_object').addClass('visible');
api.get("statuses/"+sid, function(status) {
if(!status.reblog) {
media_template(status,mediacount).appendTo("#js-overlay_content .temporary_object");
replaceInternalLink();
replace_emoji();
}
else {
media_template(status.reblog,mediacount).appendTo("#js-overlay_content .temporary_object");
replaceInternalLink();
replace_emoji();
}
});
}
$(function() {
$(document).on('click','.media_attachment[otype="image"]', function(e) {
e.stopPropagation();
setOverlayMedia($(this).attr('sid'),$(this).attr('mediacount'));
$('.media_detail .toot_entry .media_views').addClass('invisible');
});
})
function setOverlayMediaWithoutStatus(url) {
$("#js-overlay_content .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_05');
media_template(null, url).appendTo("#js-overlay_content .temporary_object");
}
var actEmojiData = new Array();
for(var i=0;i<lsxEmojiData.activity.length;i++) {
var emoji = new Object();
emoji.name = lsxEmojiData.activity[i].name;
emoji.value = lsxEmojiData.activity[i].value;
actEmojiData.push(emoji);
}
for(var i=0;i<lsxEmojiData.flags.length;i++) {
var emoji = new Object();
emoji.name = lsxEmojiData.flags[i].name;
emoji.value = lsxEmojiData.flags[i].value;
actEmojiData.push(emoji);
}
for(var i=0;i<lsxEmojiData.foods.length;i++) {
var emoji = new Object();
emoji.name = lsxEmojiData.foods[i].name;
emoji.value = lsxEmojiData.foods[i].value;
actEmojiData.push(emoji);
}
for(var i=0;i<lsxEmojiData.nature.length;i++) {
var emoji = new Object();
emoji.name = lsxEmojiData.nature[i].name;
emoji.value = lsxEmojiData.nature[i].value;
actEmojiData.push(emoji);
}
for(var i=0;i<lsxEmojiData.objects.length;i++) {
var emoji = new Object();
emoji.name = lsxEmojiData.objects[i].name;
emoji.value = lsxEmojiData.objects[i].value;
actEmojiData.push(emoji);
}
for(var i=0;i<lsxEmojiData.people.length;i++) {
var emoji = new Object();
emoji.name = lsxEmojiData.people[i].name;
emoji.value = lsxEmojiData.people[i].value;
actEmojiData.push(emoji);
}
for(var i=0;i<lsxEmojiData.places.length;i++) {
var emoji = new Object();
emoji.name = lsxEmojiData.places[i].name;
emoji.value = lsxEmojiData.places[i].value;
actEmojiData.push(emoji);
}
for(var i=0;i<lsxEmojiData.symbols.length;i++) {
var emoji = new Object();
emoji.name = lsxEmojiData.symbols[i].name;
emoji.value = lsxEmojiData.symbols[i].value;
actEmojiData.push(emoji);
}
$(document).on("emojiready",function() {
var customemojis = JSON.parse(localStorage.current_custom_emojis);
for(var i=0;i<customemojis.length;i++) {
var emoji = new Object();
emoji.name = customemojis[i].code;
emoji.url = customemojis[i].url;
actEmojiData.push(emoji);
}
});
$(function() {
$(document).on('click','img[mediaaccess="true"]', function(e) {
e.stopPropagation();
setOverlayMediaWithoutStatus($(this).attr('src'));
});
})
$(function() {
$(document).on('click', function(e) {
if(!$(e.target).closest('#creat_status').length && !$(e.target).closest('.overlay_status').length) {
$('#overlay_status_emoji').lsxEmojiPicker("destroy");
}
});
$('label[for=overlay_status_emoji]').click(function(e) {$('#overlay_status_emoji').trigger('click',e)});
$(document).on('click', '#creat_status,.profile_sendto', function(e) {
if($(this).attr("privacy")) privacy_mode = $(this).attr("privacy")
else privacy_mode = localStorage.getItem("setting_post_privacy")
switch(privacy_mode) {
case "public":picon="globe";break;
case "unlisted":picon="unlock-alt";break;
case "private":picon="lock";break;
case "direct":picon="envelope";break;
}
$('.overlay_status').removeClass('invisible');
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('#overlay_status_form .status_textarea textarea').addClass('focus');
$('.overlay_status .submit_status_label').addClass('active_submit_button');
$('#overlay_status_form .status_textarea textarea').focus();
autosize($('#overlay_status_form .status_textarea textarea'));
if(localStorage.setting_compose_autocomplete == "true") {
$('#overlay_status_form .status_textarea textarea').autoCompleteToken({instance:1,startkey:"@",endkey:" ",arrayname:"accounts",resultname:"acct"});
$('#overlay_status_form .status_textarea textarea').autoCompleteToken({instance:2,startkey:"#",endkey:" ",arrayname:"hashtags"});
$('#overlay_status_form .status_textarea textarea').autoCompleteToken({instance:3,startkey:":",endkey:";",source:actEmojiData,resultname:"name",callback:function() {
$('#overlay_status_form .status_textarea textarea').trigger({"type":"keyup","key":":"});
}});
}
$('#overlay_status_form input[name="privacy_option"]').val([privacy_mode]);
$('#overlay_status_form .expand_privacy_menu_button > i').attr('class', "fa fa-" + picon);
if($(this).attr("display_name")) $('.overlay_status .overlay_status_header span').addClass("emoji_poss").html(__("Toot to")+" "+$(this).attr("display_name"));
else $('.overlay_status .overlay_status_header span').html(__("Compose new Toot"));
if($(this).attr("acct")) $('#overlay_status_form textarea').val($(this).attr("acct")+" ");
else $('#overlay_status_form textarea').val("");
$('#overlay_status_form .character_count').html(current_instance_charlimit);
$('#overlay_status_emoji').lsxEmojiPicker({
closeOnSelect:true,
twemoji:!checkEmojiSupport(),
onSelect:function(emoji) {
$('#overlay_status_form .status_textarea textarea').insertText(":"+emoji.name+":");
$('#overlay_status_form .status_textarea textarea').trigger({"type":"keyup","key":":"});
var textLen = $('#overlay_status_form .status_textarea textarea').val().length * 2;
}
});
if(localStorage.setting_post_sensitive == "true") {
$("#overlay_status_nsfw")[0].checked = true;
$('#overlay_status_form .media_attachments_preview_area').addClass('nsfw');
}
});
$(document).on('change keyup','#overlay_status_form textarea, #overlay_status_form .status_spoiler', function(e) {
if(e.keyCode !== 224 & e.keyCode !== 17) {
const textCount = $('#overlay_status_form textarea').val().length + $('#overlay_status_form .status_spoiler').val().length;
let textLen = ( current_instance_charlimit - textCount );
if ( textLen <= -1 ) {
$('#overlay_status_form .character_count').addClass('red');
$('#overlay_status_form').addClass('ready');
} else if ( textLen === current_instance_charlimit ) {
$('#overlay_status_form').addClass('ready');
} else {
$('#overlay_status_form .character_count').removeClass('red');
$('#overlay_status_form').removeClass('ready');
}
if(e.key == ":") {
replace_emoji_textarea(this);
}
$('#overlay_status_form .character_count').text(textLen);
}
});
$(document).on('click','#overlay_status_form .status_CW', function(e) {
$('#overlay_status_form .status_spoiler').toggleClass('invisible');
});
$(document).on('click','#overlay_status_form .expand_privacy_menu_button', function(e) {
$('#overlay_status_form .expand_privacy_menu').removeClass('invisible');
});
$(document).on('click','#overlay_status_form .status_privacy.select_privacy', function(e) {
e.stopPropagation();
$('#overlay_status_form .expand_privacy_menu_button > i').attr('class', $(this).attr('privacyicon'));
$('#overlay_status_form .expand_privacy_menu').addClass('invisible');
});
$(document).on('change','#overlay_status_media_atta', function(e) {
$('#overlay_status_form .media_attachments_preview_area').empty();
$('#overlay_status_form .status_textarea .media_attachments_preview_area').removeClass('invisible');
for ( let i = 0, f; f = e.target.files[i]; i++ ) {
let reader= new FileReader();
reader.readAsDataURL(f);
reader.onloadend = (function() {
return function (e) {
const html = (`<div class="media_attachments_preview">
<img src="${e.target.result}"/>
</div>`);
$(html).appendTo('#overlay_status_form .media_attachments_preview_area');
}
})(f);
}
});
$(document).on('click','#overlay_status_form .status_NSFW', function(e) {
$('#overlay_status_form .media_attachments_preview_area').toggleClass('nsfw');
});
$(document).on('click','#overlay_status_form .submit_status_label', function(e) {
$('#overlay_status_form').addClass('ready');
$('#overlay_status_form .status_textarea').addClass('disallow_select');
$('#overlay_status_form .character_count').html('<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>');
const form = document.forms.overlay_status_form;
if ( !$('#overlay_status_media_atta')[0].files.length ) {
const params = {
status : form.status_textarea.value,
sensitive: form.status_nsfw.checked,
spoiler_text : form.status_spoiler.value,
visibility : form.privacy_option.value
}
api.post("statuses", params, function (data) {
$('#overlay_status_form .media_attachments_preview_area').empty();
$('#overlay_status_form .status_spoiler').addClass('invisible');
$('#overlay_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
form.reset();
$('#overlay_status_form').removeClass('ready');
$('#overlay_status_form .status_textarea').removeClass('disallow_select');
$('#overlay_status_form .character_count').html(current_instance_charlimit);
$('.overlay_status .submit_status_label').removeClass('active_submit_button');
$('.overlay_status').addClass('invisible');
$('#js-overlay_content_wrap').removeClass('view');
$('#js-overlay_content_wrap').removeClass('black_05');
putMessage(__('Your Toot was posted!'));
});
} else {
const dummy_form= $('<form></form>').append($('#overlay_status_media_atta')),
files = dummy_form[0][0].files,
filesLen= files.length -1;
let media_array = [];
$("#overlay_status_form .status_bottom").append($('<input id="overlay_status_media_atta" name="files" multiple="" class="invisible" type="file">'));
for (let i=0; i<files.length; i++) {
let formData = new FormData();
formData.append('file', files[i]);
if ( i === 3 || i === filesLen ) {
api.postMedia("media", formData, function (postMedia) {
media_array.unshift(postMedia.id);
const params = {
status : form.status_textarea.value,
sensitive: form.status_nsfw.checked,
spoiler_text : form.status_spoiler.value,
visibility : form.privacy_option.value,
media_ids: media_array
}
api.post("statuses", params, function (data) {
$('#overlay_status_form .media_attachments_preview_area').empty();
$('#overlay_status_form .status_spoiler').addClass('invisible');
$('#overlay_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
form.reset();
$('#overlay_status_form').removeClass('ready');
$('#overlay_status_form .status_textarea').removeClass('disallow_select');
$('#overlay_status_form .character_count').html(current_instance_charlimit);
$('.overlay_status .submit_status_label').removeClass('active_submit_button');
$('.overlay_status').addClass('invisible');
autosize.destroy($('#overlay_status_form .status_textarea textarea'));
$('#overlay_status_emoji').lsxEmojiPicker("destroy");
$('#js-overlay_content_wrap').removeClass('view');
$('#js-overlay_content_wrap').removeClass('black_05');
putMessage(__('Your Toot was posted!'));
});
});
break;
} else if ( i < filesLen ) {
api.postMedia("media", formData, function (postMedia) {
media_array.unshift(postMedia.id);
});
}
}
}
});
})
$(function() {
$(document).on('click', function(e) {
if(!$(e.target).closest('#header_status_form').length) {
$('#header_status_form .submit_status_label').removeClass('active_submit_button');
$('#header_status_form .expand_privacy_menu').addClass('invisible');
$('#header_status_form .status_textarea textarea').removeClass('focus');
$('#header_status_form .status_bottom').addClass('invisible');
autosize.destroy($('#header_status_form .status_textarea textarea'));
$('#header_status_emoji').lsxEmojiPicker("destroy");
$('#header_status_form .status_textarea textarea').autoCompleteToken("destroy");
}
});
$(document).on('change keyup','#header_status_form textarea, #header_status_form .status_spoiler', function(e) {
if(e.keyCode !== 224 & e.keyCode !== 17) {
if(e.key == ":") {
replace_emoji_textarea(this);
}
const textCount = $('#header_status_form textarea').val().length + $('#header_status_form .status_spoiler').val().length;
let textLen = ( current_instance_charlimit - textCount );
if(textLen <= -1) {
$('#header_status_form .character_count').addClass('red');
$('#header_status_form').addClass('ready');
} else if(textLen === current_instance_charlimit) {
$('#header_status_form').addClass('ready');
} else {
$('#header_status_form .character_count').removeClass('red');
$('#header_status_form').removeClass('ready');
}
$('#header_status_form .character_count').text(textLen);
}
});
$(document).on('click','#header_status_form .status_CW', function(e) {
$('#header_status_form .status_spoiler').toggleClass('invisible');
});
$(document).on('click','#header_status_form .expand_privacy_menu_button', function(e) {
$('#header_status_form .expand_privacy_menu').removeClass('invisible');
});
$(document).on('click','#header_status_form .status_privacy.select_privacy', function(e) {
e.stopPropagation();
$('#header_status_form .expand_privacy_menu_button > i').attr('class', $(this).attr('privacyicon'));
$('#header_status_form .expand_privacy_menu').addClass('invisible');
});
$('label[for=header_status_emoji]').click(function(e) {$('#header_status_emoji').trigger('click',e)});
$(document).on('click','#header_status_form', function(e) {
switch(localStorage.getItem("setting_post_privacy")) {
case "public":picon="globe";break;
case "unlisted":picon="unlock-alt";break;
case "private":picon="lock";break;
case "direct":picon="envelope";break;
}
if(!$('#header_status_form .status_textarea textarea').hasClass('focus')) {
$('#header_status_form input[name="privacy_option"]').val([localStorage.getItem("setting_post_privacy")]);
$('#header_status_form .expand_privacy_menu_button > i').attr('class', "fa fa-" + picon);
$('#header_status_form .status_textarea textarea').addClass('focus');
autosize($('#header_status_form .status_textarea textarea'));
if(localStorage.setting_compose_autocomplete == "true") {
$('#header_status_form .status_textarea textarea').autoCompleteToken({instance:1,startkey:"@",endkey:" ",arrayname:"accounts",resultname:"acct"});
$('#header_status_form .status_textarea textarea').autoCompleteToken({instance:2,startkey:"#",endkey:" ",arrayname:"hashtags"});
$('#header_status_form .status_textarea textarea').autoCompleteToken({instance:3,startkey:":",endkey:";",source:actEmojiData,resultname:"name",callback:function() {
$('#header_status_form .status_textarea textarea').trigger({"type":"keyup","key":":"});
}});
}
$('#header_status_form .status_bottom').removeClass('invisible');
$('#header_status_form .submit_status_label').addClass('active_submit_button');
const textCount = $('#header_status_form textarea').val().length + $('#header_status_form .status_spoiler').val().length;
let textLen = (current_instance_charlimit - textCount);
$('#header_status_form .character_count').html(textLen);
$('#header_status_emoji').lsxEmojiPicker({
closeOnSelect:true,
twemoji:!checkEmojiSupport(),
onSelect:function(emoji) {
$('#header_status_form .status_textarea textarea').insertText(":"+emoji.name+":");
$('#header_status_form .status_textarea textarea').trigger({"type":"keyup","key":":"});
var textLen = $('#header_status_form .status_textarea textarea').val().length * 2;
}
});
if(localStorage.setting_post_sensitive == "true") {
$("#header_status_nsfw")[0].checked = true;
$('#header_status_form .media_attachments_preview_area').addClass('nsfw');
}
}
});
$(document).on('change','#header_status_media_atta', function(e) {
$('#header_status_form .media_attachments_preview_area').empty();
$('#header_status_form .status_textarea .media_attachments_preview_area').removeClass('invisible');
for ( let i = 0, f; f = e.target.files[i]; i++ ) {
let reader= new FileReader();
reader.readAsDataURL(f);
reader.onloadend = (function() {
return function (e) {
const html = (`<div class="media_attachments_preview">
<img src="${e.target.result}"/>
</div>`);
$(html).appendTo('#header_status_form .media_attachments_preview_area');
}
})(f);
}
});
$(document).on('click','#header_status_form .status_NSFW', function(e) {
$('#header_status_form .media_attachments_preview_area').toggleClass('nsfw');
});
$(document).on('click','#header_status_form .submit_status_label', function(e) {
$('#header_status_form').addClass('ready');
$('#header_status_form .status_textarea').addClass('disallow_select');
$('#header_status_form .character_count').html('<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>');
const form = document.forms.header_status_form;
if ( !$('#header_status_media_atta')[0].files.length ) {
const params = {
status : form.status_textarea.value,
sensitive: form.status_nsfw.checked,
spoiler_text : form.status_spoiler.value,
visibility : form.privacy_option.value
}
api.post("statuses", params, function (data) {
$('#header_status_form .media_attachments_preview_area').empty();
$('#header_status_form .status_spoiler').addClass('invisible');
$('#header_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
form.reset();
$('#header_status_form').removeClass('ready');
$('#header_status_form .status_textarea').removeClass('disallow_select');
$('#header_status_form .character_count').html(current_instance_charlimit);
$(document).click();
});
} else {
const dummy_form = $('<form></form>').append($('#header_status_media_atta')),
files= dummy_form[0][0].files,
filesLen = files.length -1;
let media_array = [];
$("#header_status_form .status_bottom").append($('<input id="header_status_media_atta" name="files" multiple="" class="invisible" type="file">'));
for (let i=0; i<files.length; i++) {
let formData = new FormData();
formData.append('file', files[i]);
if ( i === 3 || i === filesLen ) {
api.postMedia("media", formData, function (postMedia) {
media_array.unshift(postMedia.id);
const params = {
status : form.status_textarea.value,
sensitive: form.status_nsfw.checked,
spoiler_text : form.status_spoiler.value,
visibility : form.privacy_option.value,
media_ids: media_array
}
api.post("statuses", params, function (data) {
$('#header_status_form .media_attachments_preview_area').empty();
$('#header_status_form .status_spoiler').addClass('invisible');
$('#header_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
form.reset();
$('#header_status_form').removeClass('ready');
$('#header_status_form .status_textarea').removeClass('disallow_select');
$('#header_status_form .character_count').html(current_instance_charlimit);
$(document).click();
});
});
break;
} else if ( i < filesLen ) {
api.postMedia("media", formData, function (postMedia) {
media_array.unshift(postMedia.id);
});
}
}
}
});
})
$(function() {
$(document).on('click', function(e) {
if (!$(e.target).closest('#reply_status_form').length) {
$("#js-overlay_content_wrap .temporary_object").empty();
$('#reply_status_form .expand_privacy_menu').addClass('invisible');
$('#reply_status_form .status_bottom').addClass('invisible');
$('#reply_status_form .status_textarea textarea').removeClass('focus');
$('#reply_status_form .submit_status_label').removeClass('active_submit_button');
$('#reply_status_emoji').lsxEmojiPicker("destroy");
}
});
$(document).on('click','#reply_status_form', function(e) {
if(!$('#reply_status_form .status_textarea textarea').hasClass('focus')) {
var mentions = JSON.parse($('#reply_status_form').attr('mentions'));
mentions.reverse();
var replyto = "";
for(var i=0;i < mentions.length;i++) {
if(mentions[i].acct != current_acct) {
replyto += "@"+mentions[i].acct+" ";
}
}
$('#reply_status_form .status_textarea textarea').addClass('focus');
autosize($('#reply_status_form .status_textarea textarea'));
if(localStorage.setting_compose_autocomplete == "true") {
$('#reply_status_form .status_textarea textarea').autoCompleteToken({instance:1,startkey:"@",endkey:" ",arrayname:"accounts",resultname:"acct"});
$('#reply_status_form .status_textarea textarea').autoCompleteToken({instance:2,startkey:"#",endkey:" ",arrayname:"hashtags"});
$('#reply_status_form .status_textarea textarea').autoCompleteToken({instance:3,startkey:":",endkey:";",source:actEmojiData,resultname:"name",callback:function() {
$('#reply_status_form .status_textarea textarea').trigger({"type":"keyup","key":":"});
}});
}
$('#reply_status_form .status_bottom').removeClass('invisible');
$('#reply_status_form .submit_status_label').addClass('active_submit_button');
$('#reply_status_form textarea').val(replyto);
const textCount = $('#reply_status_form textarea').val().length + $('#reply_status_form .status_spoiler').val().length;
let textLen = (current_instance_charlimit - textCount);
$('#reply_status_form .character_count').html(textLen);
$('label[for=reply_status_emoji]').click(function(e) {$('#reply_status_emoji').trigger('click',e)});
$('#reply_status_emoji').lsxEmojiPicker({
closeOnSelect:true,
twemoji:!checkEmojiSupport(),
onSelect:function(emoji) {
$('#reply_status_form .status_textarea textarea').insertText(":"+emoji.name+":");
$('#reply_status_form .status_textarea textarea').trigger({"type":"keyup","key":":"});
var textLen = $('#reply_status_form .status_textarea textarea').val().length * 2;
}
});
if(localStorage.setting_post_sensitive == "true") {
$("#reply_status_nsfw")[0].checked = true;
$('#reply_status_form .media_attachments_preview_area').addClass('nsfw');
}
}
});
$(document).on('change keyup','#reply_status_form textarea, #reply_status_form .status_spoiler', function(e) {
if(e.keyCode !== 224 & e.keyCode !== 17) {
const textCount = $('#reply_status_form textarea').val().length + $('#reply_status_form .status_spoiler').val().length;
let textLen = ( current_instance_charlimit - textCount );
if ( textLen <= -1 ) {
$('#reply_status_form .character_count').addClass('red');
$('#reply_status_form').addClass('ready');
} else if ( textLen === current_instance_charlimit ) {
$('#reply_status_form').addClass('ready');
} else {
$('#reply_status_form .character_count').removeClass('red');
$('#reply_status_form').removeClass('ready');
}
if(e.key == ":") {
replace_emoji_textarea(this);
}
$('#reply_status_form .character_count').text(textLen);
}
});
$(document).on('click','#reply_status_form .status_CW', function(e) {
$('#reply_status_form .status_spoiler').toggleClass('invisible');
});
$(document).on('click','#reply_status_form .expand_privacy_menu_button', function(e) {
$('#reply_status_form .expand_privacy_menu').removeClass('invisible');
});
$(document).on('click','#reply_status_form .status_privacy.select_privacy', function(e) {
e.stopPropagation();
$('#reply_status_form .expand_privacy_menu_button > i').attr('class', $(this).attr('privacyicon'));
$('#reply_status_form .expand_privacy_menu').addClass('invisible');
});
$(document).on('change','#reply_status_media_atta', function(e) {
$('#reply_status_form .media_attachments_preview_area').empty();
$('#reply_status_form .status_textarea .media_attachments_preview_area').removeClass('invisible');
for ( let i = 0, f; f = e.target.files[i]; i++ ) {
let reader= new FileReader();
reader.readAsDataURL(f);
reader.onloadend = (function() {
return function (e) {
const html = (`<div class="media_attachments_preview">
<img src="${e.target.result}"/>
</div>`);
$(html).appendTo('#reply_status_form .media_attachments_preview_area');
}
})(f);
}
});
$(document).on('click','#reply_status_form .status_NSFW', function(e) {
$('#reply_status_form .media_attachments_preview_area').toggleClass('nsfw');
});
$(document).on('click','#reply_status_form .submit_status_label', function(e) {
$('#reply_status_form').addClass('ready');
$('#reply_status_form .status_textarea').addClass('disallow_select');
$('#reply_status_form .character_count').html('<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>');
let form = document.forms.reply_status_form;
if ( !$('#reply_status_media_atta')[0].files.length ) {
const params = {
status : form.status_textarea.value,
sensitive: form.status_nsfw.checked,
spoiler_text : form.status_spoiler.value,
visibility : form.privacy_option.value,
in_reply_to_id : $('#reply_status_form').attr('sid')
}
api.post("statuses", params, function (data) {
$('#reply_status_form .media_attachments_preview_area').empty();
$('#reply_status_form .status_spoiler').addClass('invisible');
$('#reply_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
form.reset();
$('#reply_status_form').removeClass('ready');
$('#reply_status_form .status_textarea').removeClass('disallow_select');
$('#reply_status_form .character_count').html(current_instance_charlimit);
$('.reply_status .submit_status_label').removeClass('active_submit_button');
context_template(data, 'descendants_status').appendTo("#js-overlay_content .temporary_object .toot_detail_wrap");
replace_emoji();
putMessage(__('Your Toot was posted!'));
});
} else {
const dummy_form = $('<form></form>').append($('#reply_status_media_atta')),
files= dummy_form[0][0].files,
filesLen = files.length -1;
let media_array = [];
$('#reply_status_form .status_bottom').append($('<input id="reply_status_media_atta" name="files" multiple="" class="invisible" type="file">'));
for (let i=0; i<files.length; i++) {
let formData = new FormData();
formData.append('file', files[i]);
if ( i === 3 || i === filesLen ) {
api.postMedia("media", formData, function (postMedia) {
media_array.unshift(postMedia.id);
const params = {
status : form.status_textarea.value,
sensitive: form.status_nsfw.checked,
spoiler_text : form.status_spoiler.value,
visibility : form.privacy_option.value,
media_ids: media_array,
in_reply_to_id : $('#reply_status_form').attr('sid')
}
api.post("statuses", params, function (data) {
$('#reply_status_form .media_attachments_preview_area').empty();
$('#reply_status_form .status_spoiler').addClass('invisible');
$('#reply_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
form.reset();
$('#reply_status_form').removeClass('ready');
$('#reply_status_form .status_textarea').removeClass('disallow_select');
$('#reply_status_form .character_count').html(current_instance_charlimit);
$('.reply_status .submit_status_label').removeClass('active_submit_button');
context_template(data, 'descendants_status').appendTo("#js-overlay_content .temporary_object .toot_detail_wrap");
replace_emoji();
putMessage(__('Your Toot was posted!'));
});
});
break;
} else if ( i < filesLen ) {
api.postMedia("media", formData, function (postMedia) {
media_array.unshift(postMedia.id);
});
}
}
}
});
})
$(function() {
$(document).on('click', function(e) {
if(!$(e.target).closest('.reply_button').length && !$(e.target).closest('.single_reply_status').length) {
$('#single_reply_status_emoji').lsxEmojiPicker("destroy");
}
});
$(document).on('click','single_reply_status_header, #single_reply_status_form', function(e) {
e.stopPropagation();
});
$('label[for=single_reply_status_emoji]').click(function(e) {$('#single_reply_status_emoji').trigger('click',e)});
$(document).on('click', '.reply_button', function(e) {
e.stopPropagation();
const sid= $(this).attr('tid'),
mentions = JSON.parse($(this).attr('mentions'));
mentions.reverse();
var replyto = "";
for(var i=0;i < mentions.length;i++) {
if(mentions[i].acct != current_acct) {
replyto += "@"+mentions[i].acct+" ";
}
}
display_name = $(this).attr('display_name');
privacy_mode = $(this).attr("privacy");
switch(privacy_mode) {
case "public":picon="globe";break;
case "unlisted":picon="unlock-alt";break;
case "private":picon="lock";break;
case "direct":picon="envelope";break;
}
$('.single_reply_status').removeClass('invisible');
$("#js-overlay_content_wrap .temporary_object").empty();
$(".single_reply_status .status_preview").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.single_reply_status .submit_status_label').addClass('active_submit_button');
$('#single_reply_status_form .status_textarea textarea').addClass('focus');
$('#single_reply_status_form .status_textarea textarea').focus();
autosize($('#single_reply_status_form .status_textarea textarea'));
if(localStorage.setting_compose_autocomplete == "true") {
$('#single_reply_status_form .status_textarea textarea').autoCompleteToken({instance:1,startkey:"@",endkey:" ",arrayname:"accounts",resultname:"acct"});
$('#single_reply_status_form .status_textarea textarea').autoCompleteToken({instance:2,startkey:"#",endkey:" ",arrayname:"hashtags"});
$('#single_reply_status_form .status_textarea textarea').autoCompleteToken({instance:3,startkey:":",endkey:";",source:actEmojiData,resultname:"name",callback:function() {
$('#single_reply_status_form .status_textarea textarea').trigger({"type":"keyup","key":":"});
}});
}
$('#single_reply_status_form input[name="privacy_option"]').val([privacy_mode]);
$('#single_reply_status_form .expand_privacy_menu_button > i').attr('class', "fa fa-" + picon);
$('#single_reply_status_form').attr('tid',sid);
$('.single_reply_status .single_reply_status_header span').addClass("emoji_poss").html(__("Reply to")+" "+display_name);
$('#single_reply_status_form textarea').val(replyto);
const textCount = $('#single_reply_status_form textarea').val().length + $('#single_reply_status_form .status_spoiler').val().length;
let textLen = (current_instance_charlimit - textCount);
$('#single_reply_status_form .character_count').html(textLen);
$('#single_reply_status_emoji').lsxEmojiPicker({
closeOnSelect:true,
twemoji:!checkEmojiSupport(),
onSelect:function(emoji) {
$('#single_reply_status_form .status_textarea textarea').insertText(":"+emoji.name+":");
$('#single_reply_status_form .status_textarea textarea').trigger({"type":"keyup","key":":"});
var textLen = $('#single_reply_status_form .status_textarea textarea').val().length * 2;
}
});
if(localStorage.setting_post_sensitive == "true") {
$("#single_reply_status_nsfw")[0].checked = true;
$('#single_reply_status_form .media_attachments_preview_area').addClass('nsfw');
}
replace_emoji();
api.get('statuses/'+sid+'/', function(status) {
timeline_template(status).appendTo(".single_reply_status .status_preview");
replace_emoji();
});
return false;
});
$(document).on('change keyup','#single_reply_status_form textarea, #single_reply_status_form .status_spoiler', function(e) {
if(e.keyCode !== 224 & e.keyCode !== 17) {
const textCount = $('#single_reply_status_form textarea').val().length + $('#single_reply_status_form .status_spoiler').val().length;
let textLen = ( current_instance_charlimit - textCount );
if ( textLen <= -1 ) {
$('#single_reply_status_form .character_count').addClass('red');
$('#single_reply_status_form').addClass('ready');
} else if ( textLen === current_instance_charlimit ) {
$('#single_reply_status_form').addClass('ready');
} else {
$('#single_reply_status_form .character_count').removeClass('red');
$('#single_reply_status_form').removeClass('ready');
}
if(e.key == ":") {
replace_emoji_textarea(this);
}
$('#single_reply_status_form .character_count').text(textLen);
}
});
$(document).on('click','#single_reply_status_form .status_CW', function(e) {
$('#single_reply_status_form .status_spoiler').toggleClass('invisible');
});
$(document).on('click','#single_reply_status_form .expand_privacy_menu_button', function(e) {
$('#single_reply_status_form .expand_privacy_menu').removeClass('invisible');
});
$(document).on('click','#single_reply_status_form .status_privacy.select_privacy', function(e) {
e.stopPropagation();
$('#single_reply_status_form .expand_privacy_menu_button > i').attr('class', $(this).attr('privacyicon'));
$('#single_reply_status_form .expand_privacy_menu').addClass('invisible');
});
$(document).on('change','#single_reply_status_media_atta', function(e) {
$('#single_reply_status_form .media_attachments_preview_area').empty();
$('#single_reply_status_form .status_textarea .media_attachments_preview_area').removeClass('invisible');
for ( let i = 0, f; f = e.target.files[i]; i++ ) {
let reader= new FileReader();
reader.readAsDataURL(f);
reader.onloadend = (function() {
return function (e) {
const html = (`<div class="media_attachments_preview">
<img src="${e.target.result}"/>
</div>`);
$(html).appendTo('#single_reply_status_form .media_attachments_preview_area');
}
})(f);
}
});
$(document).on('click','#single_reply_status_form .status_NSFW', function(e) {
$('#single_reply_status_form .media_attachments_preview_area').toggleClass('nsfw');
});
$(document).on('click','#single_reply_status_form .submit_status_label', function(e) {
$('#single_reply_status_form').addClass('ready');
$('#single_reply_status_form .status_textarea').addClass('disallow_select');
$('#single_reply_status_form .character_count').html('<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>');
let form = document.forms.single_reply_status_form;
if ( !$('#single_reply_status_media_atta')[0].files.length ) {
const params = {
status : form.status_textarea.value,
sensitive: form.status_nsfw.checked,
spoiler_text : form.status_spoiler.value,
visibility : form.privacy_option.value,
in_reply_to_id : $('#single_reply_status_form').attr('tid')
}
api.post("statuses", params, function (data) {
$('#single_reply_status_form .media_attachments_preview_area').empty();
$('#single_reply_status_form .status_spoiler').addClass('invisible');
$('#single_reply_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
form.reset();
$('#single_reply_status_form').removeClass('ready');
$('#single_reply_status_form .status_textarea').removeClass('disallow_select');
$('#single_reply_status_form .character_count').html(current_instance_charlimit);
$('.single_reply_status .submit_status_label').removeClass('active_submit_button');
$('.single_reply_status').addClass('invisible');
autosize.destroy($('#single_reply_status_form .status_textarea textarea'));
$('#single_reply_status_emoji').lsxEmojiPicker("destroy");
$('#js-overlay_content_wrap').removeClass('view');
$('#js-overlay_content_wrap').removeClass('black_05');
$("#js-overlay_content_wrap .single_reply_status .status_preview").empty();
putMessage(__('Your Reply was posted!'));
});
} else {
const dummy_form= $('<form></form>').append($('#single_reply_status_media_atta')),
files = dummy_form[0][0].files,
filesLen= files.length -1;
let media_array = [];
$("#single_reply_status_form .status_bottom").append($('<input id="single_reply_status_media_atta" name="files" multiple="" class="invisible" type="file">'));
for (let i=0; i<files.length; i++) {
let formData = new FormData();
formData.append('file', files[i]);
if ( i === 3 || i === filesLen ) {
api.postMedia("media", formData, function (postMedia) {
media_array.unshift(postMedia.id);
const params = {
status : form.status_textarea.value,
sensitive: form.status_nsfw.checked,
spoiler_text : form.status_spoiler.value,
visibility : form.privacy_option.value,
media_ids: media_array,
in_reply_to_id : $('#single_reply_status_form').attr('tid')
}
api.post("statuses", params, function (data) {
$('#single_reply_status_form .media_attachments_preview_area').empty();
$('#single_reply_status_form .status_spoiler').addClass('invisible');
$('#single_reply_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
form.reset();
$('#single_reply_status_form').removeClass('ready');
$('#single_reply_status_form .status_textarea').removeClass('disallow_select');
$('#single_reply_status_form .character_count').html(current_instance_charlimit);
$('.single_reply_status .submit_status_label').removeClass('active_submit_button');
$('.single_reply_status').addClass('invisible');
autosize.destroy($('#single_reply_status_form .status_textarea textarea'));
$('#single_reply_status_emoji').lsxEmojiPicker("destroy");
$('#js-overlay_content_wrap').removeClass('view');
$('#js-overlay_content_wrap').removeClass('black_05');
$("#js-overlay_content_wrap .single_reply_status .status_preview").empty();
putMessage(__('Your Reply was posted!'));
});
});
break;
} else if ( i < filesLen ) {
api.postMedia("media", formData, function (postMedia) {
media_array.unshift(postMedia.id);
});
}
}
}
});
});
$(function() {
$(document).on('click','report_status_header, #report_status_form', function(e) {
e.stopPropagation();
});
$(document).on('click', '.report_button', function(e) {
e.stopPropagation();
const sid= $(this).attr('sid'),
mid = $(this).attr('mid'),
display_name = $(this).attr('display_name');
$('.report_status').removeClass('invisible');
$("#js-overlay_content_wrap .temporary_object").empty();
$(".report_status .status_preview").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.report_status .submit_status_label').addClass('active_submit_button');
$('#report_status_form .status_textarea textarea').addClass('focus');
$('#report_status_form .status_textarea textarea').focus();
autosize($('#single_reply_status_form .status_textarea textarea'));
$('#report_status_form').attr('tid',sid);
$('#report_status_form').attr('mid',mid);
$('.report_status .report_status_header span').addClass("emoji_poss").html(__("Report a Toot of")+" "+display_name);
$('#report_status_form textarea').empty();
$('#report_status_form .character_count').html("1000");
replace_emoji();
api.get('statuses/'+sid+'/', function(status) {
timeline_template(status).appendTo(".report_status .status_preview");
replace_emoji();
});
return false;
});
$(document).on('change keyup','#report_status_form textarea, #report_status_form .status_spoiler', function(e) {
if(e.keyCode !== 224 & e.keyCode !== 17) {
const textCount = $('#report_status_form textarea').val().length + $('#report_status_form .status_spoiler').val().length;
let textLen = (1000 - textCount);
if(textLen <= -1) {
$('#report_status_form .character_count').addClass('red');
$('#report_status_form').addClass('ready');
}
else if(textLen === 1000) {
$('#report_status_form').addClass('ready');
}
else {
$('#report_status_form .character_count').removeClass('red');
$('#report_status_form').removeClass('ready');
}
$('#report_status_form .character_count').text(textLen);
}
});
$(document).on('click','#report_status_form .submit_status_label',function(e) {
$('#report_status_form').addClass('ready');
$('#report_status_form .status_textarea').addClass('disallow_select');
$('#report_status_form .character_count').html('<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>');
let form = document.forms.report_status_form;
const params = {
account_id:$('#report_status_form').attr('mid'),
status_ids:$('#report_status_form').attr('tid'),
comment:form.status_textarea.value,
}
api.post("reports",params,function(data) {
form.reset();
$('#report_status_form').removeClass('ready');
$('#report_status_form .status_textarea').removeClass('disallow_select');
$('#report_status_form .character_count').html("1000");
$('.report_status .submit_status_label').removeClass('active_submit_button');
$('.report_status').addClass('invisible');
autosize.destroy($('#report_status_form .status_textarea textarea'));
$('#js-overlay_content_wrap').removeClass('view');
$('#js-overlay_content_wrap').removeClass('black_05');
$("#js-overlay_content_wrap .report_status .status_preview").empty();
putMessage(__('Toot reported successfully!'));
});
});
});
$(function() {
$(document).on('click','.copylink_button', function(e) {
if(ClipboardJS.isSupported()) {
var cbelem = $("<button>").attr("data-clipboard-text",$(this).attr("url"));
var clipboard = new ClipboardJS(cbelem[0]);
clipboard.on('success',function(e) {
putMessage(__("Link successfully copied!"));
e.clearSelection();
});
clipboard.on('error',function(e) {
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_copy_link').removeClass('invisible');
$('.overlay_copy_link input').val($(this).attr('url'));
return false;
});
cbelem.click();
}
else {
e.stopPropagation();
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_copy_link').removeClass('invisible');
$('.overlay_copy_link input').val($(this).attr('url'));
return false;
}
});
})
$(function() {
$(document).on('click','.temporary_object > *, .parmanent_object > *', function(e) {
e.stopPropagation();
});
$(document).on('click','#js-overlay_content_wrap',function(e) {
if((!$('#js-overlay_content_wrap .overlay_status').hasClass("invisible") && $('#js-overlay_content_wrap .overlay_status textarea').val().length > 0)
|| (!$('#js-overlay_content_wrap .single_reply_status').hasClass("invisible") && $('#js-overlay_content_wrap .single_reply_status textarea').val().length > 0)
|| (!$('#js-overlay_content_wrap .report_status').hasClass("invisible") && $('#js-overlay_content_wrap .report_status textarea').val().length > 0)
|| ($('#js-overlay_content_wrap #reply_status_form').length == 1 && $('#js-overlay_content_wrap #reply_status_form textarea').val().length > 0)) {
$(document.body).append($(`<div id="overlay_close_warning" style="position:fixed;z-index:1001;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.8)">
<div class="overlay_simple overlay_close">
<header class="overlay_simple_header">
<span class="emoji_poss">${__('Confirmation')}</span>
</header>
<div class="overlay_simple_body">
<div class="overlay_close_text" style="margin-bottom:10px">${__("If you close the overlay, your text will get deleted! Are you sure you want to close it?")}</div>
<div class="overlay_simple_controls">
<button class="overlay_confirm_yes toot_button" style="float:right"><div class="toot_button_label"><i class="fa fa-fw fa-check"></i><span>${__('Yes')}</span></div></button>
<a href="javascript:$('#overlay_close_warning').remove();void(0)" class="overlay_confirm_cancel halcyon_link" style="float:right;margin-top:5px;margin-right:10px"><i class="fa fa-times"></i> ${__('Cancel')}</a>
</div>
</div>
</div>
</div>`));
$(".overlay_close .overlay_confirm_yes").click(function() {
$('#overlay_close_warning').remove();
closeOverlay();
});
}
else closeOverlay();
});
function closeOverlay() {
$("#js-overlay_content_wrap").removeClass('view');
$("#js-overlay_content_wrap .temporary_object").empty();
$("#js-overlay_content_wrap .single_reply_status .status_preview").empty();
$('#js-overlay_content_wrap .overlay_status').addClass('invisible');
$('#js-overlay_content_wrap .single_reply_status').addClass('invisible');
$('#js-overlay_content_wrap .report_status').addClass('invisible');
$('#js-overlay_content_wrap .overlay_copy_link').addClass('invisible');
$('#js-overlay_content_wrap .overlay_confirm').addClass('invisible');
$('#js-overlay_content_wrap .overlay_prompt').addClass('invisible');
$('#js-overlay_content_wrap .overlay_addlist').addClass('invisible');
$('#js-overlay_content_wrap .overlay_filter').addClass('invisible');
$('#js-overlay_content .temporary_object, #js-overlay_content .parmanent_object').removeClass('visible');
$('#js-overlay_content_wrap .overlay_status.submit_status_label').removeClass('active_submit_button');
$('#js-overlay_content_wrap .single_reply_status .submit_status_label').removeClass('active_submit_button');
$('#js-overlay_content_wrap #reply_status_form .submit_status_label').removeClass('active_submit_button');
$('#js-overlay_content_wrap #header_status_form.submit_status_label').removeClass('active_submit_button');
$('#js-overlay_content_wrap').removeClass('black_05');
$('#js-overlay_content_wrap').removeClass('black_08');
$('#js-overlay_content_wrap .overlay_confirm_yes').off('click');
$('#js-overlay_content_wrap .overlay_prompt_ok').off('click');
$('#js-overlay_content_wrap .overlay_prompt_text').val("");
$('#js-overlay_content_wrap .overlay_addlist_body').empty();
$('#js-overlay_content_wrap #addfilter').trigger("reset");
if(window.current_file) {
if(current_file === "/user") {
history.pushState(null, null, "/"+location.pathname.split("/")[1]+location.search);
} else {
history.pushState(null, null, current_file);
}
}
}
});
$(function() {
$("#enable_follow").click(function() {
localStorage.setItem("setting_who_to_follow","true");
setWhoToFollow(true);
});
$("#search_form").focus(function() {
if($("#search_form").val() == "") searchlocalfill();
else searchremotefill($("#search_form").val());
$(".header_search_suggestions").removeClass("invisible");
}).keyup(function() {
if($("#search_form").val() == "") searchlocalfill();
else searchremotefill($("#search_form").val());
});
$(document).click(function(e) {
if(!$(e.target).closest('.header_search_suggestions').length && !$(e.target).closest('#search_form').length) $(".header_search_suggestions").addClass("invisible");
});
$(".search_form").submit(function(e) {
e.preventDefault();
searchredirect($("#search_form").val());
});
if($("#js-overlay_content_wrap").hasClass("view")) $(document.body).css("overflow-y","hidden");
$("#js-overlay_content_wrap").attrchange(function(attr) {
if(attr == "class" && $("#js-overlay_content_wrap").hasClass("view")) $(document.body).css("overflow-y","hidden");
else $(document.body).css("overflow-y","auto");
});
$(document).on("click",".media_detail .media_backward",function() {
$(".media_detail").attr("cid",$(".media_detail").attr("cid")-1);
if($(".media_detail").attr("cid") == 0) $(".media_detail .media_backward").fadeOut();
$(".media_detail .media_forward").fadeIn();
$(".media_detail .media_box img").attr("src",JSON.parse($(".media_detail").attr("pictures"))[$(".media_detail").attr("cid")]);
});
$(document).on("click",".media_detail .media_forward",function() {
$(".media_detail").attr("cid",parseInt($(".media_detail").attr("cid"))+1);
if($(".media_detail").attr("cid") == JSON.parse($(".media_detail").attr("pictures")).length-1) $(".media_detail .media_forward").fadeOut();
$(".media_detail .media_backward").fadeIn();
$(".media_detail .media_box img").attr("src",JSON.parse($(".media_detail").attr("pictures"))[$(".media_detail").attr("cid")]);
});
shortcut.add("n",function() {
$("#creat_status").click();
},{
"disable_in_input":true,
});
shortcut.add("/",function() {
$("#search_form").focus();
},{
"disable_in_input":true,
'keycode':191
});
shortcut.add("Meta+Enter",function() {
$(".active_submit_button").click();
});
shortcut.add("Ctrl+Enter",function() {
$(".active_submit_button").click();
});
shortcut.add(".",function() {
$("#js-stream_update").click();
},{
 "disable_in_input":true,
});
shortcut.add("Shift+h",function() {
location.href="/home";
},{
"disable_in_input":true,
});
shortcut.add("Shift+l",function() {
location.href="/local";
},{
"disable_in_input":true,
});
shortcut.add("Shift+f",function() {
location.href="/federated";
},{
"disable_in_input":true,
});
shortcut.add("Shift+n",function() {
location.href="/notifications";
},{
"disable_in_input":true,
});
shortcut.add("Shift+p",function() {
location.href=current_url;
},{
"disable_in_input":true,
});
shortcut.add("Shift+v",function() {
location.href=current_favourites_link;
},{
"disable_in_input":true,
});
shortcut.add("esc",function() {
$("#js-overlay_content_wrap").click();
});
});
