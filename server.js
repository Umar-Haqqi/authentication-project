import { app } from './app.js';
import { connectDB } from './utils/database.js';

// --- connecting to database
connectDB();

// --- starting the server
app.listen(process.env.PORT, () => {
    console.log("Server is running on port 4000");
})