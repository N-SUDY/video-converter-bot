import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { handleCallbackAction, handleCommands, handleMessage } from "../handlers";

export class BotService {
    public initHandlers(bot: Telegraf<Context<Update>>) {
        handleCommands(bot);
        handleMessage(bot);
        handleCallbackAction(bot);
    }
}