# Halcyon for Mastodon and Pleroma
A webclient for Mastodon and Pleroma which looks like Twitter

>The original author of this genius piece of software was inactive for a while and then shut down his demo instance and deleted this repository. I love Halcyon, it's the thing which makes Mastodon the best social network in the world. I took the code from the Halcyon fork of cybre.space which still works but doesn't seem to get updates, too. I uploaded it here to make the original link work again and don't link into the big nothing. I'm working on much other stuff, too, therefore I won't use my whole free time to work on Halcyon. But I try to do as much as possible here.

<img src="https://halcyon.cybre.space/login/assets/images/preview0.png">

## Stay tuned
Follow our Mastodon account and never miss an important update: [@halcyon@social.csswg.org](https://social.csswg.org/@halcyon)

## Instances
We moved our instances list to our webpage: https://www.halcyon.social/instances.php

## Translate
[Help us translating Halcyon into many languages](https://translate.nikisoft.one/projects/halcyon/)

## Features
- Twitter like UI, familiar interface.
- Able to use on all instances.
- No tracking, No ads.
- Supports multiple languages.
- Privacy-friendly video embeds.
- Full support for Mastodon polls.

## Install
[![Install Halcyon with YunoHost](https://install-app.yunohost.org/install-with-yunohost.png)](https://install-app.yunohost.org/?app=halcyon)  
or read our new documentation pages to install it manually: https://www.halcyon.social/documentation.php?page=install

## Blog
- Release of Version 2.3.1 - Fix duplicated thread,allow adding more toots as reply chain,add Dutch translation,more bugfixes,improved translations.
- [Zanata outage and our reactions](https://blog.nikisoft.one/note/656562f160a728ea)
- [Release of Version 2.3.0 - Polls are coming to Mastodon](https://blog.nikisoft.one/note/9d17f1ca19da4095)
- Release of Version 2.2.5 - Add French translation,improve German translation,add support for video captions,add support for video thumbnails
- Release of Version 2.2.4 - Easily switch between pictures in overlay,show pictures in full height in timeline,duplicated threads removed,many smaller bugfixes
- Release of Version 2.2.3 - Fixed login with Pleroma,fixed compatibility with Pawoo (older Mastodon),added support for prefers-color-scheme,some more fixes
- Our new information website [halcyon.social](https://www.halcyon.social) came online
- Release of Version 2.2.2 - Fix autocomplete,fix double scrollbars in overlay,add emojis at cursor position,confirm when closing compose window,add czech translation
- Release of Version 2.2.1 - Many small bugfixes (details see release notes) and improved compatibility to the new Pleroma API
- [Release of Version 2.2.0 - Privacy-focused media streaming and more](https://blog.nikisoft.one/note/a8b64e33e423f60f)
- Release of Version 2.1.6 - Added search suggestions,fixed autocomplete bug,added instance info page,fixed small bug in profile settings,search for posts now supported
- Release of Version 2.1.5 - Added support for filter,added possibility to filter all bots,it's now easier to detect bots
- Release of Version 2.1.4 - Added custom profile fields,verified links,custom profile link settings and improved regular expressions for links
- Release of Version 2.1.3 - Added a autocomplete feature for usernames,hashtags and emojis,fixed a bug in the emoji picker (didn't open sometimes)
- Release of Version 2.1.2 - Added toot to @someone button to profiles,remove blocked and muted people from who to follow,improved German translation
- Release of Version 2.1.1 - Profile settings can be changed again,fixed various Firefox-only bugs,Removed error if browser sends no language
- [Release of Version 2.1.0 - Introducing lists and more](https://blog.nikisoft.one/note/d18ef711148a1ea4)
- Release of Version 2.0.2 - Added dark theme,improved Japanese translation,added Galician translation,links to posts open in Halcyon now,smaller screens supported
- Release of Version 2.0.1 - Added the languages Polish,Japanese and Korean,fixed many bugs,automatically mention all participants of discussions
- [Release of Version 2.0.0 - The biggest changes in detail](https://blog.nikisoft.one/note/d9ef70e8c0f88051)
- Release of Version 1.2.6 - Report toots supported,disable CW and NFSW,add privacy policy and imprint,move config files,read release notes for more
- Release of Version 1.2.5 - Copy links with one click,emojicodes now always detected,streaming in hashtag search,delete event now supported
- Release of Version 1.2.4 - Updated Twemoji,custom emojis in names and bios,links to profiles in pleroma now always work,pinned posts now supported
- Release of Version 1.2.3 - All emojis do now work,fixed some bugs in the Nginx example config,fixed Windows-only design bug,improved text field performance
- Release of Version 1.2.2 - Added an emoji picker,improved performance (emoji rendering),desktop notifications on notifications page work now
- Release of Version 1.2.1 - New who to follow page with more recommendations,bugfix at search,profiles now ignore "show replies" setting,small login page changes
- [Release of Version 1.2.0 - The next big step and a view into future](https://blog.nikisoft.one/note/d3edc2bc8e4101e2)
- [Our move from Github to NotABug](https://blog.nikisoft.one/note/3c0607171cdf5310)
- Release of Version 1.1.7 - Fixed some bugs in compatibility with Pleroma,text fields now autoresizable,stopped undefined socket tries on profile pages
- Release of Version 1.1.6 - Complete rewrite of the "who to follow" function using an API - Change of config.ini needed!
- Release of Version 1.1.5 - Introduced the new Idempotency-Key Header and fixed an bug allowing XSS with the display name
- Release of Version 1.1.4 - Automatically reconnect on bad connection,now supports desktop notifications,added ... at the end of shortened links
- Release of Version 1.1.3 - New function link previews introduced and bug when replying an toot which already has replies below it fixed (reply to undefined)
- Release of Version 1.1.2 - Privacy modes are now correctly displayed and used for replies,use username if display name doesn't exist,bugs on search page fixed
- Release of Version 1.1.1 - Fixed error 404 when viewing profile of own instance,numbers below profile on the left do now change during session,added nginx config
- [Release of Version 1.1.0 and upcoming features](https://blog.nikisoft.one/note/56626d2a0239160f)
- Release of Version 1.0.3 - "Who to follow" doesn't show people you already follow anymore and design of preferences and search bar is now much better
- Release of Version 1.0.2 - Fixed a Firefox-only bug and some wrong links, added version info and an annoying cookie notice (sorry, but that's EU law)
- Release of Version 1.0.1 - Two bugfixes
- [Release of Version 1.0.0](https://blog.nikisoft.one/note/41bbb56a91aee055)

## Credits
- [Kirschn/mastodon.js](https://github.com/Kirschn/mastodon.js)
- [yks118/Mastodon-api-php](https://github.com/yks118/Mastodon-api-php)
- [distsn/vinayaka](https://github.com/distsn/vinayaka)
- [LascauxSRL/lsx-emojipicker](https://github.com/LascauxSRL/lsx-emojipicker)
- [osapon/Pomo](https://github.com/osapon/Pomo)
- [Summer-Dong/auto-complete-for-text-input-box](https://github.com/Summer-Dong/auto-complete-for-text-input-box)
- [youplay/yp-player](https://notabug.org/youplay/yp-player)
- [speranskydanil/Simple-Audio-Player](https://github.com/speranskydanil/Simple-Audio-Player)
