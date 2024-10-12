import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlenght: 1,
        trim: true,
    }
})

const List = mongoose.model("List", listSchema);

export default List;