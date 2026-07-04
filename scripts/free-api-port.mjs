import { execSync } from "node:child_process";

const port = String(process.env.API_PORT || 3001);

function freePort() {
  let output = "";
  try {
    output = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
  } catch {
    return;
  }

  const pids = new Set();
  for (const line of output.split("\n")) {
    if (!line.includes("LISTENING")) continue;
    const pid = line.trim().split(/\s+/).at(-1);
    if (pid && pid !== "0") pids.add(pid);
  }

  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      console.log(`[predev] Freed port ${port} (PID ${pid})`);
    } catch {
      console.warn(`[predev] Could not stop PID ${pid} on port ${port}`);
    }
  }
}

freePort();
