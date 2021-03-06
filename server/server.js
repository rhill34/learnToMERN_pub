import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})

/*Mongo DB */
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {useNewUrlParser: true})
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})