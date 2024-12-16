import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Define the type for the handler function
type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

// Middleware with type annotations
export const authMiddleware = (handler: ApiHandler, allowUnauthenticatedMethods: string[] = []) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Skip authentication for specified methods
    if (allowUnauthenticatedMethods.includes(req.method || "")) {
      return handler(req, res);
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      (req as any).user = decoded; // Attach decoded user info to the request
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};
