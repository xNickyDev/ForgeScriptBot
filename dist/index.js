"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const forge_db_1 = require("@tryforge/forge.db");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
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
});
client.commands.add({
    type: "ready",
    code: `$logger[Info;Ready on client ForgeBot!]`
});
forge_db_1.ForgeDB.variables(require("../variables.json"));
client.functions.load("dist/functions");
client.commands.load("dist/commands");
client.applicationCommands.load("dist/slash");
client.login(process.env.TOKEN);
console.log("Logged in!");
//# sourceMappingURL=index.js.map