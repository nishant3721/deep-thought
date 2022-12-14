const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const mongo = require('../db');
/* Connecting to the MongoDB server. */
mongo.connectToServer();

/* This is a router for the GET method. It is used to get the data from the database. */
router.get('/events', async (req, res) => {
    const { page, limit, type, id } = req.query;
    const dbo = mongo.getDb();
    if (id != undefined) {
        dbo
            .collection('events')
            .findOne({ _id: ObjectId(req.query.id) }, function (err, result) {
                if (err) {
                    res.status(400).send('Error fetching event!');
                } else {
                    res.json(result);
                }
            });
    } else {
        let pageNo = page;
        pageNo = pageNo - 1;
        let result;
        if (type === 'latest') {
            result = await dbo
                .collection('events')
                .aggregate([
                    {
                        $sort: { _id: -1 },
                    },
                    {
                        $skip: pageNo * limit,
                    },
                    {
                        $limit: limit * 1,
                    },
                ])
                .toArray();
        } else {
            result = await dbo
                .collection('events')
                .aggregate([
                    {
                        $sort: { _id: -1 },
                    },
                    {
                        $skip: pageNo * limit,
                    },
                    {
                        $limit: limit * 1,
                    },
                ])
                .toArray();
        }
        res.json(result);
    }
});

/* This is a router for the POST method. It is used to insert the data into the database. */
router.post('/events', async (req, res) => {
    const dbo = mongo.getDb();
    const {
        name,
        files,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        rigor_rank,
    } = req.body;
    let doc = {
        name,
        files,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        rigor_rank,
    };
    dbo.collection('events').insertOne(doc, function (err, result) {
        if (err) {
            res.status(400).send('Error inserting event!');
        } else {
            console.log(`Added a new event with _id ${result.insertedId}`);
            res.json({ message: 'added successfully' });
        }
    });
});

/* This is a router for the PUT method. It is used to update the data in the database. */
router.put('/events/:id', async (req, res) => {
    const dbo = mongo.getDb();
    const {
        name,
        files,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        rigor_rank,
    } = req.body;
    let doc = {
        name,
        files,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        rigor_rank,
    };
    dbo
        .collection('events')
        .updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: doc },
            function (err, result) {
                if (err) {
                    res.status(400).send('Error updating event!');
                } else {
                    console.log(`updated an event with _id ${req.params.id}`);
                    res.json({ message: 'updated successfully' });
                }
            }
        );
});

/* This is a router for the DELETE method. It is used to delete the data from the database. */
router.delete('/events/:id', async (req, res) => {
    const dbo = mongo.getDb();
    dbo
        .collection('events')
        .deleteOne({ _id: ObjectId(req.params.id) }, function (err, result) {
            if (err) {
                res.status(400).send('Error deleting event!');
            } else {
                console.log(`deleted event with _id ${req.params.id}`);
                res.json({ message: 'deleted successfully' });
            }
        });
});

module.exports = router;
