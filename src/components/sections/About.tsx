import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealText } from "@/components/motion/reveal";

export function About() {
  return (
    <section className="studio-section studio-about premium-section">
      <SectionLabel value="02 / COMPANY" />
      <div className="studio-section__content">
        <RevealText>
          <h2>Building serious infrastructure with site discipline and executive-grade controls.</h2>
        </RevealText>
        <Reveal delay={0.08}>
          <div className="studio-about__text">
            <p>
              Dockside Constructions Private Limited is a professionally driven
              infrastructure company delivering civil, industrial, logistics, road,
              electrical and drainage works across active, high-accountability sites.
            </p>
            <p>
              The new digital experience frames DCPL as an execution partner for owners
              who need controlled delivery, documented quality, responsive supervision and
              long-term asset value rather than generic construction promises.
            </p>
          </div>
          <div className="premium-proof-grid">
            {[
              ["01", "Engineering planning", "Scope, sequence, survey and milestone governance before mobilization."],
              ["02", "Controlled execution", "Civil, structural, utilities and site logistics coordinated through QA gates."],
              ["03", "Handover confidence", "Documentation, safety systems and owner-ready closeout discipline."],
            ].map(([no, title, text]) => (
              <article key={title}>
                <span>{no}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
