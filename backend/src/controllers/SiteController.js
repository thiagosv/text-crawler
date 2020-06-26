const Site = require('../models/Site');

module.exports = {
    index(req, res) {
        Site.find()
            .then(sites => res.json(sites))
            .catch(err => res.json(err));
    },
    show(req, res) {
        const { _id } = req.params;
        Site.findOne({ _id })
            .then(site => res.json(site))
            .catch(err => res.json(err));
    },
    store(req, res) {
        Site.create({ ...req.body })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },
    delete(req, res) {
    }
};