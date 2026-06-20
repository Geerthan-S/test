"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { jobOpenings as staticJobOpenings, type JobOpening } from "@/lib/careers-data";

interface CareerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJobId?: string;
  jobOpenings?: JobOpening[];
}

export function CareerApplicationModal({
  isOpen,
  onClose,
  selectedJobId = "",
  jobOpenings = [],
}: CareerApplicationModalProps) {
  const activeJobOpenings = jobOpenings.length > 0 ? jobOpenings : staticJobOpenings;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobId: selectedJobId,
    experience: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Set mounted on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync selected job on open & capture active element to restore focus later
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, jobId: selectedJobId }));
      setIsSuccess(false);
      setResumeFile(null);
      setErrors({});
      previousActiveElement.current = document.activeElement as HTMLElement;
    } else {
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen, selectedJobId]);

  // Handle escape key and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        );

        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0] as HTMLElement;
        const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // Auto-focus first input on modal open
      setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll(
            'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'
          );
          if (focusable.length > 0) {
            (focusable[0] as HTMLElement).focus();
          }
        }
      }, 100);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
      if (errors.resume) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.resume;
          return next;
        });
      }
    }
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone)) {
      nextErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.jobId) nextErrors.jobId = "Please select a position";
    if (!formData.experience) nextErrors.experience = "Please select your experience";
    if (!resumeFile) nextErrors.resume = "Please upload your resume";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Application Submitted Successfully:", { ...formData, resumeName: resumeFile?.name });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="career-modal-overlay">
          {/* Backdrop */}
          <motion.div
            className="career-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="career-modal-box"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", duration: 0.5 }}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="career-modal-close-btn"
              aria-label="Close dialog"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="career-modal-success">
                <CheckCircle2 className="w-16 h-16 text-[#923e4d] mb-4 mx-auto" />
                <h3 id="modal-title">Application Submitted!</h3>
                <p>
                  Thank you for applying, <strong>{formData.name}</strong>. Our recruiting team will review your application for the <strong>{activeJobOpenings.find(j => j.id === formData.jobId)?.title || "Selected"}</strong> role and get back to you shortly.
                </p>
                <button
                  onClick={onClose}
                  className="shot-button shot-button--fill"
                  style={{ width: "200px", margin: "24px auto 0" }}
                  type="button"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="career-modal-form">
                <h3 id="modal-title">Join the Dockside Team</h3>
                <p className="career-modal-subtitle">
                  Fill in your details below to submit your application for review.
                </p>

                <div className="career-modal-fields">
                  {/* Name */}
                  <div className="career-form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <span className="career-form-error">
                        <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="career-form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul@example.com"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <span className="career-form-error">
                        <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="career-form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <span className="career-form-error">
                        <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Position Dropdown */}
                  <div className="career-form-group">
                    <label htmlFor="jobId">Applying Position *</label>
                    <select
                      id="jobId"
                      name="jobId"
                      value={formData.jobId}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.jobId}
                    >
                      <option value="">Select a role...</option>
                      <option value="general">General Application / Other</option>
                      {activeJobOpenings.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                    {errors.jobId && (
                      <span className="career-form-error">
                        <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                        {errors.jobId}
                      </span>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="career-form-group">
                    <label htmlFor="experience">Years of Experience *</label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.experience}
                    >
                      <option value="">Select experience level...</option>
                      <option value="Fresh Graduate / Intern">Fresh Graduate / Intern (0-1 Year)</option>
                      <option value="Junior (1-3 Years)">Junior (1-3 Years)</option>
                      <option value="Mid-Level (3-5 Years)">Mid-Level (3-5 Years)</option>
                      <option value="Senior (5-8 Years)">Senior (5-8 Years)</option>
                      <option value="Lead/Managerial (8+ Years)">Lead/Managerial (8+ Years)</option>
                    </select>
                    {errors.experience && (
                      <span className="career-form-error">
                        <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                        {errors.experience}
                      </span>
                    )}
                  </div>


                  {/* Resume Upload */}
                  <div className="career-form-group">
                    <label>Upload Resume (PDF, DOCX) *</label>
                    <div className="career-upload-area">
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                      <label htmlFor="resume" className="career-upload-label">
                        <Upload className="w-5 h-5 mb-1 text-[#923e4d]" />
                        <span>
                          {resumeFile ? (
                            <strong className="text-white">{resumeFile.name}</strong>
                          ) : (
                            "Click to upload or drag & drop file"
                          )}
                        </span>
                        {!resumeFile && <span className="text-xs text-zinc-500">Max size: 5MB</span>}
                      </label>
                    </div>
                    {errors.resume && (
                      <span className="career-form-error mt-1">
                        <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                        {errors.resume}
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shot-button shot-button--fill"
                  style={{ width: "100%", marginTop: "12px" }}
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
