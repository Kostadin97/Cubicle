const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

require('./config/express')(app);
require('./config/mongoose')(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));