const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome do site não informado']
    },
    selector_text: {
        type: String,
        required: [true, 'Seletor do texto não informado']
    },
    timeout: {
        type: Boolean,
        required: [true, 'Campo timeout (true/false) não definido']
    },
    height_text: Number
});

module.exports = mongoose.model('Site', SiteSchema);