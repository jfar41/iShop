var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,
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