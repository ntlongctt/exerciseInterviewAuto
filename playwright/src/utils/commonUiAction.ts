import { BrowserContext, Page } from "playwright"

import { getConfig } from "../../../config"
import { getElementsCount } from "./elements"
import { projectPage } from "../locator"

export async function logout(page: Page, context: BrowserContext) {
  const config = getConfig()
  await page.goto(config.baseUrl)
  // should clear all cookie and local storage to make sure the login page displayed
  await page.evaluate(() => window.localStorage.clear())
  await context.clearCookies()
  await page.waitForTimeout(5000)
  await page.goto(config.baseUrl)
  await page.waitForSelector('[data-l10n-key="login.login"]', { state: 'visible' })
}

export async function selectDateTime(page: Page, dateTime: string) {
  const fullDate = dateTime.split(' ')[0]!.trim()
  const time = dateTime.split(' ')[1]!.trim()
  const year = fullDate.split('-')[2]!.trim()
  const month = fullDate.split('-')[1]!.trim()
  const date = fullDate.split('-')[0]!.trim()
  const hour = time.split(':')[0]!.trim()
  const minute = time.split(':')[1]!.trim()
  await page.dblclick(projectPage.button.pickRangeYear)
  // Select year
  while (await getElementsCount(page, `${projectPage.button.selectYear} >> text="${year}"`) == 0) {
    let startYear = await page.$$eval(projectPage.button.selectYear, (els) => els[0]!.textContent)
    if (Number(year) > Number(startYear)) {
      await page.click('.ax-calendar-picker__next')
    }
  }
  await page.click(`${projectPage.button.selectYear} >> text="${year}"`)
  // select month
  await page.click(`${projectPage.button.selectMonth} >> text="${month}"`)
  // select date
  await page.click(`${projectPage.button.selectDate} >> text="${date}"`)
  // select hour
  await page.fill(projectPage.button.selectHour, hour)
  // select minute
  await page.fill(projectPage.button.selectMinute, minute)
}
