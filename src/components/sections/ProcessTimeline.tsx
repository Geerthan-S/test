"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  DraftingCompass,
  Handshake,
  ShieldCheck,
  TowerControl,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "PROJECT REVIEW",
    description:
      "Scope, drawings, site conditions and delivery risks are reviewed with the client before commitment.",
    badge: "Scope Validation",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "ENGINEERING PLANNING",
    description:
      "Engineering sequence, procurement windows, manpower plans and milestones are locked before execution.",
    badge: "Controls Locked",
    icon: DraftingCompass,
  },
  {
    number: "03",
    title: "SITE EXECUTION",
    description:
      "Disciplined site management, coordination, reporting and safety controls keep work fronts moving.",
    badge: "Work Fronts Active",
    icon: TowerControl,
    featured: true,
  },
  {
    number: "04",
    title: "QUALITY CONTROL",
    description:
      "Inspections, compliance checks and documentation protect long-term project performance.",
    badge: "QA Gates Cleared",
    icon: ShieldCheck,
  },
  {
    number: "05",
    title: "FINAL HANDOVER",
    description:
      "Snag review, closure documentation and handover are managed with clear completion accountability.",
    badge: "Closure Complete",
    icon: Handshake,
  },
];

const checklist = [
  "Documentation Complete",
  "Client Approval Complete",
  "Asset Handover Complete",
  "Project Closed",
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.62, ease: "easeOut" },
  }),
};

export function ProcessTimeline() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <section
      className="process-timeline-v2"
      id="process"
      aria-labelledby="process-timeline-title"
    >
      <div className="process-timeline-v2__inner">
        <motion.div
          className="process-timeline-v2__header"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
        >
          <span>PROJECT DELIVERY PROCESS</span>
          <h2 id="process-timeline-title">
            HOW WE DELIVER <strong>COMPLEX PROJECTS.</strong>
          </h2>
          <p>
            Every project follows a disciplined engineering workflow from
            planning to handover.
          </p>
        </motion.div>

        <div className="process-timeline-v2__stage">
          <motion.div
            className="process-timeline-v2__progress"
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.32, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="process-timeline-v2__cards">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  className="process-timeline-v2__card-shell"
                  key={step.number}
                  custom={0.12 + index * 0.11}
                  initial={initial}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.24 }}
                  variants={reveal}
                >
                  <article
                    className={`process-timeline-v2__card${
                      step.featured ? " is-featured" : ""
                    }`}
                  >
                    <motion.span
                      className="process-timeline-v2__number"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.62 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.45 }}
                      transition={{
                        delay: 0.18 + index * 0.1,
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {step.number}
                    </motion.span>
                    <div className="process-timeline-v2__icon" aria-hidden="true">
                      <Icon strokeWidth={1.65} />
                    </div>
                    <h3>{step.title}</h3>
                    <i aria-hidden="true" />
                    <p>{step.description}</p>
                    <span className="process-timeline-v2__badge">
                      <CheckCircle2 aria-hidden="true" />
                      {step.badge}
                    </span>
                  </article>

                  {index < steps.length - 1 ? (
                    <motion.span
                      className="process-timeline-v2__connector"
                      aria-hidden="true"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        delay: 0.42 + index * 0.1,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <ArrowRight />
                    </motion.span>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="process-timeline-v2__summary"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          custom={0.74}
        >
          <div>
            <span>Current Stage</span>
            <strong>05 FINAL HANDOVER</strong>
          </div>
          <ul aria-label="Final handover checklist">
            {checklist.map((item) => (
              <li key={item}>
                <CheckCircle2 aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
