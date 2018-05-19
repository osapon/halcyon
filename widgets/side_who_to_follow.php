<?php
$appSettings = parse_ini_file('config.ini',true);
echo "<span id='who-to-follow-provider' style='display:none'>".$appSettings["App"]["who_to_follow_provider"]."</span>";
?>
<div class="side_widget follow_opt_in side_widgets_footer">
<h2>Who to follow</h2>
Halcyon needs to connect to an external server to get a list of users which have similar interests as you. If you want to use this feature, please opt-in.
<center><br/>
<button class="halcyon_button" id="enable_follow">
<span>Enable who to follow</span>
</button>
</center>
</div>
<div class="side_widget follow_loading" style="display:none;color:#AAB8C2">
<h2>Who to follow</h2>
<div style="height:100px"></div>
<center>
<span class="fa-stack fa-2x">
<i class="fa fa-circle-o-notch fa-spin" id="follow_icon"></i>
</span>
</center>
<div style="height:100px"></div>
</div>
<div class="side_widget what_to_follow" style="display:none">
<h2>Who to follow</h2>
<ul class="account_list">
<li class="account_box what_to_follow_0">
<div class="icon_box">
<img src="">
</div>
<div class="label_box">
<a href="">
<h3>
<span class="dn emoji_poss"></span>
<span class="un"></span>
</h3>
</a>
<button class="follow_button" mid="" data="">
<i class="fa fa-fw fa-user-plus"></i>
<span>Follow</span>
</button>
</div>
</li>
<li class="account_box what_to_follow_1">
<div class="icon_box">
<img src="">
</div>
<div class="label_box">
<a href="">
<h3>
<span class="dn emoji_poss"></span>
<span class="un"></span>
</h3>
</a>
<button class="follow_button" mid="" data="">
<i class="fa fa-fw fa-user-plus"></i>
<span>Follow</span>
</button>
</div>
</li>
<li class="account_box what_to_follow_2">
<div class="icon_box">
<img src="">
</div>
<div class="label_box">
<a href="">
<h3>
<span class="dn emoji_poss"></span>
<span class="un"></span>
</h3>
</a>
<button class="follow_button" mid="" data="">
<i class="fa fa-fw fa-user-plus"></i>
<span>Follow</span>
</button>
</div>
</li>
</ul>
</div>
