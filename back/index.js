const express = require("express");
const db = require("./models");
const cors = require("cors");

const app = express();
const port = 1234;

app.use(express.json());
app.use(cors());

// Routers
const usersRouter = require("./routes/users"); 
app.use("/auth", usersRouter);

const displaysRouter = require("./routes/displays"); 
app.use("/displays", displaysRouter);
//

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("Le serveur est lancé sur le port " + port);
    });
});

