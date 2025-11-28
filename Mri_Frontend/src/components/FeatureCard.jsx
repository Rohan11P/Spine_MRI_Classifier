// src/components/FeatureCard.jsx

import React from "react";

/**
 * Renders a feature card with an icon, title, and description.
 * @param {{title: string, description: string, icon: JSX.Element}} props
 */
const FeatureCard = ({ title, description }) => {
  // Simple SVG icon representing a pulse/ECG line, stylized for the design.
  const SvgIcon = (
    <svg
      className="w-8 h-8 md:w-10 md:h-10 text-blue-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-2.329c0-.236-.092-.461-.257-.626L12 11l-3 3-4-4-1 1"
      />
      <path
        strokeLineLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-8z"
      />
    </svg>
  );

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-cyan-200 group">
      <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-50 to-blue-50 group-hover:from-cyan-100 group-hover:to-blue-100 transition-colors border border-cyan-100">
        <div className="text-2xl">{title.split(" ")[0]}</div>
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {title.split(" ").slice(1).join(" ")}
      </h3>
      <p className="mt-3 text-slate-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
