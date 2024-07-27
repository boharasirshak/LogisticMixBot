# LogiMix Telegram Bot

This is a NextJS based Telegram Web App for the LogiMix ecommerce shopping bot. It uses `NextJs` along with `TypeScript` for the frontend and `python-telegram-bot` for the bot project.

## Setup App

Goto the /app directory and run the following commands:

```bash
cd app
```

Install the dependencies:

```bash
npm install
```

### Environment Variables
Copy or rename the `.env.example` to `.env` and update the values as per your requirements. The current `.env.example` file has the following fields

```.env
BOT_TOKEN=xxx
CHAT_ID=xxx
```

Replace the `xxx` with your bot token and chat id you get from @BotFather and @userinfobot respectively.

Build the app:

```bash
npm run build
```

## Setup Bot

Goto the /bot directory and run the following commands:

```bash
cd bot
```

Copy or rename the `.env.example` to `.env` and update the values as per your requirements. The current `.env.example` file has the following fields

```.env
BOT_TOKEN = xxx
BOT_USERNAME = @xxx
APP_URL = xxx
```

Replace the `xxx` with your bot token, bot username and app url.
The `APP_URL` is the url where the app is hosted. The URL must be on HTTPS with a valid SSL certificate. You can get a free certificate using `certbot`.

OPTIONAL: Create a virtual environment:

```bash
python3 -m venv venv
```

OPTIONAL: Activate the virtual environment:

```bash
source venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

## Run in Production
In production you can use `pm2` to run the app and bot. You can also use `nginx` as a reverse proxy to serve the app.

### Nginx
In NGINX config you should setup HTTPS using `certbot` or any other SSL provider. You also need to map the 80 and 443 ports to the app `3000` port.

### Pm2
You can use `pm2` to run the app and bot in production. You can also use `pm2` to run the app and bot as a service.

Install pm2 globally:

```bash
npm install pm2 -g
```

### Run the app in production
On the base directory, run the following command:

```bash
pm2 start ecosystem.config.json
```

### Run the bot in production

If you have setup the virtual environment, you first need to activate it and then run the bot using pm2.

```bash
cd bot
source venv/bin/activate
```

Run the bot using pm2:

```bash
pm2 start python --name "bot" -- bot.py 
```

---

Now bot the app and bot are running in production. You can access the app using the domain name and the bot using the Telegram app and it's username.
