const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Aura Kingdom Mobile", {type: "PLAYING"});
});

client.login(process.env.BOT_TOKEN);
