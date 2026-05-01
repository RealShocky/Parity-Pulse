import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini analysis
  app.post('/api/gemini/insights', async (req, res) => {
    try {
      const { prompt, data, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is missing.');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const fullPrompt = `
        You are an expert sports data analyst. Generate insights based on the provided data.
        Context: ${context}
        User Request: ${prompt}
        Data: ${JSON.stringify(data).substring(0, 5000)} // Truncate if too long for safety
        
        Return a JSON structure matching this format:
        {
          "insights": [
            {
              "insight_title": "String",
              "plain_english_summary": "String",
              "data_points_used": ["String"],
              "caveat": "String",
              "confidence_level": "High | Medium | Low",
              "source_refs": ["String"]
            }
          ]
        }
        Ensure strict JSON format without markdown blocks.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      res.json(JSON.parse(response.text || '{"insights":[]}'));
    } catch (error) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: String(error) });
    }
  });

  // Data route to check and serve expected real data files
  app.get('/api/data/:filename', (req, res) => {
    const { filename } = req.params;
    const allowedFiles = [
      'olympic_roster_2024_real.csv',
      'paralympic_roster_2024_real.csv',
      'hometown_enrichment_real.csv',
      'paralympic_historical_results_real.csv',
      'la28_schedule_real.json'
    ];

    if (!allowedFiles.includes(filename)) {
      return res.status(403).json({ error: 'Unauthorized file access' });
    }

    const filePath = path.join(__dirname, 'data', filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Data file not found. Please upload real datasets to the /data directory.', code: 'FILE_MISSING' });
    }

    res.sendFile(filePath);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
