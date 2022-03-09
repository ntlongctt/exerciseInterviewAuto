import {
  After,
  AfterAll,
  AfterStep,
  Before,
  BeforeAll,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber"
import { ITestCaseHookParameter } from "@cucumber/cucumber/lib/support_code_library_builder/types"
import { ensureDir } from "fs-extra"
import {
  BrowserContext,
  ChromiumBrowser,
  FirefoxBrowser,
  WebKitBrowser,
  chromium,
  devices,
  firefox,
  webkit,
} from "playwright"

import { setConfig } from "../../../config"
import { startNewContext } from "../utils/browsers"

import { browserOptions } from "./config"
import { ICustomWorld } from "./customWorld"

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser
const tracesDir = "playwright/results/traces"
let context: BrowserContext
let featureFileName = ""
let retry = 0

declare global {
  // eslint-disable-next-line no-var
  const browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000)

BeforeAll(async () => {
  switch (process.env.BROWSER) {
    case "firefox":
      browser = await firefox.launch(browserOptions)
      break
    case "iOS":
      browserOptions.args = []
      browser = await webkit.launch(browserOptions)
      break
    case "android":
      browser = await chromium.launch(browserOptions)
      break
    default:
      browser = await chromium.launch(browserOptions)
  }
  await ensureDir(tracesDir)

  setConfig({
    environment: process.env.ENVIRONMENT || "staging.taskworld",
    ci: process.env.NODE_ENV === "ci",
  })
  const device = process.env.MOBILEDEVICES || ""
  context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO
      ? { dir: "playwright/results/videos/test.webm" }
      : undefined,
    ...devices[device],
  })
})

Before(
  { tags: "@ignore" },
  async () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "skipped" as any
)

Before({ tags: "@debug" }, async function (this: ICustomWorld) {
  this.debug = true
})

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  if (featureFileName === "") {
    featureFileName =
      pickle.uri.split("/features/")[1]?.replace(".feature", "") || ""
    context = await startNewContext(featureFileName, browser)
  } else if (
    featureFileName !==
    pickle.uri.split("/features/")[1]?.replace(".feature", "")
  ) {
    // Close all page when starting new feature file
    await this.page?.close()
    await this.context?.close()
    await context.close()
    featureFileName =
      pickle.uri.split("/features/")[1]?.replace(".feature", "") || ""
    context = await startNewContext(featureFileName, browser)
  }
  const time = new Date().toISOString().split(".")[0]?.replace(/:|T/g, "-")
  // this test name will be add to tracing file
  this.testName = `${pickle.name.replace(/\W/g, "-")}-${time}`
  this.context = context

  // TODO: add tracing feature of playwright
  // await this.context?.tracing.start({ screenshots: true, snapshots: true })
  this.page = this.context?.pages()[0] || (await this.context.newPage())
  this.feature = pickle
})

After(async function (
  this: ICustomWorld,
  { pickle, result }: ITestCaseHookParameter
) {
  this.testName = `${pickle.name.replace(/\W/g, "-")}`
  if (result) {
    await this.attach(`Status: ${result?.status}`)
    const image = await this.page?.screenshot({
      path: `playwright/results/screenshots/${pickle.uri
        .split("/features/")[1]
        ?.replace(".feature", "")}/${this.testName}.png`,
      fullPage: true,
    })
    if (result.status !== Status.PASSED) {
      retry += 1
      if (retry > Number(process.env.PLAYWRIGHT_RETRIES)) {
        retry = 0
      }
      const length = await this.page?.$$eval(
        "text=/Sign in/i",
        (items) => items.length
      )
      image && (await this.attach(image, "image/png"))
    }
  }
})

AfterAll(async () => {
  await browser.close()
})
