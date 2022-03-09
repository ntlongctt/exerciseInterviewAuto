import { defineParameterType } from "@cucumber/cucumber"

defineParameterType({
  name: "role",
  transformer(s) {
    return s
  },
  regexp: /(admin2|admin|clerk|detective|detectiveSupervisor|client|officer2|officer|sergeant)/,
  useForSnippets: false,
})
