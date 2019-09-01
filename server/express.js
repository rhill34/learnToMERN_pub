import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'

/**user API routes */
import userRoutes from './routes/user.routes'
/**authorized user Routes */
import authRoutes from './routes/auth.routes'

const app = express()

// devBundle.compile(app)

/**...configure express here */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
/**
 * user API routes
 */
app.use('/', userRoutes)
/**
 * authorize user API routes
 */
app.use('/', authRoutes)

app.get('/', (req,res) => {
    res.status(200).send(Template())
})

/**
Handles Errors 
of unauthorized requests to Express router  
*/
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            "error" : err.name + ":" + err.message
        })
    }
})
export default app