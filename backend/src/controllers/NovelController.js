const Novel = require('../models/Novel');

module.exports = {
    index(req, res) {
        Novel.find().populate('site')
            .then(novels => res.json(novels))
            .catch(err => res.json(err));
    },
    show(req, res) {
        const { _id } = req.params;
        Novel.findOne({ _id }).populate('site')
            .then(novel => res.json(novel))
            .catch(err => res.json(err));
    },
    store(req, res) {
        Novel.create({ ...req.body })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },
    delete(req, res) {
        const { _id } = req.params;
        Novel.delete({ _id })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }
};