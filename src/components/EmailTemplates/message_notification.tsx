import type { FC, ReactElement } from "react";
import {
  messageCategories,
  type ContactFormData,
} from "@/components/ContactFormDialog";

export const MessageNotificationEmailTemplate: FC<
  Readonly<ContactFormData>
> = ({ name, email, subject, message }): ReactElement => {
  if (typeof name !== 'string') {
    throw new TypeError("Expected 'name' to be a string!");
  } else if (typeof email !== 'string') {
    throw new TypeError("Expected 'email' to be a string!");
  } else if (typeof message !== 'string') {
    throw new TypeError("Expected 'message' to be a string!")
  }

  const subjectCategory = messageCategories.find(
    (category) => category.value === subject,
  );

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
};
