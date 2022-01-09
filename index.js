const express = require("express");
const morgan = require("morgan");
const ejs = require('ejs');

//app es nuestro servidor
const app = express();
//setting
app.set("appName", "pyvan23");
// motor de plantillas es muy popular en express por eso no se importa
app.set("view engine", "ejs");
//midlewares manejador de request,sirven para procesar datos antes de que lleguen a la ruta, por ejemplo autenticador de usuario
//para que prcesen antes de que lleguen a las rutas
//importamos  el midleware morgan,los midlewars usan app.use
app.use(morgan("dev"));

//para que el servidor entienda los formatos json
app.use(express.json());

/*app.all("/user", (req, res, next) => {
  console.log("por aqui paso");
  next();
});*/

//routes
app.get("/", (req, res) => {
    const data = {name:"jose",name:"pedro"}
  res.render("index.ejs",{people : data});
});

app.get("/user", (req, res) => {
  res.json({ nombre: "jose", edad: "22" });
});
//podemos crer rutas dinamicas con : y el nombre de una variable id en este caso
app.post("/user/:id", (req, res) => {
  //req.body vemos lo que nos manda el cliente que quiere guardar en el servidor datos json
  console.log(req.body);
  console.log(req.params);
  res.send("Post request recived");
});
app.put("/user/:id", (req, res) => {
  console.log(req.body);
  res.send(`the update ${req.params.id} succes`);
});
app.delete("/user/:userId", (req, res) => {
  res.send(`user ${req.params.userId} deleted`);
});

app.use(express.static("public"));
//app escucha lo que sucede en el puerto 3000
app.listen(3000, () => {
  console.log(app.get("appName"));
  console.log("estamos en el puerto 3000");
});
