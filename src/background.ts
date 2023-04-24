import Browser from 'webextension-polyfill'

Browser.runtime.onInstalled.addListener(() => {
  Browser.storage.sync.set({color: '#3aa757'});
});
