"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "ready",
    code: `
  $registerFont[assets/fonts/Gilroy-ExtraBold.ttf]
  $registerFont[assets/fonts/microsoft-yahei.ttf]
  `
});
//# sourceMappingURL=registerFonts.js.map