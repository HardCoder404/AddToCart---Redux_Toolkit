import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

function App() {
  return (
   <Routes>
      <Route path="/" element={<Navbar/>}/>
      <Route path="/cart" element={<Cart/>}/>
   </Routes>
  );
}


export default App;


