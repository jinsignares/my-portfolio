import { NextApiRequest, NextApiResponse } from "next";
import { FormData } from "../../typings";
const mail = require('@sendgrid/mail');

// Use the correct environment variable (should NOT be prefixed with NEXT_PUBLIC_)
mail.setApiKey(process.env.SENDGRID_API_KEY);

// Define a type for the expected success response
type SuccessResponse = {
    message: string;
}

// Define a type for the potential error response
type ErrorResponse = {
    error: string;
    details?: any; // Optional: include error details for debugging
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponse | ErrorResponse> // Update response type
) {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    // req.body is likely already parsed by Next.js if Content-Type is application/json
    // Remove JSON.parse()
    const body: FormData = req.body;

    // Basic validation (optional but recommended)
    if (!body.name || !body.email || !body.subject || !body.message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const message = `
    Name: ${body.name}\\r\\n
    Email: ${body.email}\\r\\n
    Message: ${body.message}
  `;

    const data = {
        to: 'judaingo@gmail.com', // Consider making this an env variable too
        from: 'juan.front2@gmail.com', // This should be a verified sender in SendGrid
        subject: `New Contact Form Submission: ${body.subject}`, // Make subject clearer
        text: message,
        html: message.replace(/\\r\\n/g, '<br />'),
    };

    try {
        await mail.send(data);
        // Send a success response back to the client
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error: any) {
        console.error("Error sending email:", error);
        // Send an error response back to the client
        // Avoid sending detailed internal errors to the client in production
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
}