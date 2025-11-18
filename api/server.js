const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/product_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
  title: String,
  mobile: String,
  password: String,
  image: String,
});
const User = mongoose.model('User', userSchema);

const homeSchema = new mongoose.Schema({
  name: String,            
  title: String,          
  social: [
    {
      platform: String,      
      url: String
    }
  ],
  image: String             
});

const Home = mongoose.model('Home', homeSchema);

app.get('/api/home', async (req, res) => {
  try {
    const items = await Home.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/home', upload.single('image'), async (req, res) => {
  try {
    const { name, title, social } = req.body;
    const image = req.file ? req.file.filename : null;

    const item = await Home.create({
      name,
      title,
      social: JSON.parse(social),
      image
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/home/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, title, social } = req.body;
    const updateData = { name, title, social: JSON.parse(social) };
    if (req.file) updateData.image = req.file.filename;

    const updatedItem = await Home.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/api/home/:id', async (req, res) => {
  try {
    const item = await Home.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: String,
  image: String
});
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

const skillsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String
});
const Skills = mongoose.model('Skills', skillsSchema);


const servicesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: String,
  image: String
});
const Services = mongoose.model('Services', servicesSchema);



app.get('/api/portfolio', async (req, res) => {
  try {
    const items = await Portfolio.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/portfolio', upload.single('image'), async (req, res) => {
  try {
    const { title, link } = req.body;
    const image = req.file ? req.file.filename : null;
    const item = await Portfolio.create({ title, link, image });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/portfolio/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, link } = req.body;
    const updateData = { title, link };
    if (req.file) updateData.image = req.file.filename;
    const updatedItem = await Portfolio.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/portfolio/:id', async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/skills', async (req, res) => {
  try {
    const items = await Skills.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/skills', upload.single('image'), async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? req.file.filename : null;
    const item = await Skills.create({ title, image });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/skills/:id', upload.single('image'), async (req, res) => {
  try {
    const { title } = req.body;
    const updateData = { title };
    if (req.file) updateData.image = req.file.filename;
    const updatedItem = await Skills.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    const item = await Skills.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/services', async (req, res) => {
  try {
    const items = await Services.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/services', upload.single('image'), async (req, res) => {
  try {
    const { title, name } = req.body;
    const image = req.file ? req.file.filename : null;

    const service = await Services.create({ title, name, image });
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.put('/api/services/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, name } = req.body;
    const updateData = { title, name };
    if (req.file) updateData.image = req.file.filename;
    const updatedItem = await Services.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const item = await Services.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
