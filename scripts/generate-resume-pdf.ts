// generate-resume-pdf.ts
// Generate a PDF from the /resume page of the web app using Puppeteer.

import * as puppeteer from "puppeteer";
import { existsSync, mkdirSync } from "fs";
import { join, normalize } from "path";

export interface IGenerateResumePdfOptions {
  resume_page_url: string;
  output_path: string;
}

async function generatePdfFromWebpage({
  resume_page_url,
  output_path,
}: IGenerateResumePdfOptions): Promise<string> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(resume_page_url);
  await page.waitForNetworkIdle();
  await page.pdf({
    path: output_path,
    format: "Letter",
    margin: { top: "0.5cm", right: "0.5cm", bottom: "0.5cm", left: "0.5cm" },
    scale: 0.95,
  });
  await browser.close();
  return output_path;
}

function resolvePublicDirectory(): string {
  let currentDirectory: string = __dirname;
  function containsPublicDir(): boolean {
    return (
      existsSync(join(currentDirectory, "public")) &&
      existsSync(join(currentDirectory, "package.json"))
    );
  }
  let max_upwards_traversal_attempts: number = 3;
  for (let i = max_upwards_traversal_attempts; i > 0; i--) {
    if (containsPublicDir()) {
      return normalize(join(currentDirectory, "public"));
    }
    currentDirectory = join(currentDirectory, "..");
  }
  console.error("Failed to resolve public/ directory");
  process.exit(1);
}

function resolveSharedDocumentsDir(): string {
  const publicDir = resolvePublicDirectory();
  const dir = join(publicDir, "shared-documents");
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  return dir;
}

async function generateResumePdf(): Promise<string> {
  const sharedDocumentsPath = resolveSharedDocumentsDir();
  const outputPdfPath: string = join(sharedDocumentsPath, "resume.pdf");

  if (existsSync(outputPdfPath)) {
    console.error(`Output file '${outputPdfPath}' already exists!`);
    process.exit(1);
  }

  try {
    await generatePdfFromWebpage({
      resume_page_url: "http://localhost:3000/resume",
      output_path: outputPdfPath,
    });
  } catch (e: unknown) {
    console.error(`Failed to generate PDF: ${e}`);
    process.exit(1);
  }

  if (!existsSync(outputPdfPath)) {
    console.error(
      `Output file '${outputPdfPath}' does not exist after export!`,
    );
    process.exit(1);
  }

  return outputPdfPath;
}

async function main() {
  const output = await generateResumePdf();
  console.log(`Resume PDF generated at '${output}'`);
}

main().then(() => process.exit(0));
