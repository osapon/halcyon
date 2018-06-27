<?php include ('header.php'); ?>
<main id="main">
<?php include dirname(__FILE__).('/widgets/user_header.php'); ?>
<div class="article_wrap">
  <aside class="left_column">
    <div class="profile_icon_box">
      <img id="js_profile_image" src="/assets/images/missing.png" mediaaccess="true">
    </div>
    <section class="profile_section_wrap">
      <h1 class="profile_displayname">
        <a id="js_profile_displayname" class="emoji_poss" href="#"></a>
      </h1>
      <h2 class="profile_username">
        @<a id="js_profile_username" href="#"></a><span class="profile_followed_by invisible"><?=_('FOLLOWS YOU')?></span>
      </h2>
      <p id="js_profile_bio" class="profile_bio emoji_poss"></p>
      <p id="js_header_fiels" class="profile_bio emoji_poss"></p>
      <?php include dirname(__FILE__).('/widgets/user_recent_images.php'); ?>
    </section>
  </aside>
  <article class="center_column">
    <header class="timeline_header">
      <ul class="header_items">
        <li class="item toots view">
          <a id="toots_link">
          <?=_('Toots')?>
          </a>
        </li>
        <li class="item wreplies">
          <a id="with_replies_link">
          <?=_('Toots &amp; replies')?>
          </a>
        </li>
        <li class="item media">
          <a id="media_link">
          <?=_('Media')?>
          </a>
        </li>
      </ul>
    </header>
    <div id="js-stream_update">
      <button>
        <?=_('View new Toots')?>
      </button>
    </div>
    <ul id="js-timeline" class="timeline">
    </ul>
    <footer id="js-timeline_footer" class="timeline_footer">
      <i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
    </footer>
  </article>
  <aside class="right_column">
    <section class="side_widgets_wrap">
      <?php include dirname(__FILE__).('/widgets/side_who_to_follow.php'); ?>
    </section>
    <?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
  </aside>
</div>
</main>
<script>
current_file = "/user";
$("#toots_link").attr('href', location.pathname+location.search);
$("#with_replies_link").attr('href', location.pathname+'/with_replies'+location.search);
$("#media_link").attr('href', location.pathname+'/media'+location.search);
$("#js-profile_nav_toots").toggleClass("view");
$("#js-profile_nav_toots > a").attr('href', location.pathname+location.search);
$("#js-profile_nav_following > a").attr('href', location.pathname+'/following'+location.search);
$("#js-profile_nav_followers > a").attr('href', location.pathname+'/followers'+location.search);
$("#js-profile_nav_favourites > a").attr('href', location.pathname+'/favourites'+location.search);
<?php if (isset($_GET['mid'])): ?>
$(function() {
  const account_id = <?= htmlspecialchars((string)filter_input(INPUT_GET, 'mid'), ENT_QUOTES) ?>;
  api.get('accounts/'+account_id, function(userprofile) {
    if ( userprofile !== null ) {
      $('title').text(replaced_emoji_return(userprofile.display_name)+' (@'+userprofile.acct+') | Halcyon');
      setAccount(userprofile);
      setTimeline("accounts/"+userprofile.id+"/statuses",[{name:'exclude_replies',data:'true'}],"false");
      setRecentImages(userprofile.id)
      $('.profile_button_box').prepend('<a href="'+userprofile.url+'" target="_blank"><button class="relationship_button" mid="33514"><span><?=_("View original")?></span></button></a>');
    } else {
      location.href = "/404.php";
    }
  });
});
<?php elseif((isset($_GET['user']))): ?>
$(function(){
<?php
$name = preg_split("/@/", $_GET['user'])[1];
$domain = preg_split("/@/", $_GET['user'])[2];
$url= "https://$domain/@$name";
?>
const query = '<?= htmlspecialchars((string)filter_input(INPUT_GET, 'user'), ENT_QUOTES) ?>';
api.get('search', [{name:'q',data:query},{name:'resolve',data:'true'}], function(search) {
if ( !search.accounts.length ) {
location.href = "/404.php";
} else if ("@"+search.accounts[0].acct === query || "@"+search.accounts[0].acct+"@"+localStorage.current_instance === query) {
$('title').text(replaced_emoji_return(search.accounts[0].display_name)+' (@'+search.accounts[0].acct+') | Halcyon');
setAccount(search.accounts[0]);
setTimeline("accounts/"+search.accounts[0].id+"/statuses",[{name:'exclude_replies',data:'true'}],"false");
setRecentImages(search.accounts[0].id)
} else {
location.href = "/404.php";
}
});
})
<?php endif; ?>
</script>
<?php include ('footer.php'); ?>
