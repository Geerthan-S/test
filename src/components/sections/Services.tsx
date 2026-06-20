import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────────
   Inline SVG Illustrations – vector art for each service category
───────────────────────────────────────────────────────────────────────────── */

function IllustrationCivilConstruction() {
  return (
    <svg viewBox="0 0 280 165" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Sky gradient fill */}
      <rect width="280" height="165" fill="#f9f7f5" />
      {/* Ground */}
      <rect x="0" y="148" width="280" height="5" rx="1" fill="#ddd0ca" />
      {/* Soil mound */}
      <ellipse cx="72" cy="149" rx="55" ry="8" fill="#d4c5be" />
      {/* Building steel frame - columns */}
      <rect x="90" y="45" width="6" height="105" fill="#c9bdb7" />
      <rect x="145" y="28" width="6" height="122" fill="#c9bdb7" />
      <rect x="200" y="45" width="6" height="105" fill="#c9bdb7" />
      {/* Horizontal beams */}
      <rect x="90" y="45" width="116" height="5" fill="#b8aeaa" />
      <rect x="90" y="88" width="116" height="5" fill="#b8aeaa" />
      <rect x="90" y="128" width="116" height="5" fill="#b8aeaa" />
      {/* Diagonal braces */}
      <line x1="90" y1="45" x2="145" y2="88" stroke="#c9bdb7" strokeWidth="2" />
      <line x1="145" y1="45" x2="90" y2="88" stroke="#c9bdb7" strokeWidth="2" />
      <line x1="145" y1="88" x2="200" y2="128" stroke="#c9bdb7" strokeWidth="2" />
      {/* Crane tower */}
      <rect x="200" y="8" width="6" height="110" fill="#8b3f4a" />
      {/* Crane jib */}
      <rect x="200" y="8" width="68" height="5" fill="#8b3f4a" />
      {/* Counter-jib */}
      <rect x="170" y="8" width="30" height="4" fill="#7a1c24" />
      <rect x="163" y="6" width="10" height="10" rx="1" fill="#7a1c24" />
      {/* Pendant rope */}
      <line x1="262" y1="13" x2="262" y2="62" stroke="#8b3f4a" strokeWidth="1.5" />
      {/* Hook */}
      <rect x="255" y="60" width="14" height="11" rx="2" fill="#7a1c24" />
      <line x1="262" y1="71" x2="262" y2="78" stroke="#666" strokeWidth="1.5" />
      <path d="M256 78 Q262 84 268 78" stroke="#666" strokeWidth="1.5" fill="none" />
      {/* Excavator body */}
      <rect x="14" y="120" width="78" height="30" rx="5" fill="#8b3f4a" />
      {/* Cab */}
      <rect x="24" y="105" width="46" height="22" rx="3" fill="#7a1c24" />
      {/* Cab window */}
      <rect x="30" y="109" width="16" height="11" rx="2" fill="#9ec5d0" opacity="0.85" />
      {/* Boom arm */}
      <line x1="72" y1="108" x2="98" y2="90" stroke="#8b3f4a" strokeWidth="7" strokeLinecap="round" />
      <line x1="98" y1="90" x2="112" y2="115" stroke="#7a1c24" strokeWidth="5" strokeLinecap="round" />
      {/* Bucket */}
      <path d="M107 112 L120 120 L113 136 L98 128 Z" fill="#7a1c24" />
      <line x1="113" y1="136" x2="116" y2="143" stroke="#555" strokeWidth="2" />
      {/* Tracks */}
      <rect x="12" y="147" width="82" height="8" rx="4" fill="#444" />
      <circle cx="22" cy="151" r="4.5" fill="#666" />
      <circle cx="85" cy="151" r="4.5" fill="#666" />
      <circle cx="53" cy="151" r="3" fill="#555" />
    </svg>
  );
}

function IllustrationRoadHighways() {
  return (
    <svg viewBox="0 0 280 165" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="280" height="165" fill="#f9f7f5" />
      {/* Sky */}
      <rect x="0" y="0" width="280" height="90" fill="#eef3f7" />
      {/* Horizon city silhouette */}
      <rect x="60" y="65" width="18" height="28" fill="#d5ceca" />
      <rect x="82" y="55" width="12" height="38" fill="#ccc3be" />
      <rect x="98" y="70" width="20" height="23" fill="#d5ceca" />
      <rect x="160" y="60" width="14" height="33" fill="#d0c8c3" />
      <rect x="178" y="50" width="10" height="43" fill="#c8bfba" />
      <rect x="192" y="66" width="22" height="27" fill="#d5ceca" />
      {/* Road - perspective taper */}
      <path d="M0 165 L100 92 L180 92 L280 165 Z" fill="#bdb4ae" />
      {/* Road surface */}
      <path d="M10 165 L105 95 L175 95 L270 165 Z" fill="#c8bfb8" />
      {/* Road edge markings */}
      <path d="M10 165 L105 95" stroke="#ddd5ce" strokeWidth="3" />
      <path d="M270 165 L175 95" stroke="#ddd5ce" strokeWidth="3" />
      {/* Center dashes */}
      <line x1="140" y1="97" x2="140" y2="108" stroke="#fff" strokeWidth="3" strokeDasharray="8,10" transform="perspective(200) rotateX(30deg)" />
      <path d="M133 97 L134 107" stroke="#ede8e4" strokeWidth="3" />
      <path d="M135 110 L136 122" stroke="#ede8e4" strokeWidth="3" />
      <path d="M137 126 L138 140" stroke="#ede8e4" strokeWidth="3" />
      <path d="M139 145 L140 160" stroke="#ede8e4" strokeWidth="3" />
      {/* Road roller body */}
      <rect x="78" y="100" width="90" height="42" rx="5" fill="#8b3f4a" />
      {/* Cab */}
      <rect x="112" y="87" width="52" height="22" rx="4" fill="#7a1c24" />
      {/* Cab window */}
      <rect x="118" y="91" width="22" height="12" rx="2" fill="#9ec5d0" opacity="0.85" />
      {/* Cab roof light */}
      <rect x="128" y="83" width="8" height="5" rx="1" fill="#e8c84a" />
      {/* Rear roller drum */}
      <ellipse cx="95" cy="143" rx="16" ry="10" fill="#555" />
      <ellipse cx="95" cy="143" rx="11" ry="6" fill="#666" />
      {/* Front roller drum */}
      <ellipse cx="156" cy="143" rx="16" ry="10" fill="#555" />
      <ellipse cx="156" cy="143" rx="11" ry="6" fill="#666" />
      {/* Drum bolts */}
      <circle cx="95" cy="143" r="3" fill="#888" />
      <circle cx="156" cy="143" r="3" fill="#888" />
      {/* Smoke from exhaust */}
      <circle cx="165" cy="83" r="4" fill="#ccc" opacity="0.6" />
      <circle cx="168" cy="76" r="3" fill="#ccc" opacity="0.4" />
      {/* Lamp posts on road edge */}
      <rect x="105" y="82" width="3" height="16" fill="#aaa" />
      <ellipse cx="106" cy="80" rx="6" ry="4" fill="#ddd" />
      <rect x="172" y="82" width="3" height="16" fill="#aaa" />
      <ellipse cx="173" cy="80" rx="6" ry="4" fill="#ddd" />
    </svg>
  );
}

function IllustrationRailwayWorks() {
  return (
    <svg viewBox="0 0 280 165" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="280" height="165" fill="#eef3f7" />
      {/* Sky gradient */}
      <rect width="280" height="100" fill="#e8eef4" />
      {/* Mountain / distant landscape */}
      <path d="M0 100 L40 60 L80 90 L120 50 L170 85 L210 55 L250 80 L280 65 L280 100 Z" fill="#ddd5d0" />
      <path d="M0 100 L50 75 L100 88 L150 68 L200 82 L250 72 L280 78 L280 100 Z" fill="#cfc6c0" />
      {/* Ground / track bed */}
      <rect x="0" y="135" width="280" height="30" fill="#d4ccc6" />
      {/* Gravel/ballast */}
      <path d="M0 132 L280 132 L280 140 L0 140 Z" fill="#c8beb8" />
      {/* Rails */}
      <rect x="0" y="128" width="280" height="5" rx="1" fill="#7a7a7a" />
      <rect x="0" y="140" width="280" height="5" rx="1" fill="#7a7a7a" />
      {/* Sleepers/ties */}
      {[10, 40, 70, 100, 130, 160, 190, 220, 250].map((x) => (
        <rect key={x} x={x} y="125" width="18" height="22" rx="2" fill="#8a7a72" />
      ))}
      {/* Locomotive body */}
      <rect x="28" y="88" width="160" height="45" rx="6" fill="#8b3f4a" />
      {/* Front nose */}
      <path d="M188 88 L188 133 L215 125 L215 96 Z" fill="#7a1c24" />
      {/* Front cow-catcher */}
      <path d="M215 96 L228 99 L228 121 L215 125 Z" fill="#6a1520" />
      {/* Cab section */}
      <rect x="30" y="72" width="65" height="22" rx="4" fill="#7a1c24" />
      {/* Cab windows */}
      <rect x="38" y="76" width="18" height="12" rx="2" fill="#9ec5d0" opacity="0.9" />
      <rect x="62" y="76" width="14" height="12" rx="2" fill="#9ec5d0" opacity="0.9" />
      {/* Side windows on body */}
      <rect x="105" y="95" width="22" height="16" rx="2" fill="#9ec5d0" opacity="0.6" />
      <rect x="135" y="95" width="22" height="16" rx="2" fill="#9ec5d0" opacity="0.6" />
      <rect x="165" y="95" width="18" height="16" rx="2" fill="#9ec5d0" opacity="0.5" />
      {/* Red stripe */}
      <rect x="28" y="120" width="198" height="5" fill="#c02040" />
      {/* Wheels */}
      <circle cx="70" cy="135" r="13" fill="#333" />
      <circle cx="70" cy="135" r="7" fill="#555" />
      <circle cx="70" cy="135" r="3" fill="#888" />
      <circle cx="110" cy="135" r="13" fill="#333" />
      <circle cx="110" cy="135" r="7" fill="#555" />
      <circle cx="110" cy="135" r="3" fill="#888" />
      <circle cx="150" cy="135" r="13" fill="#333" />
      <circle cx="150" cy="135" r="7" fill="#555" />
      <circle cx="150" cy="135" r="3" fill="#888" />
      <circle cx="195" cy="135" r="10" fill="#333" />
      <circle cx="195" cy="135" r="5" fill="#555" />
      {/* Exhaust / steam */}
      <ellipse cx="42" cy="68" rx="8" ry="5" fill="#ddd" opacity="0.7" />
      <ellipse cx="46" cy="60" rx="6" ry="4" fill="#ccc" opacity="0.5" />
      <ellipse cx="42" cy="53" rx="5" ry="3" fill="#bbb" opacity="0.35" />
      {/* Headlight */}
      <circle cx="220" cy="110" r="6" fill="#f5e070" opacity="0.9" />
      <circle cx="220" cy="110" r="3" fill="#fff" />
    </svg>
  );
}

function IllustrationElectricalWorks() {
  return (
    <svg viewBox="0 0 280 165" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="280" height="165" fill="#f0f4f8" />
      {/* Sky */}
      <rect width="280" height="110" fill="#e8eef5" />
      {/* Distant city / facility silhouette */}
      <rect x="0" y="95" width="280" height="20" fill="#ddd5cf" />
      <rect x="20" y="75" width="20" height="25" fill="#cfc8c2" />
      <rect x="45" y="68" width="14" height="32" fill="#c8c0ba" />
      <rect x="220" y="72" width="18" height="28" fill="#cfc8c2" />
      <rect x="244" y="64" width="12" height="36" fill="#c8c0ba" />
      {/* Ground */}
      <rect x="0" y="148" width="280" height="17" fill="#d5cdc7" />
      <rect x="0" y="143" width="280" height="6" fill="#cfc5be" />
      {/* Left transmission tower */}
      <line x1="40" y1="145" x2="55" y2="20" stroke="#8b3f4a" strokeWidth="3" />
      <line x1="72" y1="145" x2="57" y2="20" stroke="#8b3f4a" strokeWidth="3" />
      <line x1="38" y1="145" x2="74" y2="145" stroke="#8b3f4a" strokeWidth="2" />
      {/* Left tower cross arms */}
      <line x1="30" y1="52" x2="82" y2="52" stroke="#8b3f4a" strokeWidth="2.5" />
      <line x1="34" y1="70" x2="78" y2="70" stroke="#8b3f4a" strokeWidth="2.5" />
      <line x1="37" y1="88" x2="75" y2="88" stroke="#7a1c24" strokeWidth="2.5" />
      {/* Left tower horizontals */}
      <line x1="43" y1="105" x2="69" y2="105" stroke="#8b3f4a" strokeWidth="2" />
      <line x1="45" y1="120" x2="67" y2="120" stroke="#8b3f4a" strokeWidth="2" />
      <line x1="47" y1="133" x2="65" y2="133" stroke="#8b3f4a" strokeWidth="2" />
      {/* Insulators left */}
      <circle cx="30" cy="52" r="3" fill="#ddd" stroke="#999" strokeWidth="1" />
      <circle cx="82" cy="52" r="3" fill="#ddd" stroke="#999" strokeWidth="1" />
      <circle cx="34" cy="70" r="3" fill="#ddd" stroke="#999" strokeWidth="1" />
      <circle cx="78" cy="70" r="3" fill="#ddd" stroke="#999" strokeWidth="1" />
      {/* Right (main) transmission tower – larger */}
      <line x1="170" y1="145" x2="192" y2="12" stroke="#8b3f4a" strokeWidth="4" />
      <line x1="220" y1="145" x2="198" y2="12" stroke="#8b3f4a" strokeWidth="4" />
      <line x1="168" y1="145" x2="222" y2="145" stroke="#8b3f4a" strokeWidth="3" />
      {/* Right tower cross arms */}
      <line x1="152" y1="38" x2="240" y2="38" stroke="#8b3f4a" strokeWidth="3" />
      <line x1="158" y1="62" x2="234" y2="62" stroke="#8b3f4a" strokeWidth="3" />
      <line x1="163" y1="82" x2="230" y2="82" stroke="#7a1c24" strokeWidth="3" />
      {/* Right tower horizontals */}
      <line x1="175" y1="102" x2="215" y2="102" stroke="#8b3f4a" strokeWidth="2" />
      <line x1="178" y1="118" x2="212" y2="118" stroke="#8b3f4a" strokeWidth="2" />
      <line x1="180" y1="132" x2="210" y2="132" stroke="#8b3f4a" strokeWidth="2" />
      {/* Insulators right */}
      <circle cx="152" cy="38" r="4" fill="#eee" stroke="#999" strokeWidth="1" />
      <circle cx="240" cy="38" r="4" fill="#eee" stroke="#999" strokeWidth="1" />
      <circle cx="158" cy="62" r="4" fill="#eee" stroke="#999" strokeWidth="1" />
      <circle cx="234" cy="62" r="4" fill="#eee" stroke="#999" strokeWidth="1" />
      <circle cx="163" cy="82" r="4" fill="#eee" stroke="#999" strokeWidth="1" />
      <circle cx="230" cy="82" r="4" fill="#eee" stroke="#999" strokeWidth="1" />
      {/* Power lines between towers */}
      <path d="M30 52 Q105 72 152 38" stroke="#555" strokeWidth="1.5" fill="none" />
      <path d="M82 52 Q130 65 240 38" stroke="#555" strokeWidth="1.5" fill="none" />
      <path d="M34 70 Q105 82 158 62" stroke="#555" strokeWidth="1.5" fill="none" />
      {/* Lightning bolt on tower */}
      <path d="M192 28 L186 42 L192 42 L186 58 L200 40 L194 40 L200 28 Z" fill="#e8c84a" />
    </svg>
  );
}

function IllustrationIndustrialProjects() {
  return (
    <svg viewBox="0 0 280 165" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="280" height="165" fill="#f5f3f1" />
      {/* Sky */}
      <rect width="280" height="95" fill="#eaecef" />
      {/* Ground */}
      <rect x="0" y="148" width="280" height="17" fill="#d0c8c2" />
      {/* Warehouse main building */}
      {/* Roof */}
      <path d="M20 95 L140 65 L260 95 Z" fill="#c0b6b0" />
      <path d="M20 95 L22 95 L142 66 L140 65 Z" fill="#b0a7a0" />
      {/* Building walls */}
      <rect x="20" y="95" width="240" height="55" fill="#d4ccc6" />
      {/* Facade panels */}
      <rect x="20" y="95" width="240" height="8" fill="#c8bfb8" />
      {/* Large industrial doors - left */}
      <rect x="32" y="118" width="45" height="32" rx="2" fill="#b8b0a8" />
      <rect x="34" y="120" width="20" height="28" fill="#aca3a0" />
      <rect x="56" y="120" width="19" height="28" fill="#aca3a0" />
      <line x1="54" y1="120" x2="54" y2="148" stroke="#9a9290" strokeWidth="2" />
      <rect x="32" y="118" width="45" height="3" fill="#8b3f4a" />
      {/* Loading dock */}
      <rect x="32" y="144" width="45" height="6" fill="#999" />
      {/* Second door */}
      <rect x="95" y="118" width="40" height="32" rx="2" fill="#b8b0a8" />
      <rect x="97" y="120" width="17" height="28" fill="#aca3a0" />
      <rect x="116" y="120" width="17" height="28" fill="#aca3a0" />
      <line x1="115" y1="120" x2="115" y2="148" stroke="#9a9290" strokeWidth="2" />
      <rect x="95" y="118" width="40" height="3" fill="#8b3f4a" />
      {/* Windows strip */}
      {[155, 175, 195, 215, 235].map((x) => (
        <rect key={x} x={x} y="104" width="16" height="10" rx="1" fill="#9ec5d0" opacity="0.7" />
      ))}
      {/* Skylights on roof */}
      <rect x="70" y="75" width="50" height="8" rx="2" fill="#9ec5d0" opacity="0.5" />
      <rect x="145" y="71" width="50" height="8" rx="2" fill="#9ec5d0" opacity="0.5" />
      {/* Smoke stack */}
      <rect x="240" y="42" width="14" height="55" fill="#bbb5b0" />
      <ellipse cx="247" cy="42" rx="7" ry="4" fill="#ccc" />
      <ellipse cx="247" cy="34" rx="9" ry="6" fill="#ddd" opacity="0.6" />
      <ellipse cx="244" cy="26" rx="7" ry="5" fill="#ccc" opacity="0.45" />
      {/* Forklift */}
      <rect x="12" y="128" width="28" height="20" rx="3" fill="#8b3f4a" />
      <rect x="18" y="120" width="16" height="12" rx="2" fill="#7a1c24" />
      <rect x="38" y="126" width="3" height="22" fill="#555" />
      <rect x="33" y="124" width="12" height="3" fill="#777" />
      <rect x="37" y="127" width="4" height="20" fill="#666" />
      <circle cx="18" cy="148" r="5" fill="#333" />
      <circle cx="33" cy="148" r="5" fill="#333" />
      {/* Pallet */}
      <rect x="38" y="121" width="14" height="6" fill="#c8a060" />
      <rect x="40" y="117" width="10" height="5" fill="#d4b070" />
      {/* Fence/perimeter */}
      <line x1="0" y1="148" x2="280" y2="148" stroke="#bbb0a8" strokeWidth="2" />
    </svg>
  );
}

function IllustrationProjectManagement() {
  return (
    <svg viewBox="0 0 280 165" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="280" height="165" fill="#f8f6f3" />
      {/* Clipboard body */}
      <rect x="60" y="25" width="145" height="125" rx="6" fill="#e8e0d8" stroke="#cdc4bc" strokeWidth="1.5" />
      {/* Clipboard clip */}
      <rect x="110" y="18" width="45" height="20" rx="4" fill="#8b3f4a" />
      <rect x="118" y="22" width="29" height="10" rx="2" fill="#7a1c24" />
      {/* Clipboard paper */}
      <rect x="68" y="38" width="129" height="105" rx="2" fill="#fdfaf7" />
      {/* Header line */}
      <rect x="76" y="46" width="113" height="4" rx="2" fill="#ddd5ce" />
      {/* Bar chart title */}
      <rect x="76" y="58" width="65" height="3" rx="1" fill="#ccc3bb" />
      {/* Bar chart */}
      <rect x="76" y="90" width="14" height="30" rx="1" fill="#8b3f4a" opacity="0.8" />
      <rect x="94" y="78" width="14" height="42" rx="1" fill="#8b3f4a" />
      <rect x="112" y="84" width="14" height="36" rx="1" fill="#8b3f4a" opacity="0.7" />
      <rect x="130" y="70" width="14" height="50" rx="1" fill="#7a1c24" />
      <rect x="148" y="80" width="14" height="40" rx="1" fill="#8b3f4a" opacity="0.6" />
      {/* Chart baseline */}
      <line x1="76" y1="122" x2="170" y2="122" stroke="#ccc3bb" strokeWidth="1.5" />
      {/* Pie chart */}
      <circle cx="155" cy="82" r="28" fill="#e8e0d8" />
      {/* Pie slices */}
      <path d="M155 82 L155 54 A28 28 0 0 1 183 82 Z" fill="#8b3f4a" />
      <path d="M155 82 L183 82 A28 28 0 0 1 155 110 Z" fill="#c49060" />
      <path d="M155 82 L155 110 A28 28 0 0 1 127 82 Z" fill="#9ec5d0" />
      <path d="M155 82 L127 82 A28 28 0 0 1 155 54 Z" fill="#ddd5ce" />
      {/* Pie center */}
      <circle cx="155" cy="82" r="12" fill="#fdfaf7" />
      {/* Checklist items at bottom */}
      <circle cx="84" cy="133" r="4" fill="#8b3f4a" />
      <path d="M82 133 L83.5 134.5 L86 131.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="92" y="131" width="50" height="3" rx="1" fill="#ccc3bb" />
      <circle cx="84" cy="143" r="4" fill="#8b3f4a" />
      <path d="M82 143 L83.5 144.5 L86 141.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="92" y="141" width="40" height="3" rx="1" fill="#ccc3bb" />
      {/* Hard hat on the right side */}
      <path d="M195 90 Q195 55 228 55 Q262 55 262 90 Z" fill="#8b3f4a" />
      <path d="M197 90 Q197 58 228 58 Q260 58 260 90 Z" fill="#a04858" />
      <rect x="190" y="88" width="77" height="10" rx="3" fill="#7a1c24" />
      {/* Hat brim */}
      <rect x="185" y="94" width="87" height="6" rx="3" fill="#6a1520" />
      {/* Hat vent/stripe */}
      <path d="M228 58 L228 90" stroke="#7a1c24" strokeWidth="2" />
      {/* Hat side mark */}
      <rect x="210" y="68" width="36" height="3" rx="1" fill="#c04060" opacity="0.5" />
    </svg>
  );
}

function IllustrationWaterInfrastructure() {
  return (
    <svg viewBox="0 0 280 165" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="280" height="165" fill="#f0f5f8" />
      {/* Sky/ground gradient */}
      <rect width="280" height="80" fill="#e5eef5" />
      <rect x="0" y="80" width="280" height="85" fill="#d8e5d0" />
      {/* Landscape */}
      <rect x="0" y="148" width="280" height="17" fill="#c8d5be" />
      {/* Earthwork cross-section */}
      <path d="M0 148 L50 95 L230 95 L280 148 Z" fill="#c8bfb8" />
      {/* Culvert / pipe barrel */}
      <ellipse cx="140" cy="130" rx="48" ry="38" fill="#b8b0a8" />
      <ellipse cx="140" cy="130" rx="42" ry="33" fill="#c8c0b8" />
      {/* Inner pipe opening */}
      <ellipse cx="140" cy="130" rx="32" ry="25" fill="#5a8c9a" />
      <ellipse cx="140" cy="130" rx="28" ry="21" fill="#4a7c8a" />
      {/* Water inside pipe */}
      <path d="M112 140 Q140 150 168 140 L168 155 Q140 165 112 155 Z" fill="#3a6c7a" opacity="0.8" />
      {/* Water ripple */}
      <path d="M118 143 Q140 137 162 143" stroke="#6aaabb" strokeWidth="1.5" fill="none" />
      <path d="M122 148 Q140 143 158 148" stroke="#6aaabb" strokeWidth="1.5" fill="none" />
      {/* Concrete headwall left */}
      <rect x="55" y="90" width="28" height="62" rx="2" fill="#b5aba4" />
      <rect x="57" y="92" width="24" height="58" fill="#c0b8b0" />
      {/* Concrete headwall right */}
      <rect x="197" y="90" width="28" height="62" rx="2" fill="#b5aba4" />
      <rect x="199" y="92" width="24" height="58" fill="#c0b8b0" />
      {/* Water flow arrow */}
      <path d="M20 120 L55 130" stroke="#5a9aaa" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 124 L55 130 L49 136" stroke="#5a9aaa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Water flow right side */}
      <path d="M225 130 L258 120" stroke="#5a9aaa" strokeWidth="3" strokeLinecap="round" />
      <path d="M231 124 L225 130 L231 136" stroke="#5a9aaa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Water wave left */}
      <path d="M8 118 Q20 113 30 118 Q40 123 50 118" stroke="#5a9aaa" strokeWidth="2" fill="none" />
      <path d="M8 124 Q22 119 34 124 Q44 129 54 124" stroke="#5a9aaa" strokeWidth="1.5" fill="none" />
      {/* Water wave right */}
      <path d="M228 118 Q240 113 252 118 Q262 123 272 118" stroke="#5a9aaa" strokeWidth="2" fill="none" />
      {/* Measurement markers */}
      <line x1="140" y1="88" x2="140" y2="78" stroke="#8b3f4a" strokeWidth="2" />
      <line x1="120" y1="83" x2="160" y2="83" stroke="#8b3f4a" strokeWidth="2" />
      {/* Top roadway/fill */}
      <rect x="50" y="85" width="180" height="12" rx="2" fill="#bdb5ae" />
      <rect x="50" y="85" width="180" height="4" rx="1" fill="#c8c0b8" />
      {/* Drainage channel top */}
      <path d="M15 60 Q80 72 140 68 Q200 72 265 60 L265 80 Q200 88 140 84 Q80 88 15 80 Z" fill="#a8bec8" opacity="0.5" />
    </svg>
  );
}

function IllustrationRoadSafety() {
  return (
    <svg viewBox="0 0 280 165" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="280" height="165" fill="#f8f5f2" />
      {/* Road */}
      <rect x="0" y="128" width="280" height="37" fill="#c8bfb8" />
      <rect x="0" y="128" width="280" height="5" fill="#b8b0a8" />
      {/* Road dashes */}
      <rect x="10" y="146" width="30" height="5" rx="2" fill="#ddd5ce" />
      <rect x="55" y="146" width="30" height="5" rx="2" fill="#ddd5ce" />
      <rect x="100" y="146" width="30" height="5" rx="2" fill="#ddd5ce" />
      <rect x="145" y="146" width="30" height="5" rx="2" fill="#ddd5ce" />
      <rect x="190" y="146" width="30" height="5" rx="2" fill="#ddd5ce" />
      <rect x="235" y="146" width="35" height="5" rx="2" fill="#ddd5ce" />
      {/* Left barrier post */}
      <rect x="30" y="100" width="8" height="30" rx="1" fill="#777" />
      {/* Barrier body left */}
      <rect x="8" y="106" width="75" height="12" rx="3" fill="#c8c0b8" />
      <rect x="8" y="106" width="75" height="4" rx="2" fill="#e8e0d8" />
      <rect x="8" y="116" width="75" height="3" rx="1" fill="#bbb3aa" />
      {/* Post 2 */}
      <rect x="75" y="100" width="8" height="30" rx="1" fill="#777" />
      {/* Right side: larger barrier section */}
      {/* Post 3 */}
      <rect x="130" y="98" width="8" height="32" rx="1" fill="#777" />
      <rect x="125" y="104" width="40" height="14" rx="3" fill="#d4ccc6" />
      <rect x="125" y="104" width="40" height="5" rx="2" fill="#e8e0d8" />
      {/* Post 4 */}
      <rect x="163" y="98" width="8" height="32" rx="1" fill="#777" />
      {/* Traffic cone left */}
      <path d="M100 130 L88 80 L112 80 Z" fill="#e06000" />
      <path d="M100 130 L91 103 L109 103 Z" fill="#d05500" />
      {/* Cone stripe */}
      <rect x="90" y="100" width="20" height="4" rx="1" fill="#fff" opacity="0.8" />
      <rect x="91" y="108" width="18" height="3" rx="1" fill="#fff" opacity="0.6" />
      {/* Cone base */}
      <rect x="85" y="128" width="30" height="5" rx="2" fill="#c04800" />
      {/* Road work ahead sign */}
      <rect x="180" y="60" width="55" height="50" rx="4" fill="#e8e0d8" stroke="#ccc3bb" strokeWidth="1.5" />
      <rect x="183" y="63" width="49" height="44" rx="3" fill="#fff" />
      {/* Checkmark / approval icon */}
      <circle cx="207" cy="85" r="18" fill="#8b3f4a" />
      <path d="M198 85 L204 91 L217 78" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Sign post */}
      <rect x="205" y="110" width="5" height="20" fill="#aaa" />
      {/* STOP marker */}
      <rect x="218" y="75" width="16" height="6" rx="1" fill="#c02030" />
      <rect x="222" y="69" width="8" height="6" rx="1" fill="#c02030" />
      {/* Traffic light suggestion */}
      <rect x="248" y="45" width="22" height="60" rx="4" fill="#333" />
      <circle cx="259" cy="60" r="7" fill="#e03030" />
      <circle cx="259" cy="75" r="7" fill="#555" />
      <circle cx="259" cy="90" r="7" fill="#30a030" />
      {/* Light pole */}
      <rect x="257" y="105" width="4" height="25" fill="#555" />
      {/* Horizontal arm */}
      <rect x="230" y="48" width="28" height="4" rx="2" fill="#555" />
      {/* Text lines on sign */}
      <rect x="186" y="68" width="38" height="2" rx="1" fill="#e8e0d8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Service card data
───────────────────────────────────────────────────────────────────────────── */
const deliverCards = [
  {
    num: "01",
    slug: "civil-construction",
    title: "Civil Construction",
    tagline: "Building robust foundations for a stronger tomorrow.",
    Illustration: IllustrationCivilConstruction,
  },
  {
    num: "02",
    slug: "road-highways",
    title: "Road & Highways",
    tagline: "Delivering smooth, durable, and safe road infrastructure.",
    Illustration: IllustrationRoadHighways,
  },
  {
    num: "03",
    slug: "railway-works",
    title: "Railway Works",
    tagline: "Engineering reliable rail solutions that connect the future.",
    Illustration: IllustrationRailwayWorks,
  },
  {
    num: "04",
    slug: "electrical-works",
    title: "Electrical Works",
    tagline: "Powering progress with safe and efficient electrical systems.",
    Illustration: IllustrationElectricalWorks,
  },
  {
    num: "05",
    slug: "industrial-projects",
    title: "Industrial Projects",
    tagline: "Creating high-performance industrial spaces for growth and productivity.",
    Illustration: IllustrationIndustrialProjects,
  },
  {
    num: "06",
    slug: "project-management",
    title: "Project Management",
    tagline: "Smart planning, precise execution, successful delivery.",
    Illustration: IllustrationProjectManagement,
  },
  {
    num: "07",
    slug: "water-infrastructure-drainage-works",
    title: "Water Infrastructure & Drainage Works",
    tagline: "Sustainable water and drainage solutions for communities.",
    Illustration: IllustrationWaterInfrastructure,
  },
  {
    num: "08",
    slug: "road-safety-traffic-management-systems",
    title: "Road Safety & Traffic Management Systems",
    tagline: "Enhancing safety and ensuring smooth traffic movement.",
    Illustration: IllustrationRoadSafety,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Section component
───────────────────────────────────────────────────────────────────────────── */
export function Services() {
  return (
    <section className="delivers-section" id="services" aria-label="What Dockside Delivers">
      <div className="delivers-section__inner">
        {/* Header row */}
        <div className="delivers-section__head">
          <div className="delivers-section__headcopy">
            <h2 className="delivers-section__title">WHAT DOCKSIDE DELIVERS</h2>
            <p className="delivers-section__subtitle">
              End‑to‑end infrastructure and civil construction solutions built<br />
              on expertise, technology, and unwavering commitment.
            </p>
          </div>
          <div className="delivers-section__accent-rule" aria-hidden="true" />
          <div className="delivers-section__watermark" aria-hidden="true">
            {/* Stacked chevron watermark */}
            {[0, 14, 28, 42, 56].map((offset) => (
              <svg key={offset} width="52" height="28" viewBox="0 0 52 28" fill="none"
                style={{ opacity: 0.07 + offset * 0.002, marginTop: offset === 0 ? 0 : -4 }}>
                <path d="M2 2 L26 22 L50 2" stroke="#8b3f4a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="delivers-grid">
          {deliverCards.map(({ num, slug, title, tagline, Illustration }) => (
            <Link
              key={slug}
              href="/services"
              className="delivers-card"
              aria-label={`Learn about ${title}`}
            >
              {/* Number badge */}
              <span className="delivers-card__num">{num}</span>

              {/* Illustration */}
              <div className="delivers-card__illustration">
                <Illustration />
              </div>

              {/* Text */}
              <div className="delivers-card__body">
                <h3 className="delivers-card__title">{title.toUpperCase()}</h3>
                <p className="delivers-card__desc">{tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
