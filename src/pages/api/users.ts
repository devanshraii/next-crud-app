import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./dbConnect";
import User from "@/models/UserModel";
import { authMiddleware } from "@/middleware/authMiddleware";
import bcrypt from "bcrypt";



async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "GET": // Fetch all users
      try {
        const users = await User.find({});
        console.log("Fetched users:", users);
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
      }
      break;

    case "POST": // Create a new user
      try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ error: "Error creating user" });
      }
      break;

      case "PUT": // Update user details
      try {
        const { _id, name, email } = req.body;
    
        if (!_id) {
          return res.status(400).json({ error: "User ID is required" }); // Log missing ID
        }
        if (!name && !email) {
          return res.status(400).json({ error: "At least one field (name or email) must be provided" }); // Log invalid payload
        }
    
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          { ...(name && { name }), ...(email && { email }) },
          { new: true } // Return the updated user
        );
    
        if (!updatedUser) {
          return res.status(404).json({ error: "User not found" }); // Log user not found
        }
    
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user" });
      }
      break;
    

    case "DELETE": // Delete a user
      try {
        const { id } = req.query; // Get the user ID from query params
        if (!id) {
          return res.status(400).json({ error: "User ID is required" });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(400).json({ error: "Failed to delete user" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authMiddleware(handler, ["POST"]);
