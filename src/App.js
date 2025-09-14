import Board from "./components/Board";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/App.css";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main">
        <Header />
        <Board />
      </div>
    </div>
  );
}

export default App;

