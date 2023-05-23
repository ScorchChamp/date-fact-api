const express = require('express');
const axios = require('axios');
const { format } = require('date-fns');

const app = express();

app.get('/random-fact', (req, res) => {
  // Get the current date
  const currentDate = new Date();

  // Subtract 20 years from the current date
  const targetDate = new Date(currentDate.getFullYear() - 20, currentDate.getMonth(), currentDate.getDate());

  // Format the target date in the required format (YYYY-MM-DD)
  const formattedDate = format(targetDate, 'MM/dd');

  // Make a request to the API to retrieve random facts about the target date
  axios.get(`http://numbersapi.com/${formattedDate}/date`)
    .then(response => {
      // Retrieve the fact from the response
      const fact = response.data;
      res.json({ date: formattedDate, fact });
    })
    .catch(error => {
        console.log(error);
      res.status(500).json({ error: 'Failed to retrieve the fact. Please try again.' });
    });
});

app.listen(3000, () => {
  console.log('API server is running on http://localhost:3000');
});
