"use client";
// components/RefreshButton.js
import { useRouter } from "next/navigation";

export default function RefreshButton(onClick: () => void) {
  return (
    <div className="h-full w-full flex items-center justify-center m-auto">
      <button
        onClick={onClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Tải lại trang
      </button>
    </div>
  );
}
