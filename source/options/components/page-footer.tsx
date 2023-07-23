import {Component} from "preact";
import browser from "webextension-polyfill";

export class PageFooter extends Component {
  render() {
    const manifest = browser.runtime.getManifest();

    const copyright = (
      <p>
        &copy;{" "}
        <a
          target="_blank"
          href="https://gitlab.com/tildes-community/tildes-shepherd/-/blob/main/LICENSE"
        >
          AGPL-3.0-or-later
        </a>
      </p>
    );

    const messageCommunity = (
      <a target="_blank" href="https://tildes.net/user/Community/new_message">
        Message @Community
      </a>
    );

    const version = (
      <a
        target="_blank"
        href={`https://gitlab.com/tildes-community/tildes-shepherd/-/releases/${manifest.version}`}
      >
        v{manifest.version}
      </a>
    );

    return (
      <footer class="page-footer">
        {messageCommunity} / {version} / {copyright}
      </footer>
    );
  }
}
