import React from "react";

const NoteCard = ({ name, data }) => {
    return (
        <div className='bg-light-green br3 pa3 ma4 bw2 dib shadow-5'>
            <div>
                <h2 className="tc background-white">{name}</h2>
                <p>{data}</p>
            </div>
        </div>
    );
}


export default NoteCard;