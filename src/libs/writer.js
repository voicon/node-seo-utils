var fs = require('fs');

function Writer() {
    this.data = '';
}

Writer.prototype.setData = function(data) {
    this.data = data;
}

Writer.prototype.write = function(data) { 
    if(data !== undefined && data != "") {
        this.setData(data);
    }
}

WriterConsole.prototype = new Writer();
WriterConsole.prototype.constructor = WriterConsole;

function WriterConsole() {
    Writer.call(this);
}

WriterConsole.prototype.write = function(data) {
    Writer.prototype.write.call(this, data);
    console.log(this.data);
}

WriterFile.prototype = new Writer();
WriterFile.prototype.constructor = WriterFile;

function WriterFile(filePath) {
    Writer.call(this);
    this.filePath = filePath;
}

WriterFile.prototype.write = function(data) {
    Writer.prototype.write.call(this, data);

    fs.writeFile(this.filePath, this.data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

WriterStream.prototype = new Writer();
WriterStream.prototype.constructor = WriterStream;

function WriterStream(oStream) {
    Writer.call(this);
    this.stream = oStream;
}

WriterStream.prototype.write = function(data) {
    Writer.prototype.write.call(this, data);

    try {
        this.stream.write(this.data);
        // on Node.js older than 0.10, add cb to end()
        this.stream.end(function () { console.log('Write stream done'); });
    } catch(e) {
        console.log('Write stream fail');
    }
}

module.exports = {
    Writer: Writer, 
    WriterConsole: WriterConsole,
    WriterFile: WriterFile,
    WriterStream: WriterStream
};