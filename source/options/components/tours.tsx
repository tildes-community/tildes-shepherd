import {Component, type JSX} from "preact";
import {
  fromStorage,
  StorageKey,
  type StorageValues,
} from "../../storage/common.js";
import {allTours} from "../../tours/exports.js";
import {Tour} from "./tour.js";

type Props = Record<string, unknown>;

type State = {
  toursCompleted: Awaited<StorageValues[StorageKey.ToursCompleted]>;
};

export class Tours extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toursCompleted: undefined!,
    };
  }

  async componentDidMount(): Promise<void> {
    const toursCompleted = await fromStorage(StorageKey.ToursCompleted);
    this.setState({toursCompleted});
  }

  render(): JSX.Element {
    const {toursCompleted} = this.state;
    if (toursCompleted === undefined) {
      return <></>;
    }

    const tours = allTours.map((tour) => (
      <Tour hasBeenCompleted={toursCompleted.value.has(tour.id)} tour={tour} />
    ));

    return (
      <main>
        <h2>Tours</h2>
        <div class="tours">{tours}</div>
      </main>
    );
  }
}
