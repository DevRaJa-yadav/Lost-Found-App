const router = require("express").Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// Add item
router.post("/", auth, async (req, res) => {
  const item = new Item({ ...req.body, userId: req.user.id });
  await item.save();
  res.json("Item added");
});

// Get all items
router.get("/", auth, async (req, res) => {
  const data = await Item.find({ userId: req.user.id });
  res.json(data);
});

// Get item by ID
router.get("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// Update item
router.put("/:id", auth, async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.json("Item updated");
});

// Delete item
router.delete("/:id", auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json("Item deleted");
});

// Search item
router.get("/search/:name", auth, async (req, res) => {
  const data = await Item.find({ name: req.params.name });
  res.json(data);
});

module.exports = router;
