"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const testingDeleteController_1 = require("./testingDeleteController");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete("testing/all-data", testingDeleteController_1.testDeleteController.clearDataBase);
