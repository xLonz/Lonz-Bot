const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const superagent = require("superagent");
const bot = new Discord.Client();
let cooldown = new Set();
let cdseconds = 5;

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("*present for Attendance", {type: "WATCHING"});
  
});
 
bot.on("guildMemberAdd", async member => {
console.log(`${member.id} joined the server.`);
  
member.addRole(member.guild.roles.find("name", "COUNSELING"));

let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");
welcomechannel.send(`LOOK OUT EVERYONE! ${member} has joined the party!`)
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
  if(!message.content.startsWith(prefix)) return;
  message.delete();
  if(cooldown.has(message.author.id)){
  return message.reply("You have to wait 5 seconds between commands.")
  
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args =  messageArray.slice(1);
  
if(cmd === `${prefix}ping`){
   return message.channel.send("Hello, Welcome to the official Union Aura Kingdom Mobile Discord! Please enjoy your stay! If you require assistance, please tag @LEADER @DEPUTY @ELITE regarding your questions and concerns.")
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
  
  if(cmd === `${prefix}dog`){
    
    let {body} = await superagent
    .get(`https://random.dog/woof.json`);
    
    let dogembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Doggo :dog:")
    .setImage(body.url);
    
    return message.channel.send(dogembed);
  }
  
  if(cmd === `${prefix}cat`){
    
   let {body} = await superagent
   .get(`https://random.cat/meow`);
    
   let catembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Cat :cat:")
    .setImage(body.file);
    
    return message.channel.send(catembed);
  }
  
  if(cmd === `${prefix}avatar`){
    
    let msg = await message.channel.send("Generating Avatar...");
    let target = message.mentions.users.first() || message.author;
    
    await message.channel.send({files: [
                                {
                                attachment: target.displayAvatarURL,
                                name: "avatar.png"
                                }
                                ]});
    msg.delete();
  }           
  
  
  if(cmd === `${prefix}present`){
    
  let attendanceEmbed = new Discord.RichEmbed()
  .setDescription("Attendance")
  .setColor("#15f153")
  .addField("Member Present", `${message.author}`)
  .addField("Time", message.createdAt)
  
  let attendancechannel = message.guild.channels.find(`name`, "union-attendance");
  if (!attendancechannel) return message.channel.send("Couldn't find attendance channel.");
  
  
  message.delete().catch(O_o=>{});
  attendancechannel.send(attendanceEmbed);
  
  }
  
  }
});

bot.login(process.env.BOT_TOKEN);
