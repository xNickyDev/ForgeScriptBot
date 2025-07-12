import { IForgeFunction } from "@tryforge/forgescript"

const Function: IForgeFunction = {
  name: "api",
  params: ["routes", { name: "queries", required: false, rest: true }],
  code: `$return[$djsEval[process.env.API]/$env[routes]$if[$arrayLength[queries]>0;?]$arrayJoin[queries;&]]`
}

export default Function