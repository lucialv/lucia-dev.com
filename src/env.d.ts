/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare var grecaptcha: {
  execute: (key: string, options?: { action?: string }) => Promise<string>;
};
