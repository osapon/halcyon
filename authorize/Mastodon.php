<?php
#!/usr/bin/env php
namespace HalcyonSuite\HalcyonForMastodon;

require_once('database.php');
require_once('Mastodon-api-php/Mastodon_api.php');

use HalcyonSuite\HalcyonForMastodon\Database;
use PDO;
use Exception;

/*-------------------
  class for halcyon
--------------------*/
class Mastodon extends \Mastodon_api
{

    function __construct(){
        $appSettings = parse_ini_file('../../config.ini', true);

        $this->clientName         = $appSettings["App"]["api_client_name"];
        $this->clientRedirectUris = $appSettings["App"]["api_client_website"].'/auth urn:ietf:wg:oauth:2.0:oob';
        $this->clientWebsite      = $appSettings["App"]["api_client_website"];
        $this->clientScopes       = array('read', 'write', 'follow');
        $this->instances          = array();

        $this->dbHost             = $appSettings["Mysql"]["db_host"];
        $this->dbUser             = $appSettings["Mysql"]["db_user"];
        $this->dbPass             = $appSettings["Mysql"]["db_pass"];
        $this->dbName             = $appSettings["Mysql"]["db_name"];

        $this->database = new Database($this->dbHost, $this->dbUser, $this->dbPass, $this->dbName);
        $this->readInstances();
    }

    /* note: $domainって書いてあるけど、ドメインじゃなくてURLです。すみません */

    private function newInstance($domain)
    {
        $res = $this->create_app($this->clientName, $this->clientScopes, $this->clientRedirectUris, $this->clientWebsite);
        if (isset($res['html']['client_id'])) {
            $this->instances[$domain] = $res['html'];
            $this->database->dbExecute("insert into instances(domain, client_id, client_secret) values(?,?,?)", array($domain, $res['html']['client_id'], $res['html']['client_secret']));
            // insert into instances(domain, client_id, client_secret) values($domain, $client_id, $client_secret)
        }else{
            throw new Exception("Invalid instance");
        }
    }

    public function selectInstance($domain)
    {
        $this->set_url($domain);
        if (!$this->instanceExists($domain)) {
            $this->newInstance($domain);
        }
        $this->set_client($this->instances[$domain]['client_id'], $this->instances[$domain]['client_secret']);
    }

    public function getInstance($domain)
    {
        $this->set_url($domain);
        if (!$this->instanceExists($domain)) {
            $this->newInstance($domain);
        }
        return array('client_id' => $this->instances[$domain]['client_id'], 'client_secret' => $this->instances[$domain]['client_secret']);
    }

    public function instanceExists($domain)
    {
        return isset($this->instances[$domain]);
    }

    private function readInstances()
    {
        $stmt = $this->database->dbExecute("select domain,client_id,client_secret from instances");
        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
            $this->instances[$row['domain']] = $row;
        }
    }

}
?>
