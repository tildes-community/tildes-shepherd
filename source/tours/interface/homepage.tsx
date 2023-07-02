import {LoggedOutWarning} from "../shared/logged-out-warning.js";
import {type TourData, TourId} from "../types.js";
import {
  addDatasetCounter,
  encapsulateElements,
  removeAllDatasetCounters,
  renderInContainer,
} from "../utilities.js";

const step01 = renderInContainer(
  <>
    <LoggedOutWarning />

    <h1>The Homepage</h1>

    <p>
      If you plan on staying a while, this is likely the place you'll see the
      most. So let's work our way top to bottom, left to right.
    </p>

    <p>Starting with...</p>
  </>,
);

const step02 = renderInContainer(
  <>
    <h1>The Main Header</h1>

    <p>
      On the left there is the Tildes logo and title, which you can click to get
      back to the homepage, or refresh it if you're already there. If you are in
      a group, the group name will also be shown next to it.
    </p>

    <p>
      On the right is the notifications section and your username. When you have
      unread messages and/or are mentioned, they will show up next to the left
      of it. If you don't have any notifications right now, you can{" "}
      <a href="#" onClick={toggleMockNotifications}>
        click here
      </a>{" "}
      to toggle a preview of what they look like.
    </p>

    <p>
      At the moment mentions only work in comments, so if you get mentioned in a
      topic's text body and don't get a notification,{" "}
      <a target="_blank" href="https://gitlab.com/tildes/tildes/-/issues/195">
        that's why
      </a>
      .
    </p>
  </>,
);

// Toggle mock notifications, based on the code in the following link.
// If the logic for this needs to be updated, also update the permalink to the
// actual Tildes HTML code.
// https://gitlab.com/tildes/tildes/-/blob/0dbb031562cd9297968fec0049af4b833ef77301/tildes/tildes/templates/macros/user.jinja2#L9-20
function toggleMockNotifications(event: Event): void {
  // Prevent the click from going through so the anchor isn't removed.
  event.preventDefault();

  const root = document.querySelector("#site-header .logged-in-user-info");

  /* Generic function to toggle a mock notification. */
  function toggle(existingSelector: string, href: string, text: string): void {
    const existing =
      root?.querySelector<HTMLElement>(existingSelector) ?? undefined;
    if (existing === undefined) {
      // If no notification exists, render our mock.
      const messageNotification = document.createElement("a");
      const count = 1 + Math.ceil(Math.random() * 10);
      messageNotification.classList.add("logged-in-user-alert");
      messageNotification.dataset.tildesShepherdMock = "true";
      messageNotification.href = href;
      messageNotification.textContent = `${count} ${text}`;
      root?.insertAdjacentElement("beforeend", messageNotification);
    } else if (existing.dataset.tildesShepherdMock === "true") {
      // If a notification exists and it has our mock attribute, remove it.
      existing.remove();
    } else {
      // A real notification already exists, so we do nothing.
    }
  }

  toggle('[href="/messages/unread"]', "/messages/unread", "new messages");
  toggle(
    '[href="/notifications/unread"]',
    "/notifications/unread",
    "new comments",
  );
}

const step03 = renderInContainer(
  <>
    <h1>The Listing Options</h1>

    <p>
      Right below the main header are the topic listing options. These determine
      how the topics in the listing are sorted and from what period topics
      should be shown.
    </p>

    <p>
      The non-activity sorts are the easiest to explain, so let's start with
      them:
    </p>

    <ul>
      <li>
        <b>Votes</b> sorts topics with the most votes first.
      </li>
      <li>
        <b>Comments</b> sorts them with the most comments first.
      </li>
      <li>
        And <b>New</b> sorts them by their date, so the newest topics come
        first.
      </li>
    </ul>

    <p>
      Then the first <b>Activity</b> sort will sort topics by bumping topics up
      as they receive comments, however this sort makes use of comment labels.
    </p>

    {/* TODO: When the comment labels tour is made, change the prose. */}
    <p>
      If you don't know what comment labels are yet, don't worry, there will be
      a tour that explains them. But in short they are a community tool to
      emphasize and de-emphasize comments, similar to votes but with more
      specific intention. If you'd like to read more, check out{" "}
      <a
        target="_blank"
        href="https://docs.tildes.net/instructions/commenting-on-tildes#labelling-comments"
      >
        the documentation
      </a>
      .
    </p>

    <p>
      And finally <b>All activity</b> sorts topics the same as Activity, but
      without taking into account any comment labels.
    </p>

    <p>
      If you only want to see topics from a certain period, click on the "from"
      dropdown and select the period you want. Aside from a set of predefined
      options, you can also set a custom one by clicking the "other period"
      option, after which you'll be prompted to input it.
    </p>
  </>,
);

const step04 = renderInContainer(
  <>
    <h1>The Topic Listing</h1>

    <p>
      Next up, just below the listing options is the topic listing itself. We've
      only highlighted the first topic here, but you can probably see it
      continues all the way down the page.
    </p>

    <p>Here, we've marked the main elements of a topic:</p>

    <ol>
      <li>
        The topic title, when the topic is a "text topic" it links to the same
        place as the comments link does. Otherwise when it's a "link topic", it
        will link to an external site.
      </li>

      <li>
        The topic metadata, which by default includes the group it's in. If a
        topic has specific notable tags and you have the "show tags" setting
        enabled in your user settings, they will be shown after the group name.
        A "topic type" may also be shown to indicate whether the topic is a text
        topic, a video, an "ask" topic for recommendations or a survey, etc.
      </li>

      <li>
        The amount of comments the topic has received. If any new comments have
        been posted since you last viewed the topic, in orange a "(X new)" will
        be added.
      </li>

      <li>
        The topic source. For text topics this is always the poster of the
        topic, but for link topics in certain groups it will be the domain name
        together with that website's icon. For topics automatically posted by
        Tildes itself, it will say "Scheduled topic".
      </li>
    </ol>

    <p>The list continues on the next page.</p>
  </>,
);

const step05 = renderInContainer(
  <>
    <h1>The Topic Listing continued</h1>

    <ol start={5}>
      <li>
        The date when the topic was posted. For dates that are pretty recent it
        will show something like "X days ago" while for longer dates it will be
        the exact date, like "April 26th, 2021".
      </li>

      <li>
        The voting button, clicking it will add your vote to the topic. On
        Tildes, once the topic is older than 30 days you can no longer vote on
        it and the individual voting data for is removed, with only the total
        count kept. You can read more about it in{" "}
        <a target="_blank" href="https://tild.es/jhm">
          this announcement topic
        </a>
        .
      </li>

      <li>
        And finally the topic actions. Clicking on the "Actions" button will
        show a dropdown including "Bookmark", "Ignore this topic" and if you
        have been granted the permission for it, "Edit title". Ignoring the
        topic will remove it from the topic listing and prevent any future
        notifications from happening. Both your bookmarked and ignored topics
        can be found in their respective sections on your profile.
      </li>
    </ol>
  </>,
);

const step06 = renderInContainer(
  <>
    <h1>The Sidebar</h1>

    <p>
      Let's take a look at the sidebar, where the first thing we're greeted with
      is the search bar.
    </p>

    <p>
      A quick note for mobile devices, the sidebar is opened via a "Sidebar"
      button that appears in the very top-right of the page.
    </p>

    <p>
      When searching from the homepage, topics will be included from any group.
      However, searching when inside a group will only include topics from that
      group and any of its sub-groups.
    </p>

    {/* TODO: Update the prose once the groups tour is created. */}
    <p>
      Below the search bar you will also find the title of the page, or name of
      the group, and a small description. The sidebar has more elements when in
      you're in a group page, but those will be touched upon in the groups tour.
    </p>
  </>,
);

const step07 = renderInContainer(
  <>
    <h1>The Sidebar: Subscriptions</h1>

    <p>
      Moving on, you'll find the list of groups you are subscribed to and a
      button below it to go to the groups listing, where you can find all the
      that are available.
    </p>

    <p>
      To post a topic, subscribe or unsubscribe from any group, go to the group
      page in question and in its sidebar there will be buttons to do all those
      things.
    </p>
  </>,
);

const step08 = renderInContainer(
  <>
    <h1>The Sidebar: User Settings</h1>

    <p>
      At the bottom of the sidebar you will find some user settings.
      Specifically the filtered topics tags you have set and a link to the
      settings page.
    </p>

    <p>
      When you have filtered topics tags set, topics with any of the tags
      present will be removed from your listing. You can read more about it by
      going to the dedicated page for it by clicking the{" "}
      <a target="_blank" href="https://tildes.net/settings/filters">
        "Edit filtered tags"
      </a>{" "}
      button.
    </p>
  </>,
);

const step09 = renderInContainer(
  <>
    <h1>The Footer</h1>

    <p>
      And finally, the very last part of the homepage is the footer. Here you
      will find a theme selector (more on that in a moment) and various links to
      places, such as the Tildes Documentation, Contact page, the source code,
      etc. We highly recommend reading through the documentation as it explains
      a lot of the how and why Tildes does certain things.
    </p>

    <p>
      As for the theme selector, you can change your theme with a number of
      options. When you change it here, it will only change for the current
      device, if you'd like to set an account default for all devices, head to{" "}
      <a target="_blank" href="https://tildes.net/settings">
        your account settings
      </a>
      .
    </p>
  </>,
);

const step10 = renderInContainer(
  <>
    <h1>This is the end, beautiful friend</h1>

    <p>And that's the end of the Homepage tour!</p>

    <p>
      As always, if you find any bugs, have feature requests or simply want to
      ask a question. Please send us a message at{" "}
      <a target="_blank" href="https://tildes.net/user/Community/new_message">
        @Community
      </a>
      .
    </p>

    <p>Happy Tildying!~</p>
  </>,
);

const steps: TourData["steps"] = [
  {
    id: "homepage-01",
    text: step01,
  },
  {
    attachTo: {
      element: "#site-header",
      on: "bottom",
    },
    canClickTarget: false,
    id: "homepage-02",
    scrollTo: true,
    text: step02,
  },
  {
    attachTo: {
      element: "main > .listing-options",
      on: "bottom",
    },
    canClickTarget: false,
    id: "homepage-03",
    text: step03,
  },
  {
    attachTo: {
      element: ".topic-listing > li:first-child",
      on: "bottom",
    },
    canClickTarget: false,
    id: "homepage-04",
    text: step04,
  },
  {
    attachTo: {
      element: ".topic-listing > li:first-child",
      on: "bottom",
    },
    canClickTarget: false,
    id: "homepage-05",
    text: step05,
  },
  {
    attachTo: {
      element: '#sidebar [data-tildes-shepherd-encapsulated="homepage-06"]',
      on: "left-start",
    },
    canClickTarget: false,
    id: "homepage-06",
    text: step06,
  },
  {
    attachTo: {
      element: '#sidebar [data-tildes-shepherd-encapsulated="homepage-07"]',
      on: "left-start",
    },
    canClickTarget: false,
    id: "homepage-07",
    scrollTo: true,
    text: step07,
  },
  {
    attachTo: {
      element: "#sidebar .divider + .nav",
      on: "left-start",
    },
    canClickTarget: false,
    id: "homepage-08",
    scrollTo: true,
    text: step08,
  },
  {
    attachTo: {
      element: "#site-footer",
      on: "top",
    },
    canClickTarget: false,
    id: "homepage-09",
    scrollTo: true,
    text: step09,
  },
  {
    canClickTarget: false,
    id: "homepage-10",
    text: step10,
  },
];

const eventHandlers: TourData["eventHandlers"] = [
  {
    stepId: "homepage-04",
    eventHandlers: [
      {
        event: "show",
        handler() {
          const topic = ".topic-listing > li:first-child";
          const counters = [
            ".topic-title",
            ".topic-metadata",
            ".topic-info-comments",
            ".topic-info-source",
            "time",
            ".topic-voting",
            ".topic-actions",
          ];

          for (const [count, selector] of counters.entries()) {
            addDatasetCounter(`${topic} ${selector}`, count + 1);
          }
        },
      },
    ],
  },
  {
    stepId: "homepage-05",
    eventHandlers: [
      {
        event: "destroy",
        handler() {
          removeAllDatasetCounters();
        },
      },
      {
        event: "show",
        handler() {
          encapsulateElements(
            "homepage-06",
            "#sidebar .sidebar-controls",
            "afterend",
            ["#sidebar .form-search", "#sidebar h2", "#sidebar p"],
          );
        },
      },
    ],
  },
  {
    stepId: "homepage-06",
    eventHandlers: [
      {
        event: "show",
        handler() {
          encapsulateElements(
            "homepage-07",
            "#sidebar .divider",
            "beforebegin",
            ["#sidebar .nav", '#sidebar [href="/groups"'],
          );
        },
      },
    ],
  },
  {
    stepId: "homepage-08",
    eventHandlers: [
      {
        event: "show",
        handler() {
          const filteredTags =
            document.querySelector<HTMLDetailsElement>("#sidebar details") ??
            undefined;
          if (filteredTags === undefined) {
            console.warn("Element is unexpectedly undefined");
            return;
          }

          filteredTags.open = true;
        },
      },
    ],
  },
];

const requirements: TourData["requirements"] = {
  mustBeLoggedIn: false,
  path: "/",
};

export const homepageTour: TourData = {
  id: TourId.InterfaceHomepage,
  title: "The Tildes Homepage",
  description: "Let's take a look at the home page and all we can do there.",
  displayInOptionsPage: true,
  eventHandlers,
  requirements,
  steps,
};
