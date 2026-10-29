
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Three predefined milestone records
const milestones = [
  { id: 1, name: 'Project Planning', status: 'Completed' },
  { id: 2, name: 'Angular Development', status: 'In Progress' },
  { id: 3, name: 'Backend Integration', status: 'Not Started' }
];

// HTTP GET — Retrieve milestones
app.get('/milestones', (req, res) => {
  console.log('GET /milestones received');
  res.json(milestones);
});

// HTTP POST — Receive a new milestone
app.post('/milestones', (req, res) => {
  const { name, status } = req.body;

  console.log('POST /milestones received');
  console.log('Milestone Name:', name);
  console.log('Status:', status);

  if (!name || !status) {
    return res.status(400).json({
      message: 'Milestone name and status are required'
    });
  }

  res.status(200).json({
    message: 'Milestone submitted successfully',
    milestone: { name, status }
  });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
