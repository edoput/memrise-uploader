Memrise-Uploader
================

A sleek Firefox add-on to allow multiple audio upload on Memrise.


How to build without NodeJs
===========================

1. Clone the [Addon-Sdk](https://github.com/mozilla/addon-sdk) repository
2. Clone this repository
3. Read the [cfx tools guide](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx)
4. Yo can override my *local.json* file to better fit your necessities, _default_ is:
run in local firefox, load my developer profile, _nigthly_ is: run nightly (from source), load my developer profile 
5. run or compile the addon with the cfx tools

How to build with NodeJs
========================

1. Clone this repository
2. npm install
3. bower install
4. there are 3 tasks you would want to try

- _default_ : a fisrt lint and linting whenever the files changes
- _release_ : package the addon
- _pre-release_: load the addon into a new firefox session, load the profile from ~/.local/addon_profile/default
~~- _continuos_ : this task watch for changes in your files and  publisha new version of your addon every time you save a file; requires [autoinstaller](https://addons.mozilla.org/en-US/firefox/addon/autoinstaller/) to be installed in your Firefox~~