"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "api",
    params: ["routes", { name: "queries", required: false, rest: true }],
    code: `$return[$djsEval[process.env.API]/$env[routes]$if[$arrayLength[queries]>0;?]$arrayJoin[queries;&]]`
});
//# sourceMappingURL=api.js.map