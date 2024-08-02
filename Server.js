const express = require('express');
const cors = require('cors');
const { json } = require('stream/consumers');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.post('/bfhl/post', (req, res) => {
  try {
    const dataString = req.body.data;
    const Data = {
      is_success: false,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers: [],
      alphabets: [],
      highest_alphabet: [],
    };

    if (dataString) {
      const parsedData = JSON.parse(dataString);
      const ArrayofData = parsedData.data;
      let maxAlpha = ''; 
      console.log(parsedData);
      for (let i = 0; i < ArrayofData.length; i++) { // Corrected loop condition
        const item = ArrayofData[i];
        console.log(item);
        if (/^\d+$/.test(item)) {
          Data.numbers.push(item);
        } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
          Data.alphabets.push(item);
          if (item > maxAlpha) {
            maxAlpha = item;
          }
        }
      }

      if (maxAlpha !== '') {
        Data.highest_alphabet.push(maxAlpha);
      }

      Data.is_success = true; // Update Data object to reflect success
    } else {
      console.log('No data found');
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(Data));
  } catch (error) {
    console.error('Error parsing data:', error);
    res.status(400).send('Invalid data format');
  }
});

app.get('/bfhl', (req, res) => {
  const response = { "operation_code": 1 };
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(response));
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
