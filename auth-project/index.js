const PORT = process.env.PORT || 5003;

const app = require('./app')

app.listen(PORT, () => {
    console.log(`Server is running at port: http://localhost:${PORT}`)
})

module.exports = app