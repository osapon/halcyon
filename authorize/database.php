<?php
#!/usr/bin/env php
namespace HalcyonSuite\HalcyonForMastodon;
use PDO;
use Exception;

class Database{
    public function __construct($dbhost, $dbuser, $dbpass, $dbname){
        $this->dbhost = $dbhost;
        $this->dbuser = $dbuser;
        $this->dbpass = $dbpass;
        $this->dbname = $dbname;
        $this->dsn = "mysql:dbname=".$this->dbname.";host=".$this->dbhost.";charset=utf8";
        $this->connecting = false;
        $this->dbConnect();
    }

    public function dbConnect($commit=True){
        try{
            $dbh = new PDO($this->dsn, $this->dbuser, $this->dbpass);
            $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            if(!$commit){
                $dbh->beginTransaction();
            }
        }catch (PDOException $e){
            throw new Exception($e);
        }
        $this->dbh = $dbh;
        $this->connecting = true;
        return $dbh;
    }

    public function dbClose(){
        $this->dbh = Null;
        $this->connecting = false;
    }

    public function dbExecute($sql, $attr = null){
        if ($attr === null) {
          $attr = array();
        }
        if (!$this->connecting) {
            $this->dbConnect();
        }
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute($attr);
        return $stmt;
    }
}
?>
