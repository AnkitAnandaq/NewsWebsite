import { useState } from "react";
import Navbar from "./Components/Navbar";
import NewsBlocks from "./Components/NewsBlocks";
// import NewsPage from "./Components/NewsPage";

const App = () => {
 const[category , setcategory]= useState("general")
  return (
    <div>
      <Navbar setcategory = {setcategory}/>
      <NewsBlocks category ={category} />
      {/* <NewsPage /> */}
    </div>
  );
};

export default App;
