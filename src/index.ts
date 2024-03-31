import {Console} from 'console'
import {app} from './app'
import { SETTINGS } from './settings'
import { connectionToDB } from './db/mongo-db'
import { addRoutes } from './routes/routes'

const start = async () => {

    addRoutes(app)

   if(!await connectionToDB()){
        console.log('ahtyng')
        process.exit()
    }

app.listen(SETTINGS.PORT, async () => {
    console.log('...server started')
})
}

start()