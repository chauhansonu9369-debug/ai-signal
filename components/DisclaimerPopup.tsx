"use client";

import { useEffect, useState } from "react";

export default function DisclaimerPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("riskAccepted");

    if (!accepted) {
      setOpen(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("riskAccepted", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-5">
      <div className="bg-zinc-900 max-w-lg w-full rounded-2xl p-6 border border-yellow-500">

        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          ⚠️ Market Risk Warning
        </h2>

        <p className="text-zinc-300 mb-4">
          AI-Signal provides AI-generated trading signals for
          <b> educational purposes only.</b>
        </p>

        <ul className="space-y-2 text-sm text-zinc-300">
          <li>• We are NOT SEBI Registered Investment Advisors.</li>
          <li>• Trading involves substantial financial risk.</li>
          <li>• You may lose your invested capital.</li>
          <li>• Always do your own research.</li>
          <li>• You are responsible for your own trades.</li>
        </ul>

        <button
          onClick={accept}
          className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 rounded-xl py-3 font-bold"
        >
          ✅ I Understand & Continue
        </button>

      </div>
    </div>
  );
}
