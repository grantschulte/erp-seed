const express = require("express");
const app = express();
const redis = require("redis");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const client = redis.createClient();
const RedisStore = require("connect-redis")(session);
const sassMiddleware = require("node-sass-middleware");
const viewHelpers = require("./middleware/view-helpers");
const user = require("./middleware/user");
const auth = require("./middleware/auth");

// Configuration

const srcDir     = __dirname;
const publicDir  = path.join(__dirname, "..", "public");
const viewsDir   = path.join(__dirname, "views");
const viewEngine = "pug";

app.set("views", viewsDir);
app.set("view engine", viewEngine);
app.set("json spaces", 2);
app.set("siteTitle", "ERM Seed");

// Middleware

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: "captainpicard",
  store: new RedisStore({
    client,
    host: "localhost",
    port: 6379,
    ttl: 260
  }),
  saveUninitialized: false,
  resave: false
}));
app.use(user());
app.use(sassMiddleware({
  src: srcDir,
  dest: publicDir,
  indentedSyntax: false,
  sourceMap: true,
  outputStyle: "compressed"
}));
app.use(express.static(publicDir));
app.use(viewHelpers({
  links: true
}));

// Routes

const publicRoutes  = require("./routes/public");
const privateRoutes = require("./routes/private");

app.use("/", publicRoutes);
app.use("/", auth(), privateRoutes);

app.get("*", (req, res) => {
  res.status(200)
    .send({ message: "Nothing here." });
});

// Errors

module.exports = app;
