import {Component} from "preact";

type Props = Record<string, unknown>;

type State = {
  delayIndex: number;
  intervalId: number | undefined;
};

export class ThemeCycler extends Component<Props, State> {
  delayValues: number[] = [100, 250, 500, 1000, 2500, 5000, 10_000];

  constructor(props: Props) {
    super(props);

    this.state = {
      delayIndex: 4,
      intervalId: undefined,
    };
  }

  cycle = () => {
    const themeSelect =
      document.querySelector<HTMLSelectElement>("#theme") ?? undefined;
    if (themeSelect === undefined) {
      return;
    }

    const themeOptions = Array.from(themeSelect.options);
    const nextIndex = themeOptions.findIndex((option) => option.selected) + 1;

    themeSelect.selectedIndex =
      // If the next option can't be found, we're at the end so start back at zero.
      themeOptions[nextIndex] === undefined ? 0 : nextIndex;

    // Emit a change event so the Tildes JS handles changing the theme.
    themeSelect.dispatchEvent(new Event("change"));
  };

  decreaseDelay = () => {
    const {delayIndex, intervalId} = this.state;
    if (delayIndex <= 0) {
      return;
    }

    this.setState({delayIndex: delayIndex - 1}, () => {
      if (intervalId !== undefined) {
        this.startInterval();
      }
    });
  };

  increaseDelay = () => {
    const {delayIndex, intervalId} = this.state;
    if (delayIndex >= this.delayValues.length - 1) {
      return;
    }

    this.setState({delayIndex: delayIndex + 1}, () => {
      if (intervalId !== undefined) {
        this.startInterval();
      }
    });
  };

  startInterval = () => {
    const {delayIndex, intervalId} = this.state;
    if (intervalId !== undefined) {
      window.clearInterval(intervalId);
    }

    this.setState({
      intervalId: window.setInterval(this.cycle, this.delayValues[delayIndex]),
    });
  };

  toggle = () => {
    const {intervalId} = this.state;
    if (intervalId === undefined) {
      this.startInterval();
      this.cycle();
    } else {
      window.clearInterval(intervalId);
      this.setState({intervalId: undefined});
    }
  };

  render() {
    const isEnabled = this.state.intervalId !== undefined;
    const delay = this.delayValues[this.state.delayIndex];

    return (
      <div class="tish-theme-cycler">
        <p>Theme Cycler ({delay / 1000}s)</p>
        <button class="btn btn-sm" title="Toggle cycling" onClick={this.toggle}>
          {isEnabled ? "Stop" : "Start"}
        </button>
        <button
          class="btn btn-sm"
          title="Decrease delay between changes"
          onClick={this.decreaseDelay}
        >
          Faster
        </button>
        <button
          class="btn btn-sm"
          title="Increase delay between changes"
          onClick={this.increaseDelay}
        >
          Slower
        </button>
      </div>
    );
  }
}
