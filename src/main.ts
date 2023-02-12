// Require the necessary discord.js classes
import {GatewayIntentBits} from "discord.js";
import Ping from "./commands/Ping";
import ClientFacade from "./discord/client/ClientFacade";
import Help from "./commands/Help";
import AllKnowing from "./commands/AllKnowing";
import OpenaiClient from "./openai/client/OpenaiClient";

const { DISCORD_BOT_TOKEN } = process.env;

const client = new ClientFacade();
client.registerCommand(new Ping());
client.registerCommand(new Help());
client.registerCommand(new AllKnowing(new OpenaiClient()));
client.listenEvents();
client.login(DISCORD_BOT_TOKEN);