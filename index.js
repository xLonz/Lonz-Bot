const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
cons fs = require("fs");
const bot = new Discord.Client();
let purple = botconfig.purple;


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

let xpAdd = Math.floor(Math.random() *7) + 8;

if(!xp[message.author.id]){
  xp[message.author.id] = {
    xp: 0,
    level: 1
  };
}

let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 200;
xp[message.author.id].xp = curxp + xpAdd;
if(nxtLvl <= xp[message.author.id].xp){
  xp[message.author.id].level = curlvl + 1;
  
  let lvlup = new Discord.RichEmbed()
  .setTitle("Level Up!")
  .setColor(purple)
  .addField("New Level", curlvl + 1);
  
   message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});
  
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err)
  
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
   
  if(cmd === `${prefix}doggo`){
    
    let {body} = await superagent
    .get(`https://random.dog/woof.json`);
   
     let dogembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Doggo")
    .setImage(body.url);
  
  return message.channel.send(dogembed);
  }
  
  if(cmd === `${prefix}cat`){
    
    let {body} = await superagent
    .get(`https://random.cat/meow`);
   
     let catembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Cat")
    .setImage(body.file);
  
  return message.channel.send(catembed);
  }
  
  
});

bot.login(process.env.BOT_TOKEN);
