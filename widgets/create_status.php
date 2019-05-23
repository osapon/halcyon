<form id="header_status_form" name="header_status_form" class="status_form ready">
  <div class="status_left icon_box">
    <img class="js_current_profile_image">
  </div>
  <div class="status_top">
    <input class="status_spoiler invisible" name="status_spoiler" placeholder="<?=_('Content warning')?>" data-random="43884" type="text">
  </div>
  <div class="status_main">
    <div class="status_textarea">
      <textarea class="emoji_poss" name="status_textarea" placeholder="<?=_('What\'s happening?')?>" data-random="14839"></textarea> 
      <div class="media_attachments_preview_area invisible"></div>
      <div class="status_poll_editor invisible">
        <i class="fa fa-circle-o"></i> <input name="options[]" type="text" class="disallow_enter textfield poll_field" maxlength="25"><br/>
        <i class="fa fa-circle-o"></i> <input name="options[]" type="text" class="disallow_enter textfield poll_field" maxlength="25"><br/>
        <i class="fa fa-circle-o"></i> <input name="options[]" type="text" class="disallow_enter textfield poll_field" maxlength="25"><br/>
        <i class="fa fa-circle-o"></i> <input name="options[]" type="text" class="disallow_enter textfield poll_field" maxlength="25"><br/>
        <div style="height:32px;display:inline-block;padding-top:10px"><?=_("Expires in")?> </div>
        <div style="float:right;margin-right:5px"><div class="poll_time"><input type="number" min="0" max="7" placeholder="0-7" class="poll_days"><?=_('Days')?></div>
          <div class="poll_time"><input type="number" min="0" max="24" placeholder="0-24" class="poll_hours"><?=_('Hours')?></div>
          <div class="poll_time"><input type="number" min="0" max="60" placeholder="0-60" class="poll_mins"><?=_('Minutes')?></div>
        </div><br/>
        <div class="switch poll_mc_switch">
          <input type="checkbox" class="poll_multiple_choice">
          <div class="switch-btn">
            <span></span>
          </div>
        </div>
        <?=_("Multiple choice")?>
      </div>
    </div>
  </div>
  <div class="status_bottom invisible">
    <label for="header_status_media_atta" class="status_media_attachment status_option_button">
      <i class="fa fa-camera" aria-hidden="true"></i>
    </label>
    <label for="header_status_cw" class="status_CW status_option_button">
      <span class="disallow_select">CW</span>
    </label>
    <label for="header_status_nsfw" class="status_NSFW status_option_button">
      <span class="disallow_select">NSFW</span>
    </label>
    <div class="status_privacy status_option_button expand_privacy_menu_button">
      <i class="fa fa-globe" aria-hidden="true"></i>
      <div class="expand_privacy_menu invisible">
        <label for="header_status_public" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-globe">
          <i class="fa fa-globe" aria-hidden="true"></i><?=_('Public')?> 
        </label>
        <label for="header_status_unlisted" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-unlock-alt">
          <i class="fa fa-unlock-alt" aria-hidden="true"></i><?=_('Unlisted')?> 
        </label>
        <label for="header_status_fonly" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-lock">
          <i class="fa fa-lock" aria-hidden="true"></i><?=_('Followers-only')?> 
        </label>
        <label for="header_status_direct" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-envelope">
          <i class="fa fa-envelope" aria-hidden="true"></i><?=_('Direct')?> 
        </label>
      </div>
    </div>
    <label for="header_status_poll" class="status_poll status_option_button">
      <i class="fa fa-pie-chart" aria-hidden="true"></i>
    </label>
    <div class="split"></div>
    <div class="draftSelecterIcon status_option_button">
      <i class="fa fa-sticky-note" aria-hidden="true"></i>
    </div>
    <input id="header_status_media_atta" name="files" type="file" multiple class="invisible">
    <input id="header_status_cw" name="status_cw" type="checkbox" class="invisible">
    <input id="header_status_nsfw" name="status_nsfw" type="checkbox" class="invisible">
    <input id="header_status_public" name='privacy_option' value="public" class="invisible" type="radio">
    <input id="header_status_unlisted" name='privacy_option' value="unlisted" class="invisible" type="radio">
    <input id="header_status_fonly" name='privacy_option' value="private" class="invisible" type="radio">
    <input id="header_status_direct" name='privacy_option' value="direct" class="invisible" type="radio">
    <div id="header_status_emoji" name="status_emoji" type="button"></div>
    <div class="submit_status_label_wrap">
      <span class="character_count">
      </span>
      <label for="header_status_form_submit" class="submit_status_label">
        <div class="toot_button_label disallow_select" >
          <i class="fa fa-fw fa-pencil-square-o"></i>
          <span><?=_('Toot')?></span>
        </div>
      </label>
    </div>
    <input id="header_status_form_submit" class="submit_status" type="button" class="invisible">
  </div>
</form>
