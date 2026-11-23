const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const menuUrl = 'http://localhost:5173/';
const outputPath = path.join(__dirname, 'qr-code-menu-final.png');

QRCode.toFile(outputPath, menuUrl, {
    width: 300,
    margin: 2,
    color: {
        dark: '#000000',
        light: '#FFFFFF'
    },
    errorCorrectionLevel: 'H'
}, (err) => {
    if (err) {
        console.error('Error generating QR code:', err);
        process.exit(1);
    }
    console.log(`QR code saved to: ${outputPath}`);
    
    // Also generate SVG version
    const svgPath = path.join(__dirname, 'qr-code-menu-final.svg');
    QRCode.toFile(svgPath, menuUrl, {
        width: 300,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H',
        type: 'svg'
    }, (err) => {
        if (err) {
            console.error('Error generating SVG QR code:', err);
        } else {
            console.log(`SVG QR code saved to: ${svgPath}`);
        }
    });
});