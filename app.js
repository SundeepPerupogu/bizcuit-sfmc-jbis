const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));  // To serve index.html, customactivity.js, etc.
app.post('/execute', (req, res) => {
    const inArguments = req.body.inArguments[0];
    const futureUtcTime = inArguments.futureUtcTime;
    const userTimeZone = inArguments.userTimeZone;

    if (!futureUtcTime || !userTimeZone) {
        return res.status(400).send({ error: 'Invalid input' });
    }

    // Assume that futureUtcTime and userTimeZone are valid and calculate the time difference
    const currentUtcTime = new Date().toISOString().split('T')[1].split('.')[0]; // Current UTC time in HH:MM:SS
    const futureTime = new Date(`1970-01-01T${futureUtcTime}Z`);
    const currentTime = new Date(`1970-01-01T${currentUtcTime}Z`);

    const timeDifference = (futureTime - currentTime) / 1000; // Difference in seconds

    res.json({ timeDifference: timeDifference.toString() });
});

app.post('/publish', (req, res) => {
    res.sendStatus(200);
});

app.post('/validate', (req, res) => {
    const inArguments = req.body.arguments.execute.inArguments;
    if (!inArguments || inArguments.length === 0 || !inArguments[0].futureUtcTime || !inArguments[0].userTimeZone) {
        return res.status(400).send({ error: 'Invalid configuration' });
    }
    res.sendStatus(200);
});

app.post('/stop', (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Custom Activity running on port ${port}`);
});
