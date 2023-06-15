import {type JSX, render} from "preact";
import browser from "webextension-polyfill";

/**
 * Adds a `[data-tildes-shepherd-counter]` attribute to a specified element. For
 * the associated CSS, see `source/content-scripts/scss/main.scss`.
 *
 * @param selector The selector of element to apply the counter to, if the
 * target element can't be selected an error will be thrown.
 * @param count The number to display in the counter.
 */
export function addDatasetCounter(selector: string, count: number) {
  const element = document.querySelector<HTMLElement>(selector) ?? undefined;
  if (element === undefined) {
    throw new Error(`Target element for "${selector}" is undefined`);
  }

  element.dataset.tildesShepherdCounter = count.toString();
}

/**
 * Create a new `div` element and put all the specified elements inside it. Used
 * for highlighting groups of elements that have sibling elements we may not
 * want to highlight. Like highlighting only the search bar, title and
 * description in the homepage sidebar, but not all the rest of the sidebar.
 * @param stepId The unique step ID to set as
 * `data-tildes-shepherd-encapsulated="<id>"`. Used for attaching the Shepherd
 * step to the container.
 * @param rootSelector The selector for the root element to insert the container
 * near. This doesn't need to be the parent element necessarily, since
 * {@link Element.insertAdjacentElement} is used to do the inserting it can also
 * be inserted before or after the root element.
 * @param position The insert position for {@link Element.insertAdjacentElement}.
 * @param selectors The list of element selectors to include in the new
 * container. Note that you should make sure any elements included don't break
 * their CSS when contained by a new `div` element and ideally they should all
 * be adjacent to one another and specified in the order they appear in.
 */
export function encapsulateElements(
  stepId: string,
  rootSelector: string,
  position: InsertPosition,
  selectors: string[],
) {
  const container = document.createElement("div");
  container.dataset.tildesShepherdEncapsulated = stepId;

  for (const selector of selectors) {
    const element = document.querySelector<HTMLElement>(selector) ?? undefined;
    if (element === undefined) {
      console.warn(`Unexpected undefined element: ${selector}`);
      continue;
    }

    // Don't encapsulate anything if the parent is already one of our elements.
    if (
      element.parentElement?.dataset.tildesShepherdEncapsulated !== undefined
    ) {
      return;
    }

    container.append(element);
  }

  const root = document.querySelector(rootSelector) ?? undefined;
  if (root === undefined) {
    throw new Error(`Root selector returned undefined: ${rootSelector}`);
  }

  root.insertAdjacentElement(position, container);
}

/**
 * Content scripts can't open the options page themselves, so send a message to
 * the background script and open it there.
 * @param event The mouse click event to prevent from happening.
 */
export async function openOptionsPageFromBackground(
  event: MouseEvent,
): Promise<void> {
  event.preventDefault();
  await browser.runtime.sendMessage("open-options-page");
}

/**
 * Removes all elements with a `data-tildes-shepherd-counter` set.
 */
export function removeAllDatasetCounters() {
  const elements = document.querySelectorAll<HTMLElement>(
    "[data-tildes-shepherd-counter]",
  );
  for (const element of Array.from(elements)) {
    delete element.dataset.tildesShepherdCounter;
  }
}

/**
 * Render JSX inside a `div` and return the div. This is mostly used so we can
 * pass JSX more easily to Shepherd, which doesn't accept JSX directly but does
 * accept {@link HTMLElement}. So this bit of indirection gets us there.
 */
export function renderInContainer(root: JSX.Element): HTMLElement {
  const container = document.createElement("div");
  render(root, container);
  return container;
}
