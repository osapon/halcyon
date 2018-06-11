# Halcyon for Mastodon and Pleroma
An webclient for Mastodon and Pleroma which looks like Twitter

>The original author of this genius piece of software was inactive for a while and then shut down his demo instance and deleted this repository. I love Halcyon, it's the thing which makes Mastodon the best social network in the world. I took the Code from the Halcyon fork of cybre.space which still works but doesn't seem to get updates, too. I uploaded it here to make the original link work again and don't link into the big nothing. I'm working on much other stuff, too, what is why I won't use my whole free time to work on Halcyon but I try to do as much as possible here.

<a href="https://halcyon.osa-p.net/login/assets/images/preview0.png"><img src="https://halcyon.osa-p.net/login/assets/images/preview0.png" width="200px"></a>
<a href="https://halcyon.osa-p.net/login/assets/images/preview1.png"><img src="https://halcyon.osa-p.net/login/assets/images/preview1.png" width="200px"></a>
<a href="https://halcyon.osa-p.net/login/assets/images/preview2.png"><img src="https://halcyon.osa-p.net/login/assets/images/preview2.png" width="200px"></a>
<a href="https://halcyon.osa-p.net/login/assets/images/preview3.png"><img src="https://halcyon.osa-p.net/login/assets/images/preview3.png" width="200px"></a>

## Stay tuned
Follow or Mastodon account and never miss an important update: [@halcyon@social.csswg.org](https://social.csswg.org/@halcyon)

## Instances
These instances are publicly accessible and usable by everyone, no matter which Mastodon instance you use.
- https://social.dev-wiki.de - 1.1.6
- https://halcyon.toromino.de - 1.1.7
- https://itter.photog.social - 1.1.7
- https://halcyon.bka.li - 1.1.7
- https://halcyon.tilde.team - 1.1.7
- https://halcyon.distsn.org - 1.1.6
- https://halcyon.osa-p.net - 1.1.7(MultiLanguage + other feature)
- https://halcyon.cybre.space - Outdated

You have your own Halcyon instance and want it to be listed here? Create an issue with the link and we will add it to the list.

## Blog
- Release of Version 1.1.7 - Fixed some bugs in compatibility with Pleroma,text fields now autoresizable,stopped undefined socket tries on profile pages
- Release of Version 1.1.6 - This repository uses [Followlink](https://followlink.osa-p.net/) as an aid to who to follow.
- Release of Version 1.1.5 - Introduced the new Idempotency-Key Header and fixed an bug allowing XSS with the display name
- Release of Version 1.1.4 - Automatically reconnect on bad connection,now supports desktop notifications,added ... at the end of shortened links
- Release of Version 1.1.3 - New function link previews introduced and bug when replying an toot which already has replies below it fixed (reply to undefined)
- Release of Version 1.1.2 - Privacy modes are now correctly displayed and used for replies,use username if display name doesn't exist,bugs on search page fixed
- Release of Version 1.1.1 - Fixed error 404 when viewing profile of own instance,numbers below profile on the left do now change during session,added nginx config
- [Release of Version 1.1.0 and upcoming features](http://nikisoft.myblog.de/nikisoft/art/11389499/Halcyon-What-we-did-and-what-we-will-do)
- Release of Version 1.0.3 - "Who to follow" doesn't show people you already follow anymore and design of preferences and search bar is now much better
- Release of Version 1.0.2 - Fixed a Firefox-only bug and some wrong links, added version info and an annoying cookie notice (sorry, but that's EU law)
- Release of Version 1.0.1 - Two bugfixes
- [Release of Version 1.0.0](http://nikisoft.myblog.de/nikisoft/art/11264555/The-first-new-Halcyon-release-is-on-Github)

## Features
- Twitter like UI, familiar interface.
- Able to use on all instances.
- No tracking, No ads.
- MultiLanguage(English / Japanese / Korean).
- Multi image/gifv viewer.
- Same search processing as WebUI.
- Sensitive image can switched for show / hide.
- Auto-play animated GIFs(selectable stop or play).
- 2 column view.
- Toot URL copy to clipboard.
- Timeline pause the auto scroll.
- Notification tab is split(All / Reply / Follow / Boost & Fav / Direct).
- Emoji input pad.
- Draft

## Translation
 Accepting translations with [Weblate](https://weblate.osa-p.net/projects/halcyon/web/), but you need to make a pull request with Github in order to post a contributor a name.


## Requirement
- Apache/Nginx/lighttpd
- PHP
- No database needed anymore!

## Setup
Upload it, edit config.ini and have fun!

## Credits
- [Kirschn/mastodon.js](https://github.com/Kirschn/mastodon.js)
- [yks118/Mastodon-api-php](https://github.com/yks118/Mastodon-api-php)
- [cfv1984/Pomo](https://github.com/cfv1984/Pomo)
