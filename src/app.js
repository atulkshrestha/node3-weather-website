const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express();

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');;
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
res.render('index',{
    title: 'Weather',
    name: 'Atul Shrestha'
});
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'Atul Shrestha',
        title: 'About me'
    });
})

app.get('/help',(req,res) =>{
    res.render('help',{
        name: 'Atul Shrestha',
        title: 'Help',
        tips:'Help Yourself!'
    })
}) 
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            message:'You must provide address.'
        })
    }
    res.send({
         location: 'Denver',
         forecast: 'Currently Cloudy',
         address: req.query.address
    });
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) =>{
res.send('Help article not found.')
})
app.get('*',(req,res)=>{
    res.send('My 404 page');
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})