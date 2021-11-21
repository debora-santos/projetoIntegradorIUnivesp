const express = require('express')
const request = require('request');


const app = express();
const port = 3000;
const databasePort = 3004;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.listen(port,() => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/produtos', (req, res) => {
    res.render('produtos')
})

app.get('/cadastro', (req, res) => {
    let body = {bairro:req.query.bairro};
    if(req.query.id){
        body.id = req.query.id;
        let url = `http://localhost:${databasePort}/produtos/${req.query.id}`;
        console.log('req:', req.query); 
        request(url, function (error, response, resBody) {
            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode); 
            console.log('body:', resBody);
            body = JSON.parse(resBody);
            res.render('cadastro', body);
        });
    }else
        res.render('cadastro', body)
})

app.post('/cadastrar', (req, res) => {
    console.log("cadastrando produto");
    console.log(req.body);
    let url = `http://localhost:${databasePort}/produtos`;
    request({
        method:'post',
        headers: {'content-type' : 'application/json'},
        url: url,
        json: req.body,
        
        }, function(error, response, body){     
            if(error){
                console.log(error)
            }
            if(response){
                console.log(response)
            }         
            
            res.redirect('/');
    });
})

app.get("/apagar", (req, res) => {
    console.log("apagando produto");
    console.log(req.query.id);
    let url = `http://localhost:${databasePort}/produtos/${req.query.id}`;
    request({
        method:'delete',
        headers: {'content-type' : 'application/json'},
        url: url,
        json: req.body,
        
        }, function(error, response, body){     
            if(error){
                console.log(error)
            }
            if(response){
                console.log(response)
            }         
            res.redirect('/');
    });
})

app.get('/lista_produtos', (req, res) => {
    let url = `http://localhost:${databasePort}/produtos`;
    console.log('req:', req.query); 
    request(url, function (error, response, body) {
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode); 
        console.log('body:', body); 
        res.render('produtos', {produtos:body,bairro:req.query.bairro})
    });    
})