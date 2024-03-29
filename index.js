const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//endpoint to create a habit in backend:
const Habit = require("./models/habit");
app.get("/", (req, res) => {
  res
    .status(200)
    .json(
      "for more info, chckout my repo : https://github.com/zikran69/backendhabitapp",
    );
});

app.post("/habits", async (req, res) => {
  try {
    const { title, color, repeatMode, reminder } = req.body;

    const newHabit = new Habit({
      title,
      color,
      repeatMode,
      reminder,
    });

    const savedHabit = await newHabit.save();
    res.status(200).json(savedHabit);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//fetch data from backend

app.get("/habitslist", async (req, res) => {
  try {
    const allHabits = await Habit.find({});

    res.status(200).json(allHabits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/habits/:habitId/completed/:day", async (req, res) => {
  try {
    const { habitId, day } = req.params;
    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    habit.completed[day] = true;

    await habit.save();

    res.status(200).json({ message: "Habit completed status updated" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/habits/:habitId/completed", async (req, res) => {
  const habitId = req.params.habitId;
  const updatedCompletion = req.body.completed; // this for updated completed object of habits by id

  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId,
      { completed: updatedCompletion },
      { new: true },
    );

    if (!updatedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    return res.status(200).json(updatedHabit);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete("/habits/:habitId", async (req, res) => {
  try {
    const { habitId } = req.params;

    await Habit.findByIdAndDelete(habitId);

    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the habit" });
  }
});
