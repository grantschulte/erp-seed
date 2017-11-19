if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

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

const viewHelpers = require("./middleware/view-helpers");
const user = require("./middleware/user");
const auth = require("./middleware/auth");

// Settings

const publicDir  = path.join(__dirname, "..", "public");
const clientDir  = path.join(__dirname, "..", "client");
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
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({
    client,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: process.env.SESSION_LIFETIME
  }),
  saveUninitialized: false,
  resave: false
}));
app.use(user());
app.use(express.static(publicDir));
app.use(viewHelpers({
  links: true
}));

// Routes

const publicRoutes  = require("./routes/public");
const privateRoutes = require("./routes/private");

app.use("/", publicRoutes);
app.use("/", auth(), privateRoutes);

// Error Handling

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
