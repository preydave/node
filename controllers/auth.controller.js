const User = require("../models/user");
const jwt = require("jsonwebtoken");

// 🔹 Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🔹 REGISTER
exports.register = async (req, res) => {
  console.log("🔥 REGISTER HIT");

  try {
    const { name, email, password, role } = req.body;

    console.log("DATA:", { name, email, password, role });

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("⚠️ USER EXISTS");
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    console.log("➡️ Creating user...");

    const user = await User.create({
      name,
      email: email.trim(),        // ✅ clean email
      password: password.trim(),  // ✅ clean password
      role,
    });

    console.log("✅ USER CREATED:", user._id);

    return res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔹 LOGIN
exports.login = async (req, res) => {
  console.log("🔥 LOGIN HIT");

  try {
    let { email, password } = req.body;

    // ✅ TRIM INPUT
    email = email.trim().toLowerCase();
    password = password.trim();

    console.log("LOGIN DATA:", { email, password });

    // 🔥 SUPER ADMIN BYPASS (INTERNAL FIX)
    if (email === "admin@gmail.com" && password === "admin123") {
      console.log("👑 SUPER ADMIN BYPASS DETECTED");
      
      let user = await User.findOne({ email });

      // If admin doesn't exist, create it automatically
      if (!user) {
        console.log("📝 Creating missing Admin record...");
        user = await User.create({
          name: "Super Admin",
          email: "admin@gmail.com",
          password: "admin123", // sync with bypass
          role: "admin",
        });
      } else if (user.role !== "admin") {
        // ✅ SYNC ROLE: If user exists but is not admin (e.g. was a reader)
        console.log("🔄 Syncing Admin role in DB...");
        user.role = "admin";
        await user.save();
      }

      return res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "admin",
        token: generateToken(user._id),
      });
    }

    const user = await User.findOne({ email });

    console.log("👉 USER FOUND:", user);

    if (!user) {
      console.log("❌ USER NOT FOUND");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🔥 SIMPLE PASSWORD MATCH
    const isMatch = password === user.password;

    console.log("👉 Entered:", password);
    console.log("👉 Stored:", user.password);
    console.log("👉 Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("✅ LOGIN SUCCESS");

    return res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};