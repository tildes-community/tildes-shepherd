import {Component} from "preact";

export class PageHeader extends Component {
  render() {
    return (
      <header class="page-header">
        <img src="/tildes-shepherd.png" alt="The Tildes Shepherd logo." />
        <h1>Tildes Shepherd</h1>
      </header>
    );
  }
}
