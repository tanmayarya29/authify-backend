const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const rolesRouter = require("./routes/rolesRoute");
const config = require("./config/config");
const { client } = require("./config/redis");
const cors = require("cors");

const app = express();

// const corsOptions = {
//   origin: 'http://yourfrontenddomain.com', // Replace with your frontend's domain
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Allow cookies, authentication headers, etc.
// };

// redis
client.on("error", (err) => {
  console.log("Redis Client Error: ", err);
});

client
  .connect()
  .then((msg) => console.log("Redis connected" || msg))
  .catch((err) => console.log(err));
//

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/roles", rolesRouter);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app
      .listen(config.PORT, () => {
        console.log(`Server is listening on port ${config.PORT}`);
      })
      .on("error", (err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
