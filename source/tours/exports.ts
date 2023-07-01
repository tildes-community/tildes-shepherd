import {
  accountSettingsEventHandlers,
  accountSettingsSteps,
  homepageEventHandlers,
  homepageSteps,
} from "./interface/exports.js";
import {introductionSteps} from "./introduction.js";

export * from "./shared/exports.js";

export enum TourId {
  InterfaceAccountSettings = "interface-account-settings",
  InterfaceHomepage = "interface-homepage",
  Introduction = "introduction",
}

export type TourRequirement = {
  mustBeLoggedIn: boolean;
  path: string;
};

export type TourIdsAndSteps = Array<
  [TourId, TourStepOptions[], TourStepEventHandler[], TourRequirement]
>;

export const tourIdsAndSteps: TourIdsAndSteps = [
  [
    TourId.Introduction,
    introductionSteps,
    [],
    {
      mustBeLoggedIn: false,
      path: "/",
    },
  ],
  [
    TourId.InterfaceAccountSettings,
    accountSettingsSteps,
    accountSettingsEventHandlers,
    {
      mustBeLoggedIn: true,
      path: "/settings",
    },
  ],
  [
    TourId.InterfaceHomepage,
    homepageSteps,
    homepageEventHandlers,
    {
      mustBeLoggedIn: false,
      path: "/",
    },
  ],
];
