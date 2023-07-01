import type Shepherd from "shepherd.js";
import {renderInContainer} from "../utilities.js";

const step01 = renderInContainer(
  <>
    <h1>Your Account Settings</h1>
  </>,
);

export const steps: Shepherd.Step.StepOptions[] = [
  {
    id: "account-settings-01",
    text: step01,
  },
];

export const eventHandlers: TourStepEventHandler[] = [];
