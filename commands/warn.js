const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const ms = require('ms');
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8'));
