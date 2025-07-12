import { ForgeClient } from "@tryforge/forgescript"
import { ForgeDB } from "@tryforge/forge.db"
import * as dotenv from "dotenv"

dotenv.config()

const db: ForgeDB = new ForgeDB({
    type: "better-sqlite3",
    events: [
        "connect",
        "variableCreate",
        "variableUpdate",
        "variableDelete",
    ],
})

const client: ForgeClient = new ForgeClient({
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
        "ready",
        "error",
        "messageCreate",
        "interactionCreate",
        "guildCreate",
        "guildDelete",
    ],
    extensions: [
        db
    ],
})

ForgeDB.variables(require("../variables.json"))

client.functions.load("dist/functions")

// db.commands.load("dist/database")
client.commands.load("dist/commands")
client.applicationCommands.load("dist/slash")

client.login(process.env.TOKEN)
console.log("Logged in!")