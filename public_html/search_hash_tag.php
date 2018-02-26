<?php include ('header.php'); ?>

<!-- MAIN -->
<main id="main">

    <?php include dirname(__FILE__).('/widgets/search_header.php'); ?>

    <div class="article_wrap">

        <aside class="left_column">

          <?php include dirname(__FILE__).('/widgets/side_load_options.php'); ?>
          <?php include dirname(__FILE__).('/widgets/side_who_to_follow.php'); ?>
          <?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>

        </aside>

        <article class="center_column">

            <header class="timeline_header">
                <ul class="header_items">

                    <li class="item toots view">
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

        <aside class="right_column"></aside>

    </div>

</main>
<script>

  // namespace
  current_file = location.pathname;

  <?php if (isset($_GET['q'])): ?>

    $(function() {
      // find by mid
      const query = "<?= htmlspecialchars((string)filter_input(INPUT_GET, 'q'), ENT_QUOTES) ?>";
      $('#main > .article_wrap > .center_column > .timeline_header > .header_items > .item').text("#"+query);
      $('#js-search_title_box > h1').text(query);
      $('title').text('#'+query+' - Halcyon Search');
      $('#js-search_nav_toots').toggleClass('view');
      $('#js-search_nav_toots a ').attr('href','/search'+location.search);
      $('#js-search_nav_peoples a ').attr('href','/search/users'+location.search)

      if ( localStorage.getItem("setting_search_filter") === "all" ) {
        setTimeline("timelines/tag/"+query);
      } else if ( localStorage.getItem("setting_search_filter") === "local" ) {
        setTimeline("timelines/tag/"+query, [{name:"local",data:"ture"}]);
      }

      replace_emoji();

    });

  <?php endif; ?>

</script>

<?php include ('footer.php'); ?>