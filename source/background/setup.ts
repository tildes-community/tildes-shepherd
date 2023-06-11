// The main entry point for the background script. Note that in Manifest V3 this
// is run in a service worker.
// https://developer.chrome.com/docs/extensions/migrating/to-service-workers/

import browser from "webextension-polyfill";

if ($browser === "firefox") {
  browser.browserAction.onClicked.addListener(async () => {
    await browser.runtime.openOptionsPage();
  });
} else {
  browser.action.onClicked.addListener(async () => {
    await browser.runtime.openOptionsPage();
  });
}

browser.runtime.onInstalled.addListener(async () => {
  if ($dev) {
    await browser.runtime.openOptionsPage();
  }
});

browser.runtime.onMessage.addListener(async (message) => {
  if (message === "open-options-page") {
    await browser.runtime.openOptionsPage();
  }
});
