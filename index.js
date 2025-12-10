import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//test route
app.get("/", (req, res) => {
    res.send("⚙️ backend is working")
})

//connection test route
app.get("/api/test", (req, res) => {
    res.json({message: "Backend connected!!!!"});
});

//mongodb connection function
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("🔥 mongodb connected successfully!");
    }catch (error) {
        console.log("❌ mongodb connection error!!");
        //process.exit(1); //stop server if db fails
    }

}

//start server
const startServer = async() => {
    await connectDB();

    const port = process.env.PORT || 5000;
    app.listen(port, ()=> {
        console.log(`🚀 Server runnig on port ${port} `);
    })

}

startServer();