if (!message) {
  return res.status(400).json({
    error: "Message is required"
  });
}

const response = await fetch(
  "https://api.x.ai/v1/chat/completions",
  {
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
          content:
            "You are Grok Bot, an AI agent that analyzes information, reasons about tasks, and returns clear actionable results."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  }
);

const data = await response.json();

if (!response.ok) {
  return res.status(response.status).json(data);
}

res.json({
  reply: data.choices?.[0]?.message?.content || "No response"
});
