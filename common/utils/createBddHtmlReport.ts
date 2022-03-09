import * as fs from 'fs'

import reporter, { Options } from 'cucumber-html-reporter'

let metaDataReportInfo
if (fs.existsSync('playwright/results/reports/metaDataReportInfo.json')) {
  metaDataReportInfo = JSON.parse(fs.readFileSync('playwright/results/reports/metaDataReportInfo.json').toString())
}

const options: Options = {
  theme: 'bootstrap',
  jsonFile: 'playwright/results/reports/report.json',
  output: 'playwright/results/reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'Test Environment': metaDataReportInfo['Test Environment'],
    Browser: metaDataReportInfo.Browser || 'Chrome',
    Parallel: metaDataReportInfo.Parallel === 'true' ? 'Feature' : 'None',
    Headless: metaDataReportInfo.Headless || 'false',
    Device: metaDataReportInfo.Device || 'None'
  }
}

reporter.generate(options)

