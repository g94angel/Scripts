// need to get verse object from a random entry in the db and then make an api req
  // document.addEventListener('DOMContentLoaded', () => {
  //   fetch(`https://bible-api.com/${verseRefs[randomNum]}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       // console.log(data.text);
  //       const subheading = document.querySelector('h3')
  //       subheading.innerText = data.text;
  //     })
  //     .catch(err => console.log(err))
  // })

const verseRefs = ['rom9:20', 'rom10:9', 'rom10:10', '2cor5:14', 'rom 14:8', 'rom 10:4', 'matt 11:28', 'john 6:37', 'matt 6:33', 'psalm 119:105', 'col 3:2', 'eph 4:32', 'colossians 3:23', '2 tim 2:4', 'john 1:4', 'rev 22:12', 'luke 6:31', 'phil 4:4', 'luke 17:32'];
const randomNum = Math.floor(Math.random() * (verseRefs.length));

document.addEventListener('DOMContentLoaded', () => {
  fetch(`https://api.lsm.org/recver.php?String=${verseRefs[randomNum]}&Out=json`)
    .then(res => res.json())
    .then(data => {
      const ref = data.verses[0].ref;
      const text = data.verses[0].text.replace(/[\[\]/;]+/g, '')
      const subheading = document.querySelector('h3')
      subheading.innerText = `${text}`
    })
    .catch(err => console.log(err))
});

const create = document.querySelector('#create');

create.addEventListener('click', (event) => {
  // prevents page reload if submitting a form
  event.preventDefault();
  const date = document.querySelector('#date').value.trim();
  const passage = document.querySelector('#passage').value;
  // const book = document.querySelector('#book').value;
  // const chapter = document.querySelector('#chapter').value;
  // const verse = document.querySelector('#verse').value;
  const notes = document.querySelector('#notes').value;

  if (date && passage && notes) {
    fetch('/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: date,
        passage: passage,
        // book: book,
        // chapter: chapter,
        // verse: verse,
        notes: notes,
      })
    })
        // .then(res => {
        //   console.log('requesting');
        //   // res.json();
        // })
        // .then(data => {
        //   // console.log(data)

        //  })
        .catch(err => {
          console.log(err);
          //  alert('An error occurred while submitting your entry.')
        })
      create.innerText = 'Submitted';
      // const inputs = document.querySelectorAll('#date, #book, #chapter, #verse, #notes');
      // const inputs = document.querySelectorAll('#date, #passage, #notes');
      // inputs.forEach(input => input.value = '');
      setTimeout(() => {
        location.reload();
      }, 500);
    } else {
      alert('Please fill out every field.')
    }
  })

const review = document.querySelector('#read');

let clicked = false;
let myEntries;
let entryDiv;

  // trying to find a way to remove log upon clicking again
  // review.addEventListener('click', () => {
  //   if (clicked) {
  //     myEntries.removeChild(entryDiv);
  //   }
  // })

review.addEventListener('click', () => {
  const date = document.querySelector('#date').value.trim();
  // review.innerText = 'See below';
  if (!clicked && !date.length) {
    clicked = true;
    fetch('/entry')
      .then(res => {
        // console.log('fetching');
        return res.json();
      })
      .then(data => {
        if (!data.length) {
          const header = document.createElement('h2');
          header.innerText = 'No entries recorded';
          myEntries = document.querySelector('#entries');
          myEntries.append(header);
          return setTimeout(() => {
            location.reload();
          }, 2000);
        }
        const header = document.createElement('h2');
        header.innerText = 'Previous Entries';
        myEntries = document.querySelector('#entries');
        myEntries.append(header);


          for (let i = data.length - 1; i >= 0; i--) {
            let entry = data[i];
            // .slice(0, 10);
            const date = entry.date;
            const passage = entry.passage;
            // const book = entry.book;
            // const chapter = entry.chapter;
            // const verse = entry.verse;
            const notes = entry.notes;

            entryDiv = document.createElement('div');
            entryDiv.setAttribute('id', '#entryDiv');

            const line = document.createElement('hr');
            const entryInfo = document.createElement('p');
            const notesInfo = document.createElement('p');

            // entryInfo.innerText = `${date} | ${book} ${chapter} ${verse}`;
            entryInfo.innerText = `${date} | ${passage}`;
            notesInfo.innerText = `${notes} `;
            // console.log(entryInfo);
            // console.log(notesInfo);

            myEntries.append(entryDiv);
            entryDiv.append(entryInfo, line, notesInfo, line);
            // setTimeout(() => {
            //   location.reload();
            // }, 5000);
          }
        })
        .catch(err => {
          console.log(err);
          //  alert('An error occurred while fetching your entry.')
        })
    } else if (!clicked && date) {
      clicked = true;
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: date,
        })
      })
        .then(res => {
          // console.log('fetching');
          return res.json();
        })
        .then(entry => {
          if (!entry) {
            const header = document.createElement('h2');
            header.innerText = 'No entry recorded';
            myEntries = document.querySelector('#entries');
            myEntries.append(header);
            return setTimeout(() => {
              location.reload();
            }, 2000);
          }
          const header = document.createElement('h2');
          header.innerText = 'Selected Entry';
          myEntries = document.querySelector('#entries');
          myEntries.append(header);

          const date = entry.date;
          const passage = entry.passage;
          // const book = entry.book;
          // const chapter = entry.chapter;
          // const verse = entry.verse;
          const notes = entry.notes;

          entryDiv = document.createElement('div');
          entryDiv.setAttribute('id', '#entryDiv');

          const line = document.createElement('hr');
          const entryInfo = document.createElement('p');
          const notesInfo = document.createElement('p');

          entryInfo.innerText = `${date} | ${passage}`;
          notesInfo.innerText = `${notes} `;
          // console.log(entryInfo);
          // console.log(notesInfo);

          myEntries.append(entryDiv);
          entryDiv.append(entryInfo, line, notesInfo, line);
          // setTimeout(() => {
          //   location.reload();
          // }, 5000);
        })
        .catch(err => {
          console.log(err);
          //  alert('An error occurred while fetching your entry.')
        })
    }

  })


const update = document.querySelector('#update');

update.addEventListener('click', (event) => {
  // prevents page reload is submitting a form
  event.preventDefault();
  const date = document.querySelector('#date').value.trim();
  const passage = document.querySelector('#passage').value;
  // const book = document.querySelector('#book').value;
  // const chapter = document.querySelector('#chapter').value;
  // const verse = document.querySelector('#verse').value;
  const notes = document.querySelector('#notes').value;

    if (date && passage || notes) {
      // console.log(`updates: `, book, chapter, notes)
      // console.log('updating')
      fetch('/entry', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: date,
          passage: passage,
          // book: book,
          // chapter: chapter,
          // verse: verse,
          notes: notes,
        })
      })
        .then(res => {
          // console.log('fetching');
          return res.json();
        })
        .then(entry => {
          if (!entry) {
            const header = document.createElement('h2');
            header.innerText = 'No entry recorded';
            const myEntries = document.querySelector('#entries');
            myEntries.append(header);
            return setTimeout(() => {
              location.reload();
            }, 2000);
          }
        })
        .catch(err => {
          console.log(err);
          //  alert('An error occurred while submitting your entry.')
        })
      update.innerText = 'Updated';
      // const inputs = document.querySelectorAll('#date, #book, #chapter, #verse, #notes');
      const inputs = document.querySelectorAll('#date, #passage, #notes');
      inputs.forEach(input => input.value = '');
      setTimeout(() => {
        location.reload();
      }, 500);
    }
    else {
      alert('Please select the date and the field(s) of the entry you wish to update.')
    }
  })

const remove = document.querySelector('#delete');
remove.addEventListener('click', () => {
  const date = document.querySelector('#date').value.trim();
  if (date) {
    // console.log('this is the date: ', date);
    fetch('/entry', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: date,
        // book: book,
        // chapter: chapter
      })
    })
      .then(res => {
        // console.log('fetching');
        return res.json();
      })
      .then(entry => {
        if (!entry) {
          const header = document.createElement('h2');
          header.innerText = 'No entry recorded';
          const myEntries = document.querySelector('#entries');
          myEntries.append(header);
          return setTimeout(() => {
            location.reload();
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err);
        //  alert('An error occurred while submitting your entry.')
      })
    remove.innerText = 'Deleted';
    document.querySelector('#date').value = '';
    setTimeout(() => {
      location.reload();
    }, 500);
  } else {
    alert('Please enter the date of the entry you wish to delete.')
  }
})