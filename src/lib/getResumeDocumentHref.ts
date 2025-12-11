export function getProductionResumeDocumentHref(): string {
  return "/shared-documents/jalexw-resume.pdf";
}

export function getResumeDocumentHref(): string {
  if (process.env.NODE_ENV === "development") {
    return "/resume";
  }

  return getProductionResumeDocumentHref();
}

export default getResumeDocumentHref;
