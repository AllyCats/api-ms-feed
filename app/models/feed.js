'use strict';

const db = require("../helpers/db");
const mysql = require("mysql");

let feed = function(feed){
	this.id = feed.id;
	this.content = feed.content;
	this.user = {
		uuid: feed.userUuid,
		nickName: feed.userNickName,
		avatar: feed.userAvater
	};
	this.link = feed.link;
}

module.exports = feed;

let select = `
SELECT
	f.id,
	f.content,
	f.link,
	u.uuid as userUuid,
	u.avatar as userAvater,
	u.nickName as userNickName
FROM feeds f
LEFT JOIN users u
ON f.userId = u.id`

feed.getFeeds = async function (queryParams) {
	let where = ``;
	if(queryParams){
		where += ` WHERE f.id IS NOT NULL`;
	}

	let limit = queryParams.limit ? Number(queryParams.limit) : 100;

	let limitString = ` LIMIT ${limit}`;

	let offset = queryParams.page ? ((Number(queryParams.page) - 1) * limit) : 0;

	let offsetString = ` OFFSET ${offset}`;
	
	return new Promise((resolve, reject) => {
			db.query(select + where + limitString + offsetString,
					[],
					(err, results) => {
						if(err){
							console.error(err);
							reject({ message: 'Failed to get feeds: Unexpected database error' });
						}else{
							let feeds = [];
							for(let f of results){
								feeds.push(new feed(f));
							}
							resolve(feeds);
						}
					}
			);
	});
}