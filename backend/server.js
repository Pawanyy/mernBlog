import app from "./app.js";
import "dotenv/config.js";
import Database from "./utils/database.js";
import logRoutesHandler from './middlewares/logRoutesHandler.js';


const SERVER_PORT = process.env.PORT || 3000;

// Function to log details in a table format
const logDetails = (title, details) => {
    console.table([{ Title: title, ...details }]);
};

// Function to start the server
const startServer = async () => {
    try {
        // Start the server
        app.listen(SERVER_PORT, () => {
            logDetails('Server Status', { Info: `Started on Port: ${SERVER_PORT}` });
        });

        // Connect to the database
        const database = new Database(process.env.MONGO_URI);
        await database.connect();

        // Log database connection details
        const db = database.getConnection();
        logDetails('Database Connection', {
            'Database Name': db.name || 'N/A',
            'Host': db.host || 'N/A',
            'Port': db.port || 'N/A',
            'Status': db.readyState === 1 ? 'Connected' : 'Disconnected'
        });

        // Apply the route logging middleware
        logRoutesHandler(app);

    } catch (error) {
        console.error('Error starting the server:', error.message);
        process.exit(1); // Exit the process with failure code
    }
};

// Execute the server start function
startServer();
