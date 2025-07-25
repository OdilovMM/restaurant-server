const http = require("http");
const express = require("express");
const app = express();
const router = require("./router");
const router_bssr = require("./router_bssr");
const cors = require("cors");
const cookieParser = require("cookie-parser");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session); 

const store =  new MongoDBStore({
    uri: process.env.MONGO_URL_HOME,
    collection: "sessions"
});



app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: true
    
})
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: 
        {maxAge: 1000 * 60 * 30, //for 30minutes 
    },
    store: store,
    resave: true,
    saveUninitialized: true,
 } )
 );
 app.use(function(req, res, next){
    res.locals.member = req.session.member;
    next(); 
 });

 
app.set("views", "views");
app.set("view engine", "ejs");  
 
   
// 4 Routing code
app.use("/resto", router_bssr);
app.use("/", router);

const server = http.createServer(app);
/** Socket.io backend server */
const io = require("socket.io")(server, {
    serveClient: false,
    origins: "*:*",
    transport: ["websocket", "xhr-polling"],
  });
  
  let online_users = 0;
  io.on("connection", function (socket) {
    online_users++;
    socket.emit("greetMsg", { text: "Welcome" });
    io.emit("infoMsg", { total: online_users });
  
    socket.on("disconnect", function () {
      online_users--;
      socket.broadcast.emit("infoMsg", { total: online_users });
    });
  
    socket.on("createMsg", function (data) {
      io.emit("newMsg", data);
    });
  
  });
  
module.exports = server;        