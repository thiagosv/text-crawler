require('dotenv-defaults').config();
require('./configs/mongo');
const express = require('express');
const helmet = require('helmet');
const { logger } = require('./configs/morgan');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(logger());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);
app.listen(3333);