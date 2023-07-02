import type Shepherd from "shepherd.js";

export enum TourId {
  InterfaceAccountSettings = "interface-account-settings",
  InterfaceHomepage = "interface-homepage",
  Introduction = "introduction",
}

export type TourRequirement = {
  mustBeLoggedIn: boolean;
  path: string;
};

export type TourStepEvent = {
  event: "show" | "destroy";
  handler: Parameters<Shepherd.Step["on"]>[1];
};

export type TourData = {
  description: string;
  displayInOptionsPage: boolean;
  eventHandlers: Array<{
    eventHandlers: TourStepEvent[];
    stepId: string;
  }>;
  id: TourId;
  requirements: TourRequirement;
  steps: Shepherd.Step.StepOptions[];
  title: string;
};
