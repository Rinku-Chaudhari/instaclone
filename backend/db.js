const pg = require("pg");

const db = new pg.Client(
	"postgres://hzwwndld:LkWJJo42EDlkNtxFrsQ0ADPaLPliqyzm@lallah.db.elephantsql.com:5432/hzwwndld"
);

db.connect()
	.then(() => {
		console.log("connected successfully!");
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = db;
