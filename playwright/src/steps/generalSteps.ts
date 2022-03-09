import { Then, When } from "@cucumber/cucumber"

import { ICustomWorld } from "../support/customWorld"
import { getConfig } from "../../../config"

Then("debug", async () => {
  // eslint-disable-next-line no-debugger
  debugger
})

Then("I navigate to task world page", async function (this: ICustomWorld) {
  const page = this.page!
  const config = getConfig()
  await page.waitForTimeout(3000)
  await page.goto(config.baseUrl)
})


Then("I should see the login page dislayed", async function (this: ICustomWorld) {
  const page = this.page!
  await page.waitForSelector('[data-l10n-key="login.login"]', { state: 'visible' })
})
