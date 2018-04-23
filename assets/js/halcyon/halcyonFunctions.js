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
$(".toot_article a").each(function(i) {
const tags = $(this).attr('href').match(/https:\/\/.+..+\/tags\/(.+)\/?/);
if (tags) {
$(this).attr('href','/search?q='+tags[1]);
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
function getRelativeDatetime(current_time, posted_time) {
const calendar = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var posted_time_original = posted_time,
posted_time = getConversionedDate(null, posted_time_original).getTime(),
elapsedTime = Math.ceil((current_time-posted_time)/1000);
if (elapsedTime < 60) {
const datetime ="・" + elapsedTime + "s";
return datetime;
}
else if (elapsedTime < 120) {
const datetime ="・1m";
return datetime;
}
else if (elapsedTime < (60*60)) {
const datetime ="・" + (Math.floor(elapsedTime / 60) < 10 ? " " : "") + Math.floor(elapsedTime / 60) + "m";
return datetime;
}
else if (elapsedTime < (120*60)) {
const datetime ="・1h";
return datetime;
}
else if (elapsedTime < (24*60*60)) {
const datetime ="・" + (Math.floor(elapsedTime / 3600) < 10 ? " " : "") + Math.floor(elapsedTime / 3600) + "h";
return datetime;
}
else {
const datetime ="・" + calendar[posted_time_original.getMonth()] + " " + posted_time_original.getDate();
return datetime;
}
}
function resetApp() {
current_id = Number(localStorage.getItem("current_id"));
current_instance = localStorage.getItem("current_instance");
authtoken= localStorage.getItem("current_authtoken");
api = new MastodonAPI({
instance: 'https://'+current_instance,
api_user_token: authtoken
});
api.get("accounts/verify_credentials", function(AccountObj) {
localStorage.setItem("current_display_name", AccountObj["display_name"]);
localStorage.setItem("current_acct", AccountObj["acct"]);
localStorage.setItem("current_url", getRelativeURL(AccountObj["url"],AccountObj["id"]));
localStorage.setItem("current_header", AccountObj["header"]);
localStorage.setItem("current_avatar", AccountObj["avatar"]);
localStorage.setItem("current_statuses_count", AccountObj["statuses_count"]);
localStorage.setItem("current_following_count", AccountObj["following_count"]);
localStorage.setItem("current_followers_count", AccountObj["followers_count"]);
localStorage.setItem("current_statuses_count_link", getRelativeURL(AccountObj["url"],AccountObj["id"]));
localStorage.setItem("current_following_count_link", getRelativeURL(AccountObj["url"],AccountObj["id"],'/following'));
localStorage.setItem("current_followers_count_link", getRelativeURL(AccountObj["url"],AccountObj["id"],'/followers'));
localStorage.setItem("current_favourites_link", getRelativeURL(AccountObj["url"],AccountObj["id"],'/favourites'));
current_display_name = localStorage.getItem("current_display_name");
current_acct = localStorage.getItem("current_acct");
current_url = localStorage.getItem("current_url");
current_header = localStorage.getItem("current_header");
current_avatar = localStorage.getItem("current_avatar");
current_statuses_count = localStorage.getItem("current_statuses_count");
current_following_count = localStorage.getItem("current_following_count");
current_followers_count = localStorage.getItem("current_followers_count");
current_statuses_count_link = localStorage.getItem("current_statuses_count_link");
current_following_count_link = localStorage.getItem("current_following_count_link");
current_followers_count_link = localStorage.getItem("current_followers_count_link");
current_favourites_link = localStorage.getItem("current_favourites_link");
$(".js_current_profile_displayname").text(current_display_name);
$(".js_current_profile_username").text(current_acct);
$(".js_current_profile_link").attr('href', current_url);
$(".js_current_header_image").attr('src', current_header);
$(".js_current_profile_image").attr('src', current_avatar);
$(".js_current_toots_count").text(current_statuses_count);
$(".js_current_following_count").text(current_following_count);
$(".js_current_followers_count").text(current_followers_count);
$(".current_toots_count_link").attr('href', current_statuses_count_link);
$(".current_following_count_link").attr('href', current_following_count_link);
$(".current_followers_count_link").attr('href', current_followers_count_link);
replace_emoji();
});
api.get("accounts/"+current_id+"/following",function(data) {
followings = new Array();
for(i=0;i<data.length;i++) {
followings.push(data[i].id);
}
localStorage.setItem("current_following_ids",JSON.stringify(followings));
current_following_ids = followings;
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
current_statuses_count = localStorage.getItem("current_statuses_count");
current_following_count = localStorage.getItem("current_following_count");
current_followers_count = localStorage.getItem("current_followers_count");
current_statuses_count_link = localStorage.getItem("current_statuses_count_link");
current_following_count_link = localStorage.getItem("current_following_count_link");
current_followers_count_link = localStorage.getItem("current_followers_count_link");
current_favourites_link = localStorage.getItem("current_favourites_link");
current_following_ids = localStorage.getItem("current_following_ids");
current_instance_charlimit = localStorage.getItem("current_instance_charlimit");
}
function setCurrentProfile() {
  if(typeof current_acct != 'undefined') {
    $(".js_current_profile_displayname").text(current_display_name);
    $(".js_current_profile_username").text(current_acct);
    $(".js_current_profile_link").attr("href", current_url);
    $(".js_current_header_image").attr("src", current_header);
    $(".js_current_profile_image").attr("src", current_avatar);
    $(".js_current_toots_count").text(current_statuses_count);
    $(".js_current_following_count").text(current_following_count);
    $(".js_current_followers_count").text(current_followers_count);
    $(".current_toots_count_link").attr("href", current_statuses_count_link);
    $(".current_following_count_link").attr("href", current_following_count_link);
    $(".current_followers_count_link").attr("href", current_followers_count_link);
    replace_emoji();
  }
}
function putMessage(Message) {
$('#overlay_message').addClass('view');
$('#overlay_message section span').text(Message);
setTimeout(function(){
$("#overlay_message").removeClass("view");
},3000);
};


async function post(param) {
  return new Promise(async function (resolve, reject) {
    var media_array = [],
        form = param.form;
    if ( param.files ) {
      let files = param.files;
      for (let i = 0; i < files.length; i++) {
        media_array.push( await uploadFile(i, files[i]) );
      }
    }
    var params = {
      status : form.status_textarea.value,
      sensitive: form.status_nsfw.checked,
      spoiler_text : form.status_spoiler.value,
      visibility : form.privacy_option.value
    }
    if ( media_array ) params.media_ids = media_array;
    if ( param.in_reply_to_id ) params.in_reply_to_id = param.in_reply_to_id;
    api.post("statuses", params, function (data) {
      resolve();
    });
  });
};

function uploadFile(idx, file) {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append('file', file);
    api.postMedia("media", formData, function (postMedia) {
      resolve(postMedia.id);
    });
  });
};

function isSpoilerImage(oid) {
  var spoiler_oids = JSON.parse(localStorage.getItem('spoiler_oids'));
  if ( !spoiler_oids ) return false;
  return (spoiler_oids.indexOf(oid) !== -1);
}
function setSpoilerImage(oid) {
  if ( isSpoilerImage(oid) ) return;
  var spoiler_oids = JSON.parse(localStorage.getItem('spoiler_oids'));
  if ( !spoiler_oids ) spoiler_oids = [];
  if ( spoiler_oids.push(oid) > 1000 ) spoiler_oids.shift();
  localStorage.setItem('spoiler_oids', JSON.stringify(spoiler_oids));
}
function removeSpoilerImage(oid) {
  if ( !isSpoilerImage(oid) ) return;
  var spoiler_oids = JSON.parse(localStorage.getItem('spoiler_oids'));
  if ( !spoiler_oids ) spoiler_oids = [];
  spoiler_oids.splice( spoiler_oids.indexOf(oid), 1 );
  localStorage.setItem('spoiler_oids', JSON.stringify(spoiler_oids));
}
