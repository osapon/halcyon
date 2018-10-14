current_file = location.pathname;
$("#lists_nav").addClass('view');
$('title').text('Halcyon / Lists');
api.get("lists",function(data) {
for(var i=0;i<data.length;i++) {
$("#lists_bar").append($("<li>").attr("list-id",data[i].id).addClass("header_nav_item").append($("<a>").attr("href","/lists/"+data[i].id).append($("<h2>").addClass("emoji_poss").text(data[i].title))));
}
replace_emoji();
if(window.location.pathname == "/lists") {
listsOverview(data);
}
else if(window.location.pathname.indexOf("/add") != -1) {
loadFollows($global_listid);
}
else {
loadList($global_listid);
}
});
function listsOverview(lists) {
$("#js-follows_footer[list-id='load']").remove();
for(var i=0;i<lists.length;i++) {
$(".center_column").append(
$("<header>").attr("list-id",lists[i].id).addClass("timeline_header").css("margin-bottom","10px").append(
$("<div>").addClass("header_items").append(
$("<a>").attr("href","/lists/"+lists[i].id).addClass("list-title").addClass("item").addClass("emoji_poss").text(lists[i].title)).append(
$("<a>").attr("href","javascript:void(0)").addClass("list-delete").addClass("item").css("float","right").append(
$("<i>").addClass("fa").addClass("fa-trash")
).click(function() {
const list_id = $(this).parent().parent().attr("list-id");
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_confirm').removeClass('invisible');
$('.overlay_confirm_text').text(__("Are you sure that you want to delete this list?"));
$('.overlay_confirm_yes').click(function() {
$('.close_button').click();
api.delete("lists/"+list_id,function(data) {
$('.header_nav_item[list-id="'+list_id+'"]').remove();
$('.timeline_header[list-id="'+list_id+'"]').remove();
$('#js-follows_profile[list-id="'+list_id+'"]').remove();
putMessage(__("Your list has been deleted"));
});
});
})).append(
$("<a>").attr("href","javascript:void(0)").addClass("list-edit").addClass("item").css("float","right").append(
$("<i>").addClass("fa").addClass("fa-pencil")
).click(function() {
const list_id = $(this).parent().parent().attr("list-id");
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_prompt').removeClass('invisible');
$('.overlay_prompt_text').text(__("Please enter the new name for this list."));
$('.overlay_prompt_input').val('');
$('.overlay_prompt_yes').click(function() {
if($(".overlay_prompt_input").val().length == 0) {
$('.overlay_prompt_text').text(__("The name of your list can't be empty!"));
}
else {
api.put("lists/"+list_id,"title="+encodeURIComponent($(".overlay_prompt_input").val()),function(data) {
$('.close_button').click();
$('.header_nav_item[list-id="'+list_id+'"] h2').addClass("emoji_poss").text(data.title);
$('.timeline_header[list-id="'+list_id+'"] .list-title').addClass("emoji_poss").text(data.title);
putMessage(__("Your list has been renamed"));
replace_emoji();
});
}
});
})).append(
$("<a>").attr("href","/lists/"+lists[i].id+"/add").addClass("list-adduser").addClass("item").css("float","right").append(
$("<i>").addClass("fa").addClass("fa-user-plus")
)))).append(
$("<footer>").attr("id","js-follows_footer").attr("list-id",lists[i].id).append(
$("<i>").addClass("fa").addClass("fa-spin").addClass("fa-circle-o-notch").attr("aria-hidden","true")));
listAccounts(lists[i].id);
}
replace_emoji();
}
function listAccounts(list_id) {
api.get("lists/"+list_id+"/accounts",[{name:'limit',data:0}],function(data) {
$("#js-follows_footer[list-id='"+list_id+"']").remove();
$(".timeline_header[list-id='"+list_id+"']").after($("<div>").attr("id","js-follows_profile").attr("list-id",list_id));
for(var i=0;i<data.length;i++) {
follows_template(data[i]).appendTo("#js-follows_profile[list-id='"+list_id+"']");
$('#js-follows_profile .follow_button[mid="'+data[i].id+'"]').removeClass("follow_button").addClass("remove_button").children("span").text(__("Remove"));
$('#js-follows_profile .remove_button[mid="'+data[i].id+'"]').children("i").removeClass("fa-user-plus").addClass("fa-user-times");
$('#js-follows_profile .remove_button[mid="'+data[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.delete("lists/"+list_id+"/accounts?account_ids[]="+mid,function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
}
replace_emoji();
});
}
function loadList(list_id) {
$("#lists_bar .header_nav_item[list-id='"+list_id+"']").addClass("view");
api.get("lists/"+list_id,function(data) {
$("#header_listname").text(data.title);
});
setTimeline("timelines/list/"+list_id);
}
function loadFollows(list_id) {
$("#lists_bar .header_nav_item[list-id='"+list_id+"']").addClass("view");
api.get("lists/"+list_id+"/accounts",[{name:'limit',data:0}],function(data) {
var listAccounts = new Array();
for(var i=0;i<data.length;i++) {
listAccounts.push(data[i].id);
}
var mid = current_id;
var param = "following";
var load_options = [{name:'limit',data:18}];
let isSyncing = true,
followsList = [];
api.get('accounts/'+mid+'/'+param, load_options, function(follows) {
for (let i in follows) {
if(listAccounts.indexOf(follows[i].id) == -1) {
follows_template(follows[i]).appendTo("#js-follows_profile");
$('#js-follows_profile .follow_button[mid="'+follows[i].id+'"]').removeClass("follow_button").addClass("add_button").children("span").text(__("Add"));
$('#js-follows_profile .add_button[mid="'+follows[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.post("lists/"+list_id+"/accounts?account_ids[]="+mid,function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
followsList.unshift(follows[i].id);
}
}
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
if(listAccounts.indexOf(follows[i].id) == -1) {
follows_template(follows[i]).appendTo("#js-follows_profile");
$('#js-follows_profile .follow_button[mid="'+follows[i].id+'"]').removeClass("follow_button").addClass("add_button").children("span").text(__("Add"));
$('#js-follows_profile .add_button[mid="'+follows[i].id+'"]').click(function() {
var mid = $(this).attr("mid");
api.post("lists/"+list_id+"/accounts?account_ids[]="+mid,function() {
$(".follows_profile_box[mid='"+mid+"']").fadeOut();
});
});
followsList.unshift(follows[i].id);
}
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
});
}
$("#add_list").click(function() {;
$("#js-overlay_content_wrap .temporary_object").empty();
$('#js-overlay_content_wrap').addClass('view');
$('#js-overlay_content_wrap').addClass('black_08');
$('.overlay_prompt').removeClass('invisible');
$('.overlay_prompt_text').text(__("Please enter the name of your new list."));
$('.overlay_prompt_input').val('');
$('.overlay_prompt_yes').click(function() {
if($(".overlay_prompt_input").val().length == 0) {
$('.overlay_prompt_text').text(__("The name of your list can't be empty!"));
}
else {
api.post("lists/","title="+encodeURIComponent($(".overlay_prompt_input").val()),function(data) {
$('.close_button').click();
putMessage(__("Your list has been created"));
window.location.href="/lists/"+data.id+"/add";
});
}
});
});
