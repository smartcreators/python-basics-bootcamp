document.getElementById("qrForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const text = document.getElementById("qrText").value.trim();
    if (!text) {
        alert("Please enter text.");
        return;
    }

    // Generate QR Code
    const qr = new QRious({
        element: document.getElementById("qrCanvas"),
        value: text,
        size: 200
    });

    document.getElementById("saveQR").style.display = "block";
});

// Save QR Code to Backend
document.getElementById("saveQR").addEventListener("click", async function () {
    const text = document.getElementById("qrText").value.trim();
    const canvas = document.getElementById("qrCanvas");
    const qrImage = canvas.toDataURL("image/png");

    try {
        const response = await fetch("http://localhost:5000/save-qr", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, qrImage }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("QR Code saved successfully!");
        } else {
            alert(result.message || "Failed to save QR code.");
        }
    } catch (error) {
        alert("Error connecting to server.");
    }
});