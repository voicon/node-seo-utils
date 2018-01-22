var fs = require('fs');


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
    Reader.call(this);
    this.stream = oStream;
}

ReaderStream.prototype.read = function() {
    var me = this;
    try {
        this.stream.on('readable', function(data){
            while ((chunk = me.stream.read()) != null) {
                //console.log(chunk);
                me.data += chunk;
            }
        }); 
        this.stream.on('end', function(data){
            //complete reading data from stream
        });
        console.log(me.data);
    } catch(e) {

    }
}

module.exports = {Reader: Reader, ReaderStream: ReaderStream, ReaderFile: ReaderFile};


