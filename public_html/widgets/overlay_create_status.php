<div class="overlay_status invisible">

  <header class="overlay_status_header">
    <span>Compose new Toot</span>
  </header>

  <form id="overlay_status_form" name="overlay_status_form" class="status_form ready">

      <div class="status_top">
        <input class="status_spoiler invisible" name="status_spoiler" placeholder="Content warning" type="text"/>
      </div>

      <div class="status_main">

          <!-- text area -->
          <div class="status_textarea">

              <textarea class="emoji_poss" name="status_textarea" placeholder="What's happening?"></textarea>

              <div class="media_attachments_preview_area invisible"></div>

          </div>

      </div>

      <div class="status_bottom">

          <!-- Media Attachment -->
          <label for="overlay_status_media_atta" class="status_media_attachment status_option_button">
              <i class="fa fa-camera" aria-hidden="true"></i>
          </label>

          <!-- Content warning -->
          <label for="overlay_status_cw" class="status_CW status_option_button">
              <span class="disallow_select">CW</span>
          </label>

          <!-- Not safe for work -->
          <label for="overlay_status_nsfw" class="status_NSFW status_option_button">
              <span class="disallow_select">NSFW</span>
          </label>

          <!-- Privacy options -->
          <div class="status_privacy status_option_button expand_privacy_menu_button">

            <!-- Expand menu -->
            <i class="fa fa-globe" aria-hidden="true"></i>

            <!-- Privacy options -->
            <div class="expand_privacy_menu invisible">

              <label for="overlay_status_public" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-globe">
                <i class="fa fa-globe" aria-hidden="true"></i>Public
              </label>

              <label for="overlay_status_unlisted" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-unlock-alt">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>Unlisted
              </label>

              <label for="overlay_status_fonly" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-lock">
                <i class="fa fa-lock" aria-hidden="true"></i>Followers-only
              </label>

              <label for="overlay_status_direct" class="status_privacy select_privacy disallow_select" privacyicon="fa fa-envelope">
                <i class="fa fa-envelope" aria-hidden="true"></i>Direct
              </label>

            </div>

          </div>

          <input id="overlay_status_media_atta" name="files" type="file" multiple class="invisible"/>
          <input id="overlay_status_cw" name="status_cw" type="checkbox" class="invisible" />
          <input id="overlay_status_nsfw" name="status_nsfw" type="checkbox" class="invisible" />
          <input id="overlay_status_public" name='privacy_option' value="public" class="invisible" type="radio"  />
          <input id="overlay_status_unlisted" name='privacy_option' value="unlisted" class="invisible" type="radio"  />
          <input id="overlay_status_fonly" name='privacy_option' value="private" class="invisible" type="radio"  />
          <input id="overlay_status_direct" name='privacy_option' value="direct" class="invisible" type="radio"  />

          <div class="submit_status_label_wrap">

            <span class="character_count">
              500
            </span>

            <!-- Submit -->
            <label for="overlay_status_form_submit" class="submit_status_label">

              <div class="toot_button_label disallow_select">
                  <i class="fa fa-fw fa-pencil-square-o"></i>
                  <span>Toot</span>
              </div>

            </label>

          </div>

          <input id="overlay_status_form_submit" class="submit_status" type="button" class="invisible"/>

      </div>

  </form>

</div>