import {Console} from 'console'
import {app} from './app'
import { SETTINGS } from './settings'
import { connectionToDB } from './db/mongo-db'

const start = async () => {

    //addRoutes(app)

    if(!await connectionToDB()){
        console.log('ahtyng')
        process.exit()
    }

app.listen(SETTINGS.PORT,async () => {
    console.log('.. server stsrted')
})
}

start()