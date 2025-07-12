"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function = {
    name: "api",
    params: ["routes", { name: "queries", required: false, rest: true }],
    code: `$return[$djsEval[process.env.API]/$env[routes]$if[$arrayLength[queries]>0;?]$arrayJoin[queries;&]]`
};
exports.default = Function;
//# sourceMappingURL=api.js.map