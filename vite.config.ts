import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function sharedDataPlugin(): Plugin {
  const dataDir = path.resolve(process.cwd(), 'server_data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const buildersPath = path.resolve(dataDir, 'shared_builders.json');
  const projectsPath = path.resolve(dataDir, 'shared_projects.json');
  const threadsPath = path.resolve(dataDir, 'shared_threads.json');

  return {
    name: 'shared-data-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();

        // ---------------- BUILDERS ----------------
        if (req.url === '/api/builders' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          try {
            res.end(fs.existsSync(buildersPath) ? fs.readFileSync(buildersPath, 'utf-8') : '[]');
          } catch {
            res.end('[]');
          }
          return;
        }

        if (req.url === '/api/builders' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const newBuilder = JSON.parse(body);
              let list = fs.existsSync(buildersPath)
                ? JSON.parse(fs.readFileSync(buildersPath, 'utf-8'))
                : [];
              const idx = list.findIndex(
                (b: any) =>
                  b.id === newBuilder.id ||
                  b.name === newBuilder.name ||
                  (newBuilder.email && (b.id?.includes(newBuilder.email) || b.email === newBuilder.email))
              );
              if (idx >= 0) {
                list[idx] = {
                  ...list[idx],
                  ...newBuilder,
                  projectCount: newBuilder.projectCount ?? list[idx].projectCount,
                  followersCount: list[idx].followersCount ?? newBuilder.followersCount ?? 0
                };
              } else {
                list.unshift(newBuilder);
              }
              fs.writeFileSync(buildersPath, JSON.stringify(list, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(list));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (req.url.startsWith('/api/builders/') && req.url.endsWith('/follow') && req.method === 'POST') {
          const parts = req.url.split('/');
          const builderId = decodeURIComponent(parts[3] || '');
          try {
            let list = fs.existsSync(buildersPath)
              ? JSON.parse(fs.readFileSync(buildersPath, 'utf-8'))
              : [];
            list = list.map((b: any) => {
              if (b.id === builderId) {
                const nextFollowed = !b.hasFollowed;
                return {
                  ...b,
                  hasFollowed: nextFollowed,
                  followersCount: nextFollowed
                    ? (b.followersCount || 0) + 1
                    : Math.max(0, (b.followersCount || 1) - 1)
                };
              }
              return b;
            });
            fs.writeFileSync(buildersPath, JSON.stringify(list, null, 2), 'utf-8');
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(list));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // ---------------- PROJECTS ----------------
        if (req.url === '/api/projects' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          try {
            res.end(fs.existsSync(projectsPath) ? fs.readFileSync(projectsPath, 'utf-8') : '[]');
          } catch {
            res.end('[]');
          }
          return;
        }

        if (req.url === '/api/projects' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const newProject = JSON.parse(body);
              let list = fs.existsSync(projectsPath)
                ? JSON.parse(fs.readFileSync(projectsPath, 'utf-8'))
                : [];
              const idx = list.findIndex((p: any) => p.id === newProject.id);
              if (idx >= 0) {
                list[idx] = { ...list[idx], ...newProject };
              } else {
                list.unshift(newProject);
              }
              fs.writeFileSync(projectsPath, JSON.stringify(list, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(list));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (req.url.startsWith('/api/projects/') && req.method === 'DELETE') {
          const parts = req.url.split('/');
          const projectId = decodeURIComponent(parts[3] || '');
          try {
            let list = fs.existsSync(projectsPath)
              ? JSON.parse(fs.readFileSync(projectsPath, 'utf-8'))
              : [];
            list = list.filter((p: any) => p.id !== projectId);
            fs.writeFileSync(projectsPath, JSON.stringify(list, null, 2), 'utf-8');
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(list));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // ---------------- THREADS ----------------
        if (req.url === '/api/threads' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          try {
            res.end(fs.existsSync(threadsPath) ? fs.readFileSync(threadsPath, 'utf-8') : '[]');
          } catch {
            res.end('[]');
          }
          return;
        }

        if (req.url === '/api/threads' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const newThread = JSON.parse(body);
              let list = fs.existsSync(threadsPath)
                ? JSON.parse(fs.readFileSync(threadsPath, 'utf-8'))
                : [];
              const idx = list.findIndex((t: any) => t.id === newThread.id);
              if (idx >= 0) {
                list[idx] = { ...list[idx], ...newThread };
              } else {
                list.unshift(newThread);
              }
              fs.writeFileSync(threadsPath, JSON.stringify(list, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(list));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (req.url.startsWith('/api/threads/') && req.method === 'DELETE') {
          const parts = req.url.split('/');
          const threadId = decodeURIComponent(parts[3] || '');
          try {
            let list = fs.existsSync(threadsPath)
              ? JSON.parse(fs.readFileSync(threadsPath, 'utf-8'))
              : [];
            list = list.filter((t: any) => t.id !== threadId);
            fs.writeFileSync(threadsPath, JSON.stringify(list, null, 2), 'utf-8');
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(list));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sharedDataPlugin()
  ],
  server: {
    watch: {
      ignored: (filePath: string) => {
        const normalized = filePath.replace(/\\/g, '/');
        return (
          normalized.includes('/server_data') ||
          normalized.includes('/shared_') ||
          normalized.endsWith('.json')
        );
      }
    }
  }
});
