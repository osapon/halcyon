<?php include ('header.php'); ?>

<!-- MAIN -->
<main id="main">

    <?php include dirname(__FILE__).('/widgets/user_header.php'); ?>

    <div class="article_wrap">

        <aside class="left_column">

            <div class="profile_icon_box">
                <img id="js_profile_image" src="/assets/images/missing.png" mediaaccess="true"/>
            </div>

            <section class="profile_section_wrap">

                <h1 class="profile_displayname">
                    <a id="js_profile_displayname" class="emoji_poss" href="#"></a>
                </h1>

                <h2 class="profile_username">
                    @<a id="js_profile_username" href="#"></a>
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

            <header class="timeline_header">
                <ul class="header_items">

                    <li class="item toots">
                      <a id="toots_link">
                          Toots
                      </a>
                    </li>

                    <li class="item wreplies view">
                      <a id="with_replies_link">
                          Toots &amp; replies
                      </a>
                    </li>

                    <li class="item media">
                      <a id="media_link">
                          Media
                      </a>
                    </li>

                </ul>
            </header>

            <div id="js-stream_update">
              <button>
                View <span></span> new Toots
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

  // namespace
  current_file = location.pathname;

  $("#toots_link").attr('href', './'+location.search);
  $("#with_replies_link").attr('href', './with_replies'+location.search);
  $("#media_link").attr('href', './media'+location.search);

  $("#js-profile_nav_toots > a").toggleClass("view");
  $("#js-profile_nav_toots > a").attr('href', location.pathname+location.search);
  $("#js-profile_nav_following > a").attr('href', './following'+location.search);
  $("#js-profile_nav_followers > a").attr('href', './followers'+location.search);
  $("#js-profile_nav_favourites > a").attr('href', './favourites'+location.search);

  <?php if (isset($_GET['mid'])): ?>

    $(function() {

      // find by mid
      const account_id = <?= htmlspecialchars((string)filter_input(INPUT_GET, 'mid'), ENT_QUOTES) ?>;
      api.get('accounts/'+account_id, function(AccountObj) {

        if ( AccountObj !== null ) {
          setAccount(AccountObj);
          setTimeline("accounts/"+AccountObj.id+"/statuses");
          setRecentImages(AccountObj.id);
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
          setAccount(search.accounts[0]);
          setTimeline("accounts/"+search.accounts[0].id+"/statuses");
          setRecentImages(search.accounts[0].id);
        } else {
          location.href = "/404.php";
        }
      });
    })

  <?php endif; ?>

</script>

<?php include ('footer.php'); ?>