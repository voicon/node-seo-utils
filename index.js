
/*var cheerio = require('cheerio'),
    $ = cheerio.load('<h2 class = "title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

console.log($.html());*/

const Reader = require ('./src/libs/reader');

/*var reader = new Reader.ReaderFile('./README');
reader.read();
console.log(reader.getDoc());*/

var fs = require('fs');
var readableStream = fs.createReadStream('./package.json');
var reader = new Reader.ReaderStream(readableStream);
reader.read();
setTimeout(function(){console.log(reader.getDoc());}, 300);