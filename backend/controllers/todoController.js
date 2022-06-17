const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");

//req.user come from protect middleware

const getTodos = asyncHandler(async (req, res) => {
  const todo = await Todo.find({ user: req.user.id }); //get only user todos
  res.status(200).json(todo);
});

const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add todos");
  }
  const todo = await Todo.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error("todo not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error("todo not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }
  await todo.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
