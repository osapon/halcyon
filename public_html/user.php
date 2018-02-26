<?php include ('header.php'); ?>

<!-- MAIN -->
<main id="main">

    <?php include dirname(__FILE__).('/widgets/user_header.php'); ?>

    <div class="article_wrap">

        <aside class="left_column">

            <!-- Profile avatar -->
            <div class="profile_icon_box">
                <img id="js_profile_image" src="/assets/images/missing.png" mediaaccess="true"/>
            </div>

            <!-- Display/username, bio-->
            <section class="profile_section_wrap">
                <h1 class="profile_displayname">
                    <a id="js_profile_displayname" class="emoji_poss" href="#"></a>
                </h1>
                <h2 class="profile_username">
                    @<a id="js_profile_username" href="#"></a><span class="profile_followed_by invisible">FOLLOWS YOU</span>
                </h2>
                <p id="js_profile_bio" class="profile_bio emoji_poss"></p>
                <?php include dirname(__FILE__).('/widgets/user_recent_images.php'); ?>
            </section>

            <div class="right_column_clone">
                <?php include dirname(__FILE__).('/widgets/side_who_to_follow.php'); ?>
                <?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
            </div>

        </aside>

        <article class="center_column">

            <!-- TIMELINE HEADER -->
            <header class="timeline_header">
                <ul class="header_items">
                    <!-- TOOT -->
                    <li class="item toots view">
                      <a id="toots_link">
                          Toots
                      </a>
                    </li>
                    <!--- TOOTS & REPLIES -->
                    <li class="item wreplies">
                      <a id="with_replies_link">
                          Toots &amp; replies
                      </a>
                    </li>
                    <!-- MEDIA -->
                    <li class="item media">
                      <a id="media_link">
                          Media
                      </a>
                    </li>
                </ul>
            </header>

            <!-- UPDATE BUTTON -->
            <div id="js-stream_update">
              <button>
                View <span></span> new Toots
              </button>
            </div>

            <!-- TIMELINE -->
            <ul id="js-timeline" class="timeline">
            </ul>

            <!-- TIMELINE FOOTER -->
            <footer id="js-timeline_footer" class="timeline_footer">
              <i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
            </footer>

        </article>

        <aside class="right_column">
            <section class="side_widgets_wrap">
                <?php include dirname(__FILE__).('/widgets/side_who_to_follow.php'); ?>
            </section>
            <!-- FOOTER -->
            <?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
        </aside>
    </div>
</main>

<script>

  // namespace
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

      // find by mid
      const account_id = <?= htmlspecialchars((string)filter_input(INPUT_GET, 'mid'), ENT_QUOTES) ?>;

      api.get('accounts/'+account_id, function(userprofile) {

        if ( userprofile !== null ) {
          $('title').text(replaced_emoji_return(userprofile.display_name)+' (@'+userprofile.acct+') | Halcyon');
          setAccount(userprofile);
          setTimeline("accounts/"+userprofile.id+"/statuses",[{name:'exclude_replies',data:'true'}]);
          setRecentImages(userprofile.id)
        } else {
          location.href = "/404.php";
        }

      });

    });

  <?php elseif((isset($_GET['user']))): ?>

    $(function(){

      // find by url
      <?php
        $name   = preg_split("/@/", $_GET['user'])[1];
        $domain = preg_split("/@/", $_GET['user'])[2];
        $url    = "https://$domain/@$name";
      ?>

      const query = '<?= htmlspecialchars((string)filter_input(INPUT_GET, 'user'), ENT_QUOTES) ?>';
      api.get('search', [{name:'q',data:query},{name:'resolve',data:'true'}], function(search) {

        if ( !search.accounts.length ) {
            location.href = "/404.php";
        } else if ( "@"+search.accounts[0].acct === query ) {
            $('title').text(replaced_emoji_return(search.accounts[0].display_name)+' (@'+search.accounts[0].acct+') | Halcyon');
            setAccount(search.accounts[0]);
            setTimeline("accounts/"+search.accounts[0].id+"/statuses",[{name:'exclude_replies',data:'true'}]);
            setRecentImages(search.accounts[0].id)
        } else {
            location.href = "/404.php";
        }

      });
    })

  <?php endif; ?>

</script>

<?php include ('footer.php'); ?>