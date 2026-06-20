"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CareerApplicationModal } from "@/components/career-application-modal";
import type { CareerSetting } from "@/lib/repositories";
import type { JobOpening } from "@/lib/careers-data";

interface InternshipButtonProps {
  settings: CareerSetting;
  jobOpenings?: JobOpening[];
}

export function InternshipButton({ settings, jobOpenings = [] }: InternshipButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonText = settings.internshipButtonText || "Apply for Internship";

  if (settings.internshipActionType === "url" && settings.internshipActionUrl) {
    return (
      <a
        href={settings.internshipActionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="cv2-btn cv2-btn--fill inline-flex items-center justify-center gap-2"
      >
        {buttonText} <ArrowRight aria-hidden="true" className="size-4" />
      </a>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cv2-btn cv2-btn--fill inline-flex items-center justify-center gap-2 cursor-pointer border-0 outline-none"
        type="button"
      >
        {buttonText} <ArrowRight aria-hidden="true" className="size-4" />
      </button>

      <CareerApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedJobId="general"
        jobOpenings={jobOpenings}
      />
    </>
  );
}
