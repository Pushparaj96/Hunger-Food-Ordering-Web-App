import mongoose from "mongoose";


export const connectDB= async ()=>{
    await mongoose.connect('mongodb+srv://pushparaj:Hungerrr@atlascluster.jzwha7v.mongodb.net/Hungerrr').then(()=>console.log("DB Connected"));
}