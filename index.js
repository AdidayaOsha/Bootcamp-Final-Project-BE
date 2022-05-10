const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./lib/sequelize");
const {
  adminRouter,
  adminProductRouter,
  productRouter,
  cartRouter,
  userRouter,
  catalogRouter,
  transactionRouter,
} = require("./routers");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 9990;

(async () => {
  try {
    await sequelize.authenticate();
    // buat sync database kalau ada perubahan sekecil apapun:
    await sequelize.sync({ alter: true });
    console.log("Sequelize Connection established");
  } catch (err) {
    console.log(err);
  }
})();

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to EMMERCE PROJECT</h1>");
});

app.use("/admins", adminRouter);
app.use("/admin", adminProductRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/catalog", catalogRouter);
app.use("/images", express.static("./images"));
app.use("/users", userRouter);
app.use("/transactions", transactionRouter);

app.listen(PORT, () => console.log("SERVER RUNNING IN PORT:", PORT));
