require('dotenv').config();
const app = require('./app');

const { PORT = 8080 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
