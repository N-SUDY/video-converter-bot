import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { message } from "telegraf/filters";
import path from "path";
import { extensionsKeyboard, video } from "../config";
import { FileValidator } from "../validators";

async function sendInlineKeyboard(context: Context<Update>) {
    const validator = new FileValidator();
    const { message, status } = validator.validateFile(video);

    if (!status) {
        await context.telegram.sendMessage(context.message!.chat.id, message);

        return;
    }
    
    const replyMarkupOptions = {
        inline_keyboard: extensionsKeyboard, 
        reply_to_message_id: context.message!.message_id 
    };

    video.url = await context.telegram.getFileLink(video.name!);
    await context.telegram.sendMessage(context.message!.chat.id, "Choose extension", { parse_mode: 'HTML', reply_markup: replyMarkupOptions });
}

function handleDocumentMessage(bot: Telegraf<Context<Update>>) {
    bot.on(message('document'), async (context) => {
        if (context.message.forward_date) {
            await context.telegram.sendMessage(context.message!.chat.id, "❌I do not process the forwarded message! Upload your video via computer or phone!❌",
                { reply_to_message_id: context.message!.message_id });

            return;
        }

        video.name = context.message.document.file_id;
        video.extension = path.extname(context.message.document.file_name!).toLowerCase();
        video.size = context.message.document.file_size;

        sendInlineKeyboard(context);
    });
}

function handleVideoMessage(bot: Telegraf<Context<Update>>) {
    bot.on(message('video'), async (context) => {
        if (context.message.forward_date) {
            await context.telegram.sendMessage(context.message!.chat.id,
                "❌I do not process the forwarded message! Upload your video via computer or phone!❌",
                { reply_to_message_id: context.message!.message_id });

            return;
        }

        video.name = context.message.video.file_id;
        video.extension = path.extname(context.message.video.file_name!).toLowerCase();
        video.size = context.message.video.file_size;

        sendInlineKeyboard(context);
    });
}

export function handleMessage(bot: Telegraf<Context<Update>>) {
    handleDocumentMessage(bot);
    handleVideoMessage(bot);
}