exports.index = (req, res) => {
    res.json({ message: "Get all users" });
};

exports.store = (req, res) => {
    res.json({ message: "Create a new user" });
};

exports.show = (req, res) => {
    res.json({ message: `Get user with ID ${req.params.id}` });
};

exports.update = (req, res) => {
    res.json({ message: `Update user with ID ${req.params.id}` });
};

exports.destroy = (req, res) => {
    res.json({ message: `Delete user with ID ${req.params.id}` });
};

// router
//   .route("/")
//   .get(UserController.index)   // Get all users
//   .post(UserController.store); // Create a new user

// router
//   .route("/:id")
//   .get(UserController.show)    // Get a single user
//   .put(UserController.update)  // Update a user
//   .delete(UserController.destroy); // Delete a user
  