const http = require('http');

const setSocketRoute = (app)=> {
  const server = http.createServer(app);
  const io = require('socket.io')(server, {cors: {origin: '*',}});

  io.on('connection', (socket) => {
    socket.on("days load", () => {
      http.get('http://localhost:8080/days/days-with-available-slot?id=1', res => {
        res.setEncoding('utf8');
        res.on('data', (data)=> {
          io.emit("days load response", data);
        });
      }).on('error', err => {
        console.log('Error: ', err.message);
      });
    });

    // socket.on("interviewers load", () => {
    //   http.get('http://localhost:8080/appointments/available-interviewers?id=1', res => {
    //     res.setEncoding('utf8');
    //     res.on('data', (data)=> {
    //       io.emit("interviewers load response", data);
    //     });
    //   }).on('error', err => {
    //     console.log('Error: ', err.message);
    //   });
    // });
  });

  return server;
}

module.exports = { setSocketRoute };
