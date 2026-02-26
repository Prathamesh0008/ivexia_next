import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, phone, subject, message } = body;

    if (!email || !message) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter (use Gmail or SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to your business email
    await transporter.sendMail({
      from: `"Ivexia Website" <${process.env.EMAIL_USER}>`,
      to: "info@ivexiapharma.com",
      subject: subject || "New Contact Form Submission",
      html: `
        <h3>New Enquiry Received</h3>
        <p><strong>Name:</strong> ${name || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("Email error:", error);
    return Response.json(
      { success: false, error: "Email sending failed" },
      { status: 500 }
    );
  }
}