const app = require("./app");
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
	res.send(`running at ${port}`);
});

app.listen(port, () => {
	console.log(`listening at port ${port}`);
});
