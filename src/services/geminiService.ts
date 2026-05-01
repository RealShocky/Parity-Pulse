export const fetchGeminiInsights = async (prompt: string, context: string, payload: any) => {
  const reqBody = {
    prompt,
    context,
    data: payload
  };

  const response = await fetch('/api/gemini/insights', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  });

  if (!response.ok) {
    throw new Error('Failed to generate insights');
  }

  return response.json();
};
