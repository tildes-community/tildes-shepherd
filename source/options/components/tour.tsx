import {Component, type JSX} from "preact";
import {TourId} from "../../tours/exports.js";

type Props = {
  hasBeenCompleted: boolean;
  name: string;
  tourId: TourId;
};

function tourDescription(tourId: Props["tourId"]): JSX.Element {
  if (tourId === TourId.Introduction) {
    return (
      <p class="tour-description">
        A short introduction to Tildes Shepherd and how the tours work. Normally
        this is automatically shown when you first installed the extension.
      </p>
    );
  }

  if (tourId === TourId.InterfaceHomepage) {
    return (
      <p class="tour-description">
        Let's take a look at the home page and all we can do there.
      </p>
    );
  }

  return (
    <p class="tour-description">
      Tour ID "{tourId}" does not have a description, this should probably be
      fixed!
    </p>
  );
}

function tourLink(tourId: Props["tourId"]): string {
  const anchor = `#tildes-shepherd-tour=${tourId}`;
  const baseUrl = "https://tildes.net";
  let path = "";

  switch (tourId) {
    case TourId.InterfaceHomepage:
    case TourId.Introduction: {
      path = "/";
      break;
    }

    default:
  }

  return `${baseUrl}${path}${anchor}`;
}

export class Tour extends Component<Props> {
  render() {
    const {hasBeenCompleted, name, tourId} = this.props;
    const classes = ["tour", hasBeenCompleted ? "completed" : ""].join(" ");
    const completed = hasBeenCompleted ? (
      <p class="tour-completed" title="You've completed this tour before!">
        ✔
      </p>
    ) : undefined;

    return (
      <div class={classes.trim()}>
        <h3>{name}</h3>
        {completed}
        {tourDescription(tourId)}
        <p class="tour-link">
          <a href={tourLink(tourId)}>Take this tour</a>
        </p>
      </div>
    );
  }
}
