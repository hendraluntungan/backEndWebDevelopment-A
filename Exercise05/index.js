const express = require("express");
const app = express();
const users = require("./users.js");
const port = 3000;
const morgan = require("morgan")
const moment = require("moment");


const log = (req, res, next) => {
  console.log(`${moment().format("LLLL")} = ${req.ip} = ${req.originalUrl}`);
  next();
};
app.use(log);
app.use(morgan("combined"));

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
