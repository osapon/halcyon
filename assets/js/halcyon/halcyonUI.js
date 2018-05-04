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
};
function icon(url) {
  let orig_url = url, setting_autoplay_animated = localStorage.getItem("setting_autoplay_animated");
  if (( setting_autoplay_animated == 'no' ) && (url.match(/\.gif$/))) {
    url = url.replace('/original/', '/static/').replace(/\.gif$/, '.png');
    return '<img src="'+url+'" data-url="'+url+'" data-orig-url="'+orig_url+'">';
  }
  return '<img src="'+url+'">';
}

(function(SP) {
  SP.emoji_replace || (SP.emoji_replace = function(emoji_info) {
    let str = this;
    for(i=0;i<emoji_info.length;i++) {
      str = str.replace(new RegExp(":"+emoji_info[i].shortcode+":","g"),"<img src='"+emoji_info[i].static_url+"' class='emoji' title=':"+emoji_info[i].shortcode+":'>");
    }
    return str;
  });
})(String.prototype);

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
$(this).html('<span>'+Pomo.getText('Following')+'</span>');
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
$(this).html('<i class="fa fa-fw fa-user-plus"></i><span>'+Pomo.getText('Follow')+'</span>');
return false;
});
$(document).on('click','.mute_button', function(e) {
if ($(this).attr('mid') !== null) {
api.post('accounts/'+$(this).attr('mid')+'/mute', function (data) {
});
}
putMessage("You'll no longer receive notifications from this user");
return false;
});
$(document).on('click','.muting_button', function(e) {
if($(this).attr('mid')!=null) {
api.post('accounts/'+$(this).attr('mid')+'/unmute', function (data) {
});
}
$(this).toggleClass('muting_button');
$(this).toggleClass('follow_button');
$(this).html('<i class="fa fa-fw fa-user-plus"></i><span>'+Pomo.getText('Follow')+'</span>');
putMessage("Unmuted this user");
return false;
});
$(document).on('click','.block_button', function(e) {
if ($(this).attr('mid') !== null) {
api.post('accounts/'+$(this).attr('mid')+'/block', function (data) {
});
}
putMessage("This user has been blocked");
return false;
});
$(document).on('click','.blocking_button', function(e) {
e.stopPropagation();
if ($(this).attr('mid') !== null) {
api.post('accounts/'+$(this).attr('mid')+'/unblock', function (data) {
});
}
$(this).toggleClass('blocking_button');
$(this).toggleClass('follow_button');
$(this).html('<i class="fa fa-fw fa-user-plus"></i><span>'+Pomo.getText('Follow')+'</span>');
putMessage("Unblocked this user");
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
api.delete("statuses/"+sid, function (data) {
$('.toot_entry[sid="'+sid+'"]').remove();
putMessage("Your Toot has been deleted");
});
});
$(document).on('click','.cw_button', function(e) {
e.stopPropagation();
const article = $(this).parent();
if ( article.hasClass('content_warning') ) {
$(this).text(Pomo.getText('SHOW LESS'));
article.removeClass('content_warning');
} else {
$(this).text(Pomo.getText('SHOW MORE'));
article.addClass('content_warning');
}
return false;
});
$(document).on('click','.sensitive_alart', function(e) {
  e.stopPropagation();
  $(this).toggleClass('invisible');
  $(this).siblings('.spoiler_button').toggleClass('invisible');
  var medias = $(this).siblings('.media_attachment');
  for(let i=0; i<medias.length; i++) {
    removeSpoilerImage($(medias[i]).attr('oid'));
  }
  return false;
});
$(document).on('click','.spoiler_button', function(e) {
  e.stopPropagation();
  $(this).toggleClass('invisible');
  $(this).siblings('.sensitive_alart').toggleClass('invisible');
  var medias = $(this).siblings('.media_attachment');
  for(let i=0; i<medias.length; i++) {
    setSpoilerImage($(medias[i]).attr('oid'));
  }
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
  if ( status.media_attachments[0].type === "video" | status.media_attachments[0].type === "gifv" ) {
    let setting_autoplay_animated = localStorage.getItem("setting_autoplay_animated");
    media_views += (`
<div class="gif_mark"></div>
<div class="media_attachment" otype="video/gifv" mediacount="0" oid="${status.media_attachments[0].id}">
<video src="${status.media_attachments[0].url}" frameborder="0" allowfullscreen ${setting_autoplay_animated=='no'?'':'autoplay'} loop muted></video>
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
  var target_account = {};
  if (status.reblog === null) {
    target_account = status.account;
  }
  else {
    target_account = status.reblog.account;
  }
  if ( target_account.acct.indexOf('@') == -1 ) target_account.acct = target_account.acct + '@' + current_instance;
  if (
    typeof current_following_acct != 'undefined' &&
    target_account.acct !== JSON.parse(localStorage.getItem("what_to_follow_0")).acct &&
    target_account.acct !== JSON.parse(localStorage.getItem("what_to_follow_1")).acct &&
    target_account.acct !== JSON.parse(localStorage.getItem("what_to_follow_2")).acct &&
    target_account.acct != current_acct+'@'+current_instance &&
    current_following_acct.indexOf(target_account.acct) === -1
  ) {
    localStorage.setItem("what_to_follow_"+String(Math.floor(Math.random()*3)), JSON.stringify(target_account) );
  }
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
const array = AccountObj.url.split('/'),
profile_link = '/'+array[array.length-1]+'@'+array[array.length-2]+'?mid='+AccountObj.id+'&';
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
@${AccountObj.acct}
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
<input class="status_spoiler invisible" name="status_spoiler" placeholder="Content warning" type="text"/>
</div>
<div class="status_main">
<!-- current avatar -->
<div class="icon_box">
<img class="js_current_profile_image" src="${current_avatar}" />
</div>
<!-- text area -->
<div class="status_textarea">
<textarea class="emoji_poss" name="status_textarea" placeholder="Toot your reply"></textarea>
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
<span>Reply</span>
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
<input class="status_spoiler invisible" name="status_spoiler" placeholder="Content warning" type="text"/>
</div>
<div class="status_main">
<!-- current avatar -->
<div class="icon_box">
<img class="js_current_profile_image" src="${current_avatar}" />
</div>
<!-- text area -->
<div class="status_textarea">
<textarea class="emoji_poss" name="status_textarea" placeholder="Toot your reply"></textarea>
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
<span>Reply</span>
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
    var multi_img=false;
    if ((arguments.length==4) && (arguments[2].length>1)) {multi_img=true;}
    const status_template = timeline_template(status).html(),
    html = (`
<div class="media_detail">
${multi_img?`<p id="slider_prev"></p><p id="slider_next"></p>`:''}
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

function setTimeline(level,load_options) {
  let isSyncing = true;
  if ( load_options === undefined ) {
    var load_options = [];
  }
  api.get(level, load_options, function(statuses) {
    let reply_sources = {};
    for ( let i in statuses ) {
      timeline_template(statuses[i]).appendTo("#js-timeline");
      if (statuses[i].in_reply_to_id && level === "timelines/home" | level === "timelines/public" ) {
        if (!reply_sources[statuses[i].in_reply_to_id] & !$(".toot_entry[sid='"+statuses[i].in_reply_to_id+"']").length ) {
          reply_sources[statuses[i].in_reply_to_id] = statuses[i].id;
          api.get('statuses/'+statuses[i].in_reply_to_id, function(in_reply_statuses) {
            $("#js-timeline .toot_entry[sid='"+reply_sources[in_reply_statuses.id]+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
            replace_emoji(true);
          });
        }
      }
    };
    links = getLinkFromXHRHeader(responce_headers);
    replaceInternalLink();
    replace_emoji(true);
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
            let reply_sources = {};
            for ( let i in statuses ) {
              timeline_template(statuses[i]).appendTo("#js-timeline");
              if (statuses[i].in_reply_to_id && level === "timelines/home" | level === "timelines/public" ) {
                if (!reply_sources[statuses[i].in_reply_to_id] & !$(".toot_entry[sid='"+statuses[i].in_reply_to_id+"']").length) {
                  reply_sources[statuses[i].in_reply_to_id] = statuses[i].id;
                  api.get('statuses/'+statuses[i].in_reply_to_id, function(in_reply_statuses) {
                    $("#js-timeline .toot_entry[sid='"+reply_sources[in_reply_statuses.id]+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
                    replace_emoji(true);
                  });
                }
              }
            };
            links = getLinkFromXHRHeader(responce_headers);
            replaceInternalLink();
            replace_emoji(true);
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
  $(function() {
    if ( level === "timelines/home" ) {
      var streamscope = "user",
      scope = "home";
    } else if ( level === "timelines/public" & load_options.length) {
      var streamscope = "public:local",
      scope = "local";
    } else if ( level === "timelines/public" & !load_options.length) {
      var streamscope = "public",
      scope = "federated";
    }
    let statuses = [];
    const original_title = $('title').text();
    api.stream(streamscope, function(userstream) {
      if (userstream.event === "update") {
        const streaming_option = localStorage.getItem("setting_post_stream");
        if ( streaming_option === "manual" ) {
          if ( !$('.toot_entry[sid="'+userstream.payload.id+'"]').length ) {
            $('#js-stream_update').css({'display':'block','height':'auto','padding':'10px'});
            statuses.unshift(userstream.payload);
            $('#js-stream_update > button > span').text(statuses.length);
            $('title').text("("+statuses.length+") "+original_title);
            $('#header .header_nav_list .'+scope+'_badge').removeClass('invisible');
          }
        } else if ( streaming_option === "auto" ) {
          if ( !$('.toot_entry[sid="'+userstream.payload.id+'"]').length ) {
            let top_status = $('#js-timeline li:first-child');
            let base_top = top_status.offset().top;
            timeline_template(userstream.payload).prependTo("#js-timeline");
            let window_top = $(window).scrollTop();
            if ( window_top ) {
              $(window).scrollTop( window_top + top_status.offset().top - base_top );
              putMessage(Pomo.getText('Exist new Toot.'));
            }
            replaceInternalLink();
            replace_emoji(true);
            if ( level === "timelines/home" | level === "timelines/public" ) {
              if (userstream.payload.in_reply_to_id & !$(".toot_entry[sid='"+userstream.in_reply_to_id+"']").length) {
                let reply_source = userstream.payload.id;
                api.get('statuses/'+userstream.payload.in_reply_to_id, function(in_reply_statuses) {
                  $("#js-timeline .toot_entry[sid='"+reply_source+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
                  replaceInternalLink();
                  replace_emoji(true);
                });
              }
            }
          }
        }
      }
    });
    $(document).on('click','#js-stream_update', function(e) {
      $('#header .header_nav_list .'+scope+'_badge').addClass('invisible');
      $('#js-stream_update').css({'display':'none','height':'0','padding':'0px'});
      statuses.reverse();
      for ( let i in statuses ) {
        timeline_template(statuses[i]).prependTo("#js-timeline");
        replace_emoji(true);
        if ( level === "timelines/home" | level === "timelines/public" ) {
          if (statuses[i].in_reply_to_id) {
            const reply_source = statuses[i].id;
            api.get('statuses/'+statuses[i].in_reply_to_id, function(in_reply_statuses) {
              $("#js-timeline .toot_entry[sid='"+reply_source+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
              replace_emoji(true);
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
let isSyncing = true;
if ( load_options === undefined ) {
var load_options = [];
}
const loadstatus = instance + "timelines/public"
api.getOther(loadstatus, load_options, function(statuses) {
let reply_sources = {};
for ( let i in statuses ) {
timeline_template(statuses[i]).appendTo("#js-timeline");
if (statuses[i].in_reply_to_id ) {
if (!reply_sources[statuses[i].in_reply_to_id]) {
reply_sources[statuses[i].in_reply_to_id] = statuses[i].id;
api.getOther(instance + 'statuses/'+statuses[i].in_reply_to_id, function(in_reply_statuses) {
$("#js-timeline .toot_entry[sid='"+reply_sources[in_reply_statuses.id]+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
replace_emoji();
});
}
}
};
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
if ( $(window).scrollTop()+window.innerHeight >= $(document).height()-700 ) {
if (!isSyncing) {
isSyncing = true;
load_options.unshift( {name:"max_id",data:links['next'].match(/max_id=(.+)&?/)[1]} );
api.getOther(loadstatus, load_options, function(statuses) {
if (statuses.length) {
let reply_sources = {};
for ( let i in statuses ) {
timeline_template(statuses[i]).appendTo("#js-timeline");
if (statuses[i].in_reply_to_id ) {
if (!reply_sources[statuses[i].in_reply_to_id]) {
reply_sources[statuses[i].in_reply_to_id] = statuses[i].id;
api.getOther(instance+'statuses/'+statuses[i].in_reply_to_id, function(in_reply_statuses) {
$("#js-timeline .toot_entry[sid='"+reply_sources[in_reply_statuses.id]+"']").before(context_template(in_reply_statuses, 'ancestors_status default_padding'));
replace_emoji();
});
}
}
};
$('.toot_entry .toot_footer').addClass('invisible');
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
};

function setNotifications(load_options) {
let isSyncing = true;
if (load_options === undefined) {
var load_options = [];
}
api.get('notifications', load_options, function(NotificationObj) {
for (let i in NotificationObj) {
notifications_template(NotificationObj[i]).appendTo("#js-timeline");
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
notifications_template(NotificationObj[i]).appendTo("#js-timeline");
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
notifications_template(userstream.payload).prependTo("#js-timeline");
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
button.text(Pomo.getText('Following'));
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
button.text(Pomo.getText('Following'));
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
$("#js_header_image").attr('src', AccountObj.header);
$("#js_profile_image").attr('src', AccountObj.avatar);
$("#js_toots_count").text(AccountObj.statuses_count);
$("#js_following_count").text(AccountObj.following_count);
$("#js_followers_count").text(AccountObj.followers_count);
$("#js_profile_displayname").text(AccountObj.display_name);
$("#js_profile_username").text(AccountObj.acct);
$("#js_profile_bio").html(AccountObj.note);
if (AccountObj.fields) {
  let field = '';
  for(let i = 0, max = AccountObj.fields.length; i < max; i++) {
    field = field + `<tr><td>${htmlEscape(`${AccountObj.fields[i].name}`)}</td><td>${AccountObj.fields[i].value}</td></tr>`;
  }
  $("#js_header_fiels").html('<table>'+field+'</table>');
}
if( AccountObj.id == current_id ) {
$(`<a href="https://${current_instance}/settings/profile">
<button class="profile_edit_button relationship_button">
<span>${Pomo.getText('Edit profile')}</span>
</button>
</a>`).appendTo('.profile_button_box');
$(`<a href="${current_favourites_link}">
<h2>${Pomo.getText('FAVOURITES')}</h2>
<span>${Pomo.getText('Show')}</span>
</a>`).appendTo("#js-profile_nav_favourites");
} else {
api.get('accounts/relationships', [{name:'id', data:String(AccountObj.id)}], function(RelationshipObj) {
if (RelationshipObj[0].followed_by) {
$('#main .profile_username .profile_followed_by').removeClass('invisible');
}
if (RelationshipObj[0].blocking) {
$(`<button class="blocking_button relationship_button" mid="${AccountObj.id}">
<span>Blocking</span>
</button>`).appendTo('.profile_button_box');
} else if (RelationshipObj[0].muting) {
$(`<button class="muting_button relationship_button" mid="${AccountObj.id}">
<span>Muting</span>
</button>`).appendTo('.profile_button_box');
} else if (RelationshipObj[0].requested) {
$(`<!-- wont work -->
<button class="requested_button relationship_button" mid="${AccountObj.id}">
<span>Requested</span>
</button>`).appendTo('.profile_button_box');
} else if(RelationshipObj[0].following){
$(`<button class="following_button relationship_button" mid="${AccountObj.id}">
<span>${Pomo.getText('Following')}</span>
</button>`).appendTo('.profile_button_box');
} else {
$(`<button class="follow_button relationship_button" mid="${AccountObj.id}">
<i class="fa fa-fw fa-user-plus"></i>
<span>${Pomo.getText('Follow')}</span>
</button>`).appendTo('.profile_button_box');
}
});
};
replace_emoji();
}

function setRecentImages(mid) {
api.get("accounts/"+mid+"/statuses", [{name:'only_media',data:'true'},{name:'limit',data:'6'}], function(statuses) {
if ( statuses.length ) {
$('#js_profile_recent_images span').text(`${statuses[0].account.statuses_count} ${Pomo.getText('Photos and toots')}`);
$('#js_profile_recent_images a').attr('href', $("#media_link").attr('href'));
for ( i in statuses ) {
$(`<div class="profile_recent_images_item media_attachment" otype="image" sid="${statuses[i].id}" url="${statuses[i].media_attachments[0].preview_url}">
<img src="${statuses[i].media_attachments[0].preview_url}" />
</div>`).appendTo('#js_profile_recent_images_box');
};
}
});
};

function badges_update(){
let current_count = Number(localStorage.getItem("notification_count"));
if ( current_count ) {
$('#header .header_nav_list .notification_badge').removeClass('invisible');
$('#header .header_nav_list .notification_badge').text( current_count );
}
api.stream("user", function(userstream) {
if(userstream.event == "notification" && userstream.payload.type == "follow") {
$(".js_current_followers_count").html(++localStorage.current_followers_count);
}
if (userstream.event === "update" & location.pathname !== "/" ) {
$('#header .header_nav_list .home_badge').removeClass('invisible');
} else if (userstream.event === "notification" & location.pathname !== "/notifications") {
current_count += 1;
localStorage.setItem("notification_count", current_count );
$('#header .header_nav_list .notification_badge').text( current_count );
if ( $('#header .header_nav_list .notification_badge').hasClass('invisible') ) {
$('#header .header_nav_list .notification_badge').removeClass('invisible')
}
}
});
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
          for ( let i in status.ancestors ) {
            context_template(status.ancestors[i], 'ancestors_status').prependTo("#js-overlay_content .temporary_object .toot_detail_wrap");
          }
        }
        if (status.descendants.length) {
          for ( let i in status.descendants) {
            context_template(status.descendants[i], 'descendants_status').appendTo("#js-overlay_content .temporary_object .toot_detail_wrap");
          }
        }
        replaceInternalLink();
        replace_emoji();

        $('textarea[class="emoji_poss"]', document).emojiPicker({
          height: '400px',
          width:  '280px',
          recentlyLabel: Pomo.getText('Recently Used'),
          searchLabel: Pomo.getText('Search Results'),
          searchPlaceholder: Pomo.getText('Search...'),
          categories: [
                { name: 'custom', label: Pomo.getText('Custom') },
                { name: 'people', label: Pomo.getText('People') },
                { name: 'nature', label: Pomo.getText('Nature') },
                { name: 'food', label: Pomo.getText('Food') },
                { name: 'activity', label: Pomo.getText('Activities') },
                { name: 'travel', label: Pomo.getText('Travel & Places') },
                { name: 'object', label: Pomo.getText('Objects') },
                { name: 'symbol', label: Pomo.getText('Symbols') },
                { name: 'flag', label: Pomo.getText('Flags') }
          ]
        });

      });
    });
  }
}

$(function() {
$(document).on('click','.toot_entry.ancestors_status, .toot_entry.descendants_status', function(e) {
$("#js-overlay_content .temporary_object").empty();
});
$(document).on('click','.toot_entry', function(e) {
setOverlayStatus($(this).attr('sid'));
});
})

function setOverlayMedia(sid,urls,open_image_idx) {
  $("#js-overlay_content .temporary_object").empty();
  $('#js-overlay_content_wrap').addClass('view');
  $('#js-overlay_content_wrap').addClass('black_08');
  $('#js-overlay_content .temporary_object').addClass('visible');
  api.get("statuses/"+sid, function(status) {

    media_template((!status.reblog)?status:status.reblog, urls[open_image_idx], urls, open_image_idx).appendTo("#js-overlay_content .temporary_object");
    replaceInternalLink();
    replace_emoji();
    $("#slider_prev").on('click', function(){
      open_image_idx--;
      if ( open_image_idx < 0 ) open_image_idx = urls.length - 1;
      $(".media_box > img").attr('src', urls[open_image_idx]);
    });
    $("#slider_next").on('click', function(){
      open_image_idx++;
      if ( open_image_idx >= urls.length ) open_image_idx = 0;
      $(".media_box > img").attr('src', urls[open_image_idx]);
    });
  });
}

$(function() {
  $(document).on('click','.media_attachment[otype="image"]', function(e) {
    e.stopPropagation();
    var images=$(this).parents(".media_views").find("img"), urls=[], url = $(this).attr('url');
    var open_image_idx = 0;
    for(idx=0,num=images.length;idx<num;idx++){
      var v = $(images[idx]).attr('src');
      urls.push(v);
      if (url == v) open_image_idx = idx;
    }
    if ( images.length == 0 ) urls.push(url);
    setOverlayMedia($(this).attr('sid'),urls, open_image_idx);
    $('.media_detail .toot_entry .media_views').addClass('invisible');
  });
})

function setOverlayMediaWithoutStatus(url) {
  $("#js-overlay_content .temporary_object").empty();
  $('#js-overlay_content_wrap').addClass('view');
  $('#js-overlay_content_wrap').addClass('black_05');
  media_template(null, url).appendTo("#js-overlay_content .temporary_object");
}

$(function() {
$(document).on('click','img[mediaaccess="true"]', function(e) {
e.stopPropagation();
setOverlayMediaWithoutStatus($(this).attr('src'));
});
})

function checkReadyStatusText( id ) {
  const textCount = $(id+' textarea').val().length + $(id+' .status_spoiler').val().length;
  let textLen = ( current_instance_charlimit - textCount );
  if ( textLen <= -1 ) {
    $(id+' .character_count').addClass('red');
    $(id).addClass('ready');
  } else if ( textLen === current_instance_charlimit ) {
    $(id).addClass('ready');
  } else {
    $(id+' .character_count').removeClass('red');
    $(id).removeClass('ready');
  }
  $(id+' .character_count').text(textLen);
}

$(function() {
  $(document).on('click', '#creat_status', function(e) {
  switch(localStorage.getItem("setting_post_privacy")) {
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
  $('#overlay_status_form .status_textarea textarea').focus()
  $('#overlay_status_form input[name="privacy_option"]').val([localStorage.getItem("setting_post_privacy")]);
  $('#overlay_status_form .expand_privacy_menu_button > i').attr('class', "fa fa-" + picon);
  $('#overlay_status_form .character_count').html(current_instance_charlimit);
  });
  $(document).on('change keyup','#overlay_status_form textarea, #overlay_status_form .status_spoiler', function(e) {
    if (
      (e.keyCode !== 224) &&
      (e.keyCode !== 17)
    ) {
      $(this).val(replaced_emoji_return($(this).val()));
      checkReadyStatusText('#overlay_status_form');
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
    var param = {};
    if ( $('#overlay_status_media_atta')[0].files.length ) {
      const dummy_form= $('<form></form>').append($('#overlay_status_media_atta'));
      param.files = dummy_form[0][0].files;
      $("#overlay_status_form .status_bottom").append($('<input id="overlay_status_media_atta" name="files" multiple="" class="invisible" type="file">'));
    }
    param.form = document.forms.overlay_status_form;
    post(param).then(function(){
      $('#overlay_status_form .media_attachments_preview_area').empty();
      $('#overlay_status_form .status_spoiler').addClass('invisible');
      $('#overlay_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
      param.form.reset();
      $('#overlay_status_form').removeClass('ready');
      $('#overlay_status_form .status_textarea').removeClass('disallow_select');
      $('#overlay_status_form .character_count').html(current_instance_charlimit);
      $('.overlay_status .submit_status_label').removeClass('active_submit_button');
      $('.overlay_status').addClass('invisible');
      $('#js-overlay_content_wrap').removeClass('view');
      $('#js-overlay_content_wrap').removeClass('black_05');
      putMessage('Your Toot was posted!');
    });
  });

  $(document).on('click', '#shortcut_guide', function(e) {
    $('.overlay_shortcut_guide').removeClass('invisible');
    $("#js-overlay_content_wrap .temporary_object").empty();
    $('#js-overlay_content_wrap').addClass('view');
    $('#js-overlay_content_wrap').addClass('black_08');
  });
})

$(function() {
  $(document).on('click', function(e) {
  if (!$(e.target).closest('#header_status_form').length) {
  $('#header_status_form .submit_status_label').removeClass('active_submit_button');
  $('#header_status_form .expand_privacy_menu').addClass('invisible');
  $('#header_status_form .status_textarea textarea').removeClass('focus');
  $('#header_status_form .status_bottom').addClass('invisible');
  }
  });
  $(document).on('change keyup','#header_status_form textarea, #header_status_form .status_spoiler', function(e) {
    if (
      (e.keyCode !== 224) &&
      (e.keyCode !== 17)
    ) {
      $(this).val(replaced_emoji_return($(this).val()));
      checkReadyStatusText('#header_status_form');
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
  $('#header_status_form .status_bottom').removeClass('invisible');
  $('#header_status_form .submit_status_label').addClass('active_submit_button');
  $('#header_status_form .character_count').html(current_instance_charlimit);
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
    var param = {};
    if ( $('#header_status_media_atta')[0].files.length ) {
      const dummy_form = $('<form></form>').append($('#header_status_media_atta'));
      param.files= dummy_form[0][0].files,
      $("#header_status_form .status_bottom").append($('<input id="header_status_media_atta" name="files" multiple="" class="invisible" type="file">'));
    }
    param.form = document.forms.header_status_form;
    post(param).then(function(){
      $('#header_status_form .media_attachments_preview_area').empty();
      $('#header_status_form .status_spoiler').addClass('invisible');
      $('#header_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
      param.form.reset();
      $('#header_status_form').removeClass('ready');
      $('#header_status_form .status_textarea').removeClass('disallow_select');
      $('#header_status_form .character_count').html(current_instance_charlimit);
    });
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
  }
  });
  $(document).on('click','#reply_status_form', function(e) {
  if(!$('#reply_status_form .status_textarea textarea').hasClass('focus')) {
  $('#reply_status_form .status_textarea textarea').addClass('focus');
  $('#reply_status_form .status_bottom').removeClass('invisible');
  $('#reply_status_form .submit_status_label').addClass('active_submit_button');
  $('#reply_status_form textarea').val("@"+$('#reply_status_form').attr('username')+" ");
  $('#reply_status_form .character_count').html(current_instance_charlimit);
  }
  });
  $(document).on('change keyup','#reply_status_form textarea, #reply_status_form .status_spoiler', function(e) {
    if (
      (e.keyCode !== 224) &&
      (e.keyCode !== 17)
    ) {
      $(this).val(replaced_emoji_return($(this).val()));
      checkReadyStatusText('#reply_status_form');
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
    var param = {};
    if ( $('#reply_status_media_atta')[0].files.length ) {
      const dummy_form = $('<form></form>').append($('#reply_status_media_atta'));
      param.files= dummy_form[0][0].files;
      $('#reply_status_form .status_bottom').append($('<input id="reply_status_media_atta" name="files" multiple="" class="invisible" type="file">'));
    }
    param.form = document.forms.reply_status_form;
    param.in_reply_to_id = $('#reply_status_form').attr('sid');
    post(param).then(function(){
      $('#reply_status_form .media_attachments_preview_area').empty();
      $('#reply_status_form .status_spoiler').addClass('invisible');
      $('#reply_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
      param.form.reset();
      $('#reply_status_form').removeClass('ready');
      $('#reply_status_form .status_textarea').removeClass('disallow_select');
      $('#reply_status_form .character_count').html(current_instance_charlimit);
      $('.reply_status .submit_status_label').removeClass('active_submit_button');
      context_template(data, 'descendants_status').appendTo("#js-overlay_content .temporary_object .toot_detail_wrap");
      replace_emoji();
      putMessage('Your Toot was posted!');
    });
  });
})

$(function() {
  $(document).on('click','single_reply_status_header, #single_reply_status_form', function(e) {
  e.stopPropagation();
  });
  $(document).on('click', '.reply_button', function(e) {
  e.stopPropagation();
  const sid= $(this).attr('tid'),
  acct = $(this).attr('acct'),
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
  $('#single_reply_status_form .status_textarea textarea').focus()
  $('#single_reply_status_form input[name="privacy_option"]').val([privacy_mode]);
  $('#single_reply_status_form .expand_privacy_menu_button > i').attr('class', "fa fa-" + picon);
  $('#single_reply_status_form').attr('tid',sid);
  $('.single_reply_status .single_reply_status_header span').text("Reply to "+display_name);
  $('#single_reply_status_form textarea').val(acct+" ");
  $('#single_reply_status_form .character_count').html(current_instance_charlimit);
  api.get('statuses/'+sid+'/', function(status) {
  timeline_template(status).appendTo(".single_reply_status .status_preview");
  replace_emoji();
  });
  return false;
  });
  $(document).on('change keyup','#single_reply_status_form textarea, #single_reply_status_form .status_spoiler', function(e) {
    if (
      (e.keyCode !== 224) &&
      (e.keyCode !== 17)
    ) {
      $(this).val(replaced_emoji_return($(this).val()));
      checkReadyStatusText('#single_reply_status_form');
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
    var param = {};
    if ( $('#single_reply_status_media_atta')[0].files.length ) {
      const dummy_form= $('<form></form>').append($('#single_reply_status_media_atta'));
      param.files = dummy_form[0][0].files;
      $("#single_reply_status_form .status_bottom").append($('<input id="single_reply_status_media_atta" name="files" multiple="" class="invisible" type="file">'));
    }
    param.form = document.forms.single_reply_status_form;
    param.in_reply_to_id = $('#single_reply_status_form').attr('tid');
    post(param).then(function(){
      $('#single_reply_status_form .media_attachments_preview_area').empty();
      $('#single_reply_status_form .status_spoiler').addClass('invisible');
      $('#single_reply_status_form .status_textarea .media_attachments_preview_area').addClass('invisible');
      param.form.reset();
      $('#single_reply_status_form').removeClass('ready');
      $('#single_reply_status_form .status_textarea').removeClass('disallow_select');
      $('#single_reply_status_form .character_count').html(current_instance_charlimit);
      $('.single_reply_status .submit_status_label').removeClass('active_submit_button');
      $('.single_reply_status').addClass('invisible');
      $('#js-overlay_content_wrap').removeClass('view');
      $('#js-overlay_content_wrap').removeClass('black_05');
      $("#js-overlay_content_wrap .single_reply_status .status_preview").empty();
      putMessage('Your Reply was posted!');
    });
  });
})

$(function() {
  $(document).on('click','.copylink_button', function(e) {
    e.stopPropagation();
    $("#js-overlay_content_wrap .temporary_object").empty();
    $('#js-overlay_content_wrap').addClass('view');
    $('#js-overlay_content_wrap').addClass('black_08');
    $('.overlay_copy_link').removeClass('invisible');
    $('.overlay_copy_link_form input').val($(this).attr('url'));
    var clipboard = new ClipboardJS('.copy_button');
    clipboard.on('success', function(e) {
      clipboard.destroy();
      $('#js-overlay_content_wrap', document).trigger('click');
    });
    return false;
  });
})

$(function() {
  $(document).on('click','.temporary_object > *, .parmanent_object > *', function(e) {
    e.stopPropagation();
  });
  $(document).on('click','#js-overlay_content_wrap', function(e) {
    $(this).removeClass('view');
    $("#js-overlay_content_wrap .temporary_object").empty();
    $("#js-overlay_content_wrap .single_reply_status .status_preview").empty();
    $('#js-overlay_content_wrap .overlay_status').addClass('invisible');
    $('#js-overlay_content_wrap .single_reply_status').addClass('invisible');
    $('#js-overlay_content_wrap .overlay_copy_link').addClass('invisible');
    $('#js-overlay_content_wrap .overlay_shortcut_guide').addClass('invisible');
    $('#js-overlay_content .temporary_object, #js-overlay_content .parmanent_object').removeClass('visible');
    $('#js-overlay_content_wrap .overlay_status.submit_status_label').removeClass('active_submit_button');
    $('#js-overlay_content_wrap .single_reply_status .submit_status_label').removeClass('active_submit_button');
    $('#js-overlay_content_wrap #reply_status_form .submit_status_label').removeClass('active_submit_button');
    $('#js-overlay_content_wrap #header_status_form.submit_status_label').removeClass('active_submit_button');
    $('#js-overlay_content_wrap').removeClass('black_05');
    $('#js-overlay_content_wrap').removeClass('black_08');
    if ( current_file === "/user" ) {
      history.pushState(null, null, "/"+location.pathname.split("/")[1]+location.search);
    } else {
      history.pushState(null, null, current_file);
    }
  });
})

$(document).on('mouseenter', '.icon_box > img', function() {
  let img = $(this);
  if (typeof (img.attr('data-orig-url')) == 'undefined' ) return;
  img.attr('src', img.attr('data-orig-url'));
});
$(document).on('mouseleave', '.icon_box > img', function() {
  let img = $(this);
  if (typeof (img.attr('data-orig-url')) == 'undefined' ) return;
  img.attr('src', img.attr('data-url'));
});
$(document).on('mouseenter', 'video', function() {
  if (typeof ($(this).attr('autoplay')) == 'undefined' ) this.play();
});
$(document).on('mouseleave', 'video', function() {
  if (typeof ($(this).attr('autoplay')) == 'undefined' ) this.pause();
});

$(function () {
  $(document).on('click','.side_widget.stream_options .form_title button', function(e) {
    $(this).parent().next('.pulldown_form').toggleClass('view');
    if ( $(this).text() === Pomo.getText('SHOW') ) {
      $(this).text(Pomo.getText('HIDE'));
    } else {
      $(this).text(Pomo.getText('SHOW'));
    }
    const html_post_steraming = $(`<select name="post_steraming">
<option value="auto">${Pomo.getText('Auto update')}</option>
<option value="manual">${Pomo.getText('Manual update')}</option>
</select>`)
    const html_post_privacy = $(`<select name="post_privacy">
<option value="public" selected>${Pomo.getText('Public', {context:'Option'})}</option>
<option value="unlisted">${Pomo.getText('Unlisted', {context:'Option'})}</option>
<option value="private">${Pomo.getText('Followers-only', {context:'Option'})}</option>
<option value="direct">${Pomo.getText('Direct', {context:'Option'})}</option>
</select>`)
    const html_local_instance = $(`<input name="local_instance" placeholder="Blank for default" type="text" class="disallow_enter"/>`)
    const html_search_filter = $(`<select name="search_filter">
<option value="all" selected>${Pomo.getText('All instances')}</option>
<option value="local">${Pomo.getText('Local only')}</option>
</select>`)
    const html_autoplay_animated = $(`<select name="autoplay_animated">
<option value="yes" selected>${Pomo.getText('Yes')}</option>
<option value="no">${Pomo.getText('No')}</option>
</select>`)
    html_post_steraming.val(localStorage.getItem("setting_post_stream"));
    html_post_privacy.val(localStorage.getItem("setting_post_privacy"));
    html_local_instance.val(localStorage.getItem("setting_local_instance"));
    html_search_filter.val(localStorage.getItem("setting_search_filter"));
    html_autoplay_animated.val(localStorage.getItem("setting_autoplay_animated"));
    $('.post_steraming_wrap').html(html_post_steraming)
    $('.post_privacy_wrap').html(html_post_privacy);
    $('.local_instance_wrap').html(html_local_instance);
    $('.search_filter_wrap').html(html_search_filter);
    $('.autoplay_animated_wrap').html(html_autoplay_animated);
    if(localStorage.setting_link_previews == "true") {
      $("#setting_link_previews")[0].checked = true;
    }
    return false;
  });
  $(document).on('change',".post_steraming_wrap select[name='post_steraming']", function(e) {
    localStorage.setItem("setting_post_stream", $(this).val() );
    putMessage(Pomo.getText("Changed setting to").replace('${val}', $("option:selected", this).text()));
  });
  $(document).on('change', ".post_privacy_wrap select[name='post_privacy']", function(e) {
    localStorage.setItem("setting_post_privacy", $(this).val() );
    putMessage(Pomo.getText("Changed setting to").replace('${val}', $("option:selected", this).text()));
  });
  $(document).on('change',".search_filter_wrap select[name='search_filter']", function(e) {
    localStorage.setItem("setting_search_filter", $(this).val() );
    putMessage(Pomo.getText("Changed setting to").replace('${val}', $("option:selected", this).text()));
  });
  $(document).on('change',".autoplay_animated_wrap select[name='autoplay_animated']", function(e) {
    localStorage.setItem("setting_autoplay_animated", $(this).val() );
    putMessage(Pomo.getText("Changed setting to").replace('${val}', $("option:selected", this).text()));
  });
  $(document).on('focus',".local_instance_wrap input[name='local_instance']", function(e) {
    $(this).attr("placeholder","https://"+current_instance);
  });
  $(document).on('change',".local_instance_wrap input[name='local_instance']", function(e) {
    if ( $(this).val() ) {
      localStorage.setItem("setting_local_instance", $(this).val() );
    } else {
      localStorage.setItem("setting_local_instance", "default" );
    }
    putMessage(Pomo.getText("Changed setting to").replace('${val}', $(this).val()));
  });
  $("#setting_link_previews").change(function() {
    if(this.checked) {
      val = "true";
    }
    else {
      val = "false";
    }
    localStorage.setItem("setting_link_previews",val);
    putMessage(Pomo.getText("Changed setting to").replace('${val}', Pomo.getText(val, {context:'Option'}) ));
  });
})

$(function() {
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
  shortcut.add("Shift+/",function() {
    $("#shortcut_guide").click();
  },{
    "disable_in_input":true,
    'keycode':191
  });
});

$(function() {
  var emoji_data_read_check = window.setInterval(function(){
    if (typeof $.fn.emojiPicker.emojis !== "undefined") {
      clearInterval(emoji_data_read_check);
      api.get("custom_emojis", function(data) {
        localStorage.setItem("current_instance_custom_emojis", JSON.stringify(data));
        setCustomEmojis(data);
        $('textarea[class="emoji_poss"]', document).emojiPicker({
          height: '400px',
          width:  '280px',
          recentlyLabel: Pomo.getText('Recently Used'),
          searchLabel: Pomo.getText('Search Results'),
          searchPlaceholder: Pomo.getText('Search...'),
          categories: [
                { name: 'custom', label: Pomo.getText('Custom') },
                { name: 'people', label: Pomo.getText('People') },
                { name: 'nature', label: Pomo.getText('Nature') },
                { name: 'food', label: Pomo.getText('Food') },
                { name: 'activity', label: Pomo.getText('Activities') },
                { name: 'travel', label: Pomo.getText('Travel & Places') },
                { name: 'object', label: Pomo.getText('Objects') },
                { name: 'symbol', label: Pomo.getText('Symbols') },
                { name: 'flag', label: Pomo.getText('Flags') }
          ]
        });
      });
    }
  }, 1000);
});

