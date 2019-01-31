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
<li class="item toots view"><?=_('Profile settings')?></li>
</ul>
</header>
<div class="timeline">
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Display name')?></h3>
</div>
<div class="display_name_wrap" style="float:left;width:50%">
<input name="display_name" type="text" class="disallow_enter textfield" id="setting_display_name" maxlength="30">
</div>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('About me')?></h3>
</div>
<div class="about_me_wrap" style="float:left;width:50%">
<textarea name="about_me" class="disallow_enter textfield" id="setting_about_me" maxlength="160" style="resize:none;height:100px;font-family:arial;padding:5px"></textarea>
</div>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Avatar')?></h3>
</div>
<div class="avatar_wrap" style="float:left;width:50%">
<span class="halcyon_button uploadbtn" style="width:calc(75% - 2px);margin:10px;padding:0;height:28px;position:relative">
<input name="avatar" type="file" id="setting_avatar" style="opacity:0;width:100%;height:100%;float:left">
</span>
</div>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Header')?></h3>
</div>
<div class="header_wrap" style="float:left;width:50%">
<span class="halcyon_button uploadbtn" style="width:calc(75% - 2px);margin:10px;padding:0;height:28px;position:relative">
<input name="header" type="file" id="setting_header" style="opacity:0;width:100%;height:100%;float:left">
</span>
</div>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Lock account')?></h3>
</div>
<div class="lock_account_wrap" style="float:left;width:50%">
<div class="switch">
<input type="checkbox" id="setting_lock_account">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<span style="visibility:hidden">-</span>
</div>
<header class="timeline_header" style="border-radius:0;border-top-width:0">
<ul class="header_items">
<li class="item toots view"><?=_('Custom profile fields')?></li>
</ul>
</header>
<div class="timeline">
<div style="float:left;width:50%;text-align:right">
<input name="field_0_name" type="text" class="disallow_enter textfield setting_field" id="setting_field_0_name" placeholder="<?=_('Name')?>">
</div>
<div class="field_0_wrap" style="float:left;width:50%">
<input name="field_0_value" type="text" class="disallow_enter textfield setting_field" id="setting_field_0_value" placeholder="<?=_('Value')?>">
</div>
<div style="float:left;width:50%;text-align:right">
<input name="field_1_name" type="text" class="disallow_enter textfield setting_field" id="setting_field_1_name" placeholder="<?=_('Name')?>">
</div>
<div class="field_1_wrap" style="float:left;width:50%">
<input name="field_1_value" type="text" class="disallow_enter textfield setting_field" id="setting_field_1_value" placeholder="<?=_('Value')?>">
</div>
<div style="float:left;width:50%;text-align:right">
<input name="field_2_name" type="text" class="disallow_enter textfield setting_field" id="setting_field_2_name" placeholder="<?=_('Name')?>">
</div>
<div class="field_2_wrap" style="float:left;width:50%">
<input name="field_2_value" type="text" class="disallow_enter textfield setting_field" id="setting_field_2_value" placeholder="<?=_('Value')?>">
</div>
<div style="float:left;width:50%;text-align:right">
<input name="field_3_name" type="text" class="disallow_enter textfield setting_field" id="setting_field_3_name" placeholder="<?=_('Name')?>">
</div>
<div class="field_3_wrap" style="float:left;width:50%">
<input name="field_3_value" type="text" class="disallow_enter textfield setting_field" id="setting_field_3_value" placeholder="<?=_('Value')?>">
</div>
<div style="width:75%;margin:auto">
<p style="margin-bottom:5px"><?=_('To verify that the links in your custom fields really belong to you, you can add the link below to your website. The link text can be changed to whatever you want.')?></p>
<input class="copy_link_input" id="verifylink" type="text" value="" readonly>
</div>
<span style="visibility:hidden">-</span>
</div>
<footer id="js-timeline_footer" class="timeline_footer">
<i id="savestate" class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
</footer>
</article>
</div>
</main>
<script src="/assets/js/halcyon/halcyonSettings.js"></script>
<?php include ('footer.php'); ?>
