import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { tempFolder, video, videoExtensions } from "../config";
import { FFmpegService, FileService } from "../services";

export function handleCallbackAction(bot: Telegraf<Context<Update>>) {
    bot.action(videoExtensions, async (context) => {
        const chatID = context.callbackQuery.message?.chat.id!;
        const messageID = context.callbackQuery.message?.message_id;
        const inlineMessageID = context.callbackQuery.inline_message_id;

        const userExtension = context.match[0];

        if (userExtension === video.extension) {
            await bot.telegram.editMessageText(chatID, messageID, inlineMessageID, "❌Future extension is equal to the current one!❌");

            return;
        }

        const oldVideoPath = `${tempFolder}/${video.name}${video.extension}`;
        const newVideoPath = `${tempFolder}/${video.name}${userExtension}`;

        const ffmpegService = new FFmpegService();
        const fileService = new FileService();

        await bot.telegram.editMessageText(chatID, messageID, inlineMessageID, "Processing...");

        try {
            await ffmpegService.convertVideo(video, userExtension);

            await bot.telegram.editMessageText(chatID, messageID, inlineMessageID, "✅Done!✅");
            await bot.telegram.sendVideo(chatID, { source: newVideoPath }, { caption: `${video.extension} ➡️ ${userExtension}` });
        } catch (err) {
            await bot.telegram.editMessageText(chatID, messageID, inlineMessageID, "❌Something went wrong, try again!❌");
        } finally {
            await fileService.deleteFile(oldVideoPath);
            await fileService.deleteFile(newVideoPath);
        }
    });
}