require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./middlewares/not-found");
const authRoute = require("./routes/auth-route");
const todoRoute = require("./routes/todo-route");
const errorMiddleware = require("./middlewares/error-middleware");
const authenticate = require("./middlewares/authenticate");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Service
app.use("/auth", authRoute);
app.use("/todos", authenticate, todoRoute);

//  Not Found
app.use(notFound);

// Error
app.use(errorMiddleware);

let port = process.env.PORT || 8000;
app.listen(port, () => console.log(`This server is running on port: ${port}`));
