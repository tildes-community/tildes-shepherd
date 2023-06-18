/* eslint-disable @typescript-eslint/naming-convention */

import {type Manifest} from "webextension-polyfill";

/**
 * Creates the WebExtension manifest based on the browser target.
 *
 * @param browser The browser target ("firefox" or "chromium").
 * @returns The WebExtension manifest.
 */
export function createManifest(browser: string): Manifest.WebExtensionManifest {
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: Number.NaN,
    name: "Tildes Shepherd",
    description: "A WebExtension providing interactive guided tours of Tildes.",
    version: "0.1.2",
    permissions: ["storage"],
    options_ui: {
      page: "options/index.html",
      open_in_tab: true,
    },
    content_scripts: [
      {
        css: ["css/content-scripts.css"],
        js: ["content-scripts/setup.js"],
        matches: ["https://*.tildes.net/*"],
        run_at: "document_start",
      },
    ],
  };

  const icons: Manifest.IconPath = {
    128: "tildes-shepherd.png",
  };

  const action: Manifest.ActionManifest = {
    default_icon: icons,
  };

  const backgroundScript = "background/setup.js";

  if (browser === "firefox") {
    manifest.manifest_version = 2;
    manifest.background = {
      scripts: [backgroundScript],
    };
    manifest.browser_action = action;
    manifest.browser_specific_settings = {
      gecko: {
        id: "{1f735d8b-636a-4368-9a8b-afba3934bc64}",
        strict_min_version: "102.0",
      },
    };
  } else if (browser === "chromium") {
    manifest.manifest_version = 3;
    manifest.action = action;
    manifest.background = {
      service_worker: backgroundScript,
      type: "module",
    };
  } else {
    throw new Error(`Unknown target browser: ${browser}`);
  }

  if (Number.isNaN(manifest.manifest_version)) {
    throw new TypeError("Manifest version is NaN");
  }

  return manifest;
}
