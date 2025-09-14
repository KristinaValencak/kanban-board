import { useState } from "react";
import "../styles/Sidebar.css";


export default function Sidebar() {
  const [number, setNumber] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const fetchInfo = async () => {
    const res = await fetch(`http://localhost:4000?action=info&number=${number}`);
    const data = await res.json();
    setResult(data);
  };

  const fetchReverse = async () => {
    const res = await fetch(`http://localhost:4000?action=reverse&text=${text}`);
    const data = await res.json();
    setResult(data);
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Kanban board</h2>

      <nav className="sidebar-menu">
        <div className="menu-item">
          <p className="menu-text">Number Properties</p>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter a number"
          />
          <button onClick={fetchInfo}>Info</button>
        </div>

        <div className="menu-item">
          <p className="menu-text">Reverse & Count Text</p>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
          />
          <button onClick={fetchReverse}>Reverse</button>
        </div>
      </nav>

      <div className="sidebar-result">
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </aside>
  );
}
