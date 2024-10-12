import List from "../Models/list.model.js"

export const getList = async (req, res) => {
    try{
        const lists = await List.find().sort({ createdAt: -1})
        res.status(500).json(lists)
     } catch (err){
         console.log("Error in getLists: ", error.message)
         res.status(500).json({error: err.message})
     }
}

export const createList = async (req, res) => {
    try{
        const { title } = req.body;

        const existingList = await List.findOne({ title });
        if(existingList){
            return res.status(400).json({ error: "There is a list with that title" })
        }

        const newList = new List({
            title
        })

        await newList.save();
        res.status(201).json({ newList })
    } catch (err){
        res.status(500).json({ error: "Internal server error "})
        console.log(err)
    }
    
}