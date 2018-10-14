function mediaattachments_template(status) {
let media_views = "";
if(status.media_attachments[0].remote_url != null) {
status.media_attachments[0].url = status.media_attachments[0].remote_url;
}
if(status.media_attachments[0].url === "/files/original/missing.png") {
return "";
}
else if(!status.sensitive || localStorage.setting_show_nsfw == "true") {
media_views = `<div class='media_views' sid="${status.id}" media_length='${status.media_attachments.length}'>`;
}
else {
media_views = `<div class='media_views sensitive' media_length='${status.media_attachments.length}'>
<div class='sensitive_alart'>
<span class="text1">${__('Sensitive content')}</span>
<span class="text2">${__('Click to view')}</span>
</div>`;
}
if ( status.media_attachments[0].type === "video" | status.media_attachments[0].type === "gifv" ) {
media_views += (`
<div class="media_attachment" otype="video/gifv" mediacount="0">
<video src="${status.media_attachments[0].url}" frameborder="0" allowfullscreen autoplay loop muted></video>
</div>`);
} else {
if ( status.media_attachments.length <= 2 ) {
for ( let i in status.media_attachments ) {
if(status.media_attachments[i].remote_url != null) {
status.media_attachments[i].url = status.media_attachments[i].remote_url;
}
media_views += (`
<div class="media_attachment" otype="image" sid="${status.id}" oid="${status.media_attachments[i].id}" url="${status.media_attachments[i].url}" mediacount="${i}">
<img src="${status.media_attachments[i].url}" window_view="enable" />
</div>`);
}
} else {
for ( let i in status.media_attachments ) {
if (Number(i) === 1) {
if(status.media_attachments[i].remote_url != null) {
status.media_attachments[i].url = status.media_attachments[i].remote_url;
}
media_views += (`
<div class="media_attachments_right">
<div class="media_attachment" otype="image" sid="${status.id}" oid="${status.media_attachments[i].id}" url="${status.media_attachments[i].url}" mediacount="${i}">
<img src="${status.media_attachments[i].url}" window_view="enable"/>
</div>`);
} else {
media_views += (`
<div class="media_attachment" otype="image" sid="${status.id}" oid="${status.media_attachments[i].id}" url="${status.media_attachments[i].url}" mediacount="${i}">
<img src="${status.media_attachments[i].url}" window_view="enable"/>
</div>`);
}
}
media_views += "</div>";
}
media_views += "</div>";
}
return media_views;
}
function timeline_template(status) {
if (status.reblog === null) {
for(i=0;i<status.emojis.length;i++) {
status.content = status.content.replace(new RegExp(":"+status.emojis[i].shortcode+":","g"),"<img src='"+status.emojis[i].url+"' class='emoji'>");
}
status.account.display_name = htmlEscape(status.account.display_name);
for(i=0;i<status.account.emojis.length;i++) {
status.account.display_name = status.account.display_name.replace(new RegExp(":"+status.account.emojis[i].shortcode+":","g"),"<img src='"+status.account.emojis[i].url+"' class='emoji'>");
}
var writtenby = new Object();
writtenby.id = status.account.id;
writtenby.username = status.account.username;
writtenby.url = status.account.url;
writtenby.acct = status.account.acct;
status.mentions.push(writtenby);
const status_account_link= getRelativeURL(status.account.url, status.account.id),
status_datetime= getRelativeDatetime(Date.now(), getConversionedDate(null, status.created_at)),
status_attr_datetime = getConversionedDate(null, status.created_at);
let alart_text= "",
article_option= "",
toot_reblogs_count= "",
toot_favourites_count = "",
media_views = "";
if(status.spoiler_text && localStorage.setting_show_content_warning == "false") {
alart_text = "<span>"+status.spoiler_text+"</span><button class='cw_button'>"+__('SHOW MORE')+"</button>",
article_option = "content_warning";
}
else if(status.spoiler_text && localStorage.setting_show_content_warning == "true") {
alart_text = "<span>"+status.spoiler_text+"</span><button class='cw_button'>"+__('SHOW LESS')+"</button>";
}
if (status.reblogs_count) {
toot_reblogs_count = status.reblogs_count;
}
if (status.favourites_count) {
toot_favourites_count = status.favourites_count;
}
if ( status.media_attachments.length ) {
media_views = mediaattachments_template(status);
}
if(status.account.display_name.length == 0) {
status.account.display_name = status.account.username;
}
switch(status.visibility) {
case "public":toot_privacy_mode=__("Public");toot_privacy_icon="globe";break;
case "unlisted":toot_privacy_mode=__("Unlisted");toot_privacy_icon="unlock-alt";break;
case "private":toot_privacy_mode=__("Followers-only");toot_privacy_icon="lock";break;
case "direct":toot_privacy_mode=__("Direct");toot_privacy_icon="envelope";break;
}
if(toot_privacy_icon == "globe" || toot_privacy_icon == "unlock-alt") {
toot_footer_width = " style='width:320px'";
toot_reblog_button = (`<div class="toot_reaction">
<button class="boost_button" tid="${status.id}" reblogged="${status.reblogged}">
<i class="fa fa-fw fa-retweet"></i>
<span class="reaction_count boost_count">${toot_reblogs_count}</span>
</button>
</div>`);
}
else {
toot_footer_width = "";
toot_reblog_button = "";
}
var own_toot_buttons = "";
if(status.account.acct == current_acct) {
var own_toot_buttons = (`<li><a class="delete_button" tid="${status.id}">${__('Delete Toot')}</a></li>`);
if(status.pinned == true) {
own_toot_buttons += (`<li><a class="unpin_button" tid="${status.id}">${__('Unpin Toot')}</a></li>`);
}
else {
own_toot_buttons += (`<li><a class="pin_button" tid="${status.id}">${__('Pin Toot')}</a></li>`);
}
}
else {
var own_toot_buttons = (`<li><a class="mute_button" mid="${status.account.id}" sid="${status.id}">${__('Mute')} @${status.account.username}</a></li>
<li><a class="block_button" mid="${status.account.id}" sid="${status.id}">${__('Block')} @${status.account.username}</a></li>
<li><a class="addlist_button" mid="${status.account.id}" sid="${status.id}" display_name="${status.account.display_name}">${__('Add to list')} @${status.account.username}</a></li>
<li><a class="report_button" mid="${status.account.id}" sid="${status.id}" display_name="${status.account.display_name}">${__('Report this Toot')}</a></li>`);
}
var is_account_locked = "";
if(status.account.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
const html=(`
<li sid="${status.id}" class="toot_entry">
<div class="toot_entry_body">
<a href="${status_account_link}">
<div class="icon_box">
<img src="${status.account.avatar}">
</div>
</a>
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${status_account_link}">
<span class="displayname emoji_poss">
${status.account.display_name}
</span>
<span class="username">
@${status.account.acct}${is_account_locked}
</span>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
</a>
</div>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="${status.url}">${__('Copy link to Toot')}</a></li>
${own_toot_buttons}
</ul>
<ul>
<li><a href="${status.url}" target="_blank">${__('View original')}</a></li>
</ul>
</div>
</div>
</header>
<article class="toot_article ${article_option}">
${alart_text}
<span class="status_content emoji_poss">
${status.content}
</span>
${media_views}
</article>
<footer class="toot_footer"${toot_footer_width}>
<div class="toot_reaction">
<button class="reply_button" tid="${status.id}" mentions='${JSON.stringify(status.mentions)}' display_name="${status.account.display_name}" privacy="${status.visibility}">
<i class="fa fa-fw fa-reply"></i>
<span class="reaction_count reply_count"></span>
</button>
</div>
${toot_reblog_button}
<div class="toot_reaction">
<button class="fav_button" tid="${status.id}" favourited="${status.favourited}">
<i class="fa fa-fw fa-star"></i>
<span class="reaction_count fav_count">${toot_favourites_count}</span>
</button>
</div>
<div class="toot_reaction">
<button>
<i class="fa fa-fw fa-${toot_privacy_icon}" title="${toot_privacy_mode}"></i>
</button>
</div>
</footer>
</section>
</div>
</li>`);
return $(html)
} else {
for(i=0;i<status.reblog.emojis.length;i++) {
status.reblog.content = status.reblog.content.replace(new RegExp(":"+status.reblog.emojis[i].shortcode+":","g"),"<img src='"+status.reblog.emojis[i].url+"' class='emoji'>");
}
status.account.display_name = htmlEscape(status.account.display_name);
for(i=0;i<status.account.emojis.length;i++) {
status.account.display_name = status.account.display_name.replace(new RegExp(":"+status.account.emojis[i].shortcode+":","g"),"<img src='"+status.account.emojis[i].url+"' class='emoji'>");
}
status.reblog.account.display_name = htmlEscape(status.reblog.account.display_name);
for(i=0;i<status.reblog.account.emojis.length;i++) {
status.reblog.account.display_name = status.reblog.account.display_name.replace(new RegExp(":"+status.reblog.account.emojis[i].shortcode+":","g"),"<img src='"+status.reblog.account.emojis[i].url+"' class='emoji'>");
}
var writtenby = new Object();
writtenby.id = status.reblog.account.id;
writtenby.username = status.reblog.account.username;
writtenby.url = status.reblog.account.url;
writtenby.acct = status.reblog.account.acct;
status.reblog.mentions.push(writtenby);
const status_datetime= getRelativeDatetime(Date.now(), getConversionedDate(null, status.reblog.created_at)),
status_attr_datetime = getConversionedDate(null, status.reblog.created_at),
status_reblog_account_link = getRelativeURL(status.reblog.account.url, status.reblog.account.id),
status_account_link= getRelativeURL(status.account.url, status.account.id);
let alart_text= "",
article_option= "",
toot_reblogs_count= "",
toot_favourites_count = "",
media_views = "";
if(status.reblog.spoiler_text && localStorage.setting_show_content_warning == "false") {
alart_text = "<span>"+status.reblog.spoiler_text+"</span><button class='cw_button'>"+__('SHOW MORE')+"</button>",
article_option = "content_warning";
}
else if(status.reblog.spoiler_text && localStorage.setting_show_content_warning == "true") {
alart_text = "<span>"+status.reblog.spoiler_text+"</span><button class='cw_button'>"+__('SHOW LESS')+"</button>";
}
if (status.reblog.reblogs_count) {
toot_reblogs_count = status.reblog.reblogs_count;
}
if (status.reblog.favourites_count) {
toot_favourites_count = status.reblog.favourites_count;
}
if ( status.reblog.media_attachments.length ) {
media_views = mediaattachments_template(status.reblog);
}
if(status.account.display_name.length == 0) {
status.account.display_name = status.account.username;
}
if(status.reblog.account.display_name.length == 0) {
status.reblog.account.display_name = status.reblog.account.username;
}
switch(status.reblog.visibility) {
case "public":toot_privacy_mode=__("Public");toot_privacy_icon="globe";break;
case "unlisted":toot_privacy_mode=__("Unlisted");toot_privacy_icon="unlock-alt";break;
}
var own_toot_buttons = "";
if(status.reblog.account.acct == current_acct) {
var own_toot_buttons = (`<li><a class="delete_button" tid="${status.reblog.id}">${__('Delete Toot')}</a></li>`);
if(status.reblog.pinned == true) {
own_toot_buttons += (`<li><a class="unpin_button" tid="${status.reblog.id}">${__('Unpin Toot')}</a></li>`);
}
else {
own_toot_buttons += (`<li><a class="pin_button" tid="${status.reblog.id}">${__('Pin Toot')}</a></li>`);
}
}
else {
var own_toot_buttons = (`<li><a class="mute_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}">${__('Mute')} @${status.reblog.account.username}</a></li>
<li><a class="block_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}">${__('Block')} @${status.reblog.account.username}</a></li>
<li><a class="addlist_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}" display_name="${status.reblog.account.display_name}">${__('Add to list')} @${status.reblog.account.username}</a></li>
<li><a class="report_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}" display_name="${status.reblog.account.display_name}">${__('Report this Toot')}</a></li>`);
}
var is_account_locked = "";
if(status.reblog.account.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
const html = (`
<li sid="${status.id}" class="toot_entry">
<div class="boost_author_box">
<a href="${status_account_link}">
<span class="emoji_poss"><i class="fa fa-fw fa-retweet"></i>${status.account.display_name} ${__('Boosted')}</span>
</a>
</div>
<div class="toot_entry_body">
<a href="${status_reblog_account_link}">
<div class="icon_box">
<img src="${status.reblog.account.avatar}">
</div>
</a>
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${status_reblog_account_link}">
<span class="displayname emoji_poss">
${status.reblog.account.display_name}
</span>
<span class="username">
@${status.reblog.account.acct}${is_account_locked}
</span>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
</a>
</div>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="${status.reblog.url}" >${__('Copy link to Toot')}</a></li>
${own_toot_buttons}
</ul>
<ul>
<li><a href="${status.reblog.url}" target="_blank">${__('View original')}</a></li>
</ul>
</div>
</div>
</header>
<article class="toot_article ${article_option}">
${alart_text}
<span class="status_content emoji_poss">
${status.reblog.content}
</span>
${media_views}
</article>
<footer class="toot_footer" style="width:320px">
<div class="toot_reaction">
<button class="reply_button" tid="${status.reblog.id}" mentions='${JSON.stringify(status.reblog.mentions)}' display_name="${status.reblog.account.display_name}" privacy="${status.reblog.visibility}">
<i class="fa fa-fw fa-reply"></i>
<span class="reaction_count reply_count"></span>
</button>
</div>
<div class="toot_reaction">
<button class="boost_button" tid="${status.reblog.id}" reblogged="${status.reblog.reblogged}">
<i class="fa fa-fw fa-retweet"></i>
<span class="reaction_count boost_count">${toot_reblogs_count}</span>
</button>
</div>
<div class="toot_reaction">
<button class="fav_button" tid="${status.reblog.id}" favourited="${status.reblog.favourited}">
<i class="fa fa-fw fa-star"></i>
<span class="reaction_count fav_count">${toot_favourites_count}</span>
</button>
</div>
<div class="toot_reaction">
<button>
<i class="fa fa-fw fa-${toot_privacy_icon}" title="${toot_privacy_mode}"></i>
</button>
</div>
</footer>
</section>
</div>
</li>`);
return $(html)
}
}
function timeline_pinned_template(status) {
for(i=0;i<status.emojis.length;i++) {
status.content = status.content.replace(new RegExp(":"+status.emojis[i].shortcode+":","g"),"<img src='"+status.emojis[i].url+"' class='emoji'>");
}
status.account.display_name = htmlEscape(status.account.display_name);
for(i=0;i<status.account.emojis.length;i++) {
status.account.display_name = status.account.display_name.replace(new RegExp(":"+status.account.emojis[i].shortcode+":","g"),"<img src='"+status.account.emojis[i].url+"' class='emoji'>");
}
var writtenby = new Object();
writtenby.id = status.account.id;
writtenby.username = status.account.username;
writtenby.url = status.account.url;
writtenby.acct = status.account.acct;
status.mentions.push(writtenby);
const status_datetime= getRelativeDatetime(Date.now(), getConversionedDate(null, status.created_at)),
status_attr_datetime = getConversionedDate(null, status.created_at),
status_account_link= getRelativeURL(status.account.url, status.account.id);
let alart_text= "",
article_option= "",
toot_reblogs_count= "",
toot_favourites_count = "",
media_views = "";
if(status.spoiler_text && localStorage.setting_show_content_warning == "false") {
alart_text = "<span>"+status.spoiler_text+"</span><button class='cw_button'>"+__('SHOW MORE')+"</button>",
article_option = "content_warning";
}
else if(status.spoiler_text && localStorage.setting_show_content_warning == "true") {
alart_text = "<span>"+status.spoiler_text+"</span><button class='cw_button'>"+__('SHOW LESS')+"</button>";
}
if (status.reblogs_count) {
toot_reblogs_count = status.reblogs_count;
}
if (status.favourites_count) {
toot_favourites_count = status.favourites_count;
}
if ( status.media_attachments.length ) {
media_views = mediaattachments_template(status);
}
if(status.account.display_name.length == 0) {
status.account.display_name = status.account.username;
}
switch(status.visibility) {
case "public":toot_privacy_mode=__("Public");toot_privacy_icon="globe";break;
case "unlisted":toot_privacy_mode=__("Unlisted");toot_privacy_icon="unlock-alt";break;
}
var own_toot_buttons = "";
if(status.account.acct == current_acct) {
var own_toot_buttons = (`<li><a class="delete_button" tid="${status.id}">${__('Delete Toot')}</a></li>
<li><a class="unpin_button" tid="${status.id}">${__('Unpin Toot')}</a></li>`);
}
else {
var own_toot_buttons = (`<li><a class="mute_button" mid="${status.account.id}" sid="${status.id}">${__('Mute')} @${status.account.username}</a></li>
<li><a class="block_button" mid="${status.account.id}" sid="${status.id}">${__('Block')} @${status.account.username}</a></li>
<li><a class="addlist_button" mid="${status.account.id}" sid="${status.id}" display_name="${status.account.display_name}">${__('Add to list')} @${status.account.username}</a></li>
<li><a class="report_button" mid="${status.account.id}" sid="${status.id}" display_name="${status.account.display_name}">${__('Report this Toot')}</a></li>`);
}
var is_account_locked = "";
if(status.account.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
const html = (`
<li sid="${status.id}" class="toot_entry">
<div class="pinned_notice_box">
<i class="fa fa-fw fa-thumb-tack"></i>${__('Pinned Toot')}</span>
</div>
<div class="toot_entry_body">
<a href="${status_account_link}">
<div class="icon_box">
<img src="${status.account.avatar}">
</div>
</a>
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${status_account_link}">
<span class="displayname emoji_poss">
${status.account.display_name}
</span>
<span class="username">
@${status.account.acct}${is_account_locked}
</span>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
</a>
</div>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="${status.url}" >${__('Copy link to Toot')}</a></li>
${own_toot_buttons}
</ul>
<ul>
<li><a href="${status.url}" target="_blank">${__('View original')}</a></li>
</ul>
</div>
</div>
</header>
<article class="toot_article ${article_option}">
${alart_text}
<span class="status_content emoji_poss">
${status.content}
</span>
${media_views}
</article>
<footer class="toot_footer" style="width:320px">
<div class="toot_reaction">
<button class="reply_button" tid="${status.id}" mentions='${JSON.stringify(status.mentions)}' display_name="${status.account.display_name}" privacy="${status.visibility}">
<i class="fa fa-fw fa-reply"></i>
<span class="reaction_count reply_count"></span>
</button>
</div>
<div class="toot_reaction">
<button class="boost_button" tid="${status.id}" reblogged="${status.reblogged}">
<i class="fa fa-fw fa-retweet"></i>
<span class="reaction_count boost_count">${toot_reblogs_count}</span>
</button>
</div>
<div class="toot_reaction">
<button class="fav_button" tid="${status.id}" favourited="${status.favourited}">
<i class="fa fa-fw fa-star"></i>
<span class="reaction_count fav_count">${toot_favourites_count}</span>
</button>
</div>
<div class="toot_reaction">
<button>
<i class="fa fa-fw fa-${toot_privacy_icon}" title="${toot_privacy_mode}"></i>
</button>
</div>
</footer>
</section>
</div>
</li>`);
return $(html)
}
function notifications_template(NotificationObj) {
const notice_author_link = getRelativeURL(NotificationObj.account.url, NotificationObj.account.id);
if(NotificationObj.account.display_name.length == 0) {
NotificationObj.account.display_name = NotificationObj.account.username;
}
NotificationObj.account.display_name = htmlEscape(NotificationObj.account.display_name);
for(i=0;i<NotificationObj.account.emojis.length;i++) {
NotificationObj.account.display_name = NotificationObj.account.display_name.replace(new RegExp(":"+NotificationObj.account.emojis[i].shortcode+":","g"),"<img src='"+NotificationObj.account.emojis[i].url+"' class='emoji'>");
}
if ( NotificationObj.type === 'favourite' | NotificationObj.type === 'reblog' ) {
const toot_author_link = getRelativeURL(NotificationObj.status.account.url, NotificationObj.status.account.id),
toot_datetime= getRelativeDatetime(Date.now(), getConversionedDate(null, NotificationObj.status.created_at)),
toot_attr_datetime = getConversionedDate(null, NotificationObj.status.created_at);
if( NotificationObj.type=='favourite' ){
for(i=0;i<NotificationObj.status.emojis.length;i++) {
NotificationObj.status.content = NotificationObj.status.content.replace(new RegExp(":"+NotificationObj.status.emojis[i].shortcode+":","g"),"<img src='"+NotificationObj.status.emojis[i].url+"' class='emoji'>");
}
NotificationObj.status.account.display_name = htmlEscape(NotificationObj.status.account.display_name);
for(i=0;i<NotificationObj.status.account.emojis.length;i++) {
NotificationObj.status.account.display_name = NotificationObj.status.account.display_name.replace(new RegExp(":"+NotificationObj.status.account.emojis[i].shortcode+":","g"),"<img src='"+NotificationObj.status.account.emojis[i].url+"' class='emoji'>");
}
var is_account_locked = "";
if(NotificationObj.status.account.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
const html = (`
<li sid="${NotificationObj.status.id}" class="notice_entry fav favourite toot_entry">
<div class="notice_author_box">
<a href="${notice_author_link}">
<div class="icon_box">
<img src="${NotificationObj.account.avatar}">
</div>
</a>
<i class="fa fa-fw fa-star font-icon favourite"></i>
<a class="notice_author" href="${notice_author_link}">
<span class="emoji_poss">${NotificationObj.account.display_name}</span> ${__('favourited Your Toot')}
</a>
</div>
<div class="notice_entry_body">
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${toot_author_link}">
<span class="displayname emoji_poss">
${NotificationObj.status.account.display_name}
</span>
<span class="username">
@${NotificationObj.status.account.acct}${is_account_locked}
</span>
</a>
</div>
</header>
<article class="toot_article emoji_poss">
<p>${NotificationObj.status.content}</p>
</article>
<footer class="toot_footer"></footer>
</section>
</div>
</li>`);
return $(html);
} else if ( NotificationObj.type === 'reblog' ) {
for(i=0;i<NotificationObj.status.emojis.length;i++) {
NotificationObj.status.content = NotificationObj.status.content.replace(new RegExp(":"+NotificationObj.status.emojis[i].shortcode+":","g"),"<img src='"+NotificationObj.status.emojis[i].url+"' class='emoji'>");
}
NotificationObj.status.account.display_name = htmlEscape(NotificationObj.status.account.display_name);
for(i=0;i<NotificationObj.status.account.emojis.length;i++) {
NotificationObj.status.account.display_name = NotificationObj.status.account.display_name.replace(new RegExp(":"+NotificationObj.status.account.emojis[i].shortcode+":","g"),"<img src='"+NotificationObj.status.account.emojis[i].url+"' class='emoji'>");
}
const sid= NotificationObj.status.id;
var is_account_locked = "";
if(NotificationObj.status.account.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
html = (`
<li sid="${NotificationObj.status.id}" class="notice_entry bos boost toot_entry">
<div class="notice_author_box">
<a href="${notice_author_link}">
<div class="icon_box">
<img src="${NotificationObj.account.avatar}">
</div>
</a>
<i class="fa fa-fw fa-retweet font-icon boost"></i>
<a class="notice_author" href="${notice_author_link}">
<span class="emoji_poss" >${NotificationObj.account.display_name}</span> ${__('boosted Your Toot')}
</a>
</div>
<blockquote class="notice_entry_body">
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${toot_author_link}">
<span class="displayname emoji_poss">
${NotificationObj.status.account.display_name}
</span>
<span class="username">
@${NotificationObj.status.account.acct}${is_account_locked}
</span>
</a>
</div>
</header>
<article class="toot_article emoji_poss">
<p>${NotificationObj.status.content}</p>
</article>
<footer class="toot_footer"></footer>
</section>
</blockquote>
</li>`);
return $(html);
}
} else if ( NotificationObj.type === 'mention' ) {
const toot_author_link = getRelativeURL(NotificationObj.status.account.url, NotificationObj.status.account.id),
toot_datetime= getRelativeDatetime(Date.now(), getConversionedDate(null, NotificationObj.status.created_at)),
toot_attr_datetime = getConversionedDate(null, NotificationObj.status.created_at);
let alart_text= "",
article_option= "",
toot_reblogs_count= "",
toot_favourites_count = "",
media_views = "";
for(i=0;i<NotificationObj.status.emojis.length;i++) {
NotificationObj.status.content = NotificationObj.status.content.replace(new RegExp(":"+NotificationObj.status.emojis[i].shortcode+":","g"),"<img src='"+NotificationObj.status.emojis[i].url+"' class='emoji'>");
}
NotificationObj.status.account.display_name = htmlEscape(NotificationObj.status.account.display_name);
for(i=0;i<NotificationObj.status.account.emojis.length;i++) {
NotificationObj.status.account.display_name = NotificationObj.status.account.display_name.replace(new RegExp(":"+NotificationObj.status.account.emojis[i].shortcode+":","g"),"<img src='"+NotificationObj.status.account.emojis[i].url+"' class='emoji'>");
}
var writtenby = new Object();
writtenby.id = NotificationObj.status.account.id;
writtenby.username = NotificationObj.status.account.username;
writtenby.url = NotificationObj.status.account.url;
writtenby.acct = NotificationObj.status.account.acct;
NotificationObj.status.mentions.push(writtenby);
if(NotificationObj.status.spoiler_text && localStorage.setting_show_content_warning == "false") {
alart_text = "<span>"+NotificationObj.status.spoiler_text+"</span><button class='cw_button'>"+__('SHOW MORE')+"</button>",
article_option = "content_warning";
}
else if(NotificationObj.status.spoiler_text && localStorage.setting_show_content_warning == "true") {
alart_text = "<span>"+NotificationObj.status.spoiler_text+"</span><button class='cw_button'>"+__('SHOW LESS')+"</button>";
}
if (NotificationObj.status.reblogs_count) {
toot_reblogs_count = NotificationObj.status.reblogs_count;
}
if (NotificationObj.status.favourites_count) {
toot_favourites_count = NotificationObj.status.favourites_count;
}
if (NotificationObj.status.media_attachments.length) {
media_views = mediaattachments_template(NotificationObj.status);
}
if(NotificationObj.status.account.display_name.length == 0) {
NotificationObj.status.account.display_name = NotificationObj.status.account.username;
}
switch(NotificationObj.status.visibility) {
case "public":toot_privacy_mode=__("Public");toot_privacy_icon="globe";break;
case "unlisted":toot_privacy_mode=__("Unlisted");toot_privacy_icon="unlock-alt";break;
case "private":toot_privacy_mode=__("Followers-only");toot_privacy_icon="lock";break;
case "direct":toot_privacy_mode=__("Direct");toot_privacy_icon="envelope";break;
}
if(toot_privacy_icon == "globe" || toot_privacy_icon == "unlock-alt") {
toot_footer_width = " style='width:320px'";
toot_reblog_button = (`<div class="toot_reaction">
<button class="boost_button" tid="${NotificationObj.status.id}" reblogged="${NotificationObj.status.reblogged}">
<i class="fa fa-fw fa-retweet"></i>
<span class="reaction_count boost_count">${toot_reblogs_count}</span>
</button>
</div>`);
}
else {
toot_footer_width = "";
toot_reblog_button = "";
}
var own_toot_buttons = "";
if(NotificationObj.status.account.acct == current_acct) {
var own_toot_buttons = (`<li><a class="delete_button" tid="${NotificationObj.status.id}">${__('Delete Toot')}</a></li>`);
if(NotificationObj.status.pinned == true) {
own_toot_buttons += (`<li><a class="unpin_button" tid="${NotificationObj.status.id}">${__('Unpin Toot')}</a></li>`);
}
else {
own_toot_buttons += (`<li><a class="pin_button" tid="${NotificationObj.status.id}">${__('Pin Toot')}</a></li>`);
}
}
else {
var own_toot_buttons = (`<li><a class="mute_button" mid="${NotificationObj.status.account.id}" sid="${NotificationObj.status.id}">${__('Mute')} @${NotificationObj.status.account.username}</a></li>
<li><a class="block_button" mid="${NotificationObj.status.account.id}" sid="${NotificationObj.status.id}">${__('Block')} @${NotificationObj.status.account.username}</a></li>
<li><a class="addlist_button" mid="${NotificationObj.status.account.id}" sid="${NotificationObj.status.id}" display_name="${NotificationObj.status.account.display_name}">${__('Add to list')} @${NotificationObj.status.account.username}</a></li>
<li><a class="report_button" mid="${NotificationObj.status.account.id}" sid="${NotificationObj.status.id}" display_name="${NotificationObj.account.display_name}">${__('Report this Toot')}</a></li>`);
}
var is_account_locked = "";
if(NotificationObj.status.account.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
const html=(`
<li sid="${NotificationObj.status.id}" class="toot_entry">
<div class="toot_entry_body">
<a href="${toot_author_link}">
<div class="icon_box">
<img src="${NotificationObj.status.account.avatar}">
</div>
</a>
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${toot_author_link}">
<span class="displayname emoji_poss">
${NotificationObj.status.account.display_name}
</span>
<span class="username">
@${NotificationObj.status.account.acct}${is_account_locked}
</span>
<time datetime="${toot_attr_datetime}">${toot_datetime}</time>
</a>
</div>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="${status.url}" >${__('Copy link to Toot')}</a></li>
${own_toot_buttons}
</ul>
<ul>
<li><a href="${NotificationObj.status.url}" target="_blank">${__('View original')}</a></li>
</ul>
</div>
</div>
</header>
<article class="toot_article ${article_option}">
${alart_text}
<span class="status_content emoji_poss">
${NotificationObj.status.content}
</span>
${media_views}
</article>
<footer class="toot_footer"${toot_footer_width}>
<div class="toot_reaction">
<button class="reply_button" tid="${NotificationObj.status.id}" mentions='${JSON.stringify(NotificationObj.status.mentions)}' display_name="${NotificationObj.account.display_name}" privacy="${NotificationObj.status.visibility}">
<i class="fa fa-fw fa-reply"></i>
<span class="reaction_count reply_count"></span>
</button>
</div>
${toot_reblog_button}
<div class="toot_reaction">
<button class="fav_button" tid="${NotificationObj.status.id}" favourited="${NotificationObj.status.favourited}">
<i class="fa fa-fw fa-star"></i>
<span class="reaction_count fav_count">${toot_favourites_count}</span>
</button>
</div>
<div class="toot_reaction">
<button>
<i class="fa fa-fw fa-${toot_privacy_icon}" title="${toot_privacy_mode}"></i>
</button>
</div>
</footer>
</section>
</div>
</li>`);
return $(html);
} else {
const html=(`
<li sid="${NotificationObj.id}" class="notice_entry fol">
<div class="notice_author_box">
<a href="${notice_author_link}">
<div class="icon_box">
<img src="${NotificationObj.account.avatar}">
</div>
</a>
<i class="fa fa-fw fa-user font-icon follow"></i>
<a class="notice_author" href="${notice_author_link}">
<span class="emoji_poss">${NotificationObj.account.display_name}</span> ${__('followed you')}
</a>
</div>
</li>`);
return $(html);
}
}
function follows_template(AccountObj) {
const profile_link = getRelativeURL(AccountObj.url,AccountObj.id);
if(AccountObj.display_name.length == 0) {
AccountObj.display_name = AccountObj.username;
}
AccountObj.display_name = htmlEscape(AccountObj.display_name);
for(i=0;i<AccountObj.emojis.length;i++) {
AccountObj.display_name = AccountObj.display_name.replace(new RegExp(":"+AccountObj.emojis[i].shortcode+":","g"),"<img src='"+AccountObj.emojis[i].url+"' class='emoji'>");
}
var is_account_locked = "";
if(AccountObj.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
var html = (`
<div class="follows_profile_box" mid="${AccountObj.id}">
<div class="follows_profile_header">
<img class="js_follows_header_image" src="${AccountObj.header}"/>
</div>
<div class="follows_profile">
<div class="follows_profile_icon">
<img class="js_follows_profile_image" src="${AccountObj.avatar}"/>
</div>
<button class="halcyon_button follow_button action_button" mid="${AccountObj.id}">
<i class="fa fa-fw fa-user-plus"></i>
<span>${__('Follow')}</span>
</button>
<div class="follows_profile_name_box">
<a class="js_follows_profile_link emoji_poss" href="${profile_link}">
<h2 class="js_follows_profile_displayname">
${AccountObj.display_name}
</h2>
<span class="js_follows_profile_username">
@${AccountObj.acct}${is_account_locked}
</span>
</a>
</div>
<div class="follows_profile_bio emoji_poss">
<p>${AccountObj.note}</p>
</div>
</div>
</div>`);
html = html.replace(new RegExp('class="emojione"',"g"),'class=emoji');
return $(html);
}
function status_template(status, class_options) {
if ( status.reblog === null ) {
const status_account_link= getRelativeURL(status.account.url, status.account.id),
status_datetime= getConversionedDate(null, status.created_at),
status_attr_datetime = getConversionedDate(null, status.created_at);
let alart_text= "",
article_option= "",
toot_reblogs_count= "",
toot_favourites_count = "",
media_views = "";
for(i=0;i<status.emojis.length;i++) {
status.content = status.content.replace(new RegExp(":"+status.emojis[i].shortcode+":","g"),"<img src='"+status.emojis[i].url+"' class='emoji'>");
}
status.account.display_name = htmlEscape(status.account.display_name);
for(i=0;i<status.account.emojis.length;i++) {
status.account.display_name = status.account.display_name.replace(new RegExp(":"+status.account.emojis[i].shortcode+":","g"),"<img src='"+status.account.emojis[i].url+"' class='emoji'>");
}
var writtenby = new Object();
writtenby.id = status.account.id;
writtenby.username = status.account.username;
writtenby.url = status.account.url;
writtenby.acct = status.account.acct;
status.mentions.push(writtenby);
if(status.spoiler_text && localStorage.setting_show_content_warning == "false") {
alart_text = "<span>"+status.spoiler_text+"</span><button class='cw_button'>"+__('SHOW MORE')+"</button>",
article_option = "content_warning";
}
else if(status.spoiler_text && localStorage.setting_show_content_warning == "true") {
alart_text = "<span>"+status.spoiler_text+"</span><button class='cw_button'>"+__('SHOW LESS')+"</button>";
}
if (status.reblogs_count) {
toot_reblogs_count = status.reblogs_count;
}
if (status.favourites_count) {
toot_favourites_count = status.favourites_count;
}
if (status.media_attachments.length) {
media_views = mediaattachments_template(status);
}
if(status.account.display_name.length == 0) {
status.account.display_name = status.account.username;
}
checked_public = "";
checked_unlisted = "";
checked_private = "";
checked_direct = "";
switch(status.visibility) {
case "public":toot_privacy_mode=__("Public");toot_privacy_icon="globe";checked_public=" checked";break;
case "unlisted":toot_privacy_mode=__("Unlisted");toot_privacy_icon="unlock-alt";checked_unlisted=" checked";break;
case "private":toot_privacy_mode=__("Followers-only");toot_privacy_icon="lock";checked_private=" checked";break;
case "direct":toot_privacy_mode=__("Direct");toot_privacy_icon="envelope";checked_direct=" checked";break;
}
if(toot_privacy_icon == "globe" || toot_privacy_icon == "unlock-alt") {
toot_footer_width = " style='width:320px'";
toot_reblog_button = (`<div class="toot_reaction">
<button class="boost_button" tid="${status.id}" reblogged="${status.reblogged}">
<i class="fa fa-fw fa-retweet"></i>
<span class="reaction_count boost_count">${toot_reblogs_count}</span>
</button>
</div>`);
}
else {
toot_footer_width = "";
toot_reblog_button = "";
}
var own_toot_buttons = "";
if(status.account.acct == current_acct) {
var own_toot_buttons = (`<li><a class="delete_button" tid="${status.id}">${__('Delete Toot')}</a></li>`);
if(status.pinned == true) {
own_toot_buttons += (`<li><a class="unpin_button" tid="${status.id}">${__('Unpin Toot')}</a></li>`);
}
else {
own_toot_buttons += (`<li><a class="pin_button" tid="${status.id}">${__('Pin Toot')}</a></li>`);
}
}
else {
var own_toot_buttons = (`<li><a class="mute_button" mid="${status.account.id}" sid="${status.id}">${__('Mute')} @${status.account.username}</a></li>
<li><a class="block_button" mid="${status.account.id}" sid="${status.id}">${__('Block')} @${status.account.username}</a></li>
<li><a class="addlist_button" mid="${status.account.id}" sid="${status.id}" display_name="${status.account.display_name}">${__('Add to list')} @${status.account.username}</a></li>
<li><a class="report_button" mid="${status.account.id}" sid="${status.id}" display_name="${status.account.display_name}">${__('Report this Toot')}</a></li>`);
}
var is_account_locked = "";
if(status.account.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
const html=(`
<div sid="${status.id}" class="toot_detail ${class_options}">
<div class="toot_detail_body">
<header class="toot_header">
<div class="icon_box">
<img src="${status.account.avatar}">
</div>
<a href="${status_account_link}">
<span class="displayname emoji_poss">
${status.account.display_name}
</span>
<span class="username">
@${status.account.acct}${is_account_locked}
</span>
</a>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="${status.url}" >${__('Copy link to Toot')}</a></li>
${own_toot_buttons}
</ul>
<ul>
<li><a href="${status.url}" target="_blank">${__('View original')}</a></li>
</ul>
</div>
</div>
</header>
<section class="toot_content">
<article class="toot_article ${article_option} emoji_poss">
${alart_text}
<span class="status_content emoji_poss">
${status.content}
</span>
${media_views}
</article>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
</section>
<footer class="toot_footer"${toot_footer_width}>
<div class="toot_reaction">
<button class="reply_button" tid="${status.id}" mentions='${JSON.stringify(status.mentions)}' display_name="${status.account.display_name}" privacy="${status.visibility}">
<i class="fa fa-fw fa-reply"></i>
<span class="reaction_count reply_count"></span>
</button>
</div>
${toot_reblog_button}
<div class="toot_reaction">
<button class="fav_button" tid="${status.id}" favourited="${status.favourited}">
<i class="fa fa-fw fa-star"></i>
<span class="reaction_count fav_count">${toot_favourites_count}</span>
</button>
</div>
<div class="toot_reaction">
<button>
<i class="fa fa-fw fa-${toot_privacy_icon}" title="${toot_privacy_mode}"></i>
</button>
</div>
</footer>
</div>
</div>
<form id="reply_status_form" name="reply_status_form" class="status_form" sid="${status.id}" mentions='${JSON.stringify(status.mentions)}'>
<div class="status_top">
<input class="status_spoiler invisible" name="status_spoiler" placeholder="${__('Content warning')}" type="text"/>
</div>
<div class="status_main">
<!-- current avatar -->
<div class="icon_box">
<img class="js_current_profile_image" src="${current_avatar}" />
</div>
<!-- text area -->
<div class="status_textarea">
<textarea class="emoji_poss" name="status_textarea" placeholder="${__('Toot your reply')}"></textarea>
<div class="media_attachments_preview_area invisible"></div>
</div>
</div>
<div class="status_bottom invisible">
<!-- Media Attachment -->
<label for="reply_status_media_atta" class="status_media_attachment status_option_button">
<i class="fa fa-camera" aria-hidden="true"></i>
</label>
<!-- Content warning -->
<label for="reply_status_cw" class="status_CW status_option_button">
<span class="disallow_select">CW</span>
</label>
<!-- Not safe for work -->
<label for="reply_status_nsfw" class="status_NSFW status_option_button">
<span class="disallow_select">NSFW</span>
</label>
<!-- Privacy options -->
<div class="status_privacy status_option_button expand_privacy_menu_button">
<!-- Expand menu -->
<i class="fa fa-${toot_privacy_icon}" aria-hidden="true"></i>
<!-- Privacy options -->
<div class="expand_privacy_menu invisible">
<label for="reply_status_public" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-globe">
<i class="fa fa-globe" aria-hidden="true"></i>${__('Public')}
</label>
<label for="reply_status_unlisted" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-unlock-alt">
<i class="fa fa-unlock-alt" aria-hidden="true"></i>${__('Unlisted')}
</label>
<label for="reply_status_fonly" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-lock">
<i class="fa fa-lock" aria-hidden="true"></i>${__('Followers-only')}
</label>
<label for="reply_status_direct" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-envelope">
<i class="fa fa-envelope" aria-hidden="true"></i>${__('Direct')}
</label>
</div>
</div>
<label for="reply_status_emoji" class="status_emoji status_option_button">
<i class="fa fa-smile-o" aria-hidden="true"></i>
</label>
<input id="reply_status_media_atta" name="files" type="file" multiple class="invisible"/>
<input id="reply_status_cw" name="status_cw" type="checkbox" class="invisible" />
<input id="reply_status_nsfw" name="status_nsfw" type="checkbox" class="invisible" />
<input id="reply_status_public" name='privacy_option' value="public" class="invisible" type="radio"${checked_public}>
<input id="reply_status_unlisted" name='privacy_option' value="unlisted" class="invisible" type="radio"${checked_unlisted}>
<input id="reply_status_fonly" name='privacy_option' value="private" class="invisible" type="radio"${checked_private}>
<input id="reply_status_direct" name='privacy_option' value="direct" class="invisible" type="radio"${checked_direct}>
<div id="reply_status_emoji" name="status_emoji" type="button"></div>
<div class="submit_status_label_wrap">
<span class="character_count">
${current_instance_charlimit}
</span>
<!-- Submit -->
<label for="reply_status_form_submit" class="submit_status_label">
<div class="toot_button_label disallow_select">
<i class="fa fa-reply" aria-hidden="true"></i>
<span>${__('Reply')}</span>
</div>
</label>
</div>
<input id="reply_status_form_submit" class="submit_status" type="button" class="invisible"/>
</div>
</form>`);
history.pushState(null, null, getRelativeURL(status.account.url, status.account.id, '/status/'+status.id));
return $(html)
} else {
const status_datetime= getConversionedDate(null, status.reblog.created_at),
status_attr_datetime = getConversionedDate(null, status.reblog.created_at),
status_reblog_account_link = getRelativeURL(status.reblog.account.url, status.reblog.account.id),
status_account_link= getRelativeURL(status.reblog.account.url, status.reblog.account.id);
let alart_text= "",
article_option= "",
toot_reblogs_count= "",
toot_favourites_count = "",
media_views = "";
for(i=0;i<status.reblog.emojis.length;i++) {
status.reblog.content = status.reblog.content.replace(new RegExp(":"+status.reblog.emojis[i].shortcode+":","g"),"<img src='"+status.reblog.emojis[i].url+"' class='emoji'>");
}
status.account.display_name = htmlEscape(status.account.display_name);
for(i=0;i<status.account.emojis.length;i++) {
status.account.display_name = status.account.display_name.replace(new RegExp(":"+status.account.emojis[i].shortcode+":","g"),"<img src='"+status.account.emojis[i].url+"' class='emoji'>");
}
status.reblog.account.display_name = htmlEscape(status.reblog.account.display_name);
for(i=0;i<status.reblog.account.emojis.length;i++) {
status.reblog.account.display_name = status.reblog.account.display_name.replace(new RegExp(":"+status.reblog.account.emojis[i].shortcode+":","g"),"<img src='"+status.reblog.account.emojis[i].url+"' class='emoji'>");
}
var writtenby = new Object();
writtenby.id = status.reblog.account.id;
writtenby.username = status.reblog.account.username;
writtenby.url = status.reblog.account.url;
writtenby.acct = status.reblog.account.acct;
status.reblog.mentions.push(writtenby);
if(status.reblog.spoiler_text && localStorage.setting_show_content_warning == "false") {
alart_text = "<span>"+status.reblog.spoiler_text+"</span><button class='cw_button'>"+__('SHOW MORE')+"</button>",
article_option = "content_warning";
}
else if(status.reblog.spoiler_text && localStorage.setting_show_content_warning == "true") {
alart_text = "<span>"+status.reblog.spoiler_text+"</span><button class='cw_button'>"+__('SHOW LESS')+"</button>";
}
if (status.reblog.reblogs_count) {
toot_reblogs_count = status.reblog.reblogs_count;
}
if (status.reblog.favourites_count) {
toot_favourites_count = status.reblog.favourites_count;
}
if(status.reblog.media_attachments.length){
media_views = mediaattachments_template(status.reblog);
}
if(status.account.display_name.length == 0) {
status.account.display_name = status.account.username;
}
if(status.reblog.account.display_name.length == 0) {
status.reblog.account.display_name = status.reblog.account.username;
}
checked_public = "";
checked_unlisted = "";
switch(status.reblog.visibility) {
case "public":toot_privacy_mode=__("Public");toot_privacy_icon="globe";checked_public=" checked";break;
case "unlisted":toot_privacy_mode=__("Unlisted");toot_privacy_icon="unlock-alt";checked_unlisted=" checked";break;
}
var own_toot_buttons = "";
if(status.reblog.account.acct == current_acct) {
var own_toot_buttons = (`<li><a class="delete_button" tid="${status.reblog.id}">${__('Delete Toot')}</a></li>`);
if(status.reblog.pinned == true) {
own_toot_buttons += (`<li><a class="unpin_button" tid="${status.reblog.id}">${__('Unpin Toot')}</a></li>`);
}
else {
own_toot_buttons += (`<li><a class="pin_button" tid="${status.reblog.id}">${__('Pin Toot')}</a></li>`);
}
}
else {
var own_toot_buttons = (`<li><a class="mute_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}">${__('Mute')} @${status.reblog.account.username}</a></li>
<li><a class="block_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}">${__('Block')} @${status.reblog.account.username}</a></li>
<li><a class="addlist_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}" display_name="${status.reblog.account.display_name}">${__('Add to list')} @${status.reblog.account.username}</a></li>
<li><a class="report_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}" display_name="${status.reblog.account.display_name}">${__('Report this Toot')}</a></li>`);
}
var is_account_locked = "";
if(status.reblog.account.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
const html=(`
<div sid="${status.reblog.id}" class="toot_detail ${class_options}">
<div class="toot_detail_body">
<header class="toot_header">
<div class="icon_box">
<img src="${status.reblog.account.avatar}">
</div>
<a href="${status_account_link}">
<span class="displayname emoji_poss">
${status.reblog.account.display_name}
</span>
<span class="username">
@${status.reblog.account.acct}${is_account_locked}
</span>
</a>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="${status.reblog.url}" >${__('Copy link to Toot')}</a></li>
${own_toot_buttons}
</ul>
<ul>
<li><a href="${status.reblog.url}" target="_blank">${__('View original')}</a></li>
</ul>
</div>
</div>
</header>
<section class="toot_content">
<article class="toot_article ${article_option} emoji_poss">
${alart_text}
<span class="status_content emoji_poss">
${status.reblog.content}
</span>
${media_views}
</article>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
</section>
<footer class="toot_footer" style="width:320px">
<div class="toot_reaction">
<button class="reply_button" tid="${status.reblog.id}" mentions='${JSON.stringify(status.reblog.mentions)}' display_name="${status.reblog.account.display_name}" privacy="${status.reblog.visibility}">
<i class="fa fa-fw fa-reply"></i>
<span class="reaction_count reply_count"></span>
</button>
</div>
<div class="toot_reaction">
<button class="boost_button" tid="${status.reblog.id}" reblogged="${status.reblog.reblogged}">
<i class="fa fa-fw fa-retweet"></i>
<span class="reaction_count boost_count">${toot_reblogs_count}</span>
</button>
</div>
<div class="toot_reaction">
<button class="fav_button" tid="${status.reblog.id}" favourited="${status.reblog.favourited}">
<i class="fa fa-fw fa-star"></i>
<span class="reaction_count fav_count">${toot_favourites_count}</span>
</button>
</div>
<div class="toot_reaction">
<button>
<i class="fa fa-fw fa-${toot_privacy_icon}" title="${toot_privacy_mode}"></i>
</button>
</div>
</footer>
</div>
</div>
<form id="reply_status_form" name="reply_status_form" class="status_form" sid="${status.reblog.id}" mentions='${JSON.stringify(status.reblog.mentions)}'>
<div class="status_top">
<input class="status_spoiler invisible" name="status_spoiler" placeholder="${__('Content warning')}" type="text"/>
</div>
<div class="status_main">
<!-- current avatar -->
<div class="icon_box">
<img class="js_current_profile_image" src="${current_avatar}" />
</div>
<!-- text area -->
<div class="status_textarea">
<textarea class="emoji_poss" name="status_textarea" placeholder="${__('Toot your reply')}"></textarea>
<div class="media_attachments_preview_area invisible"></div>
</div>
</div>
<div class="status_bottom invisible">
<!-- Media Attachment -->
<label for="reply_status_media_atta" class="status_media_attachment status_option_button">
<i class="fa fa-camera" aria-hidden="true"></i>
</label>
<!-- Content warning -->
<label for="reply_status_cw" class="status_CW status_option_button">
<span class="disallow_select">CW</span>
</label>
<!-- Not safe for work -->
<label for="reply_status_nsfw" class="status_NSFW status_option_button">
<span class="disallow_select">NSFW</span>
</label>
<!-- Privacy options -->
<div class="status_privacy status_option_button expand_privacy_menu_button">
<!-- Expand menu -->
<i class="fa fa-${toot_privacy_icon}" aria-hidden="true"></i>
<!-- Privacy options -->
<div class="expand_privacy_menu invisible">
<label for="reply_status_public" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-globe">
<i class="fa fa-globe" aria-hidden="true"></i>${__('Public')}
</label>
<label for="reply_status_unlisted" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-unlock-alt">
<i class="fa fa-unlock-alt" aria-hidden="true"></i>${__('Unlisted')}
</label>
<label for="reply_status_fonly" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-lock">
<i class="fa fa-lock" aria-hidden="true"></i>${__('Followers-only')}
</label>
<label for="reply_status_direct" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-envelope">
<i class="fa fa-envelope" aria-hidden="true"></i>${__('Direct')}
</label>
</div>
</div>
<label for="single_reply_status_emoji" class="status_emoji status_option_button">
<i class="fa fa-smile-o" aria-hidden="true"></i>
</label>
<input id="reply_status_media_atta" name="files" type="file" multiple class="invisible"/>
<input id="reply_status_cw" name="status_cw" type="checkbox" class="invisible" />
<input id="reply_status_nsfw" name="status_nsfw" type="checkbox" class="invisible" />
<input id="reply_status_public" name='privacy_option' value="public" class="invisible" type="radio"${checked_public}>
<input id="reply_status_unlisted" name='privacy_option' value="unlisted" class="invisible" type="radio"${checked_unlisted}>
<input id="reply_status_fonly" name='privacy_option' value="private" class="invisible" type="radio">
<input id="reply_status_direct" name='privacy_option' value="direct" class="invisible" type="radio">
<div id="reply_status_emoji" name="status_emoji" type="button"></div>
<div class="submit_status_label_wrap">
<span class="character_count">
${current_instance_charlimit}
</span>
<!-- Submit -->
<label for="reply_status_form_submit" class="submit_status_label">
<div class="toot_button_label disallow_select">
<i class="fa fa-reply" aria-hidden="true"></i>
<span>${__('Reply')}</span>
</div>
</label>
</div>
<input id="reply_status_form_submit" class="submit_status" type="button" class="invisible"/>
</div>
</form>
`);
history.pushState(null, null, getRelativeURL(status.reblog.account.url, status.reblog.id, '/status/'+status.reblog.id));
return $(html)
}
}
function media_template(status, mediaURL) {
if ( !status ) {
const html = (`
<div class="media_detail">
<div class="media_box">
<img src="${mediaURL}" />
</div>
</div>`);
return $(html)
} else {
const status_template = timeline_template(status).html(),
html = (`
<div class="media_detail">
<div class="media_box">
<img src="${mediaURL}" />
</div>
<div class="toot_entry" sid="${status.id}">
${status_template}
</div>
</div>`);
return $(html)
}
}
function context_template(status, class_options) {
if ( status.reblog === null ) {
const status_account_link= getRelativeURL(status.account.url, status.account.id),
status_datetime= getRelativeDatetime(Date.now(), getConversionedDate(null, status.created_at)),
status_attr_datetime = getConversionedDate(null, status.created_at);
let alart_text= "",
article_option= "",
toot_reblogs_count= "",
toot_favourites_count = "",
media_views = "";
for(i=0;i<status.emojis.length;i++) {
status.content = status.content.replace(new RegExp(":"+status.emojis[i].shortcode+":","g"),"<img src='"+status.emojis[i].url+"' class='emoji'>");
}
status.account.display_name = htmlEscape(status.account.display_name);
for(i=0;i<status.account.emojis.length;i++) {
status.account.display_name = status.account.display_name.replace(new RegExp(":"+status.account.emojis[i].shortcode+":","g"),"<img src='"+status.account.emojis[i].url+"' class='emoji'>");
}
var writtenby = new Object();
writtenby.id = status.account.id;
writtenby.username = status.account.username;
writtenby.url = status.account.url;
writtenby.acct = status.account.acct;
status.mentions.push(writtenby);
if(status.spoiler_text && localStorage.setting_show_content_warning == "false") {
alart_text = "<span>"+status.spoiler_text+"</span><button class='cw_button'>"+__('SHOW MORE')+"</button>",
article_option = "content_warning";
}
else if(status.spoiler_text && localStorage.setting_show_content_warning == "true") {
alart_text = "<span>"+status.spoiler_text+"</span><button class='cw_button'>"+__('SHOW LESS')+"</button>";
}
if (status.reblogs_count) {
toot_reblogs_count = status.reblogs_count;
}
if (status.favourites_count) {
toot_favourites_count = status.favourites_count;
}
if( status.media_attachments.length) {
media_views = mediaattachments_template(status);
}
if(status.account.display_name.length == 0) {
status.account.display_name = status.account.username;
}
switch(status.visibility) {
case "public":toot_privacy_mode=__("Public");toot_privacy_icon="globe";break;
case "unlisted":toot_privacy_mode=__("Unlisted");toot_privacy_icon="unlock-alt";break;
case "private":toot_privacy_mode=__("Followers-only");toot_privacy_icon="lock";break;
case "direct":toot_privacy_mode=__("Direct");toot_privacy_icon="envelope";break;
}
if(toot_privacy_icon == "globe" || toot_privacy_icon == "unlock-alt") {
toot_footer_width = " style='width:320px'";
toot_reblog_button = (`<div class="toot_reaction">
<button class="boost_button" tid="${status.id}" reblogged="${status.reblogged}">
<i class="fa fa-fw fa-retweet"></i>
<span class="reaction_count boost_count">${toot_reblogs_count}</span>
</button>
</div>`);
}
else {
toot_footer_width = "";
toot_reblog_button = "";
}
var own_toot_buttons = "";
if(status.account.acct == current_acct) {
var own_toot_buttons = (`<li><a class="delete_button" tid="${status.id}">${__('Delete Toot')}</a></li>`);
if(status.pinned == true) {
own_toot_buttons += (`<li><a class="unpin_button" tid="${status.id}">${__('Unpin Toot')}</a></li>`);
}
else {
own_toot_buttons += (`<li><a class="pin_button" tid="${status.id}">${__('Pin Toot')}</a></li>`);
}
}
else {
var own_toot_buttons = (`<li><a class="mute_button" mid="${status.account.id}" sid="${status.id}">${__('Mute')} @${status.account.username}</a></li>
<li><a class="block_button" mid="${status.account.id}" sid="${status.id}">${__('Block')} @${status.account.username}</a></li>
<li><a class="addlist_button" mid="${status.account.id}" sid="${status.id}" display_name="${status.account.display_name}">${__('Add to list')} @${status.account.username}</a></li>
<li><a class="report_button" mid="${status.account.id}" sid="${status.id}" display_name="${status.account.display_name}">${__('Report this Toot')}</a></li>`);
}
var is_account_locked = "";
if(status.account.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
const html=(`
<div sid="${status.id}" class="toot_entry ${class_options}">
<div class="toot_entry_body">
<div class="icon_box">
<img src="${status.account.avatar}">
</div>
<section class="toot_content">
<header class="toot_header">
<a href="${status_account_link}">
<span class="displayname emoji_poss">
${status.account.display_name}
</span>
<span class="username">
@${status.account.acct}${is_account_locked}
</span>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
</a>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="" >${__('Copy link to Toot')}</a></li>
${own_toot_buttons}
</ul>
<ul>
<li><a href="${status.url}" target="_blank">${__('View original')}</a></li>
</ul>
</div>
</div>
</header>
<article class="toot_article ${article_option}">
${alart_text}
<span class="status_content emoji_poss">
${status.content}
</span>
${media_views}
</article>
<footer class="toot_footer"${toot_footer_width}>
<div class="toot_reaction">
<button class="reply_button" tid="${status.id}" mentions='${JSON.stringify(status.mentions)}' display_name="${status.account.display_name}" privacy="${status.visibility}">
<i class="fa fa-fw fa-reply"></i>
<span class="reaction_count reply_count"></span>
</button>
</div>
${toot_reblog_button}
<div class="toot_reaction">
<button class="fav_button" tid="${status.id}" favourited="${status.favourited}">
<i class="fa fa-fw fa-star"></i>
<span class="reaction_count fav_count">${toot_favourites_count}</span>
</button>
</div>
<div class="toot_reaction">
<button>
<i class="fa fa-fw fa-${toot_privacy_icon}" title="${toot_privacy_mode}"></i>
</button>
</div>
</footer>
</section>
</div>
</div>`);
return $(html)
} else {
const status_datetime= getRelativeDatetime(Date.now(), getConversionedDate(null, status.reblog.created_at)),
status_attr_datetime = getConversionedDate(null, status.reblog.created_at),
status_reblog_account_link = getRelativeURL(status.reblog.account.url, status.reblog.account.id),
status_account_link= getRelativeURL(status.account.url, status.account.id);
let alart_text= "",
article_option= "",
toot_reblogs_count= "",
toot_favourites_count = "",
media_views = "";
for(i=0;i<status.reblog.emojis.length;i++) {
status.reblog.content = status.reblog.content.replace(new RegExp(":"+status.reblog.emojis[i].shortcode+":","g"),"<img src='"+status.reblog.emojis[i].url+"' class='emoji'>");
}
status.account.display_name = htmlEscape(status.account.display_name);
for(i=0;i<status.account.emojis.length;i++) {
status.account.display_name = status.account.display_name.replace(new RegExp(":"+status.account.emojis[i].shortcode+":","g"),"<img src='"+status.account.emojis[i].url+"' class='emoji'>");
}
status.reblog.account.display_name = htmlEscape(status.reblog.account.display_name);
for(i=0;i<status.reblog.account.emojis.length;i++) {
status.reblog.account.display_name = status.reblog.account.display_name.replace(new RegExp(":"+status.reblog.account.emojis[i].shortcode+":","g"),"<img src='"+status.reblog.account.emojis[i].url+"' class='emoji'>");
}
var writtenby = new Object();
writtenby.id = status.reblog.account.id;
writtenby.username = status.reblog.account.username;
writtenby.url = status.reblog.account.url;
writtenby.acct = status.reblog.account.acct;
status.reblog.mentions.push(writtenby);
if(status.reblog.spoiler_text && localStorage.setting_show_content_warning == "false") {
alart_text = "<span>"+status.reblog.spoiler_text+"</span><button class='cw_button'>"+__('SHOW MORE')+"</button>",
article_option = "content_warning";
}
else if(status.reblog.spoiler_text && localStorage.setting_show_content_warning == "true") {
alart_text = "<span>"+status.reblog.spoiler_text+"</span><button class='cw_button'>"+__('SHOW LESS')+"</button>";
}
if (status.reblog.reblogs_count) {
toot_reblogs_count = status.reblog.reblogs_count;
}
if (status.reblog.favourites_count) {
toot_favourites_count = status.reblog.favourites_count;
}
if (status.reblog.media_attachments.length) {
media_views = mediaattachments_template(status.reblog);
}
if(status.account.display_name.length == 0) {
status.account.display_name = status.account.username;
}
if(status.reblog.account.display_name.length == 0) {
status.reblog.account.display_name = status.reblog.account.username;
}
switch(status.reblog.visibility) {
case "public":toot_privacy_mode=__("Public");toot_privacy_icon="globe";break;
case "unlisted":toot_privacy_mode=__("Unlisted");toot_privacy_icon="unlock-alt";break;
}
var own_toot_buttons = "";
if(status.reblog.account.acct == current_acct) {
var own_toot_buttons = (`<li><a class="delete_button" tid="${status.reblog.id}">${__('Delete Toot')}</a></li>`);
if(status.reblog.pinned == true) {
own_toot_buttons += (`<li><a class="unpin_button" tid="${status.reblog.id}">${__('Unpin Toot')}</a></li>`);
}
else {
own_toot_buttons += (`<li><a class="pin_button" tid="${status.reblog.id}">${__('Pin Toot')}</a></li>`);
}
}
else {
var own_toot_buttons = (`<li><a class="mute_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}">${__('Mute')} @${status.reblog.account.username}</a></li>
<li><a class="block_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}">${__('Block')} @${status.reblog.account.username}</a></li>
<li><a class="addlist_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}" display_name="${status.reblog.account.display_name}">${__('Add to list')} @${status.reblog.account.username}</a></li>
<li><a class="report_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}" display_name="${status.reblog.account.display_name}">${__('Report this Toot')}</a></li>`);
}
var is_account_locked = "";
if(status.reblog.account.locked == true) {
is_account_locked = " <i class='fa fa-lock'></i>";
}
const html=(`
<div sid="${status.id}" class="toot_entry ${class_options}">
<div class="boost_author_box">
<a href="${status_account_link}">
<span class="emoji_poss"><i class="fa fa-fw fa-retweet"></i>${status.account.display_name} ${__('Boosted')}</span>
</a>
</div>
<div class="toot_entry_body">
<div class="icon_box">
<img src="${status.reblog.account.avatar}">
</div>
<section class="toot_content">
<header class="toot_header">
<a href="${status_reblog_account_link}">
<span class="displayname emoji_poss">
${status.reblog.account.display_name}
</span>
<span class="username">
@${status.reblog.account.acct}${is_account_locked}
</span>
</a>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="" >${__('Copy link to Toot')}</a></li>
${own_toot_buttons}
</ul>
<ul>
<li><a href="${status.reblog.url}" target="_blank">${__('View original')}</a></li>
</ul>
</div>
</div>
</header>
<article class="toot_article ${article_option}">
${alart_text}
<span class="status_content emoji_poss">
${status.reblog.content}
</span>
${media_views}
</article>
<footer class="toot_footer" style="width:320px">
<div class="toot_reaction">
<button class="reply_button" tid="${status.reblog.id}" mentions='${JSON.stringify(status.reblog.mentions)}' display_name="${status.reblog.account.display_name}" privacy="${status.reblog.visibility}">
<i class="fa fa-fw fa-reply"></i>
<span class="reaction_count reply_count"></span>
</button>
</div>
<div class="toot_reaction">
<button class="boost_button" tid="${status.reblog.id}" reblogged="${status.reblog.reblogged}">
<i class="fa fa-fw fa-retweet"></i>
<span class="reaction_count boost_count">${toot_reblogs_count}</span>
</button>
</div>
<div class="toot_reaction">
<button class="fav_button" tid="${status.reblog.id}" favourited="${status.reblog.favourited}">
<i class="fa fa-fw fa-star"></i>
<span class="reaction_count fav_count">${toot_favourites_count}</span>
</button>
</div>
<div class="toot_reaction">
<button>
<i class="fa fa-fw fa-${toot_privacy_icon}" title="${toot_privacy_mode}"></i>
</button>
</div>
</footer>
</section>
</div>
</div>`);
return $(html)
}
}
