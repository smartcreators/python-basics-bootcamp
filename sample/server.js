const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://alekhya:1234@cluster0.n0pdb.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// QR Code Schema
const qrSchema = new mongoose.Schema({
    text: String,
    qrImage: String
});

const QRCode = mongoose.model("QRCode", qrSchema);

// API to save QR code
app.post("/save-qr", async (req, res) => {
    try {
        const { text, qrImage } = req.body;
        if (!text || !qrImage) {
            return res.status(400).json({ message: "Text and QR Code are required" });
        }

        const newQR = new QRCode({ text, qrImage });
        await newQR.save();
        res.status(201).json({ message: "QR Code saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// API to get saved QR codes
app.get("/get-qr", async (req, res) => {
    try {
        const qrCodes = await QRCode.find();
        res.status(200).json(qrCodes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));