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

router.get('/all-forms', async (request, response) => {
    try {
        const allForms = await Form.find()
        return response.render('../src/views/all_forms', { allForms: allForms })
    } catch (error) {

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

//this renders the form page
router.get('/edit-form/:id', async (request, response) => {
    try {
        const _id = request.params.id
        let form = await Form.findOne({ _id })
        console.log(form)

        if (!form) {
            response.send(`form with id ${_id} does not exist`)
        }
        response.render('../src/views/edit_form', { form: form })
    } catch (error) {
        return response.status(500).json({ "error": error })
    }

})

//this will be update a form
router.post('/form/:id', async (request, response) => {
    try {
        const _id = request.params.id
        const { azulMarinho, amareloCanario, verdeBebe, vermelho, azulRoyal, formName } = request.body

        const updatedForm = await Form.findOne({ _id })
        if (!updatedForm) {
            return response.status(404).json({ updatedForm })
        } else {
            updatedForm.formName = formName
            updatedForm.azulMarinho = azulMarinho
            updatedForm.amareloCanario = amareloCanario
            updatedForm.verdeBebe = verdeBebe
            updatedForm.vermelho = vermelho
            updatedForm.azulRoyal = azulRoyal

            await updatedForm.save()

            return response.render('../src/views/one_form', { form: updatedForm })
        }

    } catch (error) {
        return response.status(500).json({ "error": error })

    }
})
router.get('/delete/:id', async (request, response) => {
    const _id = request.params.id
    await Form.findByIdAndDelete({ _id })
    if (!_id) {
        response.send(`this id:${_id} not found`)
    }
    response.redirect('/')
})

module.exports = router