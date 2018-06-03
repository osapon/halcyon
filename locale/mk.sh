#!/bin/sh
find */LC_MESSAGES/messages.po | xargs -I{} sh -c 'cd `dirname {}`; msgfmt messages.po; cd ../..'

