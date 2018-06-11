<div class="single_reply_status invisible">
  <header class="single_reply_status_header">
    <span class="emoji_poss">Reply to </span>
  </header>
  <div class="status_preview"></div>
  <form id="single_reply_status_form" name="single_reply_status_form" class="status_form">
    <div class="status_top">
      <input class="status_spoiler invisible" name="status_spoiler" placeholder="<?=_('Content warning')?>" type="text">
    </div>
    <div class="status_main">
      <div class="status_textarea">
        <textarea class="emoji_poss" name="status_textarea" placeholder="<?=_("What's happening?")?>"></textarea>
        <div class="media_attachments_preview_area invisible"></div>
      </div>
    </div>
    <div class="status_bottom">
      <label for="single_reply_status_media_atta" class="status_media_attachment status_option_button">
        <i class="fa fa-camera" aria-hidden="true"></i>
      </label>
      <label for="single_reply_status_cw" class="status_CW status_option_button">
        <span class="disallow_select">CW</span>
      </label>
      <label for="single_reply_status_nsfw" class="status_NSFW status_option_button">
        <span class="disallow_select">NSFW</span>
      </label>
      <div class="status_privacy status_option_button expand_privacy_menu_button">
        <i class="fa fa-globe" aria-hidden="true"></i>
        <div class="expand_privacy_menu invisible">
          <label for="single_reply_status_public" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-globe">
            <i class="fa fa-globe" aria-hidden="true"></i><?=pgettext('TootForm','Public')?>
          </label>
          <label for="single_reply_status_unlisted" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-unlock-alt">
            <i class="fa fa-unlock-alt" aria-hidden="true"></i><?=pgettext('TootForm','Unlisted')?>
          </label>
          <label for="single_reply_status_fonly" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-lock">
            <i class="fa fa-lock" aria-hidden="true"></i><?=pgettext('TootForm','Followers-only')?>
          </label>
          <label for="single_reply_status_direct" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-envelope">
            <i class="fa fa-envelope" aria-hidden="true"></i><?=pgettext('TootForm','Direct')?>
          </label>
        </div>
      </div>
      <div class="split"></div>
      <div class="draftSelecterIcon status_option_button">
        <i class="fa fa-sticky-note" aria-hidden="true"></i>
      </div>
      <input id="single_reply_status_media_atta" name="files" type="file" multiple class="invisible">
      <input id="single_reply_status_cw" name="status_cw" type="checkbox" class="invisible">
      <input id="single_reply_status_nsfw" name="status_nsfw" type="checkbox" class="invisible">
      <input id="single_reply_status_public" name='privacy_option' value="public" class="invisible" type="radio">
      <input id="single_reply_status_unlisted" name='privacy_option' value="unlisted" class="invisible" type="radio">
      <input id="single_reply_status_fonly" name='privacy_option' value="private" class="invisible" type="radio">
      <input id="single_reply_status_direct" name='privacy_option' value="direct" class="invisible" type="radio">
      <div class="submit_status_label_wrap">
        <span class="character_count">
        </span>
        <label for="single_reply_status_form_submit" class="submit_status_label">
          <div class="toot_button_label disallow_select">
            <i class="fa fa-reply" aria-hidden="true"></i>
            <span><?=_('Reply')?></span>
          </div>
        </label>
      </div>
      <input id="single_reply_status_form_submit" class="submit_status" type="button" class="invisible">
    </div>
  </form>
</div>
