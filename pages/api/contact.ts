import { NextApiRequest, NextApiResponse } from "next";
import { FormData } from "../../typings";
const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

type Data = {
    formData: FormData
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    
    const body = JSON.parse(req.body);

    const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}
  `;

    const data = {
        to: 'judaingo@gmail.com',
        from: 'juan.front2@gmail.com',
        subject: `${body.subject}`,
        text: message,
        html: message.replace(/\r\n/g, '<br />'),
    };

    await mail.send(data);

    res.status(200);
}