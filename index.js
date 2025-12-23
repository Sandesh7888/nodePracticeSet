const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const FILES_DIR = path.join(__dirname, 'files');

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* View Engine */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Routes */

// Home – list todos
app.get('/', (req, res) => {
    fs.readdir(FILES_DIR, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to read files');
        }
        res.render('index', { files });
    });
});

// Create todo
app.post('/create', (req, res) => {
    const { title, description } = req.body;


    const fileName = `${title.split(' ').join('_')}.txt`;
    const content = `Title: ${title}\n\nDescription: ${description || ''}`;

    fs.writeFile(path.join(FILES_DIR, fileName), content, err => {
        if (err) {
            return res.status(500).send('Failed to create todo');
        }
        res.redirect('/');
    });
});

/* Server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
