"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.fromUTF8toBase64 = exports.fromBase64ToUTF8 = void 0;
const settings_1 = require("../settings");
const fromBase64ToUTF8 = (code) => {
    const buff = Buffer.from(code, 'base64');
    const decodedAuth = buff.toString('utf8');
    return decodedAuth;
};
exports.fromBase64ToUTF8 = fromBase64ToUTF8;
const fromUTF8toBase64 = (code) => {
    const buff2 = Buffer.from(code, 'utf8');
    const codedAuth = buff2.toString('base64');
    return codedAuth;
};
exports.fromUTF8toBase64 = fromUTF8toBase64;
const adminMiddleware = (req, res, next) => {
    const auth = req.headers['authorization'];
    console.log(auth);
    if (!auth) {
        res
            .status(401)
            .json({ error: "Unauthorized!" });
        return;
    }
    if (auth.slice(0, 6) !== 'Basic ') {
        res
            .status(401)
            .json({ error: "Unathorized!" });
    }
    const codedAuth = (0, exports.fromUTF8toBase64)(settings_1.SETTINGS.ADMIN);
};
exports.adminMiddleware = adminMiddleware;
