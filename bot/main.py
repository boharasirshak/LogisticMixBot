import logging
from os import getenv

import telegram
from telegram import ReplyKeyboardRemove, Update, WebAppInfo, MenuButtonWebApp
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters, CallbackContext
from telegram.error import NetworkError
import dotenv

dotenv.load_dotenv()

TOKEN = getenv("BOT_TOKEN")
APP_BASE_URL = getenv("APP_URL")

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
# set higher logging level for httpx to avoid all GET and POST requests being logged
logging.getLogger("httpx").setLevel(logging.WARNING)

logger = logging.getLogger(__name__)

bot = telegram.Bot(TOKEN)

async def error_handler(update: Update, context: CallbackContext) -> None:
    try:
        raise context.error
    except NetworkError as e:
        print(f"NetworkError occurred: {e.message}")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    try: 
        await context.bot.set_chat_menu_button(
            chat_id=update.effective_chat.id, 
            menu_button=MenuButtonWebApp(text="Open Web App", web_app=WebAppInfo(url=APP_BASE_URL))
        )
    # the chat is private 
    except:
        pass
    
    await update.message.reply_text(
        f"Hi {update.effective_user.first_name}",
    )


# Handle incoming WebAppData
async def web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    data = update.message.web_app_data.data
    await update.message.reply_text(f"Your data was: {data}")


def main() -> None:
    """Start the bot."""
    # Create the Application and pass it your bot's token.
    application = Application.builder().token(TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, web_app_data))
    application.add_error_handler(error_handler)
    
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()