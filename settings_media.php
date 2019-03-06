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
<li class="item toots view"><?=_('Media settings')?></li>
</ul>
</header>
<div class="timeline">
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Play animated GIFs')?></h3>
</div>
<div class="play_gif_wrap" style="float:left;width:50%">
<div class="switch">
<input type="checkbox" id="setting_play_gif">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Enable video player')?></h3>
</div>
<div class="play_video_wrap" style="float:left;width:50%">
<div class="switch">
<input type="checkbox" id="setting_play_video">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Enable audio player')?></h3>
</div>
<div class="play_audio_wrap" style="float:left;width:50%">
<div class="switch">
<input type="checkbox" id="setting_play_audio">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Embed PeerTube videos')?></h3>
</div>
<div class="play_peertube_wrap" style="float:left;width:50%">
<div class="switch">
<input type="checkbox" id="setting_play_peertube">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<?php if($config["Media"]["youplay"]) { ?>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Embed YouTube using YouPlay')?></h3>
</div>
<div class="play_youplay_wrap" style="float:left;width:50%">
<div class="switch">
<input type="checkbox" id="setting_play_youplay">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<?php } else { ?>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Embed YouTube using Invidio.us')?></h3>
</div>
<div class="play_invidious_wrap" style="float:left;width:50%">
<div class="switch">
<input type="checkbox" id="setting_play_invidious">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<?php } if($config["Media"]["vimeo"]) { ?>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Embed Vimeo using YouPlay')?></h3>
</div>
<div class="play_vimeo_wrap" style="float:left;width:50%">
<div class="switch">
<input type="checkbox" id="setting_play_vimeo">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<?php } ?>
<span style="visibility:hidden">-</span>
</div>
</article>
</div>
</main>
<script src="/assets/js/halcyon/halcyonSettings.js"></script>
<?php include ('footer.php'); ?>
