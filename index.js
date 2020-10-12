const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const dbclustername = 'FileEditor'
const dbusername = `bevyuser`
const dbpassword = `bevypassword`

const mongourl = `mongodb+srv://${dbusername}:${dbpassword}@cluster0-nogpo.mongodb.net/${dbclustername}`

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true)

const fileRouter = require('./routes/files');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.urlencoded({
     extended: true
}));
app.use(bodyParser.json());

app.use(express.static('./public'));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/', fileRouter);  

module.exports = app;

const PORT = 3003;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);})