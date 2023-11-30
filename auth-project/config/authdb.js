const mongooose = require('mongoose')

const connectToDb = async () => {
    mongooose.connect(process.env.MONGO_URL)
    .then((conn) => {
        console.log(`Connected to Database: ${conn.connection.host}`)
    })
    .catch((error) => {
        console.log(error.message)
        process.exit(1)
    } )
}

module.exports = connectToDb