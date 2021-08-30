var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name: 'AJSC : Log In',
    description: 'The nodejs.org example web server.',
    script: 'C:\Users\ammso\Documents\robots\synabelle\index.js',
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
    svc.start();
});

svc.uninstall();