import fs from "fs";
import path from "path";

export const generateEnvFile = () => {
  const envContent = [
    "PORT=5000",
    "MONGO_URI=your_mongo_connection_string_here",
    "JWT_SECRET=your_jwt_secret_here",
    "",
    "SMTP_EMAIL=your_smtp_email_here",
    "SMTP_PASSWORD=your_smtp_password_here",
    "",
    "STRIPE_SECRET_KEY=your_stripe_secret_key_here",
    "STRIPE_PUBLISH_KEY=your_stripe_publish_key_here",
    "STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here",
  ].join("\n");

  const envPath = path.resolve(process.cwd(), ".env");

  if (fs.existsSync(envPath)) {
    console.log("✅ .env file already exists. Skipping generation.");
    return;
  }

  try {
    fs.writeFileSync(envPath, envContent, { encoding: "utf-8" });
    console.log(
      "✅ .env file generated with placeholders. Please update it with your real values."
    );
  } catch (err) {
    console.error("❌ Failed to generate .env file:", err.message);
  }
};
