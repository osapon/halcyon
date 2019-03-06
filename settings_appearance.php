<?php include ('header.php'); ?>
<main id="main">
  <?php include dirname(__FILE__).('/widgets/settings_header.php'); ?>
  <div class="article_wrap">
    <aside class="left_column">
      <?php include dirname(__FILE__).('/widgets/side_current_user.php'); ?>
      <?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
    </aside>
    <article class="center_column">
      <header class="timeline_header">
        <ul class="header_items">
          <li class="item toots view"><?=_('Appearance settings')?></li>
        </ul>
      </header>
      <div class="timeline">
        <div style="float:left;width:50%;text-align:right;margin-top:16px">
          <h3><?=_('New posts streaming')?></h3>
        </div>
        <div class="post_streaming_wrap" style="float:left;width:50%;margin-top:8px;margin-bottom:-8px">
          <div class="radiobox">
            <input id="streaming-1" name="post_streaming" type="radio" value="auto">
            <label for="streaming-1" class="radiotext"><?=_('Auto update')?></label>
          </div>
          <div class="radiobox">
            <input id="streaming-2" name="post_streaming" type="radio" value="manual">
            <label for="streaming-2" class="radiotext"><?=_('Manual update')?></label>
          </div>
          <div class="radiobox">
            <input id="streaming-3" name="post_streaming" type="radio" value="ontop">
            <label for="streaming-3" class="radiotext"><?=_('Only on top')?></label>
          </div>
        </div>
        <div style="float:left;width:50%;text-align:right;margin-top:16px">
          <h3><?=_('Enable dark theme')?></h3>
        </div>
        <div class="dark_theme_wrap" style="float:left;width:50%">
          <div class="switch" style="float:left">
            <input type="checkbox" id="setting_dark_theme" <?php if(array_key_exists('darktheme',$_COOKIE)) {if($_COOKIE['darktheme'] == "true") echo "checked='checked'"; else if($_COOKIE['darktheme'] == "unset") echo "default='default'";} ?>>
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
          <a href="javascript:void(0)" id="setting_dark_theme_reset" style="float:left">
            <i class="fa fa-2x fa-times" style="margin-top:8px"></i>
          </a>
        </div>
        <div style="float:left;width:50%;text-align:right;margin-top:16px">
          <h3><?=_('Enable link previews')?></h3>
        </div>
        <div class="link_previews_wrap" style="float:left;width:50%">
          <div class="switch">
            <input type="checkbox" id="setting_link_previews">
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
        </div>
        <div style="float:left;width:50%;text-align:right;margin-top:16px">
          <h3><?=_('Desktop notifications')?></h3>
        </div>
        <div class="desktop_notifications_wrap" style="float:left;width:50%">
          <div class="switch">
            <input type="checkbox" id="setting_desktop_notifications">
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
        </div>
        <!--<div id="service_worker_box" style="display:none">
        <div style="float:left;width:50%;text-align:right;margin-top:16px">
        <h3><?=_('Notifications when tab closed')?></h3>
        </div>
        <div class="service_worker_wrap" style="float:left;width:50%">
        <div class="switch">
        <input type="checkbox" id="setting_service_worker">
        <div class="switch-btn">
        <span></span>
        </div>
        </div>
        </div>
        </div>-->
        <div style="float:left;width:50%;text-align:right;margin-top:16px">
          <h3><?=_('Show all CW content')?></h3>
        </div>
        <div class="show_content_warning_wrap" style="float:left;width:50%">
          <div class="switch">
            <input type="checkbox" id="setting_show_content_warning">
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
        </div>
        <div style="float:left;width:50%;text-align:right;margin-top:16px">
          <h3><?=_('Show all NSFW content')?></h3>
        </div>
        <div class="show_nsfw_wrap" style="float:left;width:50%">
          <div class="switch">
            <input type="checkbox" id="setting_show_nsfw">
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
        </div>
        <!-- div style="float:left;width:50%;text-align:right;margin-top:16px">
          <h3><?=_('Show pictures in full height')?></h3>
        </div>
        <div class="full_height_wrap" style="float:left;width:50%">
          <div class="switch">
            <input type="checkbox" id="setting_full_height">
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
        </div -->
        <div style="float:left;width:50%;text-align:right;margin-top:16px">
          <h3><?=_('Show threads in thread view in timeline')?></h3>
        </div>
        <div class="thread_view_wrap" style="float:left;width:50%">
          <div class="switch">
            <input type="checkbox" id="setting_thread_view">
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
        </div>
        <div style="float:left;width:50%;text-align:right;margin-top:16px">
          <h3><?=_('Image size on timeline')?></h3>
        </div>
        <div class="image_size_tl_wrap" style="float:left;width:50%">
          <div class="radiobox">
            <input id="image-size-tl-1" name="image_size_tl" type="radio" value="Normal">
            <label for="image-size-tl-1" class="radiotext"><?=pgettext('Option','Normal')?></label>
          </div>
          <div class="radiobox">
            <input id="image-size-tl-2" name="image_size_tl" type="radio" value="Low">
            <label for="image-size-tl-2" class="radiotext"><?=pgettext('Option','Low')?></label>
          </div>
        </div>
        <span style="visibility:hidden">-</span>
      </div>
    </article>
  </div>
</main>
<script src="<?php echo filedate('/assets/js/halcyon/halcyonSettings.js'); ?>"></script>
<?php include ('footer.php'); ?>
