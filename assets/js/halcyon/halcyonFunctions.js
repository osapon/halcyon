function getLinkFromXHRHeader(xhrheaderstring) {
const re = xhrheaderstring.match(/link: <.+api\/v1\/(.+?)>; rel="(.+?)", <.+api\/v1\/(.+?)>; rel="(.+?)"/i);
let di = new Object();
if(re){
di[re[2]] = re[1];
di[re[4]] = re[3];
}
return di;
}
function getRelativeURL(url, id, options) {
const array = url.split('/');
if ( array.length >= 4 ) {
if ( !options ) {
var options = ""
};
if (id) {
if (array[array.length-1].substr(0,1) === '@') {
const link= '/'+array[array.length-1]+'@'+array[2]+options+'?mid='+id+'&';
return link;
}
else {
const link= '/@'+array[array.length-1]+'@'+array[2]+options+'?mid='+id+'&';
return link;
}
}
else {
if (array[array.length-1].substr(0,1) === '@') {
const link= '/'+array[array.length-1]+'@'+array[2]+options;
return link;
} else {
const link= '/@'+array[array.length-1]+'@'+array[2]+options;
return link;
}
}
}
}
function replaceInternalLink(){
$(".h-card > a").each(function(i) {
$(this).attr('href',getRelativeURL($(this).attr('href')));
});
$(".toot_article a,.profile_bio a,.follows_profile_bio a").each(function(i) {
const pltags = $(this).attr('href').match(/https:\/\/.+..+\/tag\/([a-zA-Z\d_%]+)\/?$/);
if(pltags) {
$(this).attr('target','_self').attr('href','/search?q='+pltags[1]);
}
const mstags = $(this).attr('href').match(/https:\/\/.+..+\/tags\/([a-zA-Z\d_%]+)\/?$/);
if(mstags) {
$(this).attr('target','_self').attr('href','/search?q='+mstags[1]);
}
const plusers = $(this).attr('href').match(/https:\/\/.+..+\/users\/([a-zA-Z\d_]+)(\/statuses\/\d+)\/?$/);
if(plusers) {
$(this).attr('target','_self').attr('href','/@'+plusers[1]+'@'+$(this).attr('href').split("/")[2]);
}
const msusers = $(this).attr('href').match(/https:\/\/.+..+\/@([a-zA-Z\d_]+)\/?$/);
if(msusers) {
$(this).attr('target','_self').attr('href','/@'+msusers[1]+'@'+$(this).attr('href').split("/")[2]);
}
const msstatus = $(this).attr('href').match(/https:\/\/.+..+\/@([a-zA-Z\d_]+)(\/\d+)\/?$/);
if(msstatus) {
$(this).attr('target','_self').attr('href',"javascript:openStatus('"+msstatus[0]+"');void(0)");
}
const msstatus2 = $(this).attr('href').match(/https:\/\/.+..+\/users\/([a-zA-Z\d_]+)\/?$/);
if(msstatus2) {
$(this).attr('target','_self').attr('href',"javascript:openStatus('"+msstatus2[0]+"');void(0)");
}
const gsstatus = $(this).attr('href').match(/https:\/\/.+..+\/notice\/(\d+)\/?$/);
if(gsstatus) {
$(this).attr('target','_self').attr('href',"javascript:openStatus('"+gsstatus[0]+"');void(0)");
}
const plstatus = $(this).attr('href').match(/https:\/\/.+..+\/objects\/([\da-z]{8}-[\da-z]{4}-[\da-z]{4}-[\da-z]{4}-[\da-z]{12})\/?$/);
if(plstatus) {
$(this).attr('target','_self').attr('href',"javascript:openStatus('"+plstatus[0]+"');void(0)");
}
if(localStorage.setting_link_previews == "true") {
if(!window.cards) {
cards = new Array();
}
if(!$(this).attr("class") && $(this).parent().parent().parent().parent().parent().attr("sid") != undefined) {
if(!cards[$(this).parent().parent().parent().parent().parent().attr("sid")]) {
var this_id = $(this).parent().parent().parent().parent().parent().attr("sid");
api.get("statuses/"+$(this).parent().parent().parent().parent().parent().attr("sid")+"/card",function(data) {
cards[this_id] = data;
if($(".toot_entry[sid="+this_id+"]").children().children("section").children("article").children(".link_preview").length == 0 && data.url) {
$(".toot_entry[sid="+this_id+"]").children().children("section").children("article").append(
$("<div>").addClass("media_views").addClass("link_preview").attr("sid",this_id).attr("media_length",1).css("height","unset").data("url",data.url).append(
$("<img>").attr("src",data.image).width(data.width).css("max-width","200px").css("float","left").css("margin-right","5px")).append(
$("<strong>").text(data.title)).append($("<br>")).append(
$("<span>").text(data.description)).append($("<br>")).append(
$("<span>").css("color","#777777").text(data.url)).click(function(e) {
e.stopPropagation();
window.open($(this).data("url"),"_blank");
})
);
}
if($(".main_status[sid="+this_id+"]").children().children("section").children("article").children(".link_preview").length == 0 && data.url) {
$(".main_status[sid="+this_id+"]").children().children("section").children("article").append(
$("<div>").addClass("media_views").addClass("link_preview").attr("sid",this_id).attr("media_length",1).css("height","unset").data("url",data.url).append(
$("<img>").attr("src",data.image).width(data.width).css("max-width","200px").css("float","left").css("margin-right","5px")).append(
$("<strong>").text(data.title)).append($("<br>")).append(
$("<span>").text(data.description)).append($("<br>")).append(
$("<span>").css("color","#777777").text(data.url)).click(function(e) {
e.stopPropagation();
window.open($(this).data("url"),"_blank");
})
);
}
});
}
else {
var this_id = $(this).parent().parent().parent().parent().parent().attr("sid");
data = cards[this_id];
if($(".toot_entry[sid="+this_id+"]").children().children("section").children("article").children(".link_preview").length == 0 && data.url) {
$(".toot_entry[sid="+this_id+"]").children().children("section").children("article").append(
$("<div>").addClass("media_views").addClass("link_preview").attr("sid",this_id).attr("media_length",1).css("height","unset").data("url",data.url).append(
$("<img>").attr("src",data.image).width(data.width).css("max-width","200px").css("float","left").css("margin-right","5px")).append(
$("<strong>").text(data.title)).append($("<br>")).append(
$("<span>").text(data.description)).append($("<br>")).append(
$("<span>").css("color","#777777").text(data.url)).click(function(e) {
e.stopPropagation();
window.open($(this).data("url"),"_blank");
})
);
}
if($(".main_status[sid="+this_id+"]").children().children("section").children("article").children(".link_preview").length == 0 && data.url) {
$(".main_status[sid="+this_id+"]").children().children("section").children("article").append(
$("<div>").addClass("media_views").addClass("link_preview").attr("sid",this_id).attr("media_length",1).css("height","unset").data("url",data.url).append(
$("<img>").attr("src",data.image).width(data.width).css("max-width","200px").css("float","left").css("margin-right","5px")).append(
$("<strong>").text(data.title)).append($("<br>")).append(
$("<span>").text(data.description)).append($("<br>")).append(
$("<span>").css("color","#777777").text(data.url)).click(function(e) {
e.stopPropagation();
window.open($(this).data("url"),"_blank");
})
);
}
}
}
}
});
}
function getConversionedDate(key, value) {
if (value === null ||
value.constructor !== String ||
value.search(/^\d{4}-\d{2}-\d{2}/g) === -1)
return value;
return new Date(value);
}
function getRelativeDatetime(current_time,posted_time,withdot = true,future = false) {
const calendar = [__("Jan"),__("Feb"),__("Mar"),__("Apr"),__("May"),__("Jun"),__("Jul"),__("Aug"),__("Sep"),__("Oct"),__("Nov"),__("Dec")];
var posted_time_original = posted_time,
posted_time = getConversionedDate(null, posted_time_original).getTime();
if(future) var elapsedTime = Math.ceil((posted_time-current_time)/1000);
else var elapsedTime = Math.ceil((current_time-posted_time)/1000);
var dot = "";
if(withdot) dot = "&middot; ";
if(elapsedTime < 60) {
const datetime = dot + elapsedTime + "s";
return datetime;
}
else if (elapsedTime < 120) {
const datetime = dot+"1m";
return datetime;
}
else if (elapsedTime < (60*60)) {
const datetime = dot + (Math.floor(elapsedTime / 60) < 10 ? " " : "") + Math.floor(elapsedTime / 60) + "m";
return datetime;
}
else if (elapsedTime < (120*60)) {
const datetime = dot+"1h";
return datetime;
}
else if (elapsedTime < (24*60*60)) {
const datetime = dot + (Math.floor(elapsedTime / 3600) < 10 ? " " : "") + Math.floor(elapsedTime / 3600) + "h";
return datetime;
}
else {
const datetime = dot + calendar[posted_time_original.getMonth()] + " " + posted_time_original.getDate();
return datetime;
}
}
function htmlEscape(strings, ...values) {
var handleString = function(str) {
return str.replace(/&/g, '&amp;')
.replace(/>/g, '&gt;')
.replace(/</g, '&lt;')
.replace(/"/g, '&quot;')
.replace(/'/g, '&#039;')
.replace(/`/g, '&#096;');
};
var res = '';
for(var i=0, l=strings.length; i<l; i+=1) {
res += handleString(strings[i]);
if(i < values.length) {
res += handleString(values[i]);
}
}
return res;
}
function resetApp() {
current_id = Number(localStorage.getItem("current_id"));
current_instance = localStorage.getItem("current_instance");
authtoken= localStorage.getItem("current_authtoken");
api = new MastodonAPI({
instance: 'https://'+current_instance,
api_user_token: authtoken
});
api.get("accounts/verify_credentials",function(AccountObj) {
localStorage.setItem("current_display_name",AccountObj["display_name"]);
localStorage.setItem("current_acct",AccountObj["acct"]);
localStorage.setItem("current_url",getRelativeURL(AccountObj["url"],AccountObj["id"]));
localStorage.setItem("current_header",AccountObj["header"]);
localStorage.setItem("current_avatar",AccountObj["avatar"]);
localStorage.setItem("current_locked",AccountObj["locked"]);
localStorage.setItem("current_statuses_count",AccountObj["statuses_count"]);
localStorage.setItem("current_following_count",AccountObj["following_count"]);
localStorage.setItem("current_followers_count",AccountObj["followers_count"]);
localStorage.setItem("current_statuses_count_link",getRelativeURL(AccountObj["url"],AccountObj["id"]));
localStorage.setItem("current_following_count_link",getRelativeURL(AccountObj["url"],AccountObj["id"],'/following'));
localStorage.setItem("current_followers_count_link",getRelativeURL(AccountObj["url"],AccountObj["id"],'/followers'));
localStorage.setItem("current_favourites_link",getRelativeURL(AccountObj["url"],AccountObj["id"],'/favourites'));
localStorage.setItem("current_follow_loaded","false");
current_display_name = localStorage.getItem("current_display_name");
current_acct = localStorage.getItem("current_acct");
current_url = localStorage.getItem("current_url");
current_header = localStorage.getItem("current_header");
current_avatar = localStorage.getItem("current_avatar");
current_locked = localStorage.getItem("current_locked");
current_statuses_count = localStorage.getItem("current_statuses_count");
current_following_count = localStorage.getItem("current_following_count");
current_followers_count = localStorage.getItem("current_followers_count");
current_statuses_count_link = localStorage.getItem("current_statuses_count_link");
current_following_count_link = localStorage.getItem("current_following_count_link");
current_followers_count_link = localStorage.getItem("current_followers_count_link");
current_favourites_link = localStorage.getItem("current_favourites_link");
setCurrentProfile();
});
api.get("accounts/"+current_id+"/following",function(data) {
var followings = new Array();
for(var i=0;i<data.length;i++) {
if(data[i].acct.indexOf("@") == -1) {
data[i].acct = data[i].acct+"@"+current_instance;
}
followings.push(data[i].acct);
}
localStorage.setItem("current_following_accts",JSON.stringify(followings));
current_following_accts = followings;
});
api.get("blocks",function(data) {
var blocks = new Array();
for(i=0;i<data.length;i++) {
if(data[i].acct.indexOf("@") == -1) {
data[i].acct = data[i].acct+"@"+current_instance;
}
blocks.push(data[i].acct);
}
localStorage.setItem("current_blocked_accts",JSON.stringify(blocks));
current_blocked_accts = blocks;
});
api.get("mutes",function(data) {
var mutes = new Array();
for(i=0;i<data.length;i++) {
if(data[i].acct.indexOf("@") == -1) {
data[i].acct = data[i].acct+"@"+current_instance;
}
mutes.push(data[i].acct);
}
localStorage.setItem("current_muted_accts",JSON.stringify(mutes));
current_muted_accts = mutes;
});
api.get("instance",function(data) {
if(data.max_toot_chars) {
localStorage.setItem("current_instance_charlimit",data.max_toot_chars);
current_instance_charlimit = data.max_toot_chars;
}
else {
localStorage.setItem("current_instance_charlimit",500);
current_instance_charlimit = 500;
}
});
api.get("custom_emojis",function(data) {
var emojis = new Array();
for(i=0;i<data.length;i++) {
var emoji = new Object();
emoji.code = data[i].shortcode;
emoji.url = data[i].url;
emojis.push(emoji);
}
localStorage.setItem("current_custom_emojis",JSON.stringify(emojis));
});
api.get("filters",function(data) {
localStorage.setItem("current_filters",JSON.stringify(data));
current_filters = data;
});
$.cookie("session","true",{path:'/'});
}
function refreshApp() {
current_id = Number(localStorage.getItem("current_id"));
current_instance = localStorage.getItem("current_instance");
authtoken= localStorage.getItem("current_authtoken");
api = new MastodonAPI({
instance: "https://"+current_instance,
api_user_token: authtoken
});
current_display_name = localStorage.getItem("current_display_name");
current_acct = localStorage.getItem("current_acct");
current_url = localStorage.getItem("current_url");
current_header = localStorage.getItem("current_header");
current_avatar = localStorage.getItem("current_avatar");
current_locked = localStorage.getItem("current_locked");
current_statuses_count = localStorage.getItem("current_statuses_count");
current_following_count = localStorage.getItem("current_following_count");
current_followers_count = localStorage.getItem("current_followers_count");
current_statuses_count_link = localStorage.getItem("current_statuses_count_link");
current_following_count_link = localStorage.getItem("current_following_count_link");
current_followers_count_link = localStorage.getItem("current_followers_count_link");
current_favourites_link = localStorage.getItem("current_favourites_link");
current_following_accts = localStorage.getItem("current_following_accts");
current_instance_charlimit = localStorage.getItem("current_instance_charlimit");
current_blocked_accts = localStorage.getItem("current_blocked_accts");
current_muted_accts = localStorage.getItem("current_muted_accts");
current_filters = JSON.parse(localStorage.getItem("current_filters"));
$(function() {setCurrentProfile()});
}
function setCurrentProfile() {
var is_account_locked = "";
if(current_locked == "true") {
is_account_locked = " <i class='fa fa-lock'></i>";
}
$(".js_current_profile_displayname").text(current_display_name);
$(".js_current_profile_username").html(current_acct+is_account_locked);
$(".js_current_profile_link").attr("href", current_url);
$(".js_current_header_image").attr("src", current_header);
$(".js_current_profile_image").attr("src", current_avatar);
$(".js_current_toots_count").text(current_statuses_count);
$(".js_current_following_count").text(current_following_count);
$(".js_current_followers_count").text(current_followers_count);
$(".current_toots_count_link").attr("href", current_statuses_count_link);
$(".current_following_count_link").attr("href", current_following_count_link);
$(".current_followers_count_link").attr("href", current_followers_count_link);
if($(window).width() < 1200) {
responsive_design = true;
$(".left_column").append($("<div>").attr("class","responsive_left").append($(".right_column").children()));
$(".right_column").remove();
}
else {
responsive_design = false;
}
if (Notification.permission === 'default') {
Notification.requestPermission(function(p) {
if (p === 'denied') {
localStorage.setItem("setting_desktop_notifications","false");
}
});
}
else if(Notification.permission == "denied") {
localStorage.setItem("setting_desktop_notifications","false");
}
if(localStorage.setting_who_to_follow == "true") {
setWhoToFollow();
}
replace_emoji();
}
function putMessage(Message) {
$('#overlay_message').addClass('view');
$('#overlay_message section span').text(Message);
setTimeout(function(){
$("#overlay_message").removeClass("view");
},3000);
};
function pushNotification(title,message) {
if (window.Notification && localStorage.setting_desktop_notifications == "true") {
if (Notification.permission === 'granted') {
notify = new Notification(title, {
body: message,
icon: '/assets/images/halcyon_logo.png'  
});
}
}
}
function getRandom() {
var s4 = function() {
return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function randomNumber(min,max) {
return Math.floor(Math.random() * (max - min)) + min;
}
function setWhoToFollow(sanimate) {
if(sanimate == true) {
$(".follow_opt_in").slideUp(function() {$(".follow_loading").slideDown()});
}
else {
$(".follow_opt_in").hide();
$(".follow_loading").show();
}
if(localStorage.current_follow_loaded == "true") {
if(localStorage.who_to_follow) {
follow_loaded = 0;
var wtflist = JSON.parse(localStorage.who_to_follow);
addFollowProfile(0,wtflist[randomNumber(0,wtflist.length)]);
addFollowProfile(1,wtflist[randomNumber(0,wtflist.length)]);
addFollowProfile(2,wtflist[randomNumber(0,wtflist.length)]);
var checkload = setInterval(function() {
if(follow_loaded == 3) {
clearInterval(checkload);
$(".follow_loading").hide();
$(".what_to_follow").show();
replace_emoji();
}
},100);
}
else {
$("#follow_icon").removeClass("fa-circle-o-notch").removeClass("fa-spin").addClass("fa-id-card-o").addClass("fa-stack-1x").after($("<i>").addClass("fa").addClass("fa-ban").addClass("fa-stack-2x"));
}
}
else {
var url = $("#who-to-follow-provider").html();
url = url.replace(/{{host}}/g, encodeURIComponent(current_instance));
url = url.replace(/{{user}}/g, encodeURIComponent(current_acct));
$.ajax(url).done(function(data) {
localStorage.current_follow_loaded = true;
if(data.status == 200) {
var wtflist = new Array();
for(i=0;i<data.ids.length;i++) {
if(current_following_accts.indexOf(data.ids[i].to_id) == -1 && current_blocked_accts.indexOf(data.ids[i].to_id) == -1 && current_muted_accts.indexOf(data.ids[i].to_id) == -1) {
wtflist.push(data.ids[i].to_id);
}
}
localStorage.who_to_follow = JSON.stringify(wtflist);
}
setWhoToFollow();
}).fail(function(xhr) {
if(xhr.readyState == 0) {
setWhoToFollow();
}
});
}
}
function addFollowProfile(id,account) {
api.get('search',[{name:'q',data:"@"+account},{name:'resolve',data:'true'}], function(search) {
search.accounts[0].display_name = htmlEscape(search.accounts[0].display_name);
for(i=0;i<search.accounts[0].emojis.length;i++) {
search.accounts[0].display_name = search.accounts[0].display_name.replace(new RegExp(":"+search.accounts[0].emojis[i].shortcode+":","g"),"<img src='"+search.accounts[0].emojis[i].url+"' class='emoji'>");
}
if(search.accounts[0].display_name.length == 0) {
search.accounts[0].display_name = search.accounts[0].username;
}
$('.what_to_follow_'+id+' > .icon_box img').attr('src',search.accounts[0].avatar);
$('.what_to_follow_'+id+' .label_box > a').attr('href',getRelativeURL(search.accounts[0].url,search.accounts[0].id));
$('.what_to_follow_'+id+' .label_box > a > h3 .dn').addClass("emoji_poss").html(search.accounts[0].display_name);
$('.what_to_follow_'+id+' .label_box > a > h3 .un').text('@'+search.accounts[0].username);
$('.what_to_follow_'+id+' .label_box > .follow_button').attr('mid',search.accounts[0].id);
$('.what_to_follow_'+id+' .label_box > .follow_button').attr('data',search.accounts[0].url);
follow_loaded++;
});
}
function checkEmojiSupport() {
var ctx = document.createElement("canvas").getContext("2d");
ctx.fillText("😗",-2,4);
return ctx.getImageData(0,0,1,1).data[3] > 0;
}
function openStatus(link) {
api.get("search?q="+link,function(response) {
if(response.statuses.length > 0) {
var data = response.statuses[0];
if(data.account.acct.indexOf("@") == -1) {
data.account.acct = data.account.acct+"@"+current_instance;
}
window.location.href = "/@"+data.account.acct+"/status/"+data.id+"&mid="+data.account.id;
}
else {
window.location.href = "/404";
}
});
}
