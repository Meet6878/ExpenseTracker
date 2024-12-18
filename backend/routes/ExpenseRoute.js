const express = require('express');
const { CreateExpenseController, GetExpenseController, DeleteExpenseController } = require('../controller/ExpenseController');

const Routes = express.Router();

Routes.post("/create",CreateExpenseController);
Routes.get("/get",GetExpenseController);
Routes.delete("/meet/delete",DeleteExpenseController);



module.exports = Routes;

