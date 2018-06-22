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
        <div style="float:left;width:35%;text-align:right;margin-top:24px">
          <h3><?=_('Language')?></h3>
        </div>
        <div class="language_wrap" style="float:left;width:65%;margin-top:8px;">
          <div class="switch">
            <select name="language">
            <?php
              $dirs = scandir( __DIR__ . '/locale' );
              foreach ($dirs AS $lang) {
                if ( strpos( $lang, '.' ) !== false ) continue;
                echo '<option value="'.$lang.'" '.(($lang==$locale)?'selected':'').'>' . _('Language_'.$lang) . '</option>';
              }
            ?>
            </select>
          </div>
        </div>
        <div style="float:left;width:35%;text-align:right;margin-top:16px">
          <h3><?=_('New posts streaming')?></h3>
        </div>
        <div class="post_streaming_wrap" style="float:left;width:65%;margin-top:8px;margin-bottom:-8px">
          <div class="radiobox">
            <input id="streaming-1" name="post_streaming" type="radio" value="auto">
            <label for="streaming-1" class="radiotext"><?=_('Auto update')?></label>
          </div>
          <div class="radiobox">
            <input id="streaming-2" name="post_streaming" type="radio" value="manual">
            <label for="streaming-2" class="radiotext"><?=_('Manual update')?></label>
          </div>
        </div>
        <div style="float:left;width:35%;text-align:right;margin-top:16px">
          <h3><?=_('Enable link previews')?></h3>
        </div>
        <div class="link_previews_wrap" style="float:left;width:65%">
          <div class="switch">
            <input type="checkbox" id="setting_link_previews">
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
        </div>
        <div style="float:left;width:35%;text-align:right;margin-top:16px">
          <h3><?=_('Auto-play animated GIFs')?></h3>
        </div>
        <div class="autoplay_animated_wrap" style="float:left;width:65%">
          <div class="switch">
            <input type="checkbox" id="setting_autoplay_animated">
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
        </div>
        <div style="float:left;width:35%;text-align:right;margin-top:16px">
          <h3><?=_('Desktop notifications')?></h3>
        </div>
        <div class="desktop_notifications_wrap" style="float:left;width:65%">
          <div class="switch">
            <input type="checkbox" id="setting_desktop_notifications">
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
        </div>
        <div style="float:left;width:35%;text-align:right;margin-top:16px">
          <h3><?=_('Show replies')?></h3>
        </div>
        <div class="show_replies_wrap" style="float:left;width:65%">
          <div class="switch">
            <input type="checkbox" id="setting_show_replies">
            <div class="switch-btn">
              <span></span>
            </div>
          </div>
        </div>
        <div style="float:left;width:35%;text-align:right;margin-top:16px">
          <h3><?=_('Image size on timeline')?></h3>
        </div>
        <div class="image_size_tl_wrap" style="float:left;width:65%">
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
