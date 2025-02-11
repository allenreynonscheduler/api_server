exports.index = async (req, res) => {
    res.json({ message: "Get all users" });
};

exports.store = async (req, res) => {
    res.json({ message: "Create a new user" });
};

exports.show = async (req, res) => {
    res.json({ message: `Get user with ID ${req.params.id}` });
};

exports.update = async (req, res) => {
    res.json({ message: `Update user with ID ${req.params.id}` });
};

exports.destroy = async (req, res) => {
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
  