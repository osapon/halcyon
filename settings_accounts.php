<?php include ('header.php'); ?>
<main id="main">
<?php include dirname(__FILE__).('/widgets/settings_header.php'); ?>
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
<script src="/assets/js/halcyon/halcyonSettings.js"></script>
<?php include ('footer.php'); ?>
