import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export async function sendMail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: "pratmbr@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email." : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "set-new-password"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      <br/>
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/${
        emailType === "VERIFY" ? "verifyemail" : "set-new-password"
      }?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.log("Error in sending mail::", error.message);
    throw new Error(error.message);
  }
}
