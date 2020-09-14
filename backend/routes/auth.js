const router = require("express").Router();
const db = require("../db");

router.post("/loginUser", (req, res) => {
	db.query(
		`SELECT id,username,password from users WHERE username='${req.body.username}'`,
		(err, res0) => {
			if (res0.rows[0] !== undefined) {
				if (res0.rows[0].password === req.body.password) {
					res.send({ done: true, id: res0.rows[0].id });
				} else {
					res.send("invalid password");
				}
			} else {
				res.send("invalid username");
			}
		}
	);
});

router.post("/registerUser", (req, res) => {
	if (
		req.body.email.trim().includes("@") &&
		req.body.email.trim().includes(".com")
	) {
		if (
			req.body.username.trim().length >= 5 &&
			req.body.username.trim().length <= 20 &&
			!req.body.username.includes(" ")
		) {
			if (
				req.body.password.trim().length >= 6 &&
				req.body.password.trim().length <= 20
			) {
				//check username and email validity
				db.query(
					`SELECT email from users WHERE email='${req.body.email}'`,
					(err, res1) => {
						if (res1.rows.length === 0) {
							db.query(
								`SELECT username from users WHERE username='${req.body.username}'`,
								(err, res2) => {
									if (res2.rows.length === 0) {
										db.query(
											`INSERT INTO users(username,email,password,profileimage) 
					VALUES('${req.body.username}','${req.body.email}','${req.body.password}','https://bit.ly/3lYCkeO')`,
											(err, res0) => {
												if (!err) res.send("done");
												else console.log(err);
											}
										);
									} else {
										res.send("username already taken.");
									}
								}
							);
						} else {
							res.send("email already used.");
						}
					}
				);
			} else {
				res.send("password must be between 6 and 20 characters.");
			}
		} else {
			res.send("username must be spaceless between 5 and 20 characters.");
		}
	} else {
		res.send("email must be valid.");
	}
});

module.exports = router;
