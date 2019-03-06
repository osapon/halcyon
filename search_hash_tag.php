<?php include ('header.php'); ?>
<main id="main">
<?php include dirname(__FILE__).('/widgets/search_header.php'); ?>
<div class="article_wrap">
<aside class="left_column">
<?php include dirname(__FILE__).('/widgets/side_who_to_follow.php'); ?>
<?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
</aside>
<article class="center_column">
<header class="timeline_header">
<ul class="header_items">
<li class="item toots view">
</li>
</ul>
</header>
<div id="js-stream_update">
<button>
<?=_('View ')?> <span></span><?=_(' new Toots')?>
</button>
</div>
<ul id="js-timeline" class="timeline">
</ul>
<footer id="js-timeline_footer" class="timeline_footer">
<i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
</footer>
</article>
<aside class="right_column"></aside>
</div>
</main>
<script>
current_file = location.pathname+location.search;
<?php if(isset($_GET['q'])) { ?>
$(function() {
var query = "<?= htmlspecialchars((string)filter_input(INPUT_GET, 'q'), ENT_QUOTES) ?>";
if(query[0] == "@") {
window.location.href = "/search/users?q="+query.substr(1);
}
else {
if(query[0] == "#") {
query = query.substr(1);
}
if(query.length > 0) {
current_search_history.push(query);
if(current_search_history.length > 99) {
current_search_history.shift();
}
localStorage.current_search_history = JSON.stringify(current_search_history);
$('#main > .article_wrap > .center_column > .timeline_header > .header_items > .item').text("#"+query);
$('#js-header_title_box > h1').text(query);
$('title').text('#'+query+' - Halcyon Search');
$('#js-search_nav_hashtag').toggleClass('view');
$('#js-search_nav_toots a ').attr('href','/search'+location.search);
$('#js-search_nav_hashtag a ').attr('href','/search/tag'+location.search);
$('#js-search_nav_peoples a ').attr('href','/search/users'+location.search)
if(localStorage.getItem("setting_search_filter") === "all") {
setTimeline("timelines/tag/"+query);
}
else if(localStorage.getItem("setting_search_filter") === "local") {
setTimeline("timelines/tag/"+query,[{name:"local",data:"true"}]);
}
replace_emoji();
}
else {
history.back();
}
}
});
<?php } else { ?>
window.location.href = "/";
<?php } ?>
</script>
<?php include ('footer.php'); ?>
