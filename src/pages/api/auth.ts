import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "./dbConnect";
import User from "@/models/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
