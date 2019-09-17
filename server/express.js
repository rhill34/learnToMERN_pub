import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
/**Import the devBundle for development */
import devBundle from './devBundle'
/**Serving Static files with Express */
import path from 'path'
/**Render the React components from server */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
/**Router modules  */
import StaticRouter from 'react-router-dom/StaticRouter'
import MainRouter from './../client/MainRouter'
/**Material-UI modules */
import { SheetRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles'
import { indigo, pink} from 'material-ui/colors'
/**user API routes */
import userRoutes from './routes/user.routes'
/**authorized user Routes */
import authRoutes from './routes/auth.routes'

/**Gets the current working directory */
const CURRENT_WORKING_DIR = process.cwd()

const app = express()

/**dev compile to express */
devBundle.compile(app)

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

/**
 * Receive any Get Request 
 */
app.get('*', (req, res) => {
    //1.Prepare Material-UI styles
    //2.Generate markup with renderToString
    //3. Return template with markup and CSS styles in the response
})
app.get('/', (req,res) => {
    res.status(200).send(Template())
})
/**Serving static files with Express */
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR,'dist')))

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