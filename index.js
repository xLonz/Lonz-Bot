const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Aura Kingdom Mobile", {type: "PLAYING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args =  messageArray.slice(1);

  if(cmd === `${prefix}Hi`){
    return message.channel.send("Hello! Welcome to UNION :15:");
  }

  
});

bot.login(process.env.BOT_TOKEN);
