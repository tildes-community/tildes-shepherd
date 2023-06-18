import Shepherd from "shepherd.js";
import {
  addCompletedTour,
  createIntroductionUnderstood,
} from "../storage/common.js";
import {introductionSteps} from "../tours/introduction.js";
import {tourIdsAndSteps} from "../tours/exports.js";

/** The main entry point for the content script. */
async function main(): Promise<void> {
  const introductionUnderstood = await createIntroductionUnderstood();

  // Get the anchor without the leading #.
  const anchor = window.location.hash.slice(1);

  // We only care about anchors with our prefix.
  const prefix = "tildes-shepherd-tour=";
  const startsWithPrefix = anchor.startsWith(prefix);

  // Automatically start the introduction tour if the person hasn't already
  // been through it and only when on the Tildes homepage.
  if (!introductionUnderstood.value && window.location.pathname === "/") {
    // If a different tour is selected but the introduction hasn't happened yet,
    // then the main function will be rerun once this tour finishes.
    startTour("introduction", introductionSteps, [], startsWithPrefix);
    return;
  }

  if (!startsWithPrefix) {
    return;
  }

  // Get the tour ID from the anchor by removing the prefix.
  const anchorTourId = anchor.slice(prefix.length);

  // Then run through all of the tours we have and start the first match for the
  // ID.
  for (const [id, steps, eventHandlers] of tourIdsAndSteps) {
    if (anchorTourId === id) {
      startTour(id, steps, eventHandlers, false);
      return;
    }
  }

  console.error(`Unknown anchor tour id: ${anchorTourId}`);
}

/**
 * Starts a new Shepherd.js Tour with the specific steps and event handlers.
 * @param tourId A unique ID for this tour.
 * @param steps All the steps of the tour.
 * @param eventHandlers Event handlers to attach to specific steps.
 * @param runMainAgainAfterComplete Should the `main` function be run after this
 * tour is completed?
 */
function startTour(
  tourId: TourId,
  steps: TourStepOptions[],
  eventHandlers: TourStepEventHandler[],
  runMainAgainAfterComplete: boolean,
): void {
  const defaultButtons: Shepherd.Step.StepOptionsButton[] = [
    {
      classes: "btn",
      text: "Continue",
      action() {
        this.next();
      },
    },
    {
      classes: "btn",
      text: "Back",
      action() {
        this.back();
      },
    },
    {
      classes: "btn",
      text: "Exit",
      action() {
        this.cancel();
      },
    },
  ];

  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      buttons: [...defaultButtons],
    },
    useModalOverlay: true,
  });

  // Add an event handler for when the tour completes.
  tour.on("complete", async () => {
    // Remove all mock elements that were added in the tour, just in case any
    // weren't removed after their respective steps.
    const mockSelector = '[data-tildes-shepherd-mock="true"]';
    const mockElements = document.querySelectorAll<HTMLElement>(mockSelector);
    for (const element of Array.from(mockElements)) {
      element.remove();
    }

    // Mark the tour as completed.
    await addCompletedTour(tourId);

    if (runMainAgainAfterComplete) {
      await main();
    }
  });

  // For every step we have, add it to the tour and subsequently add all the
  // event handlers to that step.
  for (const [stepNumber, stepOptions] of steps.entries()) {
    // If the final step doesn't have buttons defined, set the "Continue" button
    // text to "Finish".
    if (stepOptions.buttons === undefined && stepNumber + 1 === steps.length) {
      stepOptions.buttons = [...defaultButtons];
      stepOptions.buttons[0].text = "Finish";
    }

    const step = tour.addStep(stepOptions);

    for (const [targetStepId, [eventName, eventHandler]] of eventHandlers) {
      if (targetStepId === step.id) {
        step.on(eventName, eventHandler);
      }
    }
  }

  // Pull the lever, Kronk!
  tour.start();
}

document.addEventListener("DOMContentLoaded", main);
