var fs = require('fs');
var deasync = require('deasync');


function Reader() {
    this.data = '';
}

Reader.prototype.read = function() {
    //do nothing
}

Reader.prototype.getDoc = function() {
    return this.data;
}

ReaderFile.prototype = new Reader();
ReaderFile.prototype.constructor = ReaderFile;

function ReaderFile(sFilePath) {
    Reader.call(this);
    this.filePath = sFilePath;
}
ReaderFile.prototype.read = function() {
    this.data = fs.readFileSync(this.filePath,'utf8');
}
ReaderFile.prototype.getDoc = function() {
    return this.data;
}

ReaderStream.prototype = new Reader();
ReaderStream.prototype.constructor = ReaderStream;

function ReaderStream(oStream) {
    this.isReading = false;
    Reader.call(this);
    this.stream = oStream;
}

ReaderStream.prototype.read = function() {
    var me = this;
    me.isReading = true;
    try {
        me.stream.on('data', function(chunk){
            me.data += chunk;
        }); 
        me.stream.on('end', function(){
            me.isReading = false;
        });
    } catch(e) {

    }
}

ReaderStream.prototype.getDoc = function() {
    while(this.isReading == true) {
        deasync.runLoopOnce();
    }
    return this.data;
}

module.exports = {Reader: Reader, ReaderStream: ReaderStream, ReaderFile: ReaderFile};


