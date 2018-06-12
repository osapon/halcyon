<footer id="footer">
</footer>
<?php include dirname(__FILE__).('/widgets/overlay_message.php'); ?>
<div id="js-overlay_content_wrap">
<div id="js-overlay_content">
<div class="temporary_object">
</div>
<div class="parmanent_object">
<?php include dirname(__FILE__).('/widgets/overlay_create_status.php'); ?>
<?php include dirname(__FILE__).('/widgets/overlay_single_reply.php'); ?>
<?php include dirname(__FILE__).('/widgets/overlay_copy_link.php'); ?>
<?php include dirname(__FILE__).('/widgets/overlay_shortcut_guide.php'); ?>
</div>
<button class="close_button"><i class="fa fa-times" aria-hidden="true"></i></button>
</div>
</div>
<script>
<?php if (isset($_GET['status'])): ?>
setOverlayStatus('<?php echo $_GET['status']; ?>');
<?php endif; ?>
badges_update();
$('.footer_widget_about').attr('href','https://'+current_instance+'/about');
$('.footer_widget_instance').attr('href','https://'+current_instance+'/about/more');
$('.footer_widget_terms').attr('href','https://'+current_instance+'/terms');
replace_emoji();
</script>
</body>
</html>
