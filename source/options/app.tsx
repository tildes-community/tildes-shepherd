import {Component} from "preact";
import {PageHeader} from "./components/page-header.js";
import {Tours} from "./components/tours.js";

export class App extends Component {
  render() {
    return (
      <>
        <PageHeader />
        <Tours />
      </>
    );
  }
}
