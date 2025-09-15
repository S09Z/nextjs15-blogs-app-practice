import { config as loadEnv } from 'dotenv';
import { spawn } from 'node:child_process';

// Load .env variables
loadEnv();

// Map APP_PORT -> PORT if provided
if (process.env.APP_PORT && !process.env.PORT) {
  process.env.PORT = process.env.APP_PORT;
}

// Pass-through command and args to Next.js
const [,, cmd, ...args] = process.argv;
if (!cmd) {
  console.error('Usage: node scripts/run-next.mjs <dev|start|build> [args...]');
  process.exit(1);
}

const child = spawn('next', [cmd, ...args], { stdio: 'inherit', env: process.env, shell: false });
child.on('exit', (code) => {
  process.exit(code ?? 0);
});
child.on('error', (err) => {
  console.error(err);
  process.exit(1);
});


