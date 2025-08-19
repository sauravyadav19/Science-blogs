const mongoose = require('mongoose');
const User = require('../models/userModel');
const Article = require('../models/articleModel');
const Comment = require('../models/commentModel');

const MONGO_URI = "mongodb://127.0.0.1:27017/testDatabase?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.6"

const usersData = [
  { username: 'alice', email: 'alice@example.com', password: 'pass123' },
  { username: 'bob', email: 'bob@example.com', password: 'pass123' },
  { username: 'charlie', email: 'charlie@example.com', password: 'pass123' },
  { username: 'diana', email: 'diana@example.com', password: 'pass123' },
  { username: 'edward', email: 'edward@example.com', password: 'pass123' }
];

const articlesData = [
  { title: 'Black Holes and Wormholes', body: 'Exploring the mysteries of space-time fabric...' },
  { title: 'Quantum Entanglement', body: 'The spooky action at a distance described by Einstein...' },
  { title: 'CRISPR Gene Editing', body: 'How gene editing is revolutionizing medicine...' },
  { title: 'Artificial Intelligence in Healthcare', body: 'AI’s potential to diagnose and predict illnesses...' },
  { title: 'Climate Change and Oceans', body: 'The rising sea levels and their long-term impacts...' },
  { title: 'Blockchain for Scientific Research', body: 'Ensuring data transparency and reproducibility...' },
  { title: 'Mars Colonization', body: 'Challenges of building a sustainable habitat on Mars...' },
  { title: 'Nanotechnology in Medicine', body: 'Microscopic machines curing diseases...' },
  { title: 'Fusion Energy', body: 'The dream of unlimited clean energy from the stars...' },
  { title: 'Evolution of Human Brain', body: 'How did our brain evolve to its current form?' }
];

const commentsData = [
  'Amazing article! Really insightful.',
  'I completely agree with this perspective.',
  'This raises so many new questions!',
  'Could you expand on the methods used?',
  'Brilliantly explained!',
  'I have some doubts regarding the conclusion.',
  'This connects well with what I studied last week.',
  'Can you recommend further reading?',
  'The author made a great point here.',
  'This is revolutionary research!'
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Clearing old data...');
    await User.deleteMany({});
    await Article.deleteMany({});
    await Comment.deleteMany({});

    console.log('Creating users...');
    const createdUsers = await User.insertMany(usersData);

    console.log('Creating articles...');
    const createdArticles = [];
    for (let article of articlesData) {
      // randomly assign author
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const newArticle = await Article.create({ ...article, author: randomUser._id });
      createdArticles.push(newArticle);
    }

    console.log('Creating comments...');
    for (let i = 0; i < 15; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomArticle = createdArticles[Math.floor(Math.random() * createdArticles.length)];
      const randomComment = commentsData[Math.floor(Math.random() * commentsData.length)];

      const newComment = await Comment.create({
        body: randomComment,
        author: randomUser._id,
        article: randomArticle._id
      });

      // push comment to article’s comments array
      randomArticle.comments.push(newComment._id);
      await randomArticle.save();
    }

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
}

seedDatabase();