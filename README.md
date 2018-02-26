# Halcyon for Mastodon
A Mastodon web client that looks like Twitter

>The original author of this genious piece of software was inactive for a while and then shut down his demo instance and deleted this repository. I love Halcyon, it's the thing which makes Mastodon the best social network in the world. I took the Code from the Halcyon fork of cybre.space which still works but doesn't seem to get updates, too. I uploaded it here to make the original link work again and don't link into the big nothing. I'm working on much other stuff, too, what is why I won't be very active here in the near future but I do things which are required to keep it working and if I have much more time, I already know some nice features which could come. As for now I don't have an own demo instance but the one from cybre.space works pretty good and when I changed many things, I will open an own one.

<img src="https://halcyon.cybre.space/login/assets/images/preview0.png">

## Demo
https://halcyon.cybre.space/
Please note that this demo is not owned by me and I have not control over it. Currently I'm not providing an own demo so I link to that one. That may change in future.

## Features
- Twitter like UI, familiar interface.
- Able to use on all instances.
- No tracking, No ads.

## Requirement
- Apache
- PHP
- MySQL

## Setup
I didn't prepared setup script so you have to setup manually...

### PDO MySQL

After installed PHP, run this.

```bash
sudo pecl install pdo_mysql
sudo vi php.ini
```

change to this

```php.ini
extension=mysqli.so
extension=pdo_mysql.so
```

### MySQL
After installed MySQL, create a user, run this.
```sql
CREATE DATABASE DATABASE_NAME DEFAULT CHARACTER SET utf8;
CREATE TABLE DATABASE_NAME.instances(domain varchar(261), client_id varchar(64), client_secret varchar(64));
```
and make file `/config.ini` like this
```config.ini
~~~ line 3 ~~~
api_client_name = <APP NAME>
api_client_website = <APP WEBSITE LINK>
~~~ line 8 ~~~
db_host = <DATABASE HOST DOMAIN>
db_user = <DATABASE USERNAME>
db_pass = <DATABASE PASSWORD>
db_name = <DATABASE NAME>
```

## Credits

- [Kirschn/mastodon.js](https://github.com/Kirschn/mastodon.js)
- [yks118/Mastodon-api-php](https://github.com/yks118/Mastodon-api-php)
