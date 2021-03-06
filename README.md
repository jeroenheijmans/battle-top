# BattleTop
BattleTop is a responsive single-page web application to assist in bookkeeping things like Characters, Initiative, Hit Points, Conditions, et cetera, during D20-based table top RPG sessions.

# Warning
**This project is no longer under active development.** Due to limited time for playing RPGs and thus limited time to test it (as well as limited motivation to further develop it), I've decided to put the project "officially" on hold.

# Moved
This project was originally [hosted on Google Code](https://code.google.com/p/battle-top/), but that link may die soon since Google is "[Bidding farewell to Google Code](http://google-opensource.blogspot.nl/2015/03/farewell-to-google-code.html)". It used to be a Mercurial repository, so older commits may contain traces of that (e.g. `.hgignore` files).

# Status & Live version
The app is functional, but still very much in "beta" (mainly because of usability issues). If you want to give it a spin anyways, feel free to grab [the source](https://github.com/jeroenheijmans/battle-top) or try **[the live version](http://battletop.jeroenheijmans.nl/)**. Use at your own pleasure & risk!

# Features
Current features include:

- **Track characters.** Add and remove monsters, NPCs, PCs, and environment initiatives. You can also reset the list to the party, or to a blank, new list.
- **Track initiative.** Keep initiative and initiative modifiers, sort the list by initiative, keep track of ready and delay actions.
- **Track conditions.** Each character has its own list of conditions which you can add, remove or change, with a number of turns to it (so they wear off automatically).
- **Track hit points.** Each character optionally has a number of hit points. You can deal damage or apply healing to change the hit point amount.
- **Save/Load.** Using the LocalStorage? API BattleTop? will save your state every 5 seconds. If you navigate away or re-open the page on your next play session the old state will be there.

Note: because BattleTop extensively uses many modern features (html5 semantic markup, css3 features, modern JS such as LocalStorage), only modern browsers will be supported.

# Screenshots
Here are some screenshots of what the app (c/sh)ould look like:

----------

![setup view](http://i.imgur.com/TUMtouO.png)

----------

![regular in game view](http://i.imgur.com/oFo1tFk.png)

----------

![ready and delay examples](http://i.imgur.com/hSocFt0.png)

----------

![damage/healing](http://i.imgur.com/yzEb4Rq.png)

----------