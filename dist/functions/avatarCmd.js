"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "avatarCmd",
    params: ["user"],
    code: `
  $let[user;$default[$env[user];$authorID]]
  $let[avatar;$userAvatar[$get[user];4096]]
  $let[ext;.$advancedTextSplit[$replace[$get[avatar];?size=4096;];.;3]]
  
  $addContainer[
    $addTextDisplay[## $userDisplayName[$get[user]]'s Avatar]
    $addSeparator
    $addMediaGallery[
      $addMediaItem[$get[avatar]]
    ]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $if[$get[ext]==.gif;
      $addButton[$get[avatar];GIF;Link]
    ]
    $addButton[$replace[$get[avatar];$get[ext];.png];PNG;Link]
    $addButton[$replace[$get[avatar];$get[ext];.jpg];JPG;Link]
    $addButton[$replace[$get[avatar];$get[ext];.webp];WEBP;Link]
  ;$getGlobalVar[main]]
  `
});
//# sourceMappingURL=avatarCmd.js.map