import Shepherd from "shepherd.js";
import {type TourId} from "../exports.js";
import {renderInContainer} from "../utilities.js";

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
