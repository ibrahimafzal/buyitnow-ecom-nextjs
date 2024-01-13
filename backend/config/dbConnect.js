import mongoose from "mongoose";

const dbConnect = () => {
    if(mongoose.connection.readyState >= 1) {
        return;
    }
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.mongo_url);
}

export default dbConnect;