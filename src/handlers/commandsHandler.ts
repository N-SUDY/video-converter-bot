import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

function handleStartCommand(bot: Telegraf<Context<Update>>) {
    bot.start(async (context) => {
        await context.telegram.sendMessage(context.message.chat.id, `Hi, <b>${context.from.first_name}</b>!` +
            `\nMy name is ${context.botInfo.first_name}, I can convert you video in required format.` +
            `\nJust send video or document.`, { parse_mode: 'HTML' });
    });
}

function handleHelpCommand(bot: Telegraf<Context<Update>>) {
    bot.help(async (context) => {
        await context.telegram.sendMessage(context.message.chat.id, `<b>${context.botInfo.first_name}</b> - this is a bot, that can convert your video from certain extension to other.` +
            `\n\nBot can convert to the following extensions: <b>mp4, avi, mov, mkv, wmv</b>` +
            `\n\nYou have 2 ways to send the video: \n<b>• Send as video</b>\n<b>• Send as document</b>`, { parse_mode: 'HTML' });
    });
}

export function handleCommands(bot: Telegraf<Context<Update>>) {
    handleStartCommand(bot);
    handleHelpCommand(bot);
}