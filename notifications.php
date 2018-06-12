<?php include ('header.php'); ?>
<main id="main">
<div class="article_wrap">
<aside class="left_column">
</aside>
<article class="center_column">
<header class="timeline_header">
  <ul class="header_items">
    <li class="item all">
      <a href="notifications"><?=_('All')?></a>
    </li>
    <li class="item reply">
      <a href="notifications?target=reply"><?=_('Reply')?></a>
    </li>
    <li class="item follow">
      <a href="notifications?target=follow"><?=_('Follow')?></a>
    </li>
    <li class="item bf">
      <a href="notifications?target=bf"><?=_('Boost & Favorite')?></a>
    </li>
    <li class="item dm">
      <a href="notifications?target=dm"><?=pgettext('Notifications', 'Direct')?></a>
    </li>
  </ul>
</header>
<div id="js-stream_update">
<button>
<?=_('View new notitification')?>
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
<?php
$allow_target=['follow','reply','bf', 'dm'];
$target = 'all';
if (isset($_GET['target']) && in_array($_GET['target'], $allow_target)) $target = $_GET['target'];
?>
$(".header_items > .<?=$target?>").addClass('view');
$("#notifications_nav").addClass('view');
localStorage.setItem("notification_count", 0);
var options = [];
if ( '<?=$target?>' != 'all' ) {
  if ( '<?=$target?>' != 'follow' ) options.push({name:'exclude_types[]', data:'follow'});
  if ( '<?=$target?>' != 'reply' ) options.push({name:'exclude_types[]', data:'mention'});
  if ( '<?=$target?>' != 'bf' ) {
    options.push({name:'exclude_types[]', data:'favourite'});
    options.push({name:'exclude_types[]', data:'reblog'});
  }
}
if ( '<?=$target?>' == 'dm' ) {
  setTimeline("timelines/direct");
}
else {
  setNotifications(options);
}
$('title').text('Halcyon / Notifications')
</script>
<?php include ('footer.php'); ?>
