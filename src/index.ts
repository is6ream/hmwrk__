import { app } from './app'
import { SETTINGS } from './settings'
import { runDB } from './db/mongo'
import dotenv from "dotenv";

dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';

console.log(process.env.MONGO_URI, 'here')

const startApp = async () => {
    const res = await runDB(mongoURI);
    if (!res) process.exit(1)

    app.listen(SETTINGS.PORT, () => {
        console.log('...server started in port ' + SETTINGS.PORT)
    })
}

startApp()
