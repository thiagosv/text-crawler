const mongoose = require('mongoose');

const NovelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome da novel não informado']
    },
    prefix_file: {
        type: String,
        required: [true, 'Prefix do arquivo não informado']
    },
    url: {
        type: String,
        required: [true, 'URL da novel não informado']
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
        required: [true, 'Site não informado']
    }
});

module.exports = mongoose.model('Novel', NovelSchema);