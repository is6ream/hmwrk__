import { app } from './app'
import { SETTINGS } from './settings'
import { runDB } from './db/mongo';
import dotenv from "dotenv";
import mongoose from "mongoose"

dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';

const startApp = async () => {
    const res = await runDB(SETTINGS.MONGO_URL);
//остановился тут, 
    app.listen(SETTINGS.PORT, () => {
        console.log('...server started in port ' + SETTINGS.PORT)
    })
}

startApp()
