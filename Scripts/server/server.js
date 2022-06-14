const path = require('path');
const express = require('express');
const app = express();
const entriesController = require('../database/controller')

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const entryRouter = express.Router();
app.use('/entry', entryRouter);

// root page
// http://localhost:3000
app.get('/', (req, res) => {
  // make request to Bible API and display verse instead of hardcoding it
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// get an entry from the db
// http://localhost:3000
app.post('/', entriesController.getEntry, (req, res) => {
  res.status(200).json(res.locals.entry);
})

// Create an entry in the db
// http://localhost:3000/entry
entryRouter.post('/', entriesController.createEntry, (req, res) => {
  res.status(200);
});

// Read all entries from the db
// http://localhost:3000/entry
entryRouter.get('/', entriesController.getEntries, (req, res) => {
  res.status(200).json(res.locals.entries);
});

// Update an entry in the db
// http://localhost:3000/entry
entryRouter.put('/', entriesController.updateEntry, (req, res) => {
  res.status(200).json(res.locals.entry);
});

// Delete an entry from the db
// http://localhost:3000/entry
entryRouter.delete('/', entriesController.deleteEntry, (req, res) => {
  return res.status(200).json(res.locals.deletedEntry);
});

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});

// module.exports = app;

