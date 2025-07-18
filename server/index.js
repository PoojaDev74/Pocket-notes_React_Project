const express = require("express");
const cors = require("cors");

const app = express();

require('dotenv').config();

// Port
const port = process.env.PORT || 4000;

// Database Connection
require("./database/connection");

// Require Routes
const noteRoutes = require("./routes/notesRoutes");

app.get("/", (req, res) => {
  res.send("hello");
});

// Middleware
app.use(express.json());

const allowedOrigins = [
  "https://pocket-notes-react-project-frontend.onrender.com",
  "http://localhost:3000"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));


// Routes
app.use("/api", noteRoutes);

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});
