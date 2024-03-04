import employeModel from "../Models/Employe.model.js";
import { ObjectId } from "mongodb";
export const AddEmploye = async (req, res) => {
  try {
    const { FullName, Rank, Salary } = req.body;
    console.log(req.body);
    if (!FullName || !Rank || !Salary) {
      return res.status(404).json({
        success: false,
        message: "merci de remplir tous les champs",
      });
    }

    const employe = await employeModel.create({
      FullName,
      Rank,
      Salary,
    });
    res.status(201).json({
      success: true,
      message: "employe addedd successfully",
      employe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "somthing was warrning",
      error: error,
    });
  }
};
export const retriveAllEmploye = async (req, res) => {
  try {
    const employeListe = await employeModel.find();
    if (employeListe.length === 0) {
      return res.status(200).json({
        success: true,
        message: "accun employe dans la liste pour le moment ",
        employeListe,
      });
    }
    res.status(200).json({
      success: true,
      message: "ceci la liste des employees",
      employeListe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "somthing was warrning",
      error: error,
    });
  }
};
export const getEmployeById = async (req, res) => {
  try {
    const idEmploye = req.params.id;
    if (!ObjectId.isValid(idEmploye)) {
      return res.status(400).json({
        success: false,
        message: "invalid id employee",
      });
    }
    const employe = await employeModel.findById({ _id: idEmploye });
    if (!employe) {
      return res.status(404).json({
        success: false,
        message: "accun employé avec cet id",
      });
    }
    res.status(200).json({
      success: true,
      message: `employe avec id ${idEmploye} est le suivant`,
      employe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "somthing was warrning",
      error: error,
    });
  }
};

export const deleteEmploye = async (req, res) => {
  try {
    const idEmploye = req.params.id;
    if (!ObjectId.isValid(idEmploye)) {
      return res.status(400).json({
        success: false,
        message: "invalid id ",
      });
    }
    let employe = await employeModel.findById({ _id: idEmploye });
    if (!employe) {
      return res.status(404).json({
        success: false,
        message: "employe not found",
      });
    }
    const employeToDelete = await employeModel.deleteOne({ _id: idEmploye });
    if (employeToDelete.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "employe deleted successfully",
        employeToDelete,
      });
    }
  } catch (error) {}
};

export const UpdateEmploye = async (req, res) => {
  try {
    const id_employe = req.params.id;
    const { FullName, Salary, Rank } = req.body;
    if (!ObjectId.isValid(id_employe)) {
      return res.status(400).json({
        success: false,
        message: "invalid id",
      });
    }
    const employeToUpdate = await employeModel.findOneAndUpdate(
      { _id: id_employe },
      { $set: { FullName, Salary, Rank } },
      { new: true }
    );
    if (!employeToUpdate) {
      return res.status(404).json({
        success: false,
        message: "employe non trouvable ",
      });
    }
    res.status(200).json({
      success: true,
      message: "employee updated successfully",
      employeToUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "sothing was warrning",
      error: error,
    });
  }
};
export const searchByName = async (req, res) => {
  try {
    const { FullName } = req.params.fullName;
    const employe = await employeModel.findOne(FullName);
    if (!employe) {
      return res.status(400).json({
        success: false,
        message: "accun employe avec ce nom",
      });
    }
    res.status(200).json({
      success: true,
      message: `ceci l'employee avec le nom ${FullName}`,
      employe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "sothing was warrning",
      error: error,
    });
  }
};

export const AugmenterSalaireEmploye = async (req, res) => {
  try {
    const idEmploye = req.params.id;
    const pourcentage = req.body.percentage;
    if (!ObjectId.isValid(idEmploye)) {
      return res.status(400).json({
        success: false,
        message: "invalid id employee",
      });
    }
    const employeAddSalaryPercent = await employeModel.findById({
      _id: idEmploye,
    });
    if (!employeAddSalaryPercent) {
      return res.status(404).json({
        success: false,
        message: "employe not found",
      });
    }
    const newSalary = employeAddSalaryPercent.Salary * (1 + pourcentage / 100);
    employeAddSalaryPercent.Salary = newSalary;
    await employeAddSalaryPercent.save();
    res.status(200).json({
      success: true,
      message: "salaire augmenté avec succées",
      employeAddSalaryPercent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "sothing was warrning",
      error: error,
    });
  }
};
