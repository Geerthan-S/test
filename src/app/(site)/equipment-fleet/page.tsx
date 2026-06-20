import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, Truck, Zap } from "lucide-react";
import { getEquipment, type EquipmentItem } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Equipment Fleet | Dockside Constructions",
  description:
    "Explore Dockside Constructions' owned heavy equipment fleet — excavators, graders, rollers, transit mixers and cranes deployed across all active project sites.",
};

function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <article className="equipment-card">
      <div className="equipment-card__image">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="equipment-card__placeholder">
            <Truck aria-hidden="true" />
          </div>
        )}
        <span className="equipment-card__qty">
          <Package className="size-3" aria-hidden="true" />
          {item.quantity} {item.quantity === 1 ? "Unit" : "Units"}
        </span>
        <span className={`equipment-card__status equipment-card__status--${item.status.toLowerCase()}`}>
          {item.status}
        </span>
      </div>
      <div className="equipment-card__body">
        <h3>{item.name}</h3>
        <dl className="equipment-card__specs">
          {item.capacity && (
            <div>
              <dt>
                <Zap className="size-3" aria-hidden="true" /> Capacity
              </dt>
              <dd>{item.capacity}</dd>
            </div>
          )}
          {item.manufacturer && (
            <div>
              <dt>Manufacturer</dt>
              <dd>{item.manufacturer}</dd>
            </div>
          )}
          {item.year && (
            <div>
              <dt>Year</dt>
              <dd>{item.year}</dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}

export default async function EquipmentFleetPage() {
  const equipment = await getEquipment();
  const totalUnits = equipment.reduce((sum, e) => sum + e.quantity, 0);

  return (
    <div className="fleet-page">
      {/* Page Hero */}
      <section className="fleet-hero">
        <div className="fleet-hero__inner">
          <span className="fleet-hero__eyebrow">Our Fleet</span>
          <h1>Heavy Equipment Fleet</h1>
          <p>
            Owned and maintained machinery deployed across all active project sites — ensuring
            schedule certainty and equipment reliability on every assignment.
          </p>
          <div className="fleet-hero__stats">
            <div className="fleet-stat">
              <strong>{totalUnits}+</strong>
              <span>Machines Deployed</span>
            </div>
            <div className="fleet-stat">
              <strong>100%</strong>
              <span>Owned Fleet</span>
            </div>
            <div className="fleet-stat">
              <strong>{equipment.length}</strong>
              <span>Equipment Types</span>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="fleet-grid-section">
        <div className="fleet-grid-section__inner">
          <div className="equipment-grid">
            {equipment.map((item) => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fleet-cta">
        <div className="fleet-cta__inner">
          <h2>Need Equipment for Your Project?</h2>
          <p>
            Contact us to discuss mobilisation timelines, site requirements and fleet availability.
          </p>
          <Link href="/contact" className="cta-btn cta-btn--primary">
            Contact Us <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
