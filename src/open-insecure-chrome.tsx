import { showHUD, LaunchProps } from "@raycast/api";
import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";

const CHROME_CANARY = "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary";
const CHROME_STABLE = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PROFILE_DIR = "/tmp/chrome-test-profile";

export default async function Command(props: LaunchProps<{ arguments: { domain: string; port?: string } }>) {
  const { domain, port = "80" } = props.arguments;
  const origin = `http://${domain}:${port}`;

  if (!existsSync(PROFILE_DIR)) {
    mkdirSync(PROFILE_DIR, { recursive: true });
  }

  const chrome = existsSync(CHROME_CANARY) ? CHROME_CANARY : CHROME_STABLE;
  const flags = [
    `--unsafely-treat-insecure-origin-as-secure="${origin}"`,
    `--user-data-dir="${PROFILE_DIR}"`,
    "--allow-running-insecure-content",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-search-engine-choice-screen",
    "--disable-sync",
    "--disable-sync-types",
    "--disable-features=ChromeSigninPrompt",
    `"${origin}"`,
  ].join(" ");

  execSync(`"${chrome}" ${flags} &`, { shell: "/bin/bash" });
  await showHUD(`Opening ${origin} in insecure Chrome`);
}
