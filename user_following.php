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
<div id="js_profile_public_link" class="profile_with_icon invisible" style="margin-bottom:5px">
<a target="_blank"><i class="fa fa-fw fa-link" aria-hidden="true"></i><span><?=_('Open public profile')?></span></a>
</div>
<div id="js_profile_joined_date" class="profile_with_icon" style="margin-bottom:5px">
<span><i class="fa fa-fw fa-calendar" aria-hidden="true"></i><span></span></span>
</div>
<?php include dirname(__FILE__).('/widgets/user_recent_images.php'); ?>
</section>
<?php include dirname(__FILE__).('/widgets/side_who_to_follow.php'); ?>
<?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
</aside>
<article class="center_column">
<div id="js-follows_profile">
</div>
<footer id="js-follows_footer">
<i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
</footer>
</article>
</div>
</main>
<script>
current_file = location.pathname;
$("#js-profile_nav_following").toggleClass("view");
$("#js-profile_nav_toots > a").attr('href', './'+location.search);
$("#js-profile_nav_following > a").attr('href', 'following'+location.search);
$("#js-profile_nav_followers > a").attr('href', 'followers'+location.search);
$("#js-profile_nav_favourites > a").attr('href','favourites'+location.search);
<?php if (isset($_GET['mid'])): ?>
$(function() {
const account_id = <?= htmlspecialchars((string)filter_input(INPUT_GET, 'mid'), ENT_QUOTES) ?>;
api.get('accounts/'+account_id, function(AccountObj) {
if ( AccountObj !== null ) {
setAccount(AccountObj);
setFollows(account_id,'following',[{name:'limit',data:18}]);
setRecentImages(AccountObj.id);
} else {
location.href="/404.php";
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
setFollows(search.accounts[0].id,'following',[{name:'limit',data:18}]);
setRecentImages(search.accounts[0].id);
} else {
location.href="/404.php";
}
});
})
<?php endif; ?>
</script>
<?php include ('footer.php'); ?>
