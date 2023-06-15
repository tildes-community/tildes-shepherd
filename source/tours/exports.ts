import {homepageSteps, homepageEventHandlers} from "./interface/exports.js";
import {introductionSteps} from "./introduction.js";

export const tourIds = ["introduction", "interface-homepage"] as const;

export const tourIdsAndSteps: Array<
  [TourId, TourStepOptions[], TourStepEventHandler[]]
> = [
  ["introduction", introductionSteps, []],
  ["interface-homepage", homepageSteps, homepageEventHandlers],
];
