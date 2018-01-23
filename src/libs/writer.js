function Writer() {
    this.data = '';
}

Writer.prototype.setData = function(data) {
    this.data = data;
}

Writer.prototype.write = function() { }

WriterConsole.prototype = new Writer();
WriterConsole.prototype.constructor = WriterConsole;

function WriterConsole() {
    Writer.call(this);
}

WriterConsole.prototype.write = function(data) {
    this.setData(data);
    console.log(this.data);
}

module.exports = {Writer: Writer, WriterConsole: WriterConsole};