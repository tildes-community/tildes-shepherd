import {Component, type JSX} from "preact";
import {createToursCompleted} from "../../storage/common.js";
import {TourId} from "../../tours/exports.js";
import {Tour} from "./tour.js";

type Props = Record<string, unknown>;

type State = {
  toursCompleted: Awaited<ReturnType<typeof createToursCompleted>>["value"];
};

export class Tours extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toursCompleted: new Set(),
    };
  }

  async componentDidMount(): Promise<void> {
    const toursCompleted = await createToursCompleted();
    this.setState({toursCompleted: toursCompleted.value});
  }

  render(): JSX.Element {
    const {toursCompleted} = this.state;

    const createTour = (tourId: TourId, name: string): Tour["props"] => {
      return {
        hasBeenCompleted: toursCompleted.has(tourId),
        name,
        tourId,
      };
    };

    const tourProps: Array<Tour["props"]> = [
      createTour(TourId.Introduction, "Introduction"),
      createTour(TourId.InterfaceHomepage, "The Homepage"),
    ];

    return (
      <main>
        <h2>Tours</h2>
        <div class="tours">
          {tourProps.map((props) => (
            <Tour {...props} />
          ))}
        </div>
      </main>
    );
  }
}
