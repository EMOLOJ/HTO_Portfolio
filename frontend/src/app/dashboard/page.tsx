"use client";

import { useState } from "react";
import ResearchAreaCrud from "./components/ResearchAreaCrud";
import PublicationCrud from "./components/PublicationCrud";
import AwardCrud from "./components/AwardCrud";
import TeachingCrud from "./components/TeachingCrud";
import EducationCrud from "./components/EducationCrud";

const TABS = [
  { id: "research", label: "Research areas", Component: ResearchAreaCrud },
  { id: "publications", label: "Publications", Component: PublicationCrud },
  { id: "awards", label: "Awards", Component: AwardCrud },
  { id: "teaching", label: "Teaching", Component: TeachingCrud },
  { id: "education", label: "Education", Component: EducationCrud },
] as const;

export default function DashboardPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("research");
  const current = TABS.find((t) => t.id === tab)!;
  const Component = current.Component;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex flex-wrap gap-2 mb-8 border-b border-bark/20 pb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              tab === t.id
                ? "bg-moss text-cream"
                : "bg-white text-forest border border-bark/20 hover:bg-bark/5"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <Component />
    </div>
  );
}
