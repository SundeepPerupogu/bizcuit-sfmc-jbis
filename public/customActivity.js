'use strict';

const express = require('express');
const router = express.Router();

router.post('/execute', (req, res) => {
    const triggerTime = new Date(req.body.inArguments[0].triggerTime);
    const currentTime = new Date();
    const userTimeZone = req.body.inArguments[0].userTimeZone;

    currentTime.setHours(currentTime.getHours() + userTimeZone);
    triggerTime.setHours(triggerTime.getHours() + userTimeZone);

    const timeDifference = Math.abs(triggerTime - currentTime);

    res.status(200).json({
        outArguments: [
            {
                timeDifference: timeDifference
            }
        ]
    });
});

module.exports = router;
