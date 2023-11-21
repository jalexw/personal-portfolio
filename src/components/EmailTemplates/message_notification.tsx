import type { FC } from 'react';
import { messageCategories, type ContactFormData } from '@/components/contact';

export const MessageNotificationEmailTemplate: FC<Readonly<ContactFormData>> = ({
  name,
  email,
  subject,
  message
}) => {
  const subjectCategory = messageCategories.find(category => category.value === subject);

  return (
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
            <td>Subject Group: </td>
            <td>{subjectCategory?.group}</td>
          </tr>
          <tr>
            <td>Subject: </td>
            <td>{subjectCategory?.label}</td>
          </tr>
          <tr>
            <td>Message: </td>
            <td>{message}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
