<?php include ('header.php'); ?>
<style>
.timeline_header .header_items {
display:block;
}
</style>
<main id="main">
<?php include dirname(__FILE__).('/widgets/lists_header.php'); ?>
<div class="article_wrap">
<aside class="left_column">
<?php include dirname(__FILE__).('/widgets/side_current_user.php'); ?>
<?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
</aside>
<article class="center_column">
<footer id="js-follows_footer" list-id="load">
<i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
</footer>
</article>
</div>
</main>
<script src="/assets/js/halcyon/halcyonLists.js"></script>
<?php include ('footer.php'); ?>
