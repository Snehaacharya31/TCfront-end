
import express from 'express';
const router = express.Router();
router.post('/', (req, res) => {
  res.json({ message: 'Feedback received!' });
});

export default router;