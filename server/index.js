const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./config/dbConnect");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const adminRouter = require("./Routes/adminRoutes/adminRoute");
const masterRouter = require("./Routes/masterRoute/masterRoute");
const usersRouter = require("./Routes/userRoute/userRoute");
const { cloudinaryConnect } = require("./config/cloudinary");
const projectRouter = require("./Routes/adminRoutes/projectRoute");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
cloudinaryConnect();
db.connect();
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/master", masterRouter);
app.use("/api/v1/user", usersRouter);

app.listen(PORT, (req, res) => {
  console.log(`App is listening at ${PORT}`);
});
app.get("/", (req, res) => {
  console.log("App is running at your Website");
});
