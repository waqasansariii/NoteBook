
// import { useContext, useEffect } from 'react';
// import NoteContext from '../context/notes/NoteContext';
export const About = () => {


  return (
   <div>
     <h2 style={{"color":"green", "textAlign":"center", 'fontWeight':'bold', "fontSize":"4rem"}}>Welcome to the NoteBook</h2>
     <p style={{"color":"gray", "textAlign":"center", "fontSize":"1.5rem"}}>This is a simple note taking application using React and MongoDB.
        Where you can manage you daily life tasks.
     </p>
   </div>

  );
};

export default About;  // ✅ FIXED - Proper Export
