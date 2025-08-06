import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDbURL = process.env.MONGODB_URL as string

export default (async () => {
    try {
        await mongoose.connect(MongoDbURL);
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
})();