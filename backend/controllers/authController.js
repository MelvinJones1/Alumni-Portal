import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (req, res) => {
  try {
    const {
      name,
      branch,
      year,
      email,
      password,
      linkedIn,
      proof,
      role,
      currentWork,
      expertise,
      location,
    } = req.body;

    // Validate input
    if (!name || !branch || !year || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine if approval is needed (only alumni needs approval)
    const isApproved =
      role === "student" ? email.endsWith("@jeppiaarinstitute.org") : false;

    // Create new user
    const user = new User({
      name,
      branch,
      year,
      email,
      password: hashedPassword,
      linkedIn,
      proof,
      role,
      isApproved,
      currentWork,
      expertise,
      location,
    });

    await user.save();
    res
      .status(201)
      .json({ message: "Registration successful, pending approval if alumni" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, role: user.role, isApproved: user.isApproved },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Return the token, user ID, role, and approval status
    res.json({
      message: "Login successful",
      token,
      userId: user._id,
      role: user.role,
      isApproved: user.isApproved,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const approveAlumni = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "alumni") {
      return res.status(400).json({ message: "Only alumni require approval" });
    }
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only" });
    }

    if (user.isApproved) {
      return res.status(400).json({ message: "Alumni is already approved" });
    }

    user.isApproved = true;
    await user.save();

    res.json({ message: "Alumni approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingAlumni = async (req, res) => {
  try {
    const pendingAlumni = await User.find({
      role: "alumni",
      isApproved: false,
    });
    res.json(pendingAlumni);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending approvals" });
  }
};

const getUsersByIds = async (req, res) => {
  const { userIds, role } = req.body;

  try {
    const users = await User.find({ _id: { $in: userIds }, role });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};
export { register, login, approveAlumni, getPendingAlumni, getUsersByIds };
