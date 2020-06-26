const express = require('express');
const routes = express.Router();

const SiteController = require('./controllers/SiteController');
const NovelController = require('./controllers/NovelController');
const PdfController = require('./controllers/PdfController');

routes.get('/site', SiteController.index);
routes.get('/site/:_id', SiteController.show);
routes.post('/site', SiteController.store);

routes.get('/novel', NovelController.index);
routes.get('/novel/:_id', NovelController.show);
routes.post('/novel', NovelController.store);
routes.delete('/novel/:_id', NovelController.delete);

routes.post('/pdf', PdfController.store);

module.exports = routes;