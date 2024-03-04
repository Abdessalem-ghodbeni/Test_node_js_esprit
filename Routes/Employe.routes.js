import Express from "express";
import {
  AddEmploye,
  AugmenterSalaireEmploye,
  UpdateEmploye,
  deleteEmploye,
  getEmployeById,
  retriveAllEmploye,
  searchByName,
} from "../Controller/Employe.controller.js";
import { validateRankEmploye } from "../Middlewares/Validator.middleware.js";

const router = Express.Router();

router.post("/AddEmploye", validateRankEmploye, AddEmploye);
router.get("/showEmployees", retriveAllEmploye);
router.get("/showEmploye/:id", getEmployeById);
router.delete("/DeleteEmploye/:id", deleteEmploye);
router.put("/UpdateEmploye/:id", UpdateEmploye);
router.get("/searchByName/:fullName", searchByName);
router.post("/increaseSalary/:id", AugmenterSalaireEmploye);
export default router;
