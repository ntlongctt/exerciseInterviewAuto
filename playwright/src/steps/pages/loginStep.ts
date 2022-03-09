import { Then } from "@cucumber/cucumber"

import { ICustomWorld } from "../../support/customWorld"
import { getConfig } from "../../../../config"
import { logout } from "../../../src/utils"
import { loginPage } from "../../../src/locator"

Then("I logged into the task world page", async function (this: ICustomWorld) {
  const page = this.page!
  const config = getConfig()
  await logout(page, this.context!)
  await page.type(loginPage.textbox.email, config.email)
  await page.type(loginPage.textbox.password, config.password)
  await page.click(loginPage.button.login)
})

Then("I should see that user can log in successfully", async function (this: ICustomWorld) {
  const page = this.page!
  const config = getConfig()
  await page.waitForSelector(`[role="button"] >> text="${config.username}"`, { state: "visible" })
})
