<div class="report_status invisible">
<header class="report_status_header">
<span><?=_('Report a Toot of')?> </span>
</header>
<div class="status_preview"></div>
<form id="report_status_form" name="report_status_form" class="status_form">
<div class="status_main">
<div class="status_textarea">
<textarea name="status_textarea" placeholder="<?=_('Please describe what the problem with the Toot is.')?>"></textarea>
</div>
</div>
<div class="status_bottom">
<div class="submit_status_label_wrap">
<span class="character_count">
</span>
<label for="report_status_form_submit" class="submit_status_label">
<div class="toot_button_label disallow_select">
<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
<span><?=_('Report')?></span>
</div>
</label>
</div>
<input id="report_status_form_submit" class="submit_status" type="button" class="invisible">
</div>
</form>
</div>
