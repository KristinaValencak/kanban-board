const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  const action = req.query.action;

  if (action === "info") {
    const number = parseInt(req.query.number);
    if (isNaN(number)) return res.json({ "error": "Invalid action" });

    return res.json({
      number,
      is_even: number % 2 === 0,
      is_prime: isPrimeNumber(number),
      square: number * number
    });
  }

  if (action === "reverse") {
    const text = req.query.text;
    if (!text) return res.json({ "error": "Invalid action" });

    return res.json({
      original: text,
      reversed: text.split("").reverse().join(""),
      length: text.length
    });
  }

  res.json({ "error": "Invalid action" });
});

function isPrimeNumber(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}


app.post("/api/tax", async (req, res) => {
  try {
    const { tax = "74562061" } = req.body;

    const response = await fetch("https://durs.dev.izstop.si/tax", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `tax=${tax}`
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data.message);
  } catch (err) {
    console.error("Error fetching tax data:", err.message);
    res.status(500).json({ error: "Failed to fetch tax data" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
