<?php include ('header.php'); ?>
<main id="main">
<div class="article_wrap">
<aside class="left_column">
<?php include dirname(__FILE__).('/widgets/side_current_user.php'); ?>
</aside>
<article class="center_column">
<header class="timeline_header">
<?php include dirname(__FILE__).('/widgets/create_status.php'); ?>
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
if (
localStorage.getItem("setting_local_instance") === "default" |
localStorage.getItem("setting_local_instance") === current_instance
) {
setTimeline("timelines/public", [{name:"local",data:"true"}]);
} else {
setOtherTimeline(localStorage.getItem("setting_local_instance")+"/api/v1/", [{name:"local",data:"true"}]);
}
$("#local_nav").addClass('view');
$('title').text('Halcyon / Local');
</script>
<?php include ('footer.php'); ?>
