import mongoose from "mongoose";

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connected successfully!!");
    } catch (error) {
        console.error(error);
    }
}

export default connectToDB;