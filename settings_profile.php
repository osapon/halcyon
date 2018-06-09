<?php include ('header.php'); ?>
<style>
.uploadbtn:before {
position:absolute;
left:0;
right:0;
text-align:center;
font-size:12px;
font-weight:600;
content:"Select file and upload";
}
</style>
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
<li class="item toots view">Profile settings</li>
</ul>
</header>
<div class="timeline">
<div style="float:left;width:25%;text-align:right;margin-top:16px">
<h3>Display name</h3>
</div>
<div class="display_name_wrap" style="float:left;width:75%">
<input name="display_name" type="text" class="disallow_enter textfield" id="setting_display_name" maxlength="30">
</div>
<div style="float:left;width:25%;text-align:right;margin-top:16px">
<h3>About me</h3>
</div>
<div class="about_me_wrap" style="float:left;width:75%">
<textarea name="about_me" class="disallow_enter textfield" id="setting_about_me" maxlength="160" style="resize:none;height:100px;font-family:arial;padding:5px"></textarea>
</div>
<div style="float:left;width:25%;text-align:right;margin-top:16px">
<h3>Avatar</h3>
</div>
<div class="avatar_wrap" style="float:left;width:75%">
<span class="halcyon_button uploadbtn" style="width:calc(50% - 2px);margin:10px;padding:0;height:28px;position:relative">
<input name="avatar" type="file" id="setting_avatar" style="opacity:0;width:100%;height:100%;float:left">
</span>
</div>
<div style="float:left;width:25%;text-align:right;margin-top:16px">
<h3>Header</h3>
</div>
<div class="header_wrap" style="float:left;width:75%">
<span class="halcyon_button uploadbtn" style="width:calc(50% - 2px);margin:10px;padding:0;height:28px;position:relative">
<input name="header" type="file" id="setting_header" style="opacity:0;width:100%;height:100%;float:left">
</span>
</div>
<div style="float:left;width:25%;text-align:right;margin-top:16px">
<h3>Lock account</h3>
</div>
<div class="lock_account_wrap" style="float:left;width:75%">
<div class="switch">
<input type="checkbox" id="setting_lock_account">
<div class="switch-btn">
<span></span>
</div>
</div>
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
