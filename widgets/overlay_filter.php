<div class="overlay_simple overlay_filter invisible">
<header class="overlay_simple_header">
<span><?=_('Filter')?></span>
</header>
<div class="overlay_simple_body">
<form id="addfilter">
<input type="hidden" id="filterid" name="id">
<div class="overlay_filter_label" style="margin-bottom:10px;text-align:right;margin-top:6px;float:left;width:50%"><?=_('Word or phrase to filter')?>&nbsp;&nbsp;&nbsp;</div>
<div style="margin-bottom:10px;float:left;width:50%">
<input type="text" name="phrase" class="overlay_filter_word textfield" style="margin:0;width:100%" id="filtertext">
</div>
<div class="overlay_filter_label" style="margin-bottom:10px;text-align:right;margin-top:6px;float:left;width:50%"><?=_('Expires in')?>&nbsp;&nbsp;&nbsp;</div>
<div style="margin-bottom:10px;float:left;width:50%">
<select name="expires_in" class="selectbox">
<option value selected><?=_('Never')?></option>
<option value="1800">30 <?=_('minutes')?></option>
<option value="3600">1 <?=_('hour')?></option>
<option value="21600">6 <?=_('hours')?></option>
<option value="43200">12 <?=_('hours')?></option>
<option value="86400">1 <?=_('day')?></option>
<option value="604800">1 <?=_('week')?></option>
</select>
</div>
<div class="overlay_filter_label" style="margin-bottom:10px;width:100%;text-align:center"><?=_('Filter in the following timelines')?></div>
<div style="margin-bottom:10px;float:left;width:50%">
<input type="checkbox" class="checkbox" name="context[]" value="home" id="checkbox_home">
<label for="checkbox_home"><?=_('Home')?></label><br/>
<input type="checkbox" class="checkbox" name="context[]" value="notifications" id="checkbox_notifications">
<label for="checkbox_notifications"><?=_('Notifications')?></label>
</div>
<div style="margin-bottom:10px;float:left;width:50%">
<input type="checkbox" class="checkbox" name="context[]" value="public" id="checkbox_public">
<label for="checkbox_public"><?=_('Public')?></label><br/>
<input type="checkbox" class="checkbox" name="context[]" value="thread" id="checkbox_thread">
<label for="checkbox_thread"><?=_('Thread')?></label>
</div>
<div style="margin-bottom:20px;width:100%">
<div class="switch" style="margin:0;float:left">
<input type="checkbox" name="irreversible" value="1" id="filter_irreversible">
<div class="switch-btn">
<span></span>
</div>
</div>
<label for="filter_irreversible" style="margin-left:5px;vertical-align:sub"><?=_('Filter posts irreversible')?></label>
</div>
<div style="margin-bottom:10px;width:100%">
<div class="switch" style="margin:0;float:left">
<input type="checkbox" name="whole_word" value="1" id="filter_whole_word">
<div class="switch-btn">
<span></span>
</div>
</div>
<label for="whole_word" style="margin-left:5px;vertical-align:sub"><?=_('Whole word')?></label>
</div>
</form>
<span style="visibility:hidden">-</span>
<div class="overlay_simple_controls">
<button class="overlay_filter_ok toot_button" style="float:right"><div class="toot_button_label"><i class="fa fa-fw fa-check"></i><span><?=_('Ok')?></span></div></button>
<a href="javascript:$('.close_button').click();void(0)" class="overlay_filter_cancel halcyon_link" style="float:right;margin-top:5px;margin-right:10px"><i class="fa fa-times"></i> <?=_('Cancel')?></a>
</div>
</div>
</div>
<style>
.select {
width:calc(100% - 2px);
margin:-10px;
}
</style>
