const feedModel = require("../models/feed");

exports.getFeed = async function(req, res) {
	const feed = await feedModel.getFeeds(req.queryParams).catch((error) => {
		console.error(error);
		res.status(500).json(error);
	});

	if(feed){
		res.json(feed);
	}
}