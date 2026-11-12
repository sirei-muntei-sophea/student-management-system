const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const studentSchema = new mongoose.Schema({
  Student_id: { type: String, required: true, unique: true },
  Student_name: { type: String, required: true },
  student_mobile: String,
  student_email: String,
  student_password: String
});

const Student = mongoose.model("Student", studentSchema);

app.post("/register", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    const result = student.toObject();
    delete result.student_password;

    res.status(201).json({
      message: "Student registered successfully",
      student: result
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Registration Microservice is running" });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Registration connected to MongoDB"))
  .catch(err => console.error("MongoDB error:", err));

app.listen(5001, "0.0.0.0", () => {
  console.log("Registration running on port 5001");
});
