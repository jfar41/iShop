var mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/products',
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

var db = mongoose.connection;

db.on('connected', () => {
    console.log(`Connceted to MongoDB ${db.name} at ${db.host}:${db.port}`)
})