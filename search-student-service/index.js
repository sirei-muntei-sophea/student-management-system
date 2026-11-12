const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const studentSchema = new mongoose.Schema({
  Student_id: String,
  Student_name: String,
  student_mobile: String,
  student_email: String,
  student_password: String
});

const Student = mongoose.model("Student", studentSchema);

app.get("/search", async (req, res) => {
  try {
    const { id, name } = req.query;

    if (!id && !name) {
      return res.status(400).json({
        message: "Please provide student id or name"
      });
    }

    const filter = id
      ? { Student_id: id }
      : { Student_name: { $regex: name, $options: "i" } };

    const students = await Student.find(filter)
      .select("-student_password -__v");

    res.json({
      message: "Search completed",
      students: students
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Search Student Microservice is running" });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Search connected to MongoDB"))
  .catch(err => console.error("MongoDB error:", err));

app.listen(5002, "0.0.0.0", () => {
  console.log("Search running on port 5002");
});
