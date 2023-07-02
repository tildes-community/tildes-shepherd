import browser from "webextension-polyfill";
import {createValue} from "@holllo/webextension-storage";
import {type TourId} from "../tours/exports.js";

/** All available storage keys. */
export enum StorageKey {
  IntroductionUnderstood = "introduction-understood",
  ToursCompleted = "tours-completed",
}

/** All values we want to save in storage. */
const storageValues = {
  [StorageKey.IntroductionUnderstood]: createValue<boolean>({
    deserialize: (input) => input === "true",
    serialize: (input) => JSON.stringify(input),
    key: StorageKey.IntroductionUnderstood,
    storage: browser.storage.local,
    value: false,
  }),
  [StorageKey.ToursCompleted]: createValue<Set<TourId>>({
    deserialize: (input) => new Set(JSON.parse(input) as TourId[]),
    serialize: (input) => JSON.stringify(Array.from(input)),
    key: StorageKey.ToursCompleted,
    storage: browser.storage.local,
    value: new Set([]),
  }),
};

/** Alias to get the inferred type shape of {@link storageValues}. */
export type StorageValues = typeof storageValues;

/**
 * Get the stored value for a given key.
 * @param key The key to get from storage.
 */
export async function fromStorage<K extends StorageKey>(
  key: K,
): Promise<StorageValues[K]> {
  return storageValues[key];
}
