import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });

    // Session create (JWT nahi)
    req.session.userId = user._id.toString();
    res.status(201).json({
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.session.userId = user._id.toString();
    res.json({ user: { _id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const me = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });
    const user = await User.findById(req.session.userId).select("_id name email");
    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("sid");
    res.json({ message: "Logged out" });
  });
};
