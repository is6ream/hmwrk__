import { Router } from "express";
import { testDeleteController } from "./testingDeleteController";

export const testingRouter = Router();

testingRouter.delete("testing/all-data", testDeleteController.clearDataBase)
