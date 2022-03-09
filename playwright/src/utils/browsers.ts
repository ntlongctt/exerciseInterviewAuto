import { Browser, BrowserContext, devices } from "playwright"

export function startNewContext(
  featureFileName: string,
  browser: Browser
): Promise<BrowserContext> {
  const device = process.env.MOBILEDEVICES || ""
  return browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO
      ? { dir: `playwright/results/videos/${featureFileName}` }
      : undefined,
    ...devices[device],
  })
}
