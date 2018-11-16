<?php include ('header.php'); ?>
<main id="main">
<?php include dirname(__FILE__).('/widgets/user_header.php'); ?>
<div class="article_wrap">
<aside class="left_column">
<div class="profile_icon_box">
<img id="js_profile_image" src="/assets/images/missing.png" mediaaccess="true">
</div>
<section class="profile_section_wrap">
<h1 class="profile_displayname">
<a id="js_profile_displayname" href="#"></a>
</h1>
<h2 class="profile_username">
@<a id="js_profile_username" href="#"></a>
</h2>
<p id="js_profile_bio" class="profile_bio"></p>
<div id="js_profile_fields" class="profile_fields"></div>
<div id="js_profile_public_link" class="profile_with_icon invisible" style="margin-bottom:5px">
<a target="_blank"><i class="fa fa-fw fa-link" aria-hidden="true"></i><span><?=_('Open public profile')?></span></a>
</div>
<div id="js_profile_joined_date" class="profile_with_icon" style="margin-bottom:5px">
<span><i class="fa fa-fw fa-calendar" aria-hidden="true"></i><span></span></span>
</div>
<div id="profile_toot_buttons" style="height:31px;margin-bottom:5px;display:none">
<button class="toot_button profile_sendto" style="width:calc(50% - 3px)"><div class="toot_button_label"><i class="fa fa-fw fa-pencil-square-o"></i><span><?=_('Toot to')?></span></div></button>
<button class="toot_button profile_sendto" style="width:calc(50% - 3px)" privacy="direct"><div class="toot_button_label"><i class="fa fa-fw fa-envelope"></i><span><?=_('Message')?></span></div></button>
</div>
<?php include dirname(__FILE__).('/widgets/user_recent_images.php'); ?>
</section>
</aside>
<article class="center_column">
<header class="timeline_header">
<ul class="header_items">
<li class="item toots">
<a id="toots_link">
<?=_('Toots')?>
</a>
</li>
<li class="item wreplies">
<a id="with_replies_link">
<?=_('Toots')?> &amp; <?=_('replies')?>
</a>
</li>
<li class="item media view">
<a id="media_link">
<?=_('Media')?>
</a>
</li>
</ul>
</header>
<div id="js-stream_update">
<button>
<?=_('View ')?><span></span><?=_(' new Toots')?>
</button>
</div>
<ul id="js-timeline" class="timeline">
</ul>
<footer id="js-timeline_footer" class="timeline_footer">
<i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
</footer>
</article>
<aside class="right_column">
<section class="side_widgets_wrap">
<?php include dirname(__FILE__).('/widgets/side_who_to_follow.php'); ?>
</section>
<?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
</aside>
</div>
</main>
<script>
current_file = location.pathname;
$("#toots_link").attr('href', './'+location.search);
$("#with_replies_link").attr('href', './with_replies'+location.search);
$("#media_link").attr('href', './media'+location.search);
$("#js-profile_nav_toots > a").toggleClass("view");
$("#js-profile_nav_toots > a").attr('href', location.pathname+location.search);
$("#js-profile_nav_following > a").attr('href', './following'+location.search);
$("#js-profile_nav_followers > a").attr('href', './followers'+location.search);
$("#js-profile_nav_favourites > a").attr('href', './favourites'+location.search);
<?php if (isset($_GET['mid'])): ?>
$(function() {
const account_id = <?= htmlspecialchars((string)filter_input(INPUT_GET, 'mid'), ENT_QUOTES) ?>;
api.get('accounts/'+account_id, function(AccountObj) {
if ( AccountObj !== null ) {
setAccount(AccountObj);
setTimeline("accounts/"+AccountObj.id+"/statuses",[{name:'only_media',data:'true'}],"false");
setRecentImages(AccountObj.id);
} else {
location.href = "/404.php";
}
});
});
<?php elseif((isset($_GET['user']))): ?>
$(function(){
<?php
$name = preg_split("/@/", $_GET['user'])[1];
$domain = preg_split("/@/", $_GET['user'])[2];
$url= "https://$domain/@$name";
?>
const query = '<?= htmlspecialchars((string)filter_input(INPUT_GET, 'user'), ENT_QUOTES) ?>';
api.get('search', [{name:'q',data:query},{name:'resolve',data:'true'}], function(search) {
if ( !search.accounts.length ) {
location.href="/404.php";
} else if ("@"+search.accounts[0].acct === query || "@"+search.accounts[0].acct+"@"+localStorage.current_instance === query) {
setAccount(search.accounts[0]);
setTimeline("accounts/"+search.accounts[0].id+"/statuses",[{name:'only_media',data:'true'}],"false");
setRecentImages(search.accounts[0].id);
} else {
location.href="/404.php";
}
});
})
<?php endif; ?>
</script>
<?php include ('footer.php'); ?>
