var express = require("express");
var app = express();
app.use(express.static("khang"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000);

io.on("connection", function(socket){
	console.log("user connected: " + socket.id);
	var userid = socket.id;
	socket.on("disconnect", function(){
		console.log("user disconnected: " + socket.id);
	});
	socket.emit("uid", userid);


	socket.on("mess", function(data){
		io.sockets.emit("s_mess", data);
	});
});

app.get("/", function(rep,res){
	res.render("trangchu");
});
