import express from 'express';
import { setupApp } from './setup-app';
import { SETTINGS } from './settings';
import { runDB } from './db/mongo';



const bootstrap = async () => {
    await runDB(SETTINGS.MONGO_URL)
    const app = express();

    // console.log('1. Starting application...')
    setupApp(app);
    // console.log('2. App setup completed')
    const port = SETTINGS.PORT;
    // console.log('3. Port configured:', port)
    // console.log('4. Database connected')
    app.listen(port, () => {
        console.log('...Example, app listening on port:', port)
    })
}

bootstrap();
