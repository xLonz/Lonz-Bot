const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("@xLonz#4523 for help", {type: "PLAYING"});
});

client.login(process.env.BOT_TOKEN);
