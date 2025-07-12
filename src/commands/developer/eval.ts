import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  name: "eval",
  aliases: ["ev"],
  type: "messageCreate",
  code: `
  $onlyForUsers[;$botOwnerID]
  
  $let[result;$trim[$eval[$message;false]]]
  $if[$charCount[$get[result]]>2000;$attachment[$get[result];result.json;true];$get[result]]
  $try[$!addMessageReactions[$channelID;$messageID;✅]]
  `
}

export default Command