import { Telegraf, Context } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram';
import { BotService } from './services/botService';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.log("Empty token!");
    process.exit(0);
}

const bot = new Telegraf<Context<Update>>(token);

const botController = new BotService();
botController.initHandlers(bot);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));