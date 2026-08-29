const express = require("express");
const app = express(); app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => { res.send("Grok Bot is running."); });
app.post("/chat", async (req, res) => { try { const { message } = req.body;
if (!message) {
  return res.status(400).json({
    error: "Message is required"
  });
}

const response = await fetch("https://api.x.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.XAI_API_KEY}`
  },
  body: JSON.stringify({
    model: process.env.XAI_MODEL || "grok-4-latest",
    messages: [
      {
        role: "system",
        content: "You are Grok Bot. Give clear and useful answers."
      },
      {
        role: "user",
        content: message
      }
    ]
  })
});

const data = await response.json();

if (!response.ok) {
  return res.status(response.status).json(data);
}

res.json({
  reply: data.choices?.[0]?.message?.content || "No response"
});
} catch (error) { console.error(error);
res.status(500).json({
  error: "Grok Bot failed",
  details: error.message
});
} });
app.listen(PORT, () => { console.log(Grok Bot running on port ${PORT}); });
