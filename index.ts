import { connect } from "mongoose";
import { app } from "./src/app";

const port = process.env.PORT || 4000;
const dbConnectionUrl = process.env.DB_CONNECTION_URL || "mongodb://127.0.0.1:27017/car-managment"

connect(dbConnectionUrl)
  .then(() => {
    app.listen(port, () => {
      console.log("application starts with port ", port);
    });
  })
  .catch(() => console.log("unable to connect to the db"));
