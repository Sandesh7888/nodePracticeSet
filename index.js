
});

// Create todo
app.post('/create', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).send('Title is required');
    }

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
