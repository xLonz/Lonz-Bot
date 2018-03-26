const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const superagent = require("superagent");

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Aura Kingdom Mobile", {type: "PLAYING"});
});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server.`);
  
  let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");
  welcomechannel.send(`LOOK OUT EVERYONE! ${member} has joined the party!`);
});

bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} left the server.`);
  
  let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");
  welcomechannel.send(`GOOD RIDDANCE! ${member} has bailed on the server!`);
 
});
 
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args =  messageArray.slice(1);
  
  if(cmd === `${prefix}ping`){
    return message.channel.send("Hello, Welcome to the official Union Aura Kingdom Mobile Discord! Please enjoy your stay! If you require assistance, please tag @LEADER @DEPUTY @ELITE regarding your questions and concerns.");
  }
 
 if(cmd === `${prefix}botinfo`){
   
   let bicon = bot.user.displayAvatarURL;
   let botembed = new Discord.RichEmbed()
   .setDescription("Bot Information")
   .setColor("#15f153")
   .setThumbnail(bicon)
   .addField("Bot Name", bot.user.username);
   
   return message.channel.send(botembed);
 }
  
  if(cmd === `${prefix}serverinfo`){
    
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Total Members", message.guild.memberCount);
    
    return message.channel.send(serverembed);
  }
   
  
});

bot.login(process.env.BOT_TOKEN);
