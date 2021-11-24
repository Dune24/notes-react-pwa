import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({notes}) => {
    return (
        <div>
            {
                notes.map((note, i) => {
                return (
                    <NoteCard
                        key={i}
                        name={note.name}
                        data={note.data}
                    />
                );
                })
            }
        </div>
    );
}

export default NoteList;