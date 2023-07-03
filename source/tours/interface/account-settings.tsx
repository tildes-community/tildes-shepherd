import {type TourData, TourId} from "../types.js";
import {renderInContainer} from "../utilities.js";

function renderSteps(): ReturnType<TourData["steps"]> {
  const step01 = renderInContainer(
    <>
      <h1>Your Account Settings</h1>
    </>,
  );

  return [
    {
      id: "account-settings-01",
      text: step01,
    },
  ];
}

const steps: TourData["steps"] = renderSteps;

const eventHandlers: TourData["eventHandlers"] = [];

const requirements: TourData["requirements"] = {
  mustBeLoggedIn: true,
  path: "/settings",
};

export const accountSettingsTour: TourData = {
  id: TourId.InterfaceAccountSettings,
  title: "Your Account Settings",
  description: "View your account settings and all that you can customize.",
  displayInOptionsPage: true,
  eventHandlers,
  requirements,
  steps,
};
