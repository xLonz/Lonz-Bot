const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Aura Kingdom Mobile", {type: "PLAYING"});
});

bot.login(process.env.BOT_TOKEN);
