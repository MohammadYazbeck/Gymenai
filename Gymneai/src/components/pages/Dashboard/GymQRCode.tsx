import React, { useRef, useEffect } from "react";
import qrcode from "qrcode";

import AuthService from "../../../services/authService";

interface QRCodeSVGProps {
  value: string;
}

const QRCodeSVG: React.FC<QRCodeSVGProps> = ({ value }) => {
  const qrCodeRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = qrCodeRef.current;
    if (canvas) {
      qrcode.toCanvas(
        canvas,
        value || "",
        {
          errorCorrectionLevel: "H",
          scale: 10 // Adjust this value to change the size of the icon
        },
        (error) => {
          if (error) {
            console.error("Error generating QR code:", error);
          }
        }
      );
    }
  }, [value]);
  

  return <canvas ref={qrCodeRef} />;
};

export default function GymQRCode() {
  const downloadQR = () => {
    // Your download logic remains the same
  };

  const value = AuthService.getgymid();

  return (
    <div className="ml-40 flex flex-col items-center justify-center">
      <h1 className="text-6xl text-red-600 font-bold mt-[10vh] mb-[8vh]">GYM QR CODE</h1>
      <QRCodeSVG value={value || ""} />
      <button
        onClick={downloadQR}
        className="mt-[6vh] text-2xl border rounded-xl w-[25rem] px-2 py-2 border-gray-700 text-red-600 font-bold hover:bg-red-600 hover:text-white"
      >
        Save As PNG
      </button>
    </div>
  );
}
