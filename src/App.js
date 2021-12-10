import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import CoinPage from "./Routes/CoinPage";
import ErrorPage from "./Routes/ErrorPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/coins" element={<Home />}></Route>
          <Route path="/CoinPage/:id" element={<CoinPage />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
