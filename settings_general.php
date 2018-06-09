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
<li class="item toots view">General settings</li>
</ul>
</header>
<div class="timeline">
<div style="float:left;width:25%;text-align:right;margin-top:16px">
<h3>Default post privacy</h3>
</div>
<div class="post_privacy_wrap" style="float:left;width:75%;margin-top:8px;margin-bottom:-8px">
<div class="radiobox">
<input id="privacy-1" name="post_privacy" type="radio" value="public">
<label for="privacy-1" class="radiotext">Public</label>
</div>
<div class="radiobox">
<input id="privacy-2" name="post_privacy" type="radio" value="unlisted">
<label for="privacy-2" class="radiotext">Unlisted</label>
</div>
<div class="radiobox">
<input id="privacy-3" name="post_privacy" type="radio" value="private">
<label for="privacy-3" class="radiotext">Followers-only</label>
</div>
<div class="radiobox">
<input id="privacy-4" name="post_privacy" type="radio" value="direct">
<label for="privacy-4" class="radiotext">Direct</label>
</div>
</div>
<div style="float:left;width:25%;text-align:right;margin-top:16px">
<h3>Mark as NSFW by default</h3>
</div>
<div class="post_sensitive_wrap" style="float:left;width:75%">
<div class="switch">
<input type="checkbox" id="setting_post_sensitive">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<div style="float:left;width:25%;text-align:right;margin-top:16px">
<h3>Local instance</h3>
</div>
<div class="local_instance_wrap" style="float:left;width:75%">
<input name="local_instance" placeholder="default" type="text" class="disallow_enter textfield" id="setting_local_instance">
</div>
<div style="float:left;width:25%;text-align:right;margin-top:16px">
<h3>Hashtag search filter</h3>
</div>
<div class="search_filter_wrap" style="float:left;width:75%;margin-top:8px;margin-bottom:-8px">
<div class="radiobox">
<input id="locinstance-1" name="search_filter" type="radio" value="all">
<label for="locinstance-1" class="radiotext">All instances</label>
</div>
<div class="radiobox">
<input id="locinstance-2" name="search_filter" type="radio" value="local">
<label for="locinstance-2" class="radiotext">Local only</label>
</div>
</div>
<div style="float:left;width:25%;text-align:right;margin-top:16px">
<h3>Who to follow</h3>
</div>
<div class="who_to_follow_wrap" style="float:left;width:75%">
<div class="switch">
<input type="checkbox" id="setting_who_to_follow">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<span style="visibility:hidden">-</span>
</div>
</article>
</div>
</main>
<script src="/assets/js/halcyon/halcyonSettings.js"></script>
<?php include ('footer.php'); ?>
