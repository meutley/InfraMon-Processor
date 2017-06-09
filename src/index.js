const express = require('express');
const path = require('path');
const http = require('http');

// Processor Service
const ProcessorService = require('./services/processor/processor-service');
var _processor = null;

// Express
const app = express();

// Server
const PORT = 9200;
app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on port localhost:${PORT}\n`);

    _processor = new ProcessorService();
    _processor.start();
});

process.on('SIGINT', () => {
    if (_processor) {
        _processor.stop();
    }

    process.exit();
});