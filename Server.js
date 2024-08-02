const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/bfhl/post', (req, res) => {
  try {
    const dataString = req.body;
    const Data = {
      is_success: false,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers: [],
      alphabets: [],
      highest_alphabet: [],
    };
    // final
    if (dataString) {
      const parsedData = dataString;
      const ArrayofData = parsedData["data"];
      
      if (!Array.isArray(ArrayofData)) {
        return res.status(400).send('Invalid data format: data should be an array');
      }

      let maxAlpha = ''; 
      
      for (let i = 0; i < ArrayofData.length; i++) { 
        const item = ArrayofData[i];
        
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

      Data.is_success = true; 
    } else {
      console.log('No data found');
      return res.status(400).send('No data found');
    }

    res.json(Data);
  } catch (error) {
    console.error('Error parsing data:', error);
    res.status(400).send('Invalid data format');
  }
});

app.get('/bfhl', (req, res) => {
  const response = { "operation_code": 1 };
  res.json(response);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
