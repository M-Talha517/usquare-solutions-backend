var fs = require("fs");
var util = require("util");
var log_file = fs.createWriteStream(__dirname + "/debug.log", { flags: "w" });
var log_stdout = process.stdout;
var log_stderr = process.stderr;

console.log = function (d) {
  //
  log_file.write(util.format(d) + "\n");
  log_stdout.write(util.format(d) + "\n");
  log_stderr.write(util.format(d) + "\n");
};

// var access = fs.createWriteStream(__dirname + "/stdout.log", { flags: "w" });
// process.stdout.write = process.stderr.write = access.write.bind(access);

process.on("uncaughtException", function (err) {
  console.error(err && err.stack ? err.stack : err);
});

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var debug = require("debug")("project:server");
var http = require("http");
const mongoose = require("mongoose");
global.__basedir = __dirname;

// routes
var routeShared = require("./app_server/routes/route.shared.js");
var routeUser = require("./app_server/routes/route.user.js");
var routeContact = require("./app_server/routes/route.contact.js");
var routePortfolio = require("./app_server/routes/route.portfolio.js");
var routeProduct = require("./app_server/routes/route.product.js");
var routeBlog = require("./app_server/routes/route.blog.js");
var routeCategory = require("./app_server/routes/route.category.js");
var routeTechnology = require("./app_server/routes/route.technology.js");
var routeNewsletter = require("./app_server/routes/route.newsletter.js");
var routeCareer = require("./app_server/routes/route.career.js");
var routeTeamMember = require("./app_server/routes/route.team.js");
var routeTestimonial = require("./app_server/routes/route.testimonial.js");

var cors = require("cors");

var app = express();
app.use(cors());

// Set up mongoose connection
let dev_db_url =
  "mongodb+srv://usquare:square8580@usquare.h61cw.mongodb.net/USquare-Solutions?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected…"))
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

// Api request limit increase to 50mb for base64 string (image upload)
app.use(express.json({ limit: "250mb", extended: true }));
app.use(express.urlencoded({ limit: "250mb", extended: true }));

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// routes call
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to USquare Solutions WebApp Backend",
  });
});

app.use("/shared", routeShared);
app.use("/user", routeUser);
app.use("/portfolio", routePortfolio);
app.use("/product", routeProduct);
app.use("/contact", routeContact);
app.use("/blog", routeBlog);
app.use("/category", routeCategory);
app.use("/technology", routeTechnology);
app.use("/newsletter", routeNewsletter);
app.use("/career", routeCareer);
app.use("/team-member", routeTeamMember);
app.use("/testimonial", routeTestimonial);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3300");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
