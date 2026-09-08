import dns from "dns";
import dotenv from "dotenv";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({
      email: "admin@sahyog.com",
    });

    if (adminExists) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      name: "Super Admin",
      email: "admin@sahyog.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();