export async function callGeminiAPI(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    return `Error calling Gemini API: ${err.message}`;
  }
}
