const bodyParser = require('body-parser');
const mongoose = require('mongoose');

module.exports = function(appServer) {
	const app = appServer;
	let server;

	function init(config) {
		const routes = require(__basedir + '/server_app/routes/v1/routes.js');
		// Set the app
		const baseURL = `${config.scheme}://${config.host}:${config.port}`;
		app.set('env', (process.env.NODE_ENV || 'development'));
		app.set('host', config.host);
		app.set('port', config.port);
		app.set('baseURL', baseURL);

		const mConf = config.database.mongo;
		app.set('dbURI', 
			`${mConf.scheme}://${mConf.host}:${mConf.port}/${mConf.name}`);	

		// Add middleware to parse the json
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
			extended: false
		}));

		// Add routes
		app.use('/api/', routes);
	}

	function start() {
		dbConnect();
	}

	function dbConnect() {
		const uri = app.get('dbURI');
		mongoose
		.connect(uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		})
		.then(() => {
			console.log("\nConnected to MongoDB on:", uri, "...");
			startServer();
		})
		.catch(err => {
			console.log("\nError connecting to MongoDB:", err);
			process.exit(1);
		});
	}

	function startServer() {
		const host = app.get('host'),
					port = app.get('port');
		server = app.listen({host: host, port: port}, function() {
			console.log(
`
!!**!!

Chatr server listening on - ${app.get('baseURL')}

CTRL+C to stop

`
			);
		});

		
		process.on('SIGINT', stopServer);
		process.on('SIGHUP', stopServer);
		process.on('SIGTERM', stopServer);
	}

	async function stopServer() {
		console.log("\nStopping server ...");

		const timeoutId = setTimeout(() => {
			console.error('Stopped forcefully, not all connection was closed');
			process.exit(1);
		}, 5000);

		try {
			await mongoose.connection.close(false, () => {
				console.log('MongoDB connection closed');
			});
			await server.close(() => {
				console.log('Http server stopped');
			});
			clearTimeout(timeoutId);
			console.log("\n ... stopped server");
			process.exit(0);
		} catch (err) {
			console.error(err, '... error during stop');
			process.exit(1);
		}
	}

	return {
		init: init,
		start: start
	};
};