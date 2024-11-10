import { Books } from "../models/schema.js";
import mongoose from "mongoose";

export const addBooksRoutes = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(404).send({
        message: "Input all the required fields",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const result = await Books.create(newBook);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getBooksRoutes = async (req, res) => {
  try {
    const result = await Books.find({});
    console.log(result);
    res.status(201).json({
      asd: result.length,
      data: result,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getBooksRoutesId = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Books.findById(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(result);
    console.log(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateBooksRoutes = async (req, res) => {
  const id = req.params.id;
  const updateBook = {
    $set: {
      ...req.body,
    },
  };

  try {
    const result = await Books.findByIdAndUpdate(id, updateBook, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book updated successfully", result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteBooksRoutes = async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  } //For objectId checker only

  try {
    const result = await Books.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "No data found" });
    }
    res.status(200).send({ message: "Book successfully deleted", result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
