import browser from "webextension-polyfill";
import {createValue} from "@holllo/webextension-storage";

export enum StorageKey {
  IntroductionUnderstood = "introduction-understood",
  ToursCompleted = "tours-completed",
}

export async function createIntroductionUnderstood() {
  return createValue<boolean>({
    deserialize: (input) => input === "true",
    serialize: (input) => JSON.stringify(input),
    key: StorageKey.IntroductionUnderstood,
    storage: browser.storage.local,
    value: false,
  });
}

export async function createToursCompleted() {
  return createValue<Set<TourId>>({
    deserialize: (input) => new Set(JSON.parse(input) as TourId[]),
    serialize: (input) => JSON.stringify(Array.from(input)),
    key: StorageKey.ToursCompleted,
    storage: browser.storage.local,
    value: new Set([]),
  });
}

export async function addCompletedTour(tourId: TourId): Promise<void> {
  const toursCompleted = await createToursCompleted();
  toursCompleted.value.add(tourId);
  await toursCompleted.save();
}
