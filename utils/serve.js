const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;  // Change to any port you like
const HOST = '0.0.0.0'; // Listen on all network interfaces
const PUBLIC_DIR = path.join(__dirname, ".."); // Serve files from ./public

const server = http.createServer((req, res) => {
    let reqPath = req.url;
    if (reqPath === '/') reqPath = '/index.html';

    const filePath = path.join(PUBLIC_DIR, reqPath);
    const ext = path.extname(filePath).toLowerCase();

    // Very basic content-type map
    const contentTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.json': 'application/json',
        '.ico': 'image/x-icon'
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
        } else {
            res.writeHead(200, {'Content-Type': contentTypes[ext] || 'application/octet-stream'});
            res.end(data);
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at http://${getLocalIPAddress()}:${PORT}/`);
});

// Helper to get local LAN IP address
function getLocalIPAddress() {
    const os = require('os');
    const ifaces = os.networkInterfaces();
    for (const iface of Object.values(ifaces)) {
        for (const addr of iface) {
            if (addr.family === 'IPv4' && !addr.internal) {
                return addr.address;
            }
        }
    }
    return 'localhost';
}
