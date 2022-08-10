require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.DB_URI;
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    /* Connecting to the database. */
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db('deep-thought');
            console.log('Successfully connected to MongoDB.');

            return callback;
        });
    },

  /* Returning the database connection. */
    getDb: function () {
        return dbConnection;
    },
};
