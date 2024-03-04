import mongoose from "mongoose";

const employeSchema = mongoose.Schema(
  {
    FullName: {
      type: String,
      required: [true, "FullName is required "],
    },
    Rank: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return [1, 2, 3].includes(value);
        },
        message: 'Le champ "rank" doit avoir une valeur de 1, 2 ou 3.',
      },
    },
    Salary: {
      type: Number,
      required: [true, "Salary  is required "],
    },
  },
  {
    timestamps: true,
  }
);
const employeModel = mongoose.model("Employes", employeSchema);
export default employeModel;
