// Export something so TypeScript doesn't see this file as an ambient module.
export {};

declare global {
  const $browser: "chromium" | "firefox";
  const $dev: boolean;
  const $test: boolean;
}
