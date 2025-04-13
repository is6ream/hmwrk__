"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_app_1 = require("./setup-app");
const settings_1 = require("./settings");
const mongo_1 = require("./db/mongo");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongo_1.runDB)(settings_1.SETTINGS.MONGO_URL);
    const app = (0, express_1.default)();
    // console.log('1. Starting application...')
    (0, setup_app_1.setupApp)(app);
    // console.log('2. App setup completed')
    const port = settings_1.SETTINGS.PORT;
    // console.log('3. Port configured:', port)
    // console.log('4. Database connected')
    app.listen(port, () => {
        console.log('...Example, app listening on port:', port);
    });
});
bootstrap();
