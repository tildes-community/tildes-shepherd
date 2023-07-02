export {};

declare global {
  const $browser: "chromium" | "firefox";
  const $dev: boolean;
  const $test: boolean;
}
