const mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);

const MONGO_URI = 'mongodb+srv://g94angel:soloproj1@cluster0.jmmay.mongodb.net/readers?retryWrites=true&w=majority';

// need to paste the following into the terminal to connect to DB
// mongosh "mongodb+srv://cluster0.jmmay.mongodb.net/myFirstDatabase" --apiVersion 1 --username g94angel

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'readers'
}

mongoose.connect(MONGO_URI, options)
// .then(() => console.log('Connected to MongoDB.'))
// .catch(err => console.log(err));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB.')
})


// READER SCHEMA
const readerSchema = new mongoose.Schema({
  date: { type: String, required: true },
  passage: mongoose.Mixed,
  // book: { type: String },
  // chapter: { type: Number },
  // verse: { type: String, default: '' },
  notes: { type: String }
});


// READER MODEL
const Reader = mongoose.model('readers', readerSchema);

module.exports = Reader;

