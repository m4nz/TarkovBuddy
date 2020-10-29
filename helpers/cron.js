const cron = require('node-cron');
const { updateDb } = require('./db');

module.exports.startCron = () => {
    cron.schedule('* * 23 * * *', () => {
        updateDb()
    })
}