Debugger = null;
function debug(workspaceToBeDebugged, message){
    Debugger = require('debug')(workspaceToBeDebugged)
    Debugger(message)
};

module.exports = debug