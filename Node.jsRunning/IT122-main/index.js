const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const pageTitle = 'Home Page';
  const welcomeMessage = 'Welcome to our website!';
  const author = 'Manuela Kay';

  const htmlContent = `
    <html>
      <head>
        <title>${pageTitle}</title>
      </head>
      <body>
        <h1>${welcomeMessage}</h1>
        <p>This is the home page of our website.</p>
        <p>Created by ${author}</p>
      </body>
    </html>
  `;

  res.send(htmlContent);
});


app.get('/about', (req, res) => {
  const name = 'Manuela Kay';
  const hobbies = ['reading', 'gardening', 'singing'];

  const htmlContent = `
    <html>
      <head>
        <title>About</title>
      </head>
      <body>
        <h1>About Me</h1>
        <p>Name: ${name}</p>
        <p>Hobbies/Interests: ${hobbies.join(', ')}</p>
      </body>
    </html>
  `;

  res.send(htmlContent);
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Web server is running on port ${port}`);
});
