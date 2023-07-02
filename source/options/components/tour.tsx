import {Component} from "preact";
import {type TourData} from "../../tours/exports.js";

type Props = {
  hasBeenCompleted: boolean;
  tour: TourData;
};

function tourLink(tour: TourData): string {
  const anchor = `#tildes-shepherd-tour=${tour.id}`;
  const baseUrl = "https://tildes.net";
  const path = tour.requirements.path;

  return `${baseUrl}${path}${anchor}`;
}

export class Tour extends Component<Props> {
  render() {
    const {hasBeenCompleted, tour} = this.props;
    const classes = ["tour", hasBeenCompleted ? "completed" : ""].join(" ");
    const completed = hasBeenCompleted ? (
      <p class="tour-completed" title="You've completed this tour before!">
        ✔
      </p>
    ) : undefined;

    return (
      <div class={classes.trim()}>
        <h3>{tour.title}</h3>
        {completed}
        {tour.description}
        <p class="tour-link">
          <a href={tourLink(tour)}>Take this tour</a>
        </p>
      </div>
    );
  }
}
