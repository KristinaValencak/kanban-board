import { useState, useEffect } from "react";
import "../styles/Header.css";

export default function Header({ onAddCard }) {
  const [taxData, setTaxData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/tax", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tax: "74562061" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTaxData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Napaka pri pridobivanju podatkov:", err);
        setLoading(false);
      });
  }, []);

  return (
   <header className="header">
  <div className="header-top">
    <div className="header-left">
      <h2>Manage your tasks efficiently 🚀</h2>
      <p>Stay organized and boost productivity with a simple Kanban board.</p>

      <div className="legend">
        <span className="dot high"></span> High
        <span className="dot medium"></span> Medium
        <span className="dot low"></span> Low
      </div>
    </div>

    <div className="widget">
      <h3>Podatki podjetja</h3>
      {loading ? (
        <p>Nalaganje...</p>
      ) : taxData ? (
        <ul className="company-info">
          <li><strong>Naziv:</strong> {taxData.c_name}</li>
          <li><strong>Davčna št.:</strong> {taxData.c_tax_nr}</li>
          <li><strong>Matična št.:</strong> {taxData.c_main_nr}</li>
          <li><strong>Naslov:</strong> {taxData.c_address}</li>
          <li><strong>Pošta:</strong> {taxData.c_post}</li>
          <li><strong>DDV zavezanec:</strong> {taxData.tax_payer === "1" ? "DA" : "NE"}</li>
        </ul>
      ) : (
        <p>Podatkov ni bilo mogoče naložiti.</p>
      )}
    </div>
  </div>
</header>
  );
}
