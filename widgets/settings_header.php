<div id="js-header_title_box">
<h1><?=_('Settings')?></h1>
</div>
<div class="header_nav_wrap">
<div class="header_nav">
<div class="header_nav_left">
<ul class="header_nav_list">
<li id="js-settings_nav_general" class="header_nav_item settings_general">
<a href="/settings">
<h2><?=_('GENERAL')?></h2>
</a>
</li>
<li id="js-settings_nav_profile" class="header_nav_item settings_profile">
<a href="/settings/profile">
<h2><?=_('PROFILE')?></h2>
</a>
</li>
<li id="js-settings_nav_appearance" class="header_nav_item settings_appearance">
<a href="/settings/appearance">
<h2><?=_('APPEARANCE')?></h2>
</a>
</li>
<li id="js-settings_nav_filters" class="header_nav_item settings_filters">
<a href="/settings/filters">
<h2><?=_('FILTERS')?></h2>
</a>
</li>
<li id="js-settings_nav_media" class="header_nav_item settings_media">
<a href="/settings/media">
<h2><?=_('MEDIA')?></h2>
</a>
</li>
<li id="js-settings_nav_blocks" class="header_nav_item settings_blocks">
<a href="/settings/blocks">
<h2><?=_('BLOCKS')?></h2>
</a>
</li>
<li id="js-settings_nav_mutes" class="header_nav_item settings_mutes">
<a href="/settings/mutes">
<h2><?=_('MUTES')?></h2>
</a>
</li>
<li id="js-settings_nav_followers" class="header_nav_item settings_followers" style="display:none">
<a href="/settings/followers">
<h2><?=_('FOLLOW REQUESTS')?></h2>
</a>
</li>
</ul>
<script>
if(current_locked == "true") $("#js-settings_nav_followers").show();
</script>
</div>
</div>
</div>
