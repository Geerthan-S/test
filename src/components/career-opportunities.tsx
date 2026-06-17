import Link from "next/link";
import { ArrowRight, GraduationCap, HardHat, TrendingUp } from "lucide-react";
import { applicationTimeline, careerOpenings, employeeBenefits } from "@/lib/content";

export function CareerOpportunities() {
  return (
    <section className="career-opportunities">
      <div className="career-opportunities__header">
        <span>Careers at Dockside</span>
        <h2>Growth paths for people who learn best through serious site work.</h2>
        <p>
          Build practical capability through guided site learning, engineering exposure
          and clear expectations from day one.
        </p>
      </div>

      <div className="career-benefit-grid" data-stagger-reveal>
        {employeeBenefits.map((benefit, index) => {
          const Icon = [GraduationCap, TrendingUp, HardHat, ArrowRight][index] ?? HardHat;
          return (
            <article key={benefit.title}>
              <Icon className="size-5" aria-hidden="true" />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          );
        })}
      </div>

      <div className="career-role-grid">
        <div>
          <span>Current openings</span>
          <h3>Roles with real project responsibility</h3>
        </div>
        <div className="career-role-list">
          {careerOpenings.map((role) => (
            <details className="career-role-card" key={role.title}>
              <summary>
                <span>
                  <strong>{role.title}</strong>
                  <em>{role.meta}</em>
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </summary>
              <p>{role.text}</p>
              <ul>
                {role.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/contact">Apply now</Link>
            </details>
          ))}
        </div>
      </div>

      <div className="career-application-timeline">
        {applicationTimeline.map((step, index) => (
          <article key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
