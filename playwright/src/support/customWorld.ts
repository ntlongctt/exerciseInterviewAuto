/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-extraneous-dependencies */
import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber"
import * as messages from "@cucumber/messages"
import { BrowserContext, Page } from "playwright"

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string }
}

export interface ICustomWorld extends World {
  debug: boolean
  feature?: messages.Pickle
  context?: BrowserContext
  page?: Page

  testName?: string
  projectData?: {
    name: string,
    description: string,
  }
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options)
  }

  debug = false
}

setWorldConstructor(CustomWorld)
