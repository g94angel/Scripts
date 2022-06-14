const Reader = require('./db.js')

const entriesController = {};

entriesController.createEntry = (req, res, next) => {
  // const { date, book, chapter, verse, notes } = req.body;
  const { date, passage, notes } = req.body;
  Reader.create({
    date: date,
    passage: passage,
    // book: book,
    // chapter: chapter,
    // verse: verse,
    notes: notes
  })
    .then(newEntry => {
      return next();
    })
    .catch(err => {
      return next({
        log: `entriesController.createEntry: ERROR: ${err}`,
        message: {
          err: 'Error occured in entriesController.createEntry. Check server logs for more details.'
        }
      });
    });
}

entriesController.getEntries = (req, res, next) => {
  Reader.find({}).exec()
    .then(entryData => {
      res.locals.entries = entryData;
      return next();
    })
    .catch(err => {
      return next({
        log: `entriesController.getEntries: ERROR: ${err}`,
        message: {
          err: 'Error occured in entriesController.getEntries. Check server logs for more details.'
        }
      });
    });
}

entriesController.getEntry = (req, res, next) => {
  const { date } = req.body;
  Reader.findOne({ date })
    .then(entryData => {
      res.locals.entry = entryData;
      return next();
    })
    .catch(err => {
      return next({
        log: `entriesController.getEntry: ERROR: ${err}`,
        message: {
          err: 'Error occured in entriesController.getEntry. Check server logs for more details.'
        }
      });
    });
}

entriesController.updateEntry = (req, res, next) => {
  // const { date, book, chapter, verse, notes } = req.body;
  const { date, passage, notes } = req.body;
  let update;

  if (!passage.length) {
    update = { notes: notes };
  }
  else if (!notes.length) {
    update = { passage: passage };
  }
  else {
    update = { passage: passage, notes: notes }
  }

  // if (!book.length && !chapter && !verse.length) {
  //   update = { notes: notes }
  // }
  // else if (!book.length && !verse.length && !notes.length) {
  //   update = { chapter: chapter }
  // }
  // else if (!book.length && !chapter && !notes.length) {
  //   update = { verse: verse }
  // }
  // else if (!chapter && !verse.length && !notes.length) {
  //   update = { book: book }
  // }
  // else if (!book.length && !chapter.length) {
  //   update = { verse: verse, notes: notes }
  // }
  // else if (!book.length && !verse.length) {
  //   update = { chapter: chapter, notes: notes }
  // }
  // else if (!book.length && !notes.length) {
  //   update = { chapter: chapter, verse: verse }
  // }
  // else if (!chapter && !verse.length) {
  //   update = { book: book, notes: notes }
  // }
  // else if (!chapter && !notes.length) {
  //   update = { book: book, verse: verse }
  // }
  // else if (!notes.length && !verse.length) {
  //   update = { book: book, chapter: chapter }
  // }
  // else if (!book.length) {
  //   update = { chapter: chapter, notes: notes, verse: verse }
  // }
  // else if (!chapter) {
  //   update = { book: book, notes: notes, verse: verse }
  // }
  // else if (!notes.length) {
  //   update = { book: book, chapter: chapter, verse: verse }
  // }
  // else if (!verse.length) {
  //   update = { book: book, chapter: chapter, notes: notes }
  // }
  // else {
  //   update = { book: book, chapter: chapter, verse: verse, notes: notes }
  // }

  Reader.findOneAndUpdate({ date: date }, update, { new: true })
    .then(entry => {
      res.locals.entry = entry;
      return next();
    })
    .catch(err => {
      return next({
        log: `entriesController.updateEntry: ERROR: ${err}`,
        message: {
          err: 'Error occured in entriesController.updateEntry. Check server logs for more details.'
        }
      });
    });
}

entriesController.deleteEntry = (req, res, next) => {
  const { date } = req.body;
  Reader.findOneAndDelete({ date: date })
    .then(entry => {
      res.locals.deletedEntry = entry;
      return next();
    })
    .catch(err => {
      return next({
        log: `entriesController.deleteEntry: ERROR: ${err}`,
        message: {
          err: 'Error occured in entriesController.deleteEntry. Check server logs for more details.'
        }
      });
    });
}



// "start": "webpack-dev-server node server/index.js",

module.exports = entriesController;