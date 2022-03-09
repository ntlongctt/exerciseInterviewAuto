const common = `
  --require-module ts-node/register
  --require playwright/src/**/*.ts
  --format json:playwright/results/reports/report.json
  --format message:playwright/results/reports/report.ndjson
  --format html:playwright/results/reports/report.html
  --format summary
  --format progress-bar
  --format @cucumber/pretty-formatter
  --format-options ${JSON.stringify({ snippetInterface: "async-await" })}
  --publish-quiet
  `

const getWorldParams = () => {
  const params = {
    foo: "bar",
  }

  return `--world-parameters ${JSON.stringify({ params })}`
}

module.exports = {
  default: `${common} ${getWorldParams()}`,
}
