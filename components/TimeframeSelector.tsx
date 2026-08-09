"use client";

const timeframes = [
  { label: "1m", value: "1m" },
  { label: "5m", value: "5m" },
  { label: "15m", value: "15m" },
  { label: "1H", value: "1h" },
  { label: "1D", value: "1d" },
];

type Props = {
  selected: string;
  onChange: (timeframe: string) => void;
};

export default function TimeframeSelector({
  selected,
  onChange,
}: Props) {
  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-semibold text-zinc-400">
        Trading Timeframe
      </div>

      <div className="grid grid-cols-5 gap-2 rounded-2xl bg-zinc-900 p-2 border border-zinc-800">
        {timeframes.map((timeframe) => {
          const active = selected === timeframe.value;

          return (
            <button
              key={timeframe.value}
              onClick={() => onChange(timeframe.value)}
              className={`rounded-xl py-3 text-sm font-bold transition ${
                active
                  ? "bg-cyan-500 text-black"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {timeframe.label}
            </button>
          );
        })}
      </div>

      <div className="mt-2 text-center text-xs text-zinc-500">
        Current analysis:{" "}
        {selected === "1h"
          ? "1H"
          : selected === "1d"
          ? "1D"
          : selected}
      </div>
    </div>
  );
}
