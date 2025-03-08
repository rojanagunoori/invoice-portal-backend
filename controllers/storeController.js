const Store = require("../models/store");

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStore = async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create Store with Validation & Duplicate Check
exports.createStore1 = async (req, res) => {
  try {
    const { name, address, owner } = req.body;

    // Check for missing fields
    if (!name || !address || !owner) {
      return res.status(400).json({ message: "Name, address, and owner are required" });
    }

    // Check if store already exists
    const existingStore = await Store.findOne({ name });
    if (existingStore) {
      return res.status(400).json({ message: "Store with this name already exists" });
    }

    // Create new store
    const store = new Store({ name, address, owner });
    await store.save();
    
    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get store by ID
exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Store
exports.updateStore = async (req, res) => {
  try {
    const { name, address, owner } = req.body;

    // Find store by ID and update
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      { name, address, owner },
      { new: true, runValidators: true }
    );

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(updatedStore);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Store
exports.deleteStore = async (req, res) => {
  try {
    const deletedStore = await Store.findByIdAndDelete(req.params.id);
    if (!deletedStore) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

