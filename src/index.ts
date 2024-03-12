import {Console} from 'console'
import {app} from './app'
import { SETTINGS } from './settings'


app.listen(SETTINGS.PORT, () => {
    console.log('.. server stsrted')
})