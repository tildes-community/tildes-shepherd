import type Shepherd from "shepherd.js";
import type {tourIds} from "./tours/exports.js";

declare global {
  const $browser: "chromium" | "firefox";
  const $dev: boolean;
  const $test: boolean;

  type TourId = (typeof tourIds)[number];
  type TourStepEvent = "show" | "destroy";
  type TourStepEventFunction = Parameters<Shepherd.Step["on"]>[1];
  type TourStepEventHandler = [string, [TourStepEvent, TourStepEventFunction]];
  type TourStepOptions = Shepherd.Step.StepOptions;
}
