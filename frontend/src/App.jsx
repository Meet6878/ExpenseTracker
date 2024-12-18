
import Expense from "./components/Expense";
import {Routes,Route} from "react-router-dom";
// import Login from "./components/login/Login";


const App = () => {

    return (
       <>
       <Routes>
        <Route path="/" element={<Expense/>} />
        {/* <Route path="/login" element={<Login/>} /> */}
       </Routes>
       </>
    );
};

export default App;
