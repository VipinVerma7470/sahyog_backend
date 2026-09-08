import dns from "dns";
import dotenv from "dotenv";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});