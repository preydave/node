const cron = require('node-cron');

// Schedule daily campaign report
cron.schedule('0 9 * * *', async () => {
  console.log('Generating daily campaign reports...');
  // Add campaign report logic here
});

// Schedule expired campaigns cleanup
cron.schedule('0 0 * * *', async () => {
  console.log('Cleaning up expired campaigns...');
  // Add cleanup logic here
});

module.exports = {
  startCampaignScheduler: () => {
    console.log('Campaign scheduler started');
  }
};
