// build-resume-pdf.ts
// Starts dev server, generates PDF from /resume page, then stops the server.
// See 'generate-resume-pdf.ts' for the actual PDF generation (from-the-HTML)

import { spawn } from "child_process";

const DEV_SERVER_PORT = 3000 as const satisfies number;
const RESUME_URL = `http://localhost:${DEV_SERVER_PORT}/resume`;

async function waitForServer(
  url: string,
  maxAttempts: number = 30,
  delayMs: number = 1000,
): Promise<void> {
  console.log(`Waiting for server to be ready at ${url}...`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`Server is ready! (attempt ${attempt}/${maxAttempts})`);
        return;
      }
    } catch (error) {
      // Server not ready yet, continue waiting
    }

    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw new Error(`Server did not become ready after ${maxAttempts} attempts`);
}

async function main() {
  console.log("Starting dev server...");

  // Start the dev server as a child process
  const devServer = spawn("bun", ["run", "dev"], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(DEV_SERVER_PORT) },
  });

  let exitCode = 0;

  try {
    // Wait for the server to be ready
    await waitForServer(RESUME_URL);

    console.log("\nGenerating resume PDF...");

    // Run the PDF generation script
    const pdfGenProcess = spawn(
      "bun",
      ["run", "./scripts/generate-resume-pdf.ts", RESUME_URL],
      {
        stdio: "inherit",
      },
    );

    // Wait for PDF generation to complete
    await new Promise<void>((resolve, reject) => {
      pdfGenProcess.on("exit", (code) => {
        if (code === 0) {
          console.log("\nPDF generation completed successfully!");
          resolve();
        } else {
          reject(new Error(`PDF generation failed with exit code ${code}`));
        }
      });

      pdfGenProcess.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error("\nError during build process:", error);
    exitCode = 1;
  } finally {
    // Stop the dev server
    console.log("\nStopping dev server...");
    devServer.kill("SIGTERM");

    // Give it a moment to clean up
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Force kill if still running
    if (!devServer.killed) {
      devServer.kill("SIGKILL");
    }
  }

  process.exit(exitCode);
}

main();
