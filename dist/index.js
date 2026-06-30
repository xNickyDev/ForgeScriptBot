"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const forge_db_1 = require("@tryforge/forge.db");
const forge_canvas_1 = require("@tryforge/forge.canvas");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db = new forge_db_1.ForgeDB({
    type: "better-sqlite3",
    events: [
        "connect",
        "variableCreate",
        "variableUpdate",
        "variableDelete",
    ],
});
const client = new forgescript_1.ForgeClient({
    prefixes: [
        ".",
        "f!",
        "<@$botID>",
        "<@!$botID>",
    ],
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMembers",
        "MessageContent",
        "DirectMessages",
        "DirectMessageReactions",
        "DirectMessageTyping",
    ],
    events: [
        "clientReady",
        "messageCreate",
        "interactionCreate",
    ],
    extensions: [
        db,
        new forge_canvas_1.ForgeCanvas()
    ],
});
client.commands.add({
    type: "clientReady",
    code: `$logger[Info;Ready on client ForgeScriptBot!]`
});
forge_db_1.ForgeDB.variables(require("../variables.json"));
client.functions.load("dist/functions");
client.commands.load("dist/commands");
client.applicationCommands.load("dist/slash");
client.login(process.env.TOKEN);
console.log("Logged in!");
//# sourceMappingURL=index.js.map