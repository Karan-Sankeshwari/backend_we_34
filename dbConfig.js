const mongo = require('mongodb')
const mongoURL = "mongodb+srv://karan2022:" + encodeURIComponent("Karan@2021") + "@cluster0.mh8elnb.mongodb.net/test";
const mongoClient = mongo.MongoClient

module.exports = {
    mongo,
    mongoURL,
    mongoClient
}