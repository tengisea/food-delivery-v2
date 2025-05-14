import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

configDotenv();

const { EMAIL_PASS, EMAIL_USER } = process.env;
console.log({ EMAIL_PASS, EMAIL_USER });
const transport = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendUserVerificationLink = async (
  baseURL: string,
  email: string
) => {
  await transport.sendMail({
    subject: "User Verification Link",
    to: email,
    from: EMAIL_USER,
    html: `
        <div>
          <h1>Account Verification</h1>
          <a href="${baseURL}">Verify</a>
        </div>`,
  });
};
