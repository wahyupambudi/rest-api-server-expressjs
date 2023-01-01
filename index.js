const express = require("express");
const app = express();
const port = 2023;

// import library POST
let cors = require("cors");

// use cors
app.use(cors());

// import body parser
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// halaman index api
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// import route posts
const postsRouter = require("./routes/posts");
app.use("/api/posts", postsRouter);

app.listen(port, () => {
  console.log(`App Running At http://localhost:${port}`);
});
