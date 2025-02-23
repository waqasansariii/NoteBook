const connectToMongo = require('./db');
connectToMongo();
const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors');
app.use(cors());
app.use(express.json());
//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

// app.get('/', (req, res) => {
//   res.send('Hello Waqas!')
// })
// app.get('/api/v1/login', (req, res) => {
//     res.send('Hello Login!')
//   })
// app.get('/api/v1/signup', (req, res) => {
//     res.send('Hello signUp')
//   })
app.listen(port, () => {
    console.log(`INotebook backend listening on port http://localhost:${port}`)
  })
  
