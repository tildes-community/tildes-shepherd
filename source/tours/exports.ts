import {homepageEventHandlers, homepageSteps} from "./interface/exports.js";
import {introductionSteps} from "./introduction.js";

export enum TourId {
  InterfaceHomepage = "interface-homepage",
  Introduction = "introduction",
}

export const tourIdsAndSteps: Array<
  [TourId, TourStepOptions[], TourStepEventHandler[]]
> = [
  [TourId.Introduction, introductionSteps, []],
  [TourId.InterfaceHomepage, homepageSteps, homepageEventHandlers],
];
