const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();

connectDB();

const app = express();


app.use(express.json());


app.use(cors({
  origin: 'https://vercel.com/sunny-anands-projects/crm-fronted/C456moxum4ZTWqyjNPpSfXmDmn1N', 
  credentials: true              
}));



app.use('/api/users', require('./routes/auth'));
app.use('/api/customers', require('./routes/customers'));

app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
