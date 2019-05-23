if(window.location.pathname == "/settings") {
$('#js-settings_nav_general').toggleClass('view');
$(function() {
$(".post_privacy_wrap input[name='post_privacy'][value='"+localStorage.getItem("setting_post_privacy")+"']")[0].checked = true;
$(".local_instance_wrap input[name='local_instance']").val(localStorage.getItem("setting_local_instance"));
$(".search_filter_wrap input[name='search_filter'][value='"+localStorage.getItem("setting_search_filter")+"']")[0].checked = true;
if(localStorage.setting_post_sensitive == "true") {
$("#setting_post_sensitive")[0].checked = true;
}
if(localStorage.setting_compose_autocomplete == "true") {
$("#setting_compose_autocomplete")[0].checked = true;
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
$("#setting_compose_autocomplete").change(function() {
if(this.checked) {
localStorage.setItem("setting_compose_autocomplete","true");
putMessage(__("Autocomplete enabled"));
}
else {
localStorage.setItem("setting_compose_autocomplete","false");
putMessage(__("Autocomplete disabled"));
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
$('.selectbox').each(function() {selectbox(this)});
}
else if(window.location.pathname == "/settings/profile") {
$('#js-settings_nav_profile').toggleClass('view');
$(function() {
api.get("accounts/verify_credentials",function(AccountObj) {
$(".display_name_wrap input[name='display_name']").val(AccountObj["display_name"]);
if(AccountObj["source"]["note"].length != 0) $(".about_me_wrap textarea[name='about_me']").val(AccountObj["source"]["note"]);
else if(AccountObj["note"] == "<p></p>") $(".about_me_wrap textarea[name='about_me']").val("");
else $(".about_me_wrap textarea[name='about_me']").val(AccountObj["note"]);
if(AccountObj["locked"] == true) $("#setting_lock_account")[0].checked = true;
if(AccountObj.source && AccountObj.source.fields) {
for(var i=0;i<AccountObj.source.fields.length;i++) {
$("#setting_field_"+i+"_name").val(AccountObj.source.fields[i].name);
$("#setting_field_"+i+"_value").val(AccountObj.source.fields[i].value);
}
}
else {
for(var i=0;i<AccountObj.fields.length;i++) {
$("#setting_field_"+i+"_name").val(AccountObj.fields[i].name);
$("#setting_field_"+i+"_value").val(AccountObj.fields[i].value);
}
}
$("#verifylink").val('<a rel="me" href="'+AccountObj["url"]+'">Mastodon</a>');
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
});
});
$(document).on('change',".display_name_wrap input[name='display_name']", function(e) {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
var formdata = new FormData();
formdata.append('display_name',$(this).val());
api.patch("accounts/update_credentials",formdata,function(data) {
current_display_name = data.display_name;
localStorage.current_display_name = current_display_name;
$(".js_current_profile_displayname").text(current_display_name);
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Changed setting to")+" "+data.display_name);
});
});
$(document).on('change',".about_me_wrap textarea[name='about_me']", function(e) {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
var formdata = new FormData();
formdata.append('note',$(this).val());
api.patch("accounts/update_credentials",formdata,function() {
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Changed about me setting"));
});
});
$("#setting_avatar").change(function() {
if($('#setting_avatar').prop('files')[0]) {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
var formdata = new FormData();
formdata.append('avatar',$('#setting_avatar').prop('files')[0]);
api.patch("accounts/update_credentials",formdata,function(data) {
current_avatar = data.avatar;
localStorage.current_avatar = current_avatar;
$(".js_current_profile_image").attr("src",current_avatar);
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Uploaded new avatar"));
});
}
});
$("#setting_header").change(function() {
if($('#setting_header').prop('files')[0]) {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
var formdata = new FormData();
formdata.append('header',$('#setting_header').prop('files')[0]);
api.patch("accounts/update_credentials",formdata,function(data) {
current_header = data.header;
localStorage.current_header = current_header;
$(".js_current_header_image").attr("src",current_header);
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Uploaded new header"));
})
}
});
$("#setting_lock_account").change(function() {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
var formdata = new FormData();
if(this.checked) {
formdata.append('locked','1');
var msgtext = "Account locked";
}
else {
formdata.append('locked','0');
var msgtext = "Account unlocked";
}
api.patch("accounts/update_credentials",formdata,function(data) {
current_locked = data.locked;
localStorage.current_locked = data.locked;
if(data.locked) {
$(".js_current_profile_username").append(" <i class='fa fa-lock'>");
$("#js-settings_nav_followers").show();
}
else {
$(".js_current_profile_username .fa-lock").remove();
$("#js-settings_nav_followers").hide();
}
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__(msgtext));
});
});
$(document).on('change',".setting_field",function(e) {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
var formdata = new FormData();
for(var i=0;i<4;i++) {
formdata.append('fields_attributes['+i+'][name]',$("#setting_field_"+i+"_name").val());
formdata.append('fields_attributes['+i+'][value]',$("#setting_field_"+i+"_value").val());
}
api.patch("accounts/update_credentials",formdata,function() {
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
putMessage(__("Changed custom profile field"));
});
});
}
else if(window.location.pathname == "/settings/appearance") {
  $('#js-settings_nav_appearance').toggleClass('view');
  $(function() {
    $(".post_streaming_wrap input[name='post_streaming'][value='"+localStorage.getItem("setting_post_stream")+"']")[0].checked = true;
    if($("#setting_dark_theme").attr("default") == "default") {
      $("#setting_dark_theme_reset").hide();
      if(window.matchMedia("prefers-color-scheme:dark").matches) $("#setting_dark_theme")[0].checked = true;
    }
    if(localStorage.setting_link_previews == "true") {
      $("#setting_link_previews")[0].checked = true;
    }
    if(localStorage.setting_desktop_notifications == "true") {
      $("#setting_desktop_notifications")[0].checked = true;
      if("serviceWorker" in navigator) {
        $("#service_worker_box").show();
      }
      if (Notification.permission === 'default') {
        Notification.requestPermission(function(p) {
          if (p === 'denied') {
            $("#setting_desktop_notifications")[0].checked = false;
            $("#service_worker_box").hide();
          }
        });
      }
      else if(Notification.permission == "denied") {
        $("#setting_desktop_notifications")[0].checked = false;
        $("#service_worker_box").hide();
      }
    }
    if(localStorage.setting_service_worker == "true") {
      $("#setting_service_worker")[0].checked = true;
    }
    if(localStorage.setting_show_content_warning == "true") {
      $("#setting_show_content_warning")[0].checked = true;
    }
    if(localStorage.setting_show_nsfw == "true") {
      $("#setting_show_nsfw")[0].checked = true;
    }
    if(localStorage.setting_full_height == "true") {
      $("#setting_full_height")[0].checked = true;
    }
    if(localStorage.setting_thread_view == "true") {
      $("#setting_thread_view")[0].checked = true;
    }
    if ( localStorage.getItem("image_size_tl") == null ) {
      $(".image_size_tl_wrap input[name='image_size_tl'][value='Normal']")[0].checked = true;
    }
    else {
      $(".image_size_tl_wrap input[name='image_size_tl'][value='"+localStorage.getItem("image_size_tl")+"']")[0].checked = true;
    }
  });
  $(document).on('change',".post_streaming_wrap input[name='post_streaming']:checked", function(e) {
    localStorage.setItem("setting_post_stream", $(this).val());
    putMessage(__("Changed setting to")+" "+$(this).val());
  });
  $("#setting_dark_theme").change(function() {
    $("#setting_dark_theme_reset").fadeIn();
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
  $("#setting_dark_theme_reset").click(function() {
    $.cookie("darktheme","unset",{path:'/',expires:3650});
    $("#setting_dark_theme_reset").fadeOut();
    if(window.matchMedia("prefers-color-scheme:dark").matches) {
      $("#setting_dark_theme")[0].checked = true;
      if($("link[href='/assets/css/dark.css']").length == 0) $(document.body).append($("<link>").attr("rel","stylesheet").attr("href","/assets/css/dark.css"));
    }
    else {
      $("#setting_dark_theme")[0].checked = false;
      $("link[href='/assets/css/dark.css']").remove();
    }
    putMessage(__("Dark theme reset to standard"));
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
            if("serviceWorker" in navigator) {
              $("#service_worker_box").show();
            }
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
        if("serviceWorker" in navigator) {
          $("#service_worker_box").show();
        }
        putMessage(__("Desktop notifications enabled"));
      }
    }
    else {
      localStorage.setItem("setting_desktop_notifications","false");
      $("#service_worker_box").hide();
      putMessage(__("Desktop notifications disabled"));
    }
  });
  $("#setting_service_worker").change(function() {
    if(this.checked) {
      localStorage.setItem("setting_service_worker","true");
      if("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/assets/js/halcyon/halcyonWorker.js").then(function(worker) {
          console.log("Service worker successfully registered",worker);
        }).catch(function(error) {
          console.log("There was an error when registering the service worker",error);
        });
      }
      putMessage(__("Notifications when tab is closed enabled"));
    }
    else {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          if(registrations.length) {
            for(let registration of registrations) {
              registration.unregister();
            }
          }
        });
      }
      localStorage.setItem("setting_service_worker","false");
      putMessage(__("Notifications when tab is closed disabled"));
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
  $("#setting_full_height").change(function() {
    if(this.checked) {
      localStorage.setItem("setting_full_height","true");
      putMessage(__("Pictures shown in full height"));
    }
    else {
      localStorage.setItem("setting_full_height","false");
      putMessage(__("Pictures shown in default height"));
    }
  });
  $("#setting_thread_view").change(function() {
    if(this.checked) {
      localStorage.setItem("setting_thread_view","true");
      putMessage(__("Threads shown in thread view"));
    }
    else {
      localStorage.setItem("setting_thread_view","false");
      putMessage(__("Threads shown in chronological order"));
    }
  });
  $(document).on('change',".image_size_tl_wrap input[name='image_size_tl']:checked", function(e) {
    var val = $(this).val();
    localStorage.setItem("image_size_tl", val);
    putMessage(Pomo.getText("Changed setting to").replace('${val}', Pomo.getText(val, {context:'Option'})));
  });
}
else if(window.location.pathname == "/settings/filters") {
$('#js-settings_nav_filters').toggleClass('view');
$(function() {
if(localStorage.setting_show_replies == "true") {
$("#setting_show_replies")[0].checked = true;
}
if(localStorage.setting_show_bots == "true") {
$("#setting_show_bots")[0].checked = true;
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
$("#setting_show_bots").change(function() {
if(this.checked) {
localStorage.setItem("setting_show_bots","true");
putMessage(__("Toots of bots shown"));
}
else {
localStorage.setItem("setting_show_bots","false");
putMessage(__("Toots of bots hidden"));
}
});
$(document).ready(function() {$('.selectbox').each(function() {selectbox(this)})});
$("#setting_add_filter").click(function(e) {
e.stopPropagation();
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_filter').removeClass('invisible');
$('.overlay_filter_ok').off("click");
$('.overlay_filter_ok').click(function() {
var addwholeword = "";
if($("#filter_whole_word")[0].checked == false) addwholeword = "&whole_word=0";
api.post("filters",$("#addfilter").serialize()+addwholeword,function() {
$('.close_button').click();
putMessage(__("Filter created"));
loadfilters();
});
});
});
$(document).ready(function() {
loadfilters();
});
}
else if(window.location.pathname == "/settings/media") {
$('#js-settings_nav_media').toggleClass('view');
$(function() {
if(localStorage.setting_play_gif == "true") {
$("#setting_play_gif")[0].checked = true;
}
if(localStorage.setting_play_video == "true") {
$("#setting_play_video")[0].checked = true;
}
if(localStorage.setting_play_audio == "true") {
$("#setting_play_audio")[0].checked = true;
}
if(localStorage.setting_play_peertube == "true") {
$("#setting_play_peertube")[0].checked = true;
}
if(localStorage.setting_play_youplay == "true" && $("#setting_play_youplay").length == 1) {
$("#setting_play_youplay")[0].checked = true;
}
if(localStorage.setting_play_invidious == "true" && $("#setting_play_invidious").length == 1) {
$("#setting_play_invidious")[0].checked = true;
}
if(localStorage.setting_play_vimeo == "true" && $("#setting_play_vimeo").length == 1) {
$("#setting_play_vimeo")[0].checked = true;
}
});
$("#setting_play_gif").change(function() {
if(this.checked) {
localStorage.setItem("setting_play_gif","true");
putMessage(__("Gif animations enabled"));
}
else {
localStorage.setItem("setting_play_gif","false");
putMessage(__("Gif animations disabled"));
}
});
$("#setting_play_video").change(function() {
if(this.checked) {
localStorage.setItem("setting_play_video","true");
putMessage(__("Video player enabled"));
}
else {
localStorage.setItem("setting_play_video","false");
putMessage(__("Video player disabled"));
}
});
$("#setting_play_audio").change(function() {
if(this.checked) {
localStorage.setItem("setting_play_audio","true");
putMessage(__("Audio player enabled"));
}
else {
localStorage.setItem("setting_play_audio","false");
putMessage(__("Audio player disabled"));
}
});
$("#setting_play_peertube").change(function() {
if(this.checked) {
localStorage.setItem("setting_play_peertube","true");
putMessage(__("PeerTube embeds enabled"));
}
else {
localStorage.setItem("setting_play_peertube","false");
putMessage(__("PeerTube embeds disabled"));
}
});
$("#setting_play_youplay").change(function() {
if(this.checked) {
localStorage.setItem("setting_play_youplay","true");
putMessage(__("YouPlay embeds enabled"));
}
else {
localStorage.setItem("setting_play_youplay","false");
putMessage(__("YouPlay embeds disabled"));
}
});
$("#setting_play_invidious").change(function() {
if(this.checked) {
localStorage.setItem("setting_play_invidious","true");
putMessage(__("Invidio.us embeds enabled"));
}
else {
localStorage.setItem("setting_play_invidious","false");
putMessage(__("Invidio.us embeds disabled"));
}
});
$("#setting_play_vimeo").change(function() {
if(this.checked) {
localStorage.setItem("setting_play_vimeo","true");
putMessage(__("Vimeo embeds enabled"));
}
else {
localStorage.setItem("setting_play_vimeo","false");
putMessage(__("Vimeo embeds disabled"));
}
});
}
else if(window.location.pathname == "/settings/blocks") {
$('#js-settings_nav_blocks').toggleClass('view');
var load_options = [{name:'limit',data:18}];
let isSyncing = true;
api.get('blocks',load_options,function(blocks) {
for(let i in blocks) {
follows_template(blocks[i]).appendTo("#js-follows_profile");
$('#js-follows_profile .follow_button[mid="'+blocks[i].id+'"]').removeClass("follow_button").addClass("unblock_button").children("span").text(__("Unblock"));
$('#js-follows_profile .unblock_button[mid="'+blocks[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.post("accounts/"+mid+"/unblock",function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
}
links = getLinkFromXHRHeader(responce_headers);
replace_emoji();
$("#js-follows_footer > i").css({"display":"none"});
isSyncing = false;
});
$(window).scroll(function () {
if($(window).scrollTop() + window.innerHeight >= $(document).height()-700) {
if(!isSyncing){
isSyncing = true;
load_options.unshift({name:"max_id",data:links['next'].match(/max_id=(.+)&?/)[1]});
api.get('blocks',load_options,function(blocks) {
if(blocks.length) {
for(let i in blocks) {
follows_template(blocks[i]).appendTo("#js-follows_profile");
$('#js-follows_profile .follow_button[mid="'+blocks[i].id+'"]').removeClass("follow_button").addClass("unblock_button").children("span").text(__("Unblock"));
$('#js-follows_profile .unblock_button[mid="'+blocks[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.post("accounts/"+mid+"/unblock",function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
}
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
}
else if(window.location.pathname == "/settings/mutes") {
$('#js-settings_nav_mutes').toggleClass('view');
var load_options = [{name:'limit',data:18}];
let isSyncing = true;
api.get('mutes',load_options,function(mutes) {
for(let i in mutes) {
follows_template(mutes[i]).appendTo("#js-follows_profile");
$('#js-follows_profile .follow_button[mid="'+mutes[i].id+'"]').removeClass("follow_button").addClass("unmute_button").children("span").text(__("Unmute"));
$('#js-follows_profile .unmute_button[mid="'+mutes[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.post("accounts/"+mid+"/unmute",function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
}
links = getLinkFromXHRHeader(responce_headers);
replace_emoji();
$("#js-follows_footer > i").css({"display":"none"});
isSyncing = false;
});
$(window).scroll(function () {
if($(window).scrollTop() + window.innerHeight >= $(document).height()-700) {
if(!isSyncing){
isSyncing = true;
load_options.unshift({name:"max_id",data:links['next'].match(/max_id=(.+)&?/)[1]});
api.get('mutes',load_options,function(mutes) {
if(mutes.length) {
for(let i in mutes) {
follows_template(mutes[i]).appendTo("#js-follows_profile");
$('#js-follows_profile .follow_button[mid="'+mutes[i].id+'"]').removeClass("follow_button").addClass("unmute_button").children("span").text(__("Unmute"));
$('#js-follows_profile .unmute_button[mid="'+mutes[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.post("accounts/"+mid+"/unmute",function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
}
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
}
else if(window.location.pathname == "/settings/followers") {
$('#js-settings_nav_followers').toggleClass('view');
var load_options = [{name:'limit',data:18}];
let isSyncing = true;
api.get('follow_requests',load_options,function(followers) {
for(let i in followers) {
follows_template(followers[i]).appendTo("#js-follows_profile");
$('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').wrap($("<div>").css({position:"absolute",top:-32,right:8}));
$('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').css({position:"initial",display:"inline",paddingLeft:6,paddingRight:6});
$('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').after($('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').clone());
$('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').first().css("margin-right","5px").removeClass("follow_button").addClass("reject_button").children("span").text(__("Reject"));
$('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').removeClass("follow_button").addClass("accept_button").children("span").text(__("Accept"));
$('#js-follows_profile .reject_button[mid="'+followers[i].id+'"] .fa-user-plus').removeClass("fa-user-plus").addClass("fa-user-times");
$('#js-follows_profile .reject_button[mid="'+followers[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.post("follow_requests/"+mid+"/reject",function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
$('#js-follows_profile .accept_button[mid="'+followers[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.post("follow_requests/"+mid+"/authorize",function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
}
links = getLinkFromXHRHeader(responce_headers);
replace_emoji();
$("#js-follows_footer > i").css({"display":"none"});
isSyncing = false;
});
$(window).scroll(function () {
if($(window).scrollTop() + window.innerHeight >= $(document).height()-700) {
if(!isSyncing){
isSyncing = true;
load_options.unshift({name:"max_id",data:links['next'].match(/max_id=(.+)&?/)[1]});
api.get('follow_requests',load_options,function(followers) {
if(followers.length) {
for(let i in followers) {
follows_template(followers[i]).appendTo("#js-follows_profile");
$('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').wrap($("<div>").css({position:"absolute",top:-32,right:8}));
$('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').css({position:"initial",display:"inline",paddingLeft:6,paddingRight:6});
$('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').after($('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').clone());
$('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').first().css("margin-right","5px").removeClass("follow_button").addClass("reject_button").children("span").text(__("Reject"));
$('#js-follows_profile .follow_button[mid="'+followers[i].id+'"]').removeClass("follow_button").addClass("accept_button").children("span").text(__("Accept"));
$('#js-follows_profile .reject_button[mid="'+followers[i].id+'"] .fa-user-plus').removeClass("fa-user-plus").addClass("fa-user-times");
$('#js-follows_profile .reject_button[mid="'+followers[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.post("follow_requests/"+mid+"/reject",function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
$('#js-follows_profile .accept_button[mid="'+followers[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.post("follow_requests/"+mid+"/authorize",function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
}
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
}
function selectbox($this) {
var $this = $($this);
var numberOfOptions = $this.children('option').length;
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
$this.closest("form").on("reset",function(e) {
$selectText.text($this.children('option[selected]').eq(0).text()+" ⏷");
})
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
$this.val($(this).attr('rel'));
$selectText.text($(this).text()+" ⏷");
$this.change();
$list.slideUp(function() {$styledSelect.removeClass('active')});
});
$(document).click(function() {
$list.slideUp(function() {$styledSelect.removeClass('active')});
});
}
function loadfilters() {
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
$("#filterlist").empty();
api.get("filters",function(data) {
for(var i=0;i<data.length;i++) {
var scope = new Array();
var expires_in = "";
if(data[i].context.indexOf("home") != -1) scope.push(__("Home"));
if(data[i].context.indexOf("notifications") != -1) scope.push(__("Notifications"));
if(data[i].context.indexOf("public") != -1) scope.push(__("Public"));
if(data[i].context.indexOf("thread") != -1) scope.push(__("Thread"));
if(data[i].expires_at == null) expires_in = __("Never");
else expires_in = getRelativeDatetime(new Date(),getConversionedDate(null,data[i].expires_at),false,true)
$("#filterlist").append(
$("<tr>").append(
$("<td>").text(data[i].phrase)).append(
$("<td>").css("border-left","1px solid #189EFC").css("border-right","1px solid #189EFC").text(scope)).append(
$("<td>").text(expires_in)).append(
$("<td>").css("border-left","1px solid #189EFC").css("padding-top","5px").css("padding-bottom","5px").append(
$("<a>").attr("href","javascript:void(0)").css("color","#189EFC").css("margin-right","5px").data("id",data[i].id).append(
$("<i>").addClass("fa").addClass("fa-lg").addClass("fa-pencil")).click(function(e) {
e.stopPropagation();
var fid = $(this).data("id");
$("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
api.get("filters/"+fid,function(data) {
var fid = data.id;
$("#filtertext").val(data.phrase);
if(data.context.indexOf("home") != -1) $("#checkbox_home")[0].checked = true;
if(data.context.indexOf("notifications") != -1) $("#checkbox_notifications")[0].checked = true;
if(data.context.indexOf("public") != -1) $("#checkbox_public")[0].checked = true;
if(data.context.indexOf("thread") != -1) $("#checkbox_thread")[0].checked = true;
if(data.irreversible) $("#filter_irreversible")[0].checked = true;
if(data.whole_word) $("#filter_whole_word")[0].checked = true;
$(".select span").text(__("Don't change")+" ⏷");
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_filter').removeClass('invisible');
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
$('.overlay_filter_ok').off("click");
$('.overlay_filter_ok').click(function() {
var addwholeword = "";
if($("#filter_whole_word")[0].checked == false) addwholeword = "&whole_word=0";
api.put("filters/"+fid,$("#addfilter").serialize()+addwholeword,function() {
$('.close_button').click();
putMessage(__("Filter updated"));
loadfilters();
});
});
});
})).append(
$("<a>").attr("href","javascript:void(0)").css("color","#189EFC").data("id",data[i].id).append(
$("<i>").addClass("fa").addClass("fa-lg").addClass("fa-trash")).click(function(e) {
e.stopPropagation();
var fid = $(this).data("id");
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_confirm').removeClass('invisible');
$('.overlay_confirm_text').text(__("Are you sure that you want to delete this filter?"));
$('.overlay_confirm_yes').click(function() {
$('.close_button').click();
api.delete("filters/"+fid,function(data) {
putMessage(__("Your filter has been deleted"));
loadfilters();
});
});
}))));
}
$("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
});
}
