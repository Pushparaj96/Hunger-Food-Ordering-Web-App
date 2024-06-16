import mongoose from "mongoose";


export const connectDB= async ()=>{
    await mongoose.connect('mongoose connection string').then(()=>console.log("DB Connected"));
    // enter mongoose connection string to test backend
}
