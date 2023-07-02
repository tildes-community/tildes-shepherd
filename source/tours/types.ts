import type Shepherd from "shepherd.js";

/** All available tour IDs. */
export enum TourId {
  InterfaceAccountSettings = "interface-account-settings",
  InterfaceHomepage = "interface-homepage",
  Introduction = "introduction",
}

/** Requirements of a tour to be checked before the tour is started. */
export type TourRequirement = {
  /**
   * This tour requires that the user must be logged in. Only set this to true
   * if the tour goes to pages only accessible by logged in users.
   */
  mustBeLoggedIn: boolean;

  /** The {@link URL.pathname} to run the tour at. */
  path: string;
};

/** An individual tour step event handler. */
export type TourStepEvent = {
  /**
   * - The "show" event will be called when the step is displayed.
   * - The "destroy" event will be called when the step is finished.
   */
  event: "show" | "destroy";
  /** The handler for this step event. */
  handler: Parameters<Shepherd.Step["on"]>[1];
};

/** All the tour data collected in one place. */
export type TourData = {
  /** A short description of the tour for use in the options page. */
  description: string;

  /** Whether this tour should be shown in the options page. */
  displayInOptionsPage: boolean;

  /** All event handlers to be added to this tour's steps. */
  eventHandlers: Array<{
    eventHandlers: TourStepEvent[];
    stepId: string;
  }>;

  /**  The unique ID for this tour. */
  id: TourId;

  /** The requirements this tour must match before starting it. */
  requirements: TourRequirement;

  /** All the steps this tour will take. */
  steps: Shepherd.Step.StepOptions[];

  /** The title of the tour for use in the options page. */
  title: string;
};
