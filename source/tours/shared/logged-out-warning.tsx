import {type JSX} from "preact";

export function LoggedOutWarning(): JSX.Element {
  const userIsLoggedIn =
    document.querySelector(".logged-in-user-username") !== null;

  if (userIsLoggedIn) {
    return <></>;
  }

  return (
    <p class="tish-warning">
      It looks like you aren't logged in to Tildes. Tildes Shepherd assumes that
      you are logged in as a lot of the Tildes interface isn't shown to logged
      out users.
      <br />
      To still let anyone without an account benefit from the extension you may
      continue, however, know that certain parts of the tour <b>will</b> break
      and look weird.
      <br />
      It's highly recommended that you exit the tour, log in and start it again.
    </p>
  );
}
