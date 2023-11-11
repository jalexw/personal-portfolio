import type { FC } from 'react';
import type { ContactFormData } from '@/components/contact';

export const ContactConfirmationEmailTemplate: FC<Readonly<ContactFormData>> = ({
  name,
  email,
  subject,
  message
}) => (
  <div>
    <h1>Hey {name}!</h1>
    <p>Thank you for reaching out to me! Just confirming that I have received your message. I will get back to your message as soon as possible.</p>
    <br/>
    <p>Here is a copy of your message:</p>
    <table>
      <tbody>
        <tr>
          <td>Name: </td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Email: </td>
          <td>{email}</td>
        </tr>
        <tr>
          <td>Subject: </td>
          <td>{subject}</td>
        </tr>
        <tr>
          <td>Message: </td>
          <td>{message}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
