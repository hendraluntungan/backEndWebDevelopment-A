const express = require("express");
const users = require("./users.js");
const morgan = require("morgan");
const moment = require("moment");
const cors = require('cors');
const app = express();
const port = 3000;


const log = (req, res, next) => {
  console.log(`${moment().format("LLLL")} = ${req.ip} = ${req.originalUrl}`);
  next();
};
app.use(log);
app.use(morgan("combined"));

//middleware
app.use(cors({ // Handling CORS
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


//routes
app.get('/', (req, res) => res.write("this is home page"))

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:name", (req, res) => {
  const result = users.filter((value) => {
    return (
      value.name.toLocaleLowerCase() === req.params.name.toLocaleLowerCase()
    );
  });
  if (result == "") {
    res.json({
      message: "Data user tidak ditemukan",
    });
  } else {
    res.json(result);
  }
});

// POST /users
app.post("/users", (req, res) => {
    const name = req.body.name;
    if (!name) {
        res.status(400).json({
            status: "error",
            message: "Masukkan data yang akan diubah"
        });
    } else {
        const id = users.length + 1;
        const newUser = {
            id: id,
            name: name
        };
        users.push(newUser);
        res.json(newUser);
    }
});


//error handling
const errorHandling = (err, req, res, next) => {
  res.json({
    status: "Error",
    message: "Terjadi kesalahan pada server",
  });
};


const notFound = (req, res, next) => {
  res.json({
    status: "Error",
    message: "Resource tidak ditemukan",
  });
};

app.use(errorHandling);
app.use(notFound);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
