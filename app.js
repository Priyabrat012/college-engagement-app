const express = require("express");
const session = require("express-session");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");

const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

app.use("/blog", blogRouter);
app.use("/user", userRouter);

mongoose
  .connect(
    "mongodb+srv://priyabrat:YzmSuzjwD22mQWsw@cluster0.okk5y.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database!");
  });

//home
app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port " + port);
});

// YzmSuzjwD22mQWsw
