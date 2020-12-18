import { createTransport } from 'nodemailer';
import { env } from 'process';
import { User } from '../db/models/User';

export const sendEmail = async (
  user: User,
  subject: string,
  message: string
) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: env.NODEMAILER_EMAIL,
      pass: env.NODEMAILER_PASSWORD,
    },
  });

  const emailStyle = `
    <style>
      .email-title {
        margin-bottom: 15px;
      }
      
      .email-title span {
        color: #e3493b;
      }
      
      .email-body {
        margin-bottom: 30px;
        font-size: 16px;
      }
      
      .email-footer {
        letter-spacing: 0.5px;
      }
      
      .btn {
        display: inline-block;
        font-weight: 400;
        text-decoration: none;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 4px;
        padding: 8px 12px;
      }
      
      .btn-primary {
        color: #fff !important;
        background-color: #e3493b;
        border-color: #e3493b;
      }

      .btn-primary:hover {
        background-color: #ce2c1d;
        border-color: #ce2c1d;
      }
    </style>
    `;

  const from = 'Sample address';
  const reply = 'sample';
  const team = 'Sample team';

  const title = `<h1 class="email-title">Kedves <span>${user.username}</span>!</h1>`;
  const footer = `<small class="email-footer">
                    Üdvözlettel, <br />
                    ${team}
                  </small>`;

  transporter.sendMail({
    from: `"${from}" <noreply.${reply}@gmail.com>`,
    to: `${user.username} <${user.email}>`,
    replyTo: `noreply.${reply}@gmail.com`,
    subject,
    html: `
      <html>
        <head>
          ${emailStyle}
        </head>
        <body>
          ${title}
          <div class="email-body">
            ${message}
          </div>
          ${footer}
        </body>
      </html>
    `,
  });
};
