function searchlocalfill() {
var dropdown = $("<ul>").addClass("account_list");
var searchsuggestions = new Array();
current_search_history.reverse();
for(var i=0;i<current_search_history.length;i++) {
if(searchsuggestions.length == 10) break;
if(searchsuggestions.indexOf(current_search_history[i]) == -1) {
dropdown.append($("<li>").data("value",current_search_history[i]).addClass("account_box").append($("<div>").addClass("icon_box").append($("<span>").addClass("emoji_poss").html("#️⃣").css("float","left").css("font-size","32px")))
.append($("<div>").addClass("label_box").append($("<span>").addClass("dn").append($("<h3>").html("#"+current_search_history[i])))).click(function() {
window.location.href = "/search?q="+encodeURIComponent($(this).data("value"));
}));
searchsuggestions.push(current_search_history[i]);
}
}
current_search_history.reverse();
$(".header_search_suggestions").empty().removeClass("invisible").append(dropdown);
replace_emoji();
}
function searchremotefill(text) {
if(text == "@") searchlocalfill();
else {
api.get("search?q="+encodeURIComponent(text)+"&resolve=false&limit=5",function(data) {
if(data.hashtags.length == 0 && data.accounts.length == 0) $(".header_search_suggestions").addClass("invisible");
else {
var dropdown = $("<ul>").addClass("account_list");
for(var i=0;i<data.hashtags.length;i++) {
if(i == 5) break;
dropdown.append($("<li>").data("value",data.hashtags[i]).addClass("account_box").append($("<div>").addClass("icon_box").append($("<span>").addClass("emoji_poss").html("#️⃣").css("float","left").css("font-size","32px")))
.append($("<div>").addClass("label_box").append($("<span>").addClass("dn").append($("<h3>").html("#"+data.hashtags[i])))).click(function() {
window.location.href = "/search?q="+encodeURIComponent($(this).data("value"));
}));
}
for(var i=0;i<data.accounts.length;i++) {
if(i == 5) break;
if(data.accounts[i].display_name == "") data.accounts[i].display_name = data.accounts[i].username;
for(var a=0;a<data.accounts[i].emojis.length;a++) {
data.accounts[i].display_name = data.accounts[i].display_name.replace(new RegExp(":"+data.accounts[i].emojis[a].shortcode+":","g"),"<img src='"+data.accounts[i].emojis[a].url+"' class='emoji'>");
}
dropdown.append($("<li>").data("value",getRelativeURL(data.accounts[i].url,data.accounts[i].id)).addClass("account_box").append($("<div>").addClass("icon_box").append($("<img>").attr("src",data.accounts[i].avatar).css("float","left")))
.append($("<div>").addClass("label_box").css("width","unset").append($("<span>").addClass("dn").append($("<h3>").html(data.accounts[i].display_name).addClass("emoji_poss"))).append($("<span>").addClass("un").html(data.accounts[i].acct))).click(function() {
window.location.href = $(this).data("value");
}));
}
$(".header_search_suggestions").empty().removeClass("invisible").append(dropdown);
replace_emoji();
}
});
}
}
function searchredirect(text) {
if(text[0] == "@") window.location.href = "/search/users?q="+encodeURIComponent(text.substr(1));
else if(text[0] == "#") window.location.href = "/search?q="+encodeURIComponent(text.substr(1));
else if(text.substr(0,8) == "https://") openStatus(text);
else window.location.href = "/search?q="+encodeURIComponent(text);
}
