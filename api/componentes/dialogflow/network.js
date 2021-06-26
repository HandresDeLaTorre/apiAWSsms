const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hola este es un buen servidor')
});

module.exports = router;