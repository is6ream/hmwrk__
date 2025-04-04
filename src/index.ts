import express from 'express';
import { setupApp } from './setup-app';
import { SETTINGS } from './settings';
import { runDB } from './db/mongo';
import { app } from './app';


const bootstrap = async () => {

    setupApp(app);
    const port = SETTINGS.PORT;
    await runDB(SETTINGS.MONGO_URL)

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    return app;
}

bootstrap();

