import fs from "fs";
import path from "path";

// .env generator function with placeholders
export const generateEnvFile = () => {
  const envContent = `
PORT=5000
MONGO_URI=your_mongo_connection_string_here
JWT_SECRET=your_jwt_secret_here

SMTP_EMAIL=your_smtp_email_here
SMTP_PASSWORD=your_smtp_password_here

STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISH_KEY=your_stripe_publish_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
`.trim();

  const envPath = path.join(process.cwd(), ".env");

  if (fs.existsSync(envPath)) {
    console.log(".env already exists. Skipping generation.");
    return;
  }

  fs.writeFileSync(envPath, envContent);
  console.log(
    ".env file has been generated with placeholders. Please update it with your secrets."
  );
};
