const morgan = require('morgan');

module.exports = {
    logger: () => morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')
}