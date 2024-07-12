// controllers/trendController.js

const { runTrendAnalysis } = require('../models/ML');

const trend = async (req, res) => {
    try {
        const topics = await runTrendAnalysis();
        res.status(200).json({ success: true, topics });
    } catch (error) {
        console.error('Error running trend analysis:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve trend analysis data' });
    }
};

module.exports = {
    trend,
};
