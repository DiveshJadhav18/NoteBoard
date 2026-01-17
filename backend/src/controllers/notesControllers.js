import Note from '../models/Notes.js'

export async function getAllNotes (req,res){
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller");
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getNotesbyId(req,res){
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getAllNotes controller");
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function createNotes(req,res){
    try {
        const {title,content} = req.body;
        const newNote = new Note({title, content});
        const savedNotes = await newNote.save();
        res.status(200).json(savedNotes);
    } catch (error) {
        console.error("Error in createNotes controller");
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function updateNotes(req,res){
    try {
        const {title,content} = req.body;
        const updatedNotes = await Note.findByIdAndUpdate(req.params.id, {title,content},{new: true});
        if (!updatedNotes) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(updatedNotes);
    } catch (error) {
        console.error("Error in updateNotes controller");
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function deleteNotes(req,res){
    try {
        const deletedNotes = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNotes) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(deletedNotes);
    } catch (error) {
        console.error("Error in updateNotes controller");
        res.status(500).json({message: "Internal Server Error"});
    }
}