const fs = require('fs');
const chalk = require('chalk');

const getNotes = function getNotes() {
    return 'Your notes...'
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note)=> note.title === title)
    if(note){
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes'));
    notes.forEach(note => {
        console.log(note.title);
    });

}

const removeNote = (title) => {
    const notes = loadNotes();
    
    const noteToKeep = notes.filter((note) => note.title !== title);

    if(notes.length > noteToKeep.length){
        console.log(chalk.bgGreen('Note removed'));
    }else {
        console.log(chalk.bgRed('No note found'));
    }
    saveNotes(noteToKeep);

}

const addNote =  (title, body) =>{
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title)
    debugger
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log('New note added!');
    }else{
        console.log('Note title taken!');
    }


}
const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);

}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return []
    }
}

module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote,
}