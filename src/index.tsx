import express from 'express';
import bodyParser from 'body-parser'; // For parsing JSON bodies
import cors from 'cors'

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json()); // Middleware for JSON

// Endpoint 1: Generate procedural world (buildings as cubes)
app.get('/world', (req: express.Request, res: express.Response) => {
  const buildings: Array<{ position: [number, number, number]; size: [number, number, number] }> = [];
  for (let i = 0; i < 10; i++) {
    buildings.push({
      position: [Math.random() * 100 - 50, 0, i * 20], // Random x, fixed y=0, spaced z
      size: [10 + Math.random() * 20, 20 + Math.random() * 40, 10] // Width, height, depth
    });
  }
  res.json({ buildings });
});

// Endpoint 2: Simulate point cloud (basic stub; expand with raycast logic later)
app.post('/scan', (req: express.Request, res: express.Response) => {
  const { carPosition } = req.body; // Expect { carPosition: [x, y, z] }
  if (!carPosition || !Array.isArray(carPosition) || carPosition.length !== 3) {
    return res.status(400).json({ error: 'Invalid car position' });
  }
  
  // Dummy point cloud: Generate 100 random points around car
  const points: Array<[number, number, number]> = [];
  for (let i = 0; i < 100; i++) {
    points.push([
      carPosition[0] + Math.random() * 20 - 10,
      carPosition[1] + Math.random() * 10,
      carPosition[2] + Math.random() * 20 - 10
    ]);
  }
  res.json({ points });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export { app };