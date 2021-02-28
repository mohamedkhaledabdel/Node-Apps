function log(req, res, next) {
    console.log('logging.....')
    next();// this line is essential, without it the code will be stuck here and will not go to the next item in the pipeline
};



module.exports = log;