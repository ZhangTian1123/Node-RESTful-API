var file = 'config.json',
    filePath = require('path').join(__dirname, './' + file);

module.exports = JSON.parse(
    require('fs').readFileSync(filePath, 'utf8')
) || {};
