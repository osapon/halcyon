<?php include ('header.php'); ?>
<main id="main">
<div class="article_wrap">
<aside class="left_column">
<?php include dirname(__FILE__).('/widgets/side_current_user.php'); ?>
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
$('title').text('Halcyon / Who to follow');
var wtfprofiles = JSON.parse(localStorage.who_to_follow);
var pcount = 0;
var isSyncing = false;
function nextprofiles(displayed) {
if(wtfprofiles.length - displayed < 30) {
fcount = wtfprofiles.length;
}
else {
fcount = 30;
}
for(i=0;i<fcount;i++) {
if(current_following_accts.indexOf(wtfprofiles[displayed+i]) == -1) {
api.get('search',[{name:'q',data:"@"+wtfprofiles[displayed+i]},{name:'resolve',data:'true'}], function(search) {
follows_template(search.accounts[0]).appendTo("#js-follows_profile");
replace_emoji();
if(i = 29) {
isSyncing = false;
}
});
}
}
}
nextprofiles(0);
$(window).scroll(function () {
if($(window).scrollTop()+window.innerHeight >= $(document).height()-700) {
if(!isSyncing) {
isSyncing = true;
pcount++;
nextprofiles(pcount*30);
}
}
});
</script>
<?php include ('footer.php'); ?>
