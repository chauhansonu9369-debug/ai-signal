import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.aisignal.app",
  appName: "AI-Signal",
  webDir: "out",

  server: {
    url: "https://ai-signal-gilt.vercel.app",
    cleartext: true,
  },
};

export default config;
