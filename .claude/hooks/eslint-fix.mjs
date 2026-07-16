import { execSync } from "node:child_process";

let data = "";
process.stdin.on("data", (chunk) => (data += chunk));
process.stdin.on("end", () => {
  try {
    const input = JSON.parse(data);
    const file = input.tool_input?.file_path ?? input.tool_response?.filePath;
    if (file && /\.(ts|tsx)$/.test(file)) {
      execSync(`npx eslint --fix "${file}"`, { stdio: "inherit" });
    }
  } catch {
    // no-op: malformed input or eslint failure shouldn't block the tool call
  }
});
