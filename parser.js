module.exports = function parserOpts(config = {}) {
    return Object.assign({
        headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
        breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
        headerCorrespondence: ['type', 'scope', 'subject'],
        noteKeywords: ['BREAKING CHANGE'],
        revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
        revertCorrespondence: ['header', 'hash'],
        issuePrefixes: ['#'],
        mergePattern: /^Merge pull request #(\d+) from (.*)$/,
        mergeCorrespondence: ['id', 'source']
    }, config);
};
