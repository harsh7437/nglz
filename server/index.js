import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define schema and model
const submissionSchema = new mongoose.Schema({
  firstValue: String,
  secondValue: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Submission = mongoose.model('Submission', submissionSchema);

// Route to save data
app.post('/submit', async (req, res) => {
  try {
    const { firstValue, secondValue } = req.body;
    const submission = new Submission({ firstValue, secondValue });
    await submission.save();
    res.status(200).json({ message: 'Submission saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error, will fix it soon.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
