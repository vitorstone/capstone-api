const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const uuid = require('uuid');
const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 5000;
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("User connected: " + socket.id)
    socket.on("notification", (data) => {
        console.log(`notification received: ${data}`)
        object_data = JSON.parse(data)
        socket.broadcast.emit("startrecording", "200")
        socket.broadcast.emit("notification", object_data)
    })

    // setInterval(() => {
    //     let uid = uuid.v4()
    //     console.log(uid)
    //     let notification = {
    //         'id': uid,
    //         'content': 'message from sensor ' + uid,
    //         'device_name': 'Motion Sensor',
    //         'device_location': 'Front Yard'
    //     }
    //     socket.emit('notification', notification)
    //     console.log('emitted notification with id: ' + uid)
    // }, 6000);
});

io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});

httpServer.listen(port, () => {
    console.log('server is listening on port ' + port + ' ...')
});