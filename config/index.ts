import taskWorldConfig from "./taskWorld.json"

enum Environment {
  "staging.taskworld",
}

export type Config = { environment: any; ci?: boolean }

const configKey = ({ environment, ci }: Config) =>
  [environment, ci && "ci"].filter((x) => !!x).join(".")

let environment: any
let ci: boolean

const environmentProductMap = new Map<string, any>([
  [configKey({ environment: "staging.taskworld" }), taskWorldConfig],
])

export const setConfig = (config: Config) => {
  if (!(config.environment in Environment)) {
    throw new Error(`${config.environment} is not a valid environment.`)
  } else {
    environment = config.environment
    ci = !!config.ci
  }
}

export const getConfig = (): any => {
  const key = configKey({ environment, ci })
  const foundConfig = environmentProductMap.get(key)

  if (!foundConfig) {
    throw new Error(`No config found for key: ${key}`)
  }

  return foundConfig
}
