const express = require('express')

const app = express();
const port = 3000;
const databasePort = 3004;

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port,() => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', (req, res) => {
    res.render('index')
})
  