import Shepherd from "shepherd.js";
import {renderInContainer} from "../utilities.js";

/**
 * Start an ad-hoc tour to display an error message.
 * @param text The message to show.
 */
export function showTourError(text: string) {
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      buttons: [
        {
          classes: "btn",
          text: "Continue",
          action() {
            this.complete();
          },
        },
      ],
    },
    useModalOverlay: true,
  });

  tour.addStep({
    text: renderInContainer(<p class="tish-warning">{text}</p>),
  });

  tour.start();
}
