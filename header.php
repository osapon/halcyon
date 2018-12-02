<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
include("language.php");
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Halcyon</title>
<link rel="shortcut icon" href="/assets/images/favicon.ico">
<link rel="gettext" type="text/x-gettext-translation" href="/locale/<?=$locale?>/LC_MESSAGES/messages.po">
<link rel="stylesheet" href="/assets/css/style.css" media="all">
<?php if(array_key_exists('darktheme', $_COOKIE) && $_COOKIE['darktheme'] == "true")
echo '<link rel="stylesheet" href="/assets/css/dark.css" media="all">';
?>
<link rel="stylesheet" href="/assets/css/fontawesome.min.css" media="all">
<link rel="stylesheet" href="/assets/css/emojipicker.css" media="all">
<script src="/assets/js/jquery/jquery.min.js"></script>
<script src="/assets/js/halcyon/halcyonFunctions.js"></script>
<script src="/assets/js/mastodon.js/mastodon.js"></script><!-- thx @kirschn -->
<script src="/assets/js/jquery-cookie/src/jquery.cookie.js"></script>
<script src="/assets/js/autosize/autosize.js"></script>
<script src="/assets/js/autocomplete/textarea.js"></script>
<script src="/assets/js/shortcut.js"></script>
<script src="/assets/js/replace_emoji.js"></script>
<script src="/assets/js/emojipicker/emojidata.js"></script>
<script src="/assets/js/emojipicker/emojipicker.js"></script>
<script src="/assets/js/halcyon/halcyonTemplates.js"></script>
<script src="/assets/js/halcyon/halcyonUI.js"></script>
<script src="/assets/js/autocomplete/search.js"></script>
<script src="/assets/js/pomo/pomo.js"></script>
<script src="/assets/js/twemoji/twemoji.min.js"></script>
<script src="/assets/js/clipboard.js/clipboard.min.js"></script>
<script>
if(!localStorage.getItem("current_id") | !localStorage.getItem("current_instance") | !localStorage.getItem("current_authtoken")) {
location.href = "/login";
}
else {
Pomo.domain = 'messages';
Pomo.returnStrings = true;
Pomo.unescapeStrings = true;
var pomo_def = Pomo.load(null,{
format:'po',
mode:'link',
translation_domain:'messages'
});
var __ = (function(){
var _ = !!window.Pomo? window.Pomo : (!!window.__Pomo? window.__Pomo: false);
var gettext_wrap = function(word, options){return _.getText(word, options)};
gettext_wrap = !!_? gettext_wrap: false;
if(!gettext_wrap){
throw new "Pomo can't be found";
}
return gettext_wrap;
})();
if($.cookie("session") === "true") {
refreshApp();
}
else if($.cookie("session") === undefined) {
resetApp();
}
}
</script>
</head>
<body>
<header id="header">
<div class="header_nav_wrap">
<nav class="header_left_box">
<ul class="header_nav_list">
<li id="header_nav_item_home" class="header_nav_item">
<a href="/" id="home_nav">
<i class="fa fa-fw fa-home"></i>
<span><?=_('Home')?></span>
</a>
<div class="home_badge nav_badge invisible"></div>
</li>
<li id="header_nav_item_local" class="header_nav_item local_nav">
<a href="/local" id="local_nav">
<i class="fa fa-fw fa-users"></i>
<span><?=_('Local')?></span>
</a>
<div class="local_badge nav_badge invisible"></div>
</li>
<li id="header_nav_item_federated" class="header_nav_item federated_nav">
<a href="/federated" id="federated_nav">
<i class="fa fa-fw fa-globe"></i>
<span><?=_('Federated')?></span>
</a>
<div class="federated_badge nav_badge invisible"></div>
</li>
<li id="header_nav_item_notifications" class="header_nav_item notifications_nav">
<a href="/notifications" id="notifications_nav">
<i class="fa fa-fw fa-bell"></i>
<span><?=_('Notifications')?></span>
</a>
<div class="notification_badge nav_badge invisible"></div>
</li>
<li id="header_nav_item_lists" class="header_nav_item lists_nav">
<a href="/lists" id="lists_nav">
<i class="fa fa-fw fa-list"></i>
<span><?=_('Lists')?></span>
</a>
<div class="lists_badge nav_badge invisible"></div>
</li>
</ul>
</nav>
<nav class="header_right_box">
<ul class="header_nav_list">
<li class="header_nav_item search_form_wrap">
<form class="search_form" action="/search" method="GET">
<input id="search_form" class="search_form_input" placeholder="<?=_('Search Mastodon')?>" type="text" name="q" accesskey="/" autocomplete="off">
<span class="search_form_submit">
<button type="submit">
<i class="fa fa-fw fa-search"></i>
</button>
</span>
</form>
<nav class="header_search_suggestions invisible"></nav>
</li>
<li class="header_nav_item my_account_wrap">
<button class="header_account_avatar">
<div class="my_account">
<img class="js_current_profile_image">
</div>
</button>
<nav class="header_my_account_nav invisible">
<ul>
<li>
<a class="js_current_profile_link emoji_poss">
<span class="js_current_profile_displayname display_name"></span>
<span><?=_('View profile')?></span>
</a>
</li>
</ul>
<ul>
<li>
<a href="/direct"><?=_('Direct')?></a>
</li>
<li>
<a href="/settings"><?=_('Settings')?></a>
</li>
<li>
<a href="/logout"><?=_('Log out')?></a>
</li>
</ul>
</nav>
</li>
<li class="header_nav_item toot_button_wrap">
<button id="creat_status" class="toot_button" accesskey="n">
<div class="toot_button_label">
<i class="fa fa-fw fa-pencil-square-o"></i>
<span><?=_('Toot')?></span>
</div>
</button>
</li>
</ul>
</nav>
</div>
</header>
