import React from "react";

const IllustrationFrame = () => (
  <div className="relative h-80 w-96" aria-hidden="true">
    <div className="absolute inset-0 rounded-2xl" style={{ background: "var(--grad-glow)" }} />
    <div className="absolute inset-6 rounded-2xl border-8 border-white/14 bg-white/10 shadow-glass backdrop-blur-xl">
      <div className="absolute -right-8 -top-6 h-20 w-28 rotate-6 rounded-xl border-8 border-white/12 bg-white/10" />
      <div className="absolute -right-14 top-6 h-20 w-28 rotate-6 rounded-xl border-8 border-white/10 bg-white/12" />
      <div
        className="absolute left-6 top-6 h-40 w-64 rounded-lg"
        style={{ backgroundColor: "var(--color-brand-400)" }}
      />
      <div
        className="absolute bottom-8 right-8 h-20 w-24 rounded-md"
        style={{ backgroundColor: "var(--color-brand-300)" }}
      />
    </div>
    <span
      className="absolute -bottom-6 right-8 h-6 w-10 rounded-full"
      style={{ backgroundColor: "var(--color-brand-jade)" }}
    />
  </div>
);

export default IllustrationFrame;
