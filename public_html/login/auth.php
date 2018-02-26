<!DOCTYPE HTML>
<html lang='en'>

<head>

    <script>
        if(
          localStorage.getItem('current_id')       |
          localStorage.getItem('current_instance') |
          localStorage.getItem('current_authtoken')
        ){
            location.href = '/logout';
        };
    </script>

    <?php
        #!/usr/bin/env php
        #ini_set("display_errors", On);
        #error_reporting(E_ALL);
        require_once('../../authorize/Mastodon.php');
        use HalcyonSuite\HalcyonForMastodon\Mastodon;
        use Exception;

        $api = new Mastodon();

        if ($_GET['code']) {

            $domain = htmlspecialchars((string)filter_input(INPUT_GET, 'host'), ENT_QUOTES);
            $URL    = 'https://'.$domain;

            $api->selectInstance($URL);
            $response = $api->get_access_token($api->clientWebsite.'/auth?&host='.$domain, htmlspecialchars((string)filter_input(INPUT_GET, 'code'), ENT_QUOTES));

            if ($response['html']["access_token"]) {

                $access_token = $response['html']["access_token"];
                $account_id   = $api->accounts_verify_credentials()['html']['id'];

                echo "
                <script>

                    localStorage.setItem('current_id',        '$account_id');
                    localStorage.setItem('current_instance',  '$domain');
                    localStorage.setItem('current_authtoken', '$access_token');

                    localStorage.setItem('setting_post_stream', 'manual');
                    localStorage.setItem('setting_post_privacy', 'public');
                    localStorage.setItem('setting_local_instance', 'default');
                    localStorage.setItem('setting_search_filter', 'all');

                    localStorage.setItem('what_to_follow_0', JSON.stringify({id:'',username:'Halcyon',display_name:'Halcyon for Mastodon',url:'https://mastodon.social/@Halcyon',avatar:'https://files.mastodon.social/accounts/avatars/000/132/199/original/1ca33302b092376b.png'}));
                    localStorage.setItem('what_to_follow_1', JSON.stringify({id:'',username:'Gargron',display_name:'Eugen',url:'https://mastodon.social/@Gargron',avatar:'https://files.mastodon.social/accounts/avatars/000/000/001/original/J3IHut1v.png'}));
                    localStorage.setItem('what_to_follow_2', JSON.stringify({id:'',username:'Mastodon',display_name:'Mastodon',url:'https://mastodon.social/@Mastodon',avatar:'https://files.mastodon.social/accounts/avatars/000/013/179/original/logo-41b041930be24e8039129c8ac4ff4840ef467f40c3f2d5044db50a4b15ceb285.png'}));

                    location.href = '/';

                </script>
                ";

            }
        }
    ?>

    <script src="//yastatic.net/jquery/3.2.1/jquery.min.js"></script>
    <script src="/assets/js/mastodon.js/mastodon.js"></script>
</head>

<body>
</body>
</html>
