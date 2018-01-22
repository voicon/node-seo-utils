function Rule(rootTag) {
    this.doc = {};
    this.result = {};
    this.root = rootTag == undefined ? 'body' : rootTag;
}

Rule.prototype.setDoc = function(oDoc) {
    this.doc = oDoc;
}

Rule.prototype.check = function() { }
Rule.prototype.output = function() { }

RuleRootExistTag.prototype = new Rule();
RuleRootExistTag.prototype.constructor = RuleRootExistTag;

function RuleRootExistTag(root, tag) {
    Rule.call(this, root);
    this.tag = tag;
}
RuleRootExistTag.prototype.check = function() {
    
}