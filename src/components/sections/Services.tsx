import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ClipboardList,
  Droplets,
  Factory,
  HardHat,
  TrainTrack,
  TrafficCone,
  Zap,
} from "lucide-react";
import { serviceCategories } from "@/lib/content";

const serviceIcons = {
  "civil-construction": Building2,
  "road-highways": HardHat,
  "railway-works": TrainTrack,
  "electrical-works": Zap,
  "industrial-projects": Factory,
  "project-management": ClipboardList,
  "water-infrastructure-drainage-works": Droplets,
  "road-safety-traffic-management-systems": TrafficCone,
} as const;

export function Services() {
  return (
    <section className="premium-services industries-served" id="services">
      <div className="premium-services__header">
        <div className="premium-section-heading" data-stagger-reveal>
          <span>Core services</span>
          <h2>WHAT DOCKSIDE DELIVERS</h2>
        </div>
      </div>
      <div className="premium-services__grid industries-served__grid" data-stagger-reveal>
        {serviceCategories.map((service) => {
          const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? Building2;
          return (
            <article key={service.slug} className="premium-service-card industry-card hoverable">
              <Image
                src={service.image}
                alt=""
                fill
                loading="eager"
                sizes="(min-width: 1200px) 24vw, (min-width: 700px) 48vw, 92vw"
              />
              <div className="industry-card__shade" />
              <Link
                href="/services"
                className="industry-card__inner"
                aria-label={`View services including ${service.title}`}
              >
                <Icon className="size-6" aria-hidden="true" />
                <h3>{service.title}</h3>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
