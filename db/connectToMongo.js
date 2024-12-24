import mongoose from "mongoose";

const connectToMongo = async() => {
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to mongoDB server`, conn.connection.host); 
    } catch (error) {
        console.log(`Error connecting to the database`, error);
    }
} 

export default connectToMongo;