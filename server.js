const http = require('http');
const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const filename = pathname === '/'
    ? 'index.html'
    : pathname.slice(1);

  const file = path.resolve(folder, filename);

  if (!file.startsWith(folder + path.sep)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Halaman tidak ditemukan');
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(data);
  });
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Website aktif di http://127.0.0.1:3000');
});
