import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
  $arrayLoad[ID; ;$customID]
  $onlyIf[$arrayAt[ID;0]==eventExample]
  $let[event;$arrayAt[ID;1]]
  
  $ephemeral
  $addContainer[
    $addTextDisplay[## Example]
    $addTextDisplay[\`\`\`js\nmodule.exports = {\n  type: "$get[event]",\n  code: \`$$c[]log[$get[event] was just triggered!\\]\`\n}\n\`\`\`]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
  ;$getGlobalVar[main]]
  `
}

export default Command