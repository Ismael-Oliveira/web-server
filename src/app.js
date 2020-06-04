const hbs = require('hbs');
const path = require('path');
const cotacao = require('./util/cotacao');
const express = require('express');

const app = express();

const port = process.env.PORT || 8000;
const publicDirectoryStatic = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partials);


app.use(express.static(publicDirectoryStatic));

app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Cotação',
        author: 'Kello Doido'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Android número 18',
        author: 'Kello Doido'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        author: 'Kello Doido'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 404,
        errorMessage: 'Não existe página após o /help'
    })
})

app.get('/cotacao', (req, res)=>{

    const symbol = req.query.ativo;

    if(!symbol){

        return res.status(400).json({error: {
            messageError: 'Deve ser informado o código do ativo.',
            code: 400
        }});
    }
    
    cotacao.cotacao(symbol.toUpperCase(), (err, data)=>{
        if(err) {
            return res.status(err.status).json({error: {
                messageError: err.messageError,
                code: 404
             }});
        }
        res.status(200).json(data);
    }) 

});

app.get('*', (req, res)=>{
    res.render('404', {
        title: 404,
        errorMessage: 'Página não encontrada!',
    })
})





app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}`);
})
