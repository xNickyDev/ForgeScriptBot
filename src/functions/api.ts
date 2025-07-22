import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "api",
  params: ["routes", { name: "queries", required: false, rest: true }],
  code: `$return[$djsEval[process.env.API]/$env[routes]$if[$arrayLength[queries]>0;?]$arrayJoin[queries;&]]`
})