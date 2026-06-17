export default function ServicesLoading() {
  return (
    <main className="services-conversion-page services-loading flex-1" aria-label="Loading services">
      <section className="services-loading__hero">
        <div />
        <div />
      </section>
      <section className="services-loading__filters">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} />
        ))}
      </section>
      <section className="services-loading__grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <article key={index}>
            <span />
            <div />
            <p />
            <p />
          </article>
        ))}
      </section>
    </main>
  );
}
