const express = require('express');
const router = express.Router();
const Form = require('./src/models/Schema')



router.get('/', (request, response) => {
    response.send('home')
})


router.get('/new-form', (request, response) => {
    response.render('../src/views/new_form')
})
router.post('/new-form', async (request, response) => {

})


module.exports = router