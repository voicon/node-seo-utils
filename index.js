
const mag = require('./src/libs/manager');
const rule = require('./src/libs/rule');
const reader = require ('./src/libs/reader');
const writer = require ('./src/libs/writer');
const cheerio = require('cheerio');
const fs = require('fs');

/*
$ = cheerio.load('<h2 class = "title">Hello world</h2><meta name="keywords abc" /> <meta name="robots" />');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');


console.log($('meta[name1]').length);*/


//const Reader = require ('./src/libs/reader');

/*var reader = new Reader.ReaderFile('./README');
reader.read();
console.log(reader.getDoc());*/

/*var fs = require('fs');
var readableStream = fs.createReadStream('./package.json');
var reader = new Reader.ReaderStream(readableStream);
reader.read();
console.log(reader.getDoc());*/

var manager = new mag();

manager.setReader(new reader.ReaderFile('./test/index.html'));
//manager.setWriter(new writer.WriterConsole());
//manager.setWriter(new writer.WriterFile('./test/out'));
var wstream = fs.createWriteStream('./test/out1');
manager.setWriter(new writer.WriterStream(wstream));

manager.addRule(new rule.RuleRootExistTag('head', 'meta'));
manager.addRule(new rule.RuleRootExistTag('head', 'title'));
manager.addRule(new rule.RuleTagExistAttribute('head', 'meta', 'name'));
manager.addRule(new rule.RuleTagExistAttribute('head', 'meta', 'rel'));
manager.addRule(new rule.RuleTagExistAttribute('', 'ul', 'class'));
manager.addRule(new rule.RuleTagExistAttribute('', 'address', 'name'));

manager.addRule(new rule.RuleTagAttributeExistValue('head', 'meta', 'name', 'keywords'));
manager.addRule(new rule.RuleTagAttributeExistValue('', 'a', 'href', 'index'));

manager.addRule(new rule.RuleTagCount('', 'li', 3));


manager.check();
manager.write();
