var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

require('./api/arguments/models/model');
require('./api/characters/models/model');
require('./api/desks/models/model');
require('./api/modules/models/model');
require('./api/users/models/model');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/argumentdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


(require('./api/arguments/routes/routes')(app));
(require('./api/characters/routes/routes')(app));
(require('./api/desks/routes/routes')(app));
(require('./api/modules/routes/routes')(app));
(require('./api/users/routes/routes')(app));


app.listen(port);


console.log('API server started on: ' + port);