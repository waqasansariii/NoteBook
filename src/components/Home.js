import React from 'react';
import Notes from './Notes';
// import AddNote from './addNote';
// import showAlert from './App';
// 


export const Home = (props) => {
  const showAlert = props
  
  return (
  <>
   <Notes showAlert={showAlert}/>
   </>
  );
};

export default Home;  // ✅ FIXED - Proper Export
