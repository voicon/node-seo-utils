function Rule(rootTag) {
    this.doc = {};
    this.result = {};
    this.root = rootTag ? rootTag : 'html';
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
    this.result = this.doc(this.root + " " + this.tag).length > 0;
}
RuleRootExistTag.prototype.output = function() {
    return "This <" + this.root + "> " + (this.result == true ? "has " : "without ") + "<" + this.tag + ">";
}


RuleTagExistAttribute.prototype = new Rule();
RuleTagExistAttribute.prototype.constructor = RuleTagExistAttribute;

function RuleTagExistAttribute(root, tag, attr) {
    Rule.call(this, root);
    this.tag = tag;
    this.attr = attr;
}
RuleTagExistAttribute.prototype.check = function() {
    this.result = this.doc(this.root + " " + this.tag + "[" + this.attr + "]").length > 0;
}
RuleTagExistAttribute.prototype.output = function() {
    return "This <" + this.root + "> " + (this.result == true ? "has " : "without ") + "<" + this.tag + " " + this.attr + "=\"...\">";
}

RuleTagAttributeExistValue.prototype = new Rule();
RuleTagAttributeExistValue.prototype.constructor = RuleTagAttributeExistValue;

function RuleTagAttributeExistValue(root, tag, attr, value) {
    Rule.call(this, root);
    this.tag = tag;
    this.attr = attr;
    this.value = value;
}
RuleTagAttributeExistValue.prototype.check = function() {
    this.result = this.doc(this.root + " " + this.tag + "[" + this.attr + "*=" + this.value + "]").length > 0;
}
RuleTagAttributeExistValue.prototype.output = function() {
    return "This <" + this.root + "> " + (this.result == true ? "has " : "without ") + "<" + this.tag + " " + this.attr + "=\"" + this.value + "\">";
}

RuleTagCount.prototype = new Rule();
RuleTagCount.prototype.constructor = RuleTagCount;

function RuleTagCount(root, tag, limit) {
    Rule.call(this, root);
    this.tag = tag;
    this.limit = limit;
}
RuleTagCount.prototype.check = function() {
    this.result = this.doc(this.root + " " + this.tag).length;
}
RuleTagCount.prototype.output = function() {
    if(this.result == 0) {
        return "This <" + this.root + "> without <" + this.tag + ">";
    }
    var sign = ' equal to';
    if(this.result > this.limit) {
        sign = 'larger than';
    } else if(this.result < this.limit) {
        sign = 'less than';
    }
    return "This <" + this.root + "> has " + this.result + " <" + this.tag + "> " + sign + " than " + this.limit;
}

module.exports = {
    Rule: Rule, 
    RuleRootExistTag: RuleRootExistTag, 
    RuleTagExistAttribute: RuleTagExistAttribute, 
    RuleTagAttributeExistValue: RuleTagAttributeExistValue, 
    RuleTagCount: RuleTagCount};