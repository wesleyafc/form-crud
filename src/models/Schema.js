const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
    formName: { type: String, required: true },
    azulMarinho: { type: String, default: '' },
    amareloCanario: { type: String, default: '' },
    verdeBebe: { type: String, default: '' },
    vermelho: { type: String, default: '' },
    azulRoyal: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },


}, { versionKey: false })


module.exports = mongoose.model('Form', FormSchema)