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
    this.oDom = cheerio.load(this.oReader.read());
    var me = this;

    if(this.chain.length > 0) {
        this.chain.forEach(function(oChain) {
            oChain.setDoc(me.oDom);
            oChain.check();
        });
    }
}

Manager.prototype.write = function() {
    this.oWriter.write();
}

module.exports = Manager;
