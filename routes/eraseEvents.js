var express = require('express');
var router = express.Router();

// Route related to delete events
router.delete('/', (req, res) => {
    return res.status(200).json({
        message: 'deleted'
    });
});

module.exports = router;