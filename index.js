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

  if(cmd === `${prefix}ping`){
    return message.channel.send("Hello, Welcome to the official Union Aura Kingdom Mobile Discord! Please enjoy your stay! If you require assistance, please tag @LEADER @DEPUTY @ELITE regarding your questions and concerns.");
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
   
  if(cmd === `${prefix}doggo`){
    
    let {body} = await superagent
    .get(`https://random.dog/woof.json`);
   
     let dogembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Doggo")
    .setImage(body.url);
  
  return message.channel.send(dogembed);
  }
  
});

bot.login(process.env.BOT_TOKEN);
