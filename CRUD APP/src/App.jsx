import Register from "./components/register"; 
import {Routes, Route} from "react-router-dom";
import Dashboard from "./components/dashbord";
import Update from "./components/update";


function App() {  
  return (
    <div >
      <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/update/:id" element={<Update/>}/>
      </Routes>
    </div>
  );
}

export default App;