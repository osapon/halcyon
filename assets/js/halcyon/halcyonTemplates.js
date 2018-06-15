function mediaattachments_template_object(status, idx) {
  var media_views = '';
  if ( status.media_attachments[idx].type === "video" ) {
    let setting_autoplay_animated = localStorage.getItem("setting_autoplay_animated");
    media_views = (`
<div class="media_attachment" otype="video/gifv" mediacount="0" oid="${status.media_attachments[idx].id}" url="${status.media_attachments[idx].url}" mediacount="${idx}">
<video src="${status.media_attachments[idx].url}" frameborder="0" allowfullscreen ${setting_autoplay_animated=='false'?'':'autoplay'} loop muted controls></video>
</div>`);
  } else if ( status.media_attachments[idx].type === "gifv" ) {
    let setting_autoplay_animated = localStorage.getItem("setting_autoplay_animated");
    media_views = (`
  <div class="gif_mark"></div>
  <div class="media_attachment" otype="image" sid="${status.id}" oid="${status.media_attachments[idx].id}" url="${status.media_attachments[idx].url}" mediacount="${idx}">
  <video src="${status.media_attachments[idx].url}" frameborder="0" allowfullscreen ${setting_autoplay_animated=='false'?'':'autoplay'} loop muted window_view="enable"></video>
  </div>`);
  } else {
    media_views = (`
<div class="media_attachment" otype="image" sid="${status.id}" oid="${status.media_attachments[idx].id}" url="${status.media_attachments[idx].url}" mediacount="${idx}">
<img src="${status.media_attachments[idx].url}" window_view="enable" />
</div>`);
  }
  return media_views;
}

function mediaattachments_template(status) {
  let media_views = "";
  if(status.media_attachments[0].remote_url != null) {
    status.media_attachments[0].url = status.media_attachments[0].remote_url;
  }
  if ( status.media_attachments[0].url === "/files/original/missing.png" ) {
    return "";
  } else {
    if (( !status.sensitive ) && ( isSpoilerImage( status.media_attachments[0].id ) )) status.sensitive = true;
    media_views = `
<div class='media_views sensitive' media_length='${status.media_attachments.length}'>
<div class='spoiler_button ${status.sensitive?'invisible':''}'></div>
<div class='sensitive_alart ${!status.sensitive?'invisible':''}'>
<span class="text1">${Pomo.getText('Sensitive content')}</span>
<span class="text2">${Pomo.getText('Click to view')}</span>
</div>`;
  }
  if ( status.media_attachments.length <= 2 ) {
    for ( let i in status.media_attachments ) {
      if(status.media_attachments[i].remote_url != null) {
        status.media_attachments[i].url = status.media_attachments[i].remote_url;
      }
      media_views += mediaattachments_template_object(status, i);
    }
  } else {
    for ( let i in status.media_attachments ) {
      if (Number(i) === 1) {
        if(status.media_attachments[i].remote_url != null) {
          status.media_attachments[i].url = status.media_attachments[i].remote_url;
        }
        media_views += (`<div class="media_attachments_right">`);
        media_views += mediaattachments_template_object(status, i);
      } else {
        media_views += mediaattachments_template_object(status, i);
      }
    }
    media_views += "</div>";
  }
  media_views += "</div>";
  return media_views;
}

function timeline_template(status) {
  var target_account = {};
  if (status.reblog === null) {
    target_account = status.account;
  }
  else {
    target_account = status.reblog.account;
  }
  if ( target_account.acct.indexOf('@') == -1 ) target_account.acct = target_account.acct + '@' + current_instance;
  setWhoToFollow(target_account);
  if (status.reblog === null) {
    status.content = status.content.emoji_replace(status.emojis);
    const status_account_link= getRelativeURL(status.account.url, status.account.id),
    status_datetime= getRelativeDatetime(Date.now(), getConversionedDate(null, status.created_at)),
    status_attr_datetime = getConversionedDate(null, status.created_at);
    let alart_text= "",
    article_option= "",
    toot_reblogs_count= "",
    toot_favourites_count = "",
    media_views = "";
    if ( status.spoiler_text ) {
      alart_text = "<span>"+status.spoiler_text+"</span><button class='cw_button'>"+Pomo.getText('SHOW MORE')+"</button>",
      article_option = "content_warning";
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
      case "public":toot_privacy_mode="Public";toot_privacy_icon="globe";break;
      case "unlisted":toot_privacy_mode="Unlisted";toot_privacy_icon="unlock-alt";break;
      case "private":toot_privacy_mode="Followers-only";toot_privacy_icon="lock";break;
      case "direct":toot_privacy_mode="Direct";toot_privacy_icon="envelope";break;
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
    const html=(`
<li sid="${status.id}" class="toot_entry">
<div class="toot_entry_body">
<a href="${status_account_link}">
<div class="icon_box">
${icon(status.account.avatar)}
</div>
</a>
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${status_account_link}">
<span class="displayname emoji_poss">
${htmlEscape`${status.account.display_name}`}
</span>
<span class="username">
@${status.account.acct}
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
<li><a class="copylink_button" url="${status.url}" >${Pomo.getText('Copy link to Toot')}</a></li>
<li><a class="delete_button" tid="${status.id}">${Pomo.getText('Delete Toot')}</a></li>
<li><a class="mute_button" mid="${status.account.id}" sid="${status.id}">Mute @${status.account.username}</a></li>
<li><a class="block_button" mid="${status.account.id}" sid="${status.id}">Block @${status.account.username}</a></li>
</ul>
<ul>
<li><a href="${status.url}" target="_blank">${Pomo.getText('View original')}</a></li>
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
<button class="reply_button" tid="${status.id}" acct="@${status.account.acct}" display_name="${htmlEscape`${status.account.display_name}`}" privacy="${status.visibility}">
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
    status.reblog.content = status.reblog.content.emoji_replace(status.reblog.emojis);
    const status_datetime= getRelativeDatetime(Date.now(), getConversionedDate(null, status.reblog.created_at)),
    status_attr_datetime = getConversionedDate(null, status.reblog.created_at),
    status_reblog_account_link = getRelativeURL(status.reblog.account.url, status.reblog.account.id),
    status_account_link= getRelativeURL(status.account.url, status.account.id);
    let alart_text= "",
    article_option= "",
    toot_reblogs_count= "",
    toot_favourites_count = "",
    media_views = "";
    if ( status.reblog.spoiler_text ) {
      alart_text = "<span>"+status.reblog.spoiler_text+"</span><button class='cw_button'>"+Pomo.getText('SHOW MORE')+"</button>",
      article_option = "content_warning";
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
      case "public":toot_privacy_mode="Public";toot_privacy_icon="globe";break;
      case "unlisted":toot_privacy_mode="Unlisted";toot_privacy_icon="unlock-alt";break;
    }
    const html = (`
<li sid="${status.id}" class="toot_entry">
<div class="boost_author_box">
<a href="${status_account_link}">
<span class="emoji_poss"><i class="fa fa-fw fa-retweet"></i>${htmlEscape`${status.account.display_name}`} ${Pomo.getText('Boosted')}</span>
</a>
</div>
<div class="toot_entry_body">
<a href="${status_reblog_account_link}">
<div class="icon_box">
${icon(status.reblog.account.avatar)}
</div>
</a>
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${status_reblog_account_link}">
<span class="displayname emoji_poss">
${htmlEscape`${status.reblog.account.display_name}`}
</span>
<span class="username">
@${status.reblog.account.acct}
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
<li><a class="copylink_button" url="${status.reblog.url}" >${Pomo.getText('Copy link to Toot')}</a></li>
<li class="delete"><a class="delete_button" tid="${status.reblog.id}">${Pomo.getText('Delete Toot')}</a></li>
<li><a class="mute_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}">Mute @${status.reblog.account.username}</a></li>
<li><a class="block_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}">Block @${status.reblog.account.username}</a></li>
</ul>
<ul>
<li><a href="${status.reblog.url}" target="_blank">${Pomo.getText('View original')}</a></li>
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
<button class="reply_button" tid="${status.reblog.id}"acct="@${status.reblog.account.acct}" display_name="${htmlEscape`${status.reblog.account.display_name}`}" privacy="${status.reblog.visibility}">
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

function notifications_template(NotificationObj) {
const notice_author_link = getRelativeURL(NotificationObj.account.url, NotificationObj.account.id);
if(NotificationObj.account.display_name.length == 0) {
NotificationObj.account.display_name = NotificationObj.account.username;
}
if ( NotificationObj.type === 'favourite' | NotificationObj.type === 'reblog' ) {
const toot_author_link = getRelativeURL(NotificationObj.status.account.url, NotificationObj.status.account.id),
toot_datetime= getRelativeDatetime(Date.now(), getConversionedDate(null, NotificationObj.status.created_at)),
toot_attr_datetime = getConversionedDate(null, NotificationObj.status.created_at);
if( NotificationObj.type=='favourite' ){
  NotificationObj.status.content = NotificationObj.status.content.emoji_replace(NotificationObj.status.emojis);
const html = (`
<li sid="${NotificationObj.status.id}" class="notice_entry fav favourite toot_entry">
<div class="notice_author_box">
<a href="${notice_author_link}">
<div class="icon_box">
${icon(NotificationObj.account.avatar)}
</div>
</a>
<i class="fa fa-fw fa-star font-icon favourite"></i>
<a class="notice_author" href="${notice_author_link}">
<span class="emoji_poss" >${htmlEscape`${NotificationObj.account.display_name}`}</span> ${Pomo.getText('favourited Your Toot')}
</a>
</div>
<div class="notice_entry_body">
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${toot_author_link}">
<span class="displayname emoji_poss">
${htmlEscape`${NotificationObj.status.account.display_name}`}
</span>
<span class="username">
@${NotificationObj.status.account.acct}
</span>
</a>
</div>
</header>
<article class="toot_article">
<p>${NotificationObj.status.content}</p>
</article>
<footer class="toot_footer"></footer>
</section>
</div>
</li>`);
return $(html);
} else if ( NotificationObj.type === 'reblog' ) {
  NotificationObj.status.content = NotificationObj.status.content.emoji_replace(NotificationObj.status.emojis);
const sid= NotificationObj.status.id,
html = (`
<li sid="${NotificationObj.status.id}" class="notice_entry bos boost toot_entry">
<div class="notice_author_box">
<a href="${notice_author_link}">
<div class="icon_box">
${icon(NotificationObj.account.avatar)}
</div>
</a>
<i class="fa fa-fw fa-retweet font-icon boost"></i>
<a class="notice_author" href="${notice_author_link}">
<span class="emoji_poss" >${htmlEscape`${NotificationObj.account.display_name}`}</span> ${Pomo.getText('boosted Your Toot')}
</a>
</div>
<blockquote class="notice_entry_body">
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${toot_author_link}">
<span class="displayname emoji_poss">
${htmlEscape`${NotificationObj.status.account.display_name}`}
</span>
<span class="username">
@${NotificationObj.status.account.acct}
</span>
</a>
</div>
</header>
<article class="toot_article">
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
NotificationObj.status.content = NotificationObj.status.content.emoji_replace(NotificationObj.status.emojis);
if (NotificationObj.status.spoiler_text) {
alart_text = '<span>'+NotificationObj.status.spoiler_text+'</span><button class="cw_button">'+Pomo.getText('SHOW MORE')+'</button>',
article_option = 'content_warning';
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
case "public":toot_privacy_mode="Public";toot_privacy_icon="globe";break;
case "unlisted":toot_privacy_mode="Unlisted";toot_privacy_icon="unlock-alt";break;
case "private":toot_privacy_mode="Followers-only";toot_privacy_icon="lock";break;
case "direct":toot_privacy_mode="Direct";toot_privacy_icon="envelope";break;
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
const html=(`
<li sid="${NotificationObj.status.id}" class="toot_entry">
<div class="toot_entry_body">
<a href="${toot_author_link}">
<div class="icon_box">
${icon(NotificationObj.status.account.avatar)}
</div>
</a>
<section class="toot_content">
<header class="toot_header">
<div class="text_ellipsis">
<a href="${toot_author_link}">
<span class="displayname emoji_poss">
${htmlEscape`${NotificationObj.status.account.display_name}`}
</span>
<span class="username">
@${NotificationObj.status.account.acct}
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
<li><a class="copylink_button" url="${status.url}" >${Pomo.getText('Copy link to Toot')}</a></li>
<li class="delete"><a class="delete_button" tid="${NotificationObj.status.id}">${Pomo.getText('Delete Toot')}</a></li>
<li class="mute"><a>Mute @${NotificationObj.status.account.username}</a></li>
<li class="block"><a>Block @${NotificationObj.status.account.username}</a></li>
</ul>
<ul>
<li><a href="${NotificationObj.status.url}" target="_blank">${Pomo.getText('View original')}</a></li>
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
<button class="reply_button" tid="${NotificationObj.status.id}" acct="@${NotificationObj.account.acct}" display_name="${htmlEscape`${NotificationObj.account.display_name}`}" privacy="${NotificationObj.status.visibility}">
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
${icon(NotificationObj.account.avatar)}
</div>
</a>
<i class="fa fa-fw fa-user font-icon follow"></i>
<a class="notice_author" href="${notice_author_link}">
<span class="emoji_poss">${htmlEscape`${NotificationObj.account.display_name}`}</span> ${Pomo.getText('followed you')}
</a>
</div>
</li>`);
return $(html);
}
}

function follows_template(AccountObj) {
  let acct = AccountObj.acct;
  if (acct.match('@')==null) acct = acct +'@'+ AccountObj.url.match(/^https:\/\/([0-9a-z\.\-:]+?):?[0-9]*?\//i)[1];
  profile_link = '/@'+acct+'?mid='+AccountObj.id+'&';
  if(AccountObj.display_name.length == 0) {
    AccountObj.display_name = AccountObj.username;
  }
  const html = (`
<div class="follows_profile_box" mid="${AccountObj.id}">
<div class="follows_profile_header">
<img class="js_follows_header_image" src="${AccountObj.header}"/>
</div>
<div class="follows_profile">
<div class="follows_profile_icon">
<img class="js_follows_profile_image" src="${AccountObj.avatar}"/>
</div>
<button class="follow_button action_button" mid="${AccountObj.id}">
<i class="fa fa-fw fa-user-plus"></i>
<span>${Pomo.getText('Follow')}</span>
</button>
<div class="follows_profile_name_box emoji_poss">
<a class="js_follows_profile_link" href="${profile_link}">
<h2 class="js_follows_profile_displayname">
${htmlEscape`${AccountObj.display_name}`}
</h2>
<span class="js_follows_profile_username">
@${acct}
</span>
</a>
</div>
<div class="follows_profile_bio" >
<p>${AccountObj.note}</p>
</div>
</div>
</div>`);
  return $(html)
}

function hashtag_template(hashtag) {
  const html = (`
<div class="hashtag">
<a class="mention hashtag" href='/search/tag/?q=${encodeURIComponent(`${htmlEscape`${hashtag}`}`)}' rel='tag'>#<span>${htmlEscape`${hashtag}`}</span></a>
</div>
`);
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
status.content = status.content.emoji_replace(status.emojis);
if (status.spoiler_text) {
alart_text = '<span>'+status.spoiler_text+'</span><button class="cw_button">'+Pomo.getText('SHOW MORE')+'</button>',
article_option = 'content_warning';
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
case "public":toot_privacy_mode="Public";toot_privacy_icon="globe";checked_public=" checked";break;
case "unlisted":toot_privacy_mode="Unlisted";toot_privacy_icon="unlock-alt";checked_unlisted=" checked";break;
case "private":toot_privacy_mode="Followers-only";toot_privacy_icon="lock";checked_private=" checked";break;
case "direct":toot_privacy_mode="Direct";toot_privacy_icon="envelope";checked_direct=" checked";break;
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
const html=(`
<div sid="${status.id}" class="toot_detail ${class_options}">
<div class="toot_detail_body">
<header class="toot_header">
<div class="icon_box">
${icon(status.account.avatar)}
</div>
<a href="${status_account_link}">
<span class="displayname emoji_poss">
${htmlEscape`${status.account.display_name}`}
</span>
<span class="username">
@${status.account.acct}
</span>
</a>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="${status.url}" >${Pomo.getText('Copy link to Toot')}</a></li>
<li class="delete"><a class="delete_button" tid="${status.id}">${Pomo.getText('Delete Toot')}</a></li>
<li><a class="mute_button" mid="${status.account.id}" sid="${status.id}">Mute @${status.account.username}</a></li>
<li><a class="block_button" mid="${status.account.id}" sid="${status.id}">Block @${status.account.username}</a></li>
</ul>
<ul>
<li><a href="${status.url}" target="_blank">${Pomo.getText('View original')}</a></li>
</ul>
</div>
</div>
</header>
<section class="toot_content">
<article class="toot_article ${article_option} emoji_poss">
${alart_text}
<span class="status_content">
${status.content}
</span>
${media_views}
</article>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
</section>
<footer class="toot_footer"${toot_footer_width}>
<div class="toot_reaction">
<button class="reply_button" tid="${status.id}" acct="@${status.account.acct}" display_name="${htmlEscape`${status.account.display_name}`}" privacy="${status.visibility}">
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
<form id="reply_status_form" name="reply_status_form" class="status_form"sid="${status.id}" username="${status.account.acct}">
<div class="status_top">
<input class="status_spoiler invisible" name="status_spoiler" placeholder="${Pomo.getText('Content warning')}" type="text"/>
</div>
<div class="status_main">
<!-- current avatar -->
<div class="icon_box">
<img class="js_current_profile_image" src="${current_avatar}" />
</div>
<!-- text area -->
<div class="status_textarea">
<textarea class="emoji_poss" name="status_textarea" placeholder="${Pomo.getText('Toot your reply')}"></textarea>
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
<i class="fa fa-globe" aria-hidden="true"></i>${Pomo.getText('Public', {context: 'TootForm'})}
</label>
<label for="reply_status_unlisted" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-unlock-alt">
<i class="fa fa-unlock-alt" aria-hidden="true"></i>${Pomo.getText('Unlisted', {context: 'TootForm'})}
</label>
<label for="reply_status_fonly" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-lock">
<i class="fa fa-lock" aria-hidden="true"></i>${Pomo.getText('Followers-only', {context: 'TootForm'})}
</label>
<label for="reply_status_direct" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-envelope">
<i class="fa fa-envelope" aria-hidden="true"></i>${Pomo.getText('Direct', {context: 'TootForm'})}
</label>
</div>
</div>
<div class="split"></div>
<div class="draftSelecterIcon status_option_button">
  <i class="fa fa-sticky-note" aria-hidden="true"></i>
</div>
<input id="reply_status_media_atta" name="files" type="file" multiple class="invisible"/>
<input id="reply_status_cw" name="status_cw" type="checkbox" class="invisible" />
<input id="reply_status_nsfw" name="status_nsfw" type="checkbox" class="invisible" />
<input id="reply_status_public" name='privacy_option' value="public" class="invisible" type="radio"${checked_public}>
<input id="reply_status_unlisted" name='privacy_option' value="unlisted" class="invisible" type="radio"${checked_unlisted}>
<input id="reply_status_fonly" name='privacy_option' value="private" class="invisible" type="radio"${checked_private}>
<input id="reply_status_direct" name='privacy_option' value="direct" class="invisible" type="radio"${checked_direct}>
<div class="submit_status_label_wrap">
<span class="character_count">
${current_instance_charlimit}
</span>
<!-- Submit -->
<label for="reply_status_form_submit" class="submit_status_label">
<div class="toot_button_label disallow_select">
<i class="fa fa-reply" aria-hidden="true"></i>
<span>${Pomo.getText('Reply')}</span>
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
status.reblog.content = status.reblog.content.emoji_replace(status.reblog.emojis);
if (status.spoiler_text) {
alart_text = '<span>'+status.reblog.spoiler_text+'</span><button class="cw_button">'+Pomo.getText('SHOW MORE')+'</button>',
article_option = 'content_warning';
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
case "public":toot_privacy_mode="Public";toot_privacy_icon="globe";checked_public=" checked";break;
case "unlisted":toot_privacy_mode="Unlisted";toot_privacy_icon="unlock-alt";checked_unlisted=" checked";break;
}
const html=(`
<div sid="${status.reblog.id}" class="toot_detail ${class_options}">
<div class="toot_detail_body">
<header class="toot_header">
<div class="icon_box">
${icon(status.reblog.account.avatar)}
</div>
<a href="${status_account_link}">
<span class="displayname emoji_poss">
${htmlEscape`${status.reblog.account.display_name}`}
</span>
<span class="username">
@${status.reblog.account.acct}
</span>
</a>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="${status.reblog.url}" >${Pomo.getText('Copy link to Toot')}</a></li>
<li class="delete"><a class="delete_button" tid="${status.reblog.id}">${Pomo.getText('Delete Toot')}</a></li>
<li><a class="mute_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}">Mute @${status.reblog.account.username}</a></li>
<li><a class="block_button" mid="${status.reblog.account.id}" sid="${status.reblog.id}">Block @${status.reblog.account.username}</a></li>
</ul>
<ul>
<li><a href="${status.reblog.url}" target="_blank">${Pomo.getText('View original')}</a></li>
</ul>
</div>
</div>
</header>
<section class="toot_content">
<article class="toot_article ${article_option} emoji_poss">
${alart_text}
<span class="status_content">
${status.reblog.content}
</span>
${media_views}
</article>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
</section>
<footer class="toot_footer" style="width:320px">
<div class="toot_reaction">
<button class="reply_button" tid="${status.reblog.id}" acct="@${status.reblog.account.acct}" display_name="${htmlEscape`${status.reblog.account.display_name}`}" privacy="${status.reblog.visibility}">
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
<form id="reply_status_form" name="reply_status_form" class="status_form" sid="${status.reblog.id}" username="${status.reblog.account.acct}">
<div class="status_top">
<input class="status_spoiler invisible" name="status_spoiler" placeholder="${Pomo.getText('Content warning')}" type="text"/>
</div>
<div class="status_main">
<!-- current avatar -->
<div class="icon_box">
<img class="js_current_profile_image" src="${current_avatar}" />
</div>
<!-- text area -->
<div class="status_textarea">
<textarea class="emoji_poss" name="status_textarea" placeholder="${Pomo.getText('Toot your reply')}"></textarea>
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
<i class="fa fa-globe" aria-hidden="true"></i>${Pomo.getText('Public', {context: 'TootForm'})}
</label>
<label for="reply_status_unlisted" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-unlock-alt">
<i class="fa fa-unlock-alt" aria-hidden="true"></i>${Pomo.getText('Unlisted', {context: 'TootForm'})}
</label>
<label for="reply_status_fonly" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-lock">
<i class="fa fa-lock" aria-hidden="true"></i>${Pomo.getText('Followers-only', {context: 'TootForm'})}
</label>
<label for="reply_status_direct" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-envelope">
<i class="fa fa-envelope" aria-hidden="true"></i>${Pomo.getText('Direct', {context: 'TootForm'})}
</label>
</div>
</div>
<div class="split"></div>
<div class="draftSelecterIcon status_option_button">
  <i class="fa fa-sticky-note" aria-hidden="true"></i>
</div>
<input id="reply_status_media_atta" name="files" type="file" multiple class="invisible"/>
<input id="reply_status_cw" name="status_cw" type="checkbox" class="invisible" />
<input id="reply_status_nsfw" name="status_nsfw" type="checkbox" class="invisible" />
<input id="reply_status_public" name='privacy_option' value="public" class="invisible" type="radio"${checked_public}>
<input id="reply_status_unlisted" name='privacy_option' value="unlisted" class="invisible" type="radio"${checked_unlisted}>
<input id="reply_status_fonly" name='privacy_option' value="private" class="invisible" type="radio">
<input id="reply_status_direct" name='privacy_option' value="direct" class="invisible" type="radio">
<div class="submit_status_label_wrap">
<span class="character_count">
${current_instance_charlimit}
</span>
<!-- Submit -->
<label for="reply_status_form_submit" class="submit_status_label">
<div class="toot_button_label disallow_select">
<i class="fa fa-reply" aria-hidden="true"></i>
<span>${Pomo.getText('Reply')}</span>
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
    let multi_img = false, setting_autoplay_animated = localStorage.getItem("setting_autoplay_animated");
    if ((arguments.length==4) && (arguments[2].length>1)) {multi_img=true;}
    const status_template = timeline_template(status).html();
    let html = (`
<div class="media_detail">
${multi_img?`<p id="slider_prev"></p><p id="slider_next"></p>`:''}
<div class="media_box">`);
    if ( mediaURL.match( /\.mp4$/ ) == '.mp4' ) {
      html = html + (`<video src="${mediaURL}" frameborder="0" allowfullscreen ${setting_autoplay_animated=='false'?'':'autoplay'} loop muted controls></video>`);
    }
    else {
      html = html + (`<img src="${mediaURL}" />`);
    }
    html = html + (`</div>
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
status.content = status.content.emoji_replace(status.emojis);
if ( status.spoiler_text ) {
alart_text = '<span>'+status.spoiler_text+'</span><button class="cw_button">'+Pomo.getText('SHOW MORE')+'</button>',
article_option = 'content_warning';
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
case "public":toot_privacy_mode="Public";toot_privacy_icon="globe";break;
case "unlisted":toot_privacy_mode="Unlisted";toot_privacy_icon="unlock-alt";break;
case "private":toot_privacy_mode="Followers-only";toot_privacy_icon="lock";break;
case "direct":toot_privacy_mode="Direct";toot_privacy_icon="envelope";break;
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
const html=(`
<div sid="${status.id}" class="toot_entry ${class_options}">
<div class="toot_entry_body">
<div class="icon_box">
${icon(status.account.avatar)}
</div>
<section class="toot_content">
<header class="toot_header">
<a href="${status_account_link}">
<span class="displayname emoji_poss">
${htmlEscape`${status.account.display_name}`}
</span>
<span class="username">
@${status.account.acct}
</span>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
</a>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="" >${Pomo.getText('Copy link to Toot')}</a></li>
<li class="delete"><a class="delete_button" tid="${status.id}">${Pomo.getText('Delete Toot')}</a></li>
<li><a class="mute_button" mid="${status.account.id}" sid="${status.id}">Mute @${status.account.username}</a></li>
<li><a class="block_button" mid="${status.account.id}" sid="${status.id}">Block @${status.account.username}</a></li>
</ul>
<ul>
<li><a href="${status.url}" target="_blank">${Pomo.getText('View original')}</a></li>
</ul>
</div>
</div>
</header>
<article class="toot_article ${article_option}">
${alart_text}
<span class="status_content">
${status.content}
</span>
${media_views}
</article>
<footer class="toot_footer"${toot_footer_width}>
<div class="toot_reaction">
<button class="reply_button" tid="${status.id}" acct="@${status.account.acct}" display_name="${htmlEscape`${status.account.display_name}`}" privacy="${status.visibility}">
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
status.reblog.content = status.reblog.content.emoji_replace(status.reblog.emojis);
if ( status.spoiler_text ) {
alart_text = '<span>'+status.reblog.spoiler_text+'</span><button class="cw_button">'+Pomo.getText('SHOW MORE')+'</button>',
article_option = 'content_warning';
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
case "public":toot_privacy_mode="Public";toot_privacy_icon="globe";break;
case "unlisted":toot_privacy_mode="Unlisted";toot_privacy_icon="unlock-alt";break;
}
const html=(`
<div sid="${status.id}" class="toot_entry ${class_options}">
<div class="boost_author_box">
<a href="${status_account_link}">
<span class="emoji_poss"><i class="fa fa-fw fa-retweet"></i>${htmlEscape`${status.account.display_name}`} ${Pomo.getText('Boosted')}</span>
</a>
</div>
<div class="toot_entry_body">
<div class="icon_box">
${icon(status.reblog.account.avatar)}
</div>
<section class="toot_content">
<header class="toot_header">
<a href="${status_reblog_account_link}">
<span class="displayname emoji_poss">
${htmlEscape`${status.reblog.account.display_name}`}
</span>
<span class="username">
@${status.reblog.account.acct}
</span>
</a>
<time datetime="${status_attr_datetime}">${status_datetime}</time>
<div class="expand_button_wrap">
<button class="expand_button">
<i class="fa fa-fw fa-chevron-down"></i>
</button>
<div class="expand_menu invisible disallow_select">
<ul>
<li><a class="copylink_button" url="" >${Pomo.getText('Copy link to Toot')}</a></li>
<li class="delete"><a class="delete_button" tid="${status.reblog.id}">${Pomo.getText('Delete Toot')}</a></li>
<li><a class="mute_button" mid="${status.reblog.account.id}" sid="${status.id}">Mute @${status.reblog.account.username}</a></li>
<li><a class="block_button" mid="${status.reblog.account.id}" sid="${status.id}">Block @${status.reblog.account.username}</a></li>
</ul>
<ul>
<li><a href="${status.reblog.url}" target="_blank">${Pomo.getText('View original')}</a></li>
</ul>
</div>
</div>
</header>
<article class="toot_article ${article_option}">
${alart_text}
<span class="status_content">
${status.reblog.content}
</span>
${media_views}
</article>
<footer class="toot_footer" style="width:320px">
<div class="toot_reaction">
<button class="reply_button" tid="${status.reblog.id}" acct="@${status.reblog.account.acct}" display_name="${htmlEscape`${status.reblog.account.display_name}`}" privacy="${status.reblog.visibility}">
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
