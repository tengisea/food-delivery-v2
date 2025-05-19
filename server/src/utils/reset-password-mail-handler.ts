import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

configDotenv();

const { EMAIL_PASS, EMAIL_USER } = process.env;

const transport = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendUserPasswordVerificationLink = async (
  baseURL: string,
  email: string
) => {
  await transport.sendMail({
    subject: "Password Verification Link",
    to: email,
    from: EMAIL_USER,
    html: `
      <div>
          <h1>Reset Password</h1>
         <div style="display:flex;">
            <div style="color-white; font-size:22px; font-weight:600;">
              Nom <div style="color-[#EF4444];">Nom</div>
           </div>
         </div>
           <div style="text-xs;">Swift delivery</div>
           <div style="font-size:24px; color:red; font-weight:600;">
             This link is valid for only a hour
           </div>
            <a href="${baseURL}">Reset Password</a>
      </div>`,
  });
};
