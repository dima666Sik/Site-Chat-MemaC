const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const multer = require("multer");
const path = require("path")
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }, () => {
        console.log("Connected to MongoDB");
    }
);

app.use("/images", cors(), express.static(path.join(__dirname,"public/images")))

// to recognize the incoming Request Object as a JSON Object
app.use(express.json());
//Helmet helps you secure your Express apps by setting various HTTP headers. 
app.use(helmet());
// HTTP request logger middleware for node.js
app.use(morgan("common"));

//upload file**** AWS in the future, now in our api
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded succesfully");
    } catch (e) {
        console.log(e);
    }
})
//********

app.use("/api/users", cors(), userRouter);
app.use("/api/auth", cors(), authRouter);
app.use("/api/posts", cors(), postRouter);
app.use("/api/conversations",cors(), conversationRoute);
app.use("/api/messages", cors(), messageRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
})