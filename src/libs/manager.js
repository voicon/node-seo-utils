var cheerio = require('cheerio');

function Manager() {
    this.chain = [];
    this.reader = {};
    this.writer = {};
    this.oDom = {};
}

Manager.prototype.addRule = function(oRule) {
    this.chain.push(oRule);
}

Manager.prototype.setReader = function (oReader) {
    this.reader = oReader;
}

Manager.prototype.setWriter = function (oWriter) {
    this.writer = oWriter;
}

Manager.prototype.check = function() {
    this.reader.read();
    this.oDom = cheerio.load(this.reader.getDoc());
    var me = this;

    if(this.chain.length > 0) {
        this.chain.forEach(function(oChain) {
            oChain.setDoc(me.oDom);
            oChain.check();
        });
    }
}

Manager.prototype.write = function() {
    var data = [];
    if(this.chain.length > 0) {
        this.chain.forEach(function(oChain) {
            data.push(oChain.output());
        });
    }
    this.writer.write(data.join("\r\n"));
}

module.exports = Manager;
