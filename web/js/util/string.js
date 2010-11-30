String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
};

String.prototype.startsWith = function(pattern) {
    return (this.substr(0, pattern.length) == pattern);
};

String.prototype.endsWith = function(pattern) {
    return (this.substr(this.length - pattern.length, pattern.length) == pattern);
};
