import type { FC } from 'react';
import type { ContactFormData } from '@/components/contact';

export const MessageNotificationEmailTemplate: FC<Readonly<ContactFormData>> = ({
  name,
  email,
  subject,
  message
}) => (
  <div>
    <h1>Message from portfolio site contact form:</h1>
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
