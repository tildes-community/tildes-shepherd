import {createIntroductionUnderstood} from "../storage/common.js";
import {TourId, type TourData} from "./types.js";
import {openOptionsPageFromBackground, renderInContainer} from "./utilities.js";

const step01 = renderInContainer(
  <>
    <h1>Thank you for installing Tildes Shepherd!</h1>

    <p>
      Tildes Shepherd is a set of interactive guided tours for Tildes to show
      you around and introduce you to the concepts that make this website great.
    </p>

    <p>
      To see and start the tours that are available, click on the extension icon
      to go to the options page or{" "}
      <a href="#" onClick={openOptionsPageFromBackground}>
        click here now
      </a>
      .
    </p>

    <p>
      Each tour will start with a pop-up like this one and have "Continue",
      "Back" and "Exit" buttons at the bottom. They will progress the tour
      forward, backward or exit it.
    </p>
  </>,
);

const step02 = renderInContainer(
  <>
    <h1>Tour Mechanics</h1>

    <p>
      During the tours at various points we will want to highlight specific
      areas. When that happens you won't be able to click anything inside them,
      mainly to prevent you from accidentally going to a different page and
      interrupting the tour. But also to prevent you from taking actions you
      maybe don't want to take, like voting on something you don't necessarily
      want to vote on.
    </p>

    <p>
      Depending on your selected theme, the highlighted areas will have a yellow
      or orange border and some extra added whitespace. As you can see in this
      example where the main site header has been highlighted.
    </p>
  </>,
);

const step03 = renderInContainer(
  <>
    <p>
      If you find any bugs, have feature requests or simply want to ask a
      question. Please send us a message at{" "}
      <a target="_blank" href="https://tildes.net/user/Community/new_message">
        @Community
      </a>
      .
    </p>

    <p>
      Also, big shoutout to the people at{" "}
      <a target="_blank" href="https://shipshape.io">
        Ship Shape
      </a>{" "}
      for making{" "}
      <a target="_blank" href="https://shepherdjs.dev">
        Shepherd.js
      </a>
      , the software library making this entire project so much easier to
      create. And the namesake of it, too.
    </p>

    <p>
      Once you click the "I understand" button below, this tour won't pop up
      again, so remember the extension icon is how you get to the tours.
    </p>

    <p>Happy Tildying!~</p>
  </>,
);

const steps: TourData["steps"] = [
  {
    canClickTarget: false,
    id: "introduction-01",
    text: step01,
  },
  {
    attachTo: {
      element: "#site-header",
      on: "bottom",
    },
    canClickTarget: false,
    id: "introduction-02",
    text: step02,
  },
  {
    buttons: [
      {
        classes: "btn",
        text: "I understand",
        async action() {
          const introductionUnderstood = await createIntroductionUnderstood();
          introductionUnderstood.value = true;
          await introductionUnderstood.save();
          this.complete();
        },
      },
      {
        classes: "btn",
        text: "Back",
        action() {
          this.back();
        },
      },
    ],
    canClickTarget: false,
    id: "introduction-03",
    text: step03,
  },
];

const eventHandlers: TourData["eventHandlers"] = [];

const requirements: TourData["requirements"] = {
  mustBeLoggedIn: false,
  path: "/",
};

export const introductionTour: TourData = {
  id: TourId.Introduction,
  title: "Tildes Shepherd Introduction",
  description:
    "A short introduction to Tildes Shepherd and how the tours work.",
  displayInOptionsPage: true,
  eventHandlers,
  requirements,
  steps,
};
