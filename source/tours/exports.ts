import {accountSettingsTour, homepageTour} from "./interface/exports.js";
import {introductionTour} from "./introduction.js";
import {type TourData} from "./types.js";

export * from "./introduction.js";
export * from "./shared/exports.js";
export * from "./types.js";

/** All tours available in a single array. */
export const allTours: TourData[] = [
  introductionTour,
  accountSettingsTour,
  homepageTour,
];
