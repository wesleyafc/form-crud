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
    try {
        Form.create(request.body, function (error, form) {
            console.log(form)
            return response.status(200).json(form)
        })
    } catch (error) {
        return response.status(500).json({ "error": error })
    }
})

router.get('/form/:id', async (request, response) => {
    try {
        const _id = request.params.id
        const formResult = await Form.findOne({ _id })

        if (!formResult) {
            return response.status(404).json({ formResult })
        } else {
            return response.render('../src/views/one_form', { form: formResult })
        }

    } catch (error) {
        return response.status(500).json({ "error": error })
    }
})


module.exports = router