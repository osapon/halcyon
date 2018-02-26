
<!-- FOOTER -->
<footer id="footer">
<!-- Be enjoying your Mastodon!-->
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
    </div>

    <button class="close_button"><i class="fa fa-times" aria-hidden="true"></i></button>

  </div>
</div>

<script>

  <?php if (isset($_GET['status'])): ?>

    setOverlayStatus('<?php echo $_GET['status']; ?>');

  <?php endif; ?>

  setCurrentProfile();
  badges_update();
  $('.header_settings_link').attr('href','https://'+current_instance+'/settings/preferences');
  $('.footer_widget_about').attr('href','https://'+current_instance+'/about');
  $('.footer_widget_instance').attr('href','https://'+current_instance+'/about/more');
  $('.footer_widget_terms').attr('href','https://'+current_instance+'/terms');

</script>

<script>

const what_to_follow_0 = JSON.parse(localStorage.getItem("what_to_follow_0"));
const what_to_follow_1 = JSON.parse(localStorage.getItem("what_to_follow_1"));
const what_to_follow_2 = JSON.parse(localStorage.getItem("what_to_follow_2"));

$('.what_to_follow_0 > .icon_box img').attr('src', what_to_follow_0.avatar);
$('.what_to_follow_0 .label_box > a').attr('href', getRelativeURL(what_to_follow_0.url, what_to_follow_0.id) );
$('.what_to_follow_0 .label_box > a > h3 .dn').text(what_to_follow_0.display_name);
$('.what_to_follow_0 .label_box > a > h3 .un').text('@'+what_to_follow_0.username);
$('.what_to_follow_0 .label_box > .follow_button').attr('mid', what_to_follow_0.id);
$('.what_to_follow_0 .label_box > .follow_button').attr('data', what_to_follow_0.url);

$('.what_to_follow_1 > .icon_box img').attr('src', what_to_follow_1.avatar);
$('.what_to_follow_1 .label_box > a').attr('href', getRelativeURL(what_to_follow_1.url, what_to_follow_1.id) );
$('.what_to_follow_1 .label_box > a > h3 .dn').text(what_to_follow_1.display_name);
$('.what_to_follow_1 .label_box > a > h3 .un').text('@'+what_to_follow_1.username);
$('.what_to_follow_1 .label_box > .follow_button').attr('mid', what_to_follow_1.id);
$('.what_to_follow_0 .label_box > .follow_button').attr('data', what_to_follow_1.url);

$('.what_to_follow_2 > .icon_box img').attr('src', what_to_follow_2.avatar);
$('.what_to_follow_2 .label_box > a').attr('href', getRelativeURL(what_to_follow_2.url, what_to_follow_2.id) );
$('.what_to_follow_2 .label_box > a > h3 .dn').text(what_to_follow_2.display_name);
$('.what_to_follow_2 .label_box > a > h3 .un').text('@'+what_to_follow_2.username);
$('.what_to_follow_2 .label_box > .follow_button').attr('mid', what_to_follow_2.id);
$('.what_to_follow_0 .label_box > .follow_button').attr('data', what_to_follow_2.url);

replace_emoji();

</script>

</body>
</html>