//ivexia\components\AccordSection.jsx
"use client";
import countriesTopo from "world-atlas/countries-110m.json";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { feature } from "topojson-client";
import { geoCentroid } from "d3-geo";
import { useLanguage } from "@/contexts/LanguageContext";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });
const OCEAN_TEXTURE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><rect width='8' height='8' fill='%23f8f8f8'/></svg>";
const FIXED_ALTITUDE = 1.35;

const regions = [
  {
    id: "asia",
    label: "Asia",
    paragraphs: [
      "Positive regulatory trends are helping many Asian countries integrate into global markets and accelerating demand for advanced healthcare solutions.",
      "Across East Asia, ASEAN and South Asian markets, we continue expanding access with affordable products tailored to low and middle income demographics.",
    ],
    lat: 20,
    lon: 95,
    altitude: 1.8,
  },
  {
    id: "africa",
    label: "Africa",
    paragraphs: [
      "A focused regional strategy and dedicated development execution continue to strengthen market adaptation across the African region.",
      "With a strong distribution network across West, North, East and Southern Africa, growth remains consistent in both large and emerging markets.",
    ],
    lat: 5,
    lon: 20,
    altitude: 1.9,
  },
  {
    id: "north-america",
    label: "North America",
    paragraphs: [
      "High innovation maturity and robust healthcare infrastructure make North America a critical market for premium and specialty offerings.",
      "Our model emphasizes regulatory responsiveness and strong channel partnerships to support consistent scale across the US, Canada and nearby markets.",
    ],
    lat: 38,
    lon: -100,
    altitude: 1.85,
  },
  {
    id: "latin-america",
    label: "Latin America",
    paragraphs: [
      "Latin America presents a high-potential mix of established and fast-rising markets where localized strategy drives long-term growth.",
      "From Mexico to the Southern Cone, country-by-country adaptation helps us deliver quality, cost-effective healthcare solutions with speed.",
    ],
    lat: -15,
    lon: -62,
    altitude: 1.9,
  },
  {
    id: "middle-east",
    label: "Middle East",
    paragraphs: [
      "The Middle East remains strategically important due to improving regulatory ecosystems and strong investments in healthcare modernization.",
      "By aligning with regional procurement models and distribution ecosystems, we are expanding reliable access to essential therapies.",
    ],
    lat: 28,
    lon: 45,
    altitude: 2,
  },
  {
    id: "europe",
    label: "Europe",
    paragraphs: [
      "Europe continues to offer stable, high-compliance markets with strong demand for quality-driven, evidence-backed healthcare products.",
      "Our focus is on long-term partnerships, supply reliability and differentiated portfolio positioning across both mature and growth corridors.",
    ],
    lat: 50,
    lon: 12,
    altitude: 1.95,
  },
];

function isInRange(lat, lon, bounds) {
  return lat >= bounds.minLat && lat <= bounds.maxLat && lon >= bounds.minLon && lon <= bounds.maxLon;
}

function getRegionByCoord(lat, lon) {
  if (isInRange(lat, lon, { minLat: 12, maxLat: 42, minLon: 30, maxLon: 65 })) {
    return "middle-east";
  }

  if (isInRange(lat, lon, { minLat: 34, maxLat: 72, minLon: -25, maxLon: 45 })) {
    return "europe";
  }

  if (isInRange(lat, lon, { minLat: -35, maxLat: 37, minLon: -20, maxLon: 55 })) {
    return "africa";
  }

  if (isInRange(lat, lon, { minLat: 7, maxLat: 84, minLon: -170, maxLon: -30 })) {
    return "north-america";
  }

  if (isInRange(lat, lon, { minLat: -56, maxLat: 33, minLon: -120, maxLon: -30 })) {
    return "latin-america";
  }

  return "asia";
}

export default function GlobalPresence3D() {
  const { translations } = useLanguage();
  const [activeId, setActiveId] = useState("asia");
  const [canvasSize, setCanvasSize] = useState({ width: 520, height: 520 });
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const containerRef = useRef(null);
  const globeRef = useRef(null);

  const translatedRegions = useMemo(() => {
    return regions.map(region => ({
      ...region,
      label: translations?.accordSection?.regions?.[region.id]?.label || region.label,
      paragraphs: [
        translations?.accordSection?.regions?.[region.id]?.paragraphs?.[0] || region.paragraphs[0],
        translations?.accordSection?.regions?.[region.id]?.paragraphs?.[1] || region.paragraphs[1]
      ]
    }));
  }, [translations]);

  const activeRegion = useMemo(
    () => translatedRegions.find((item) => item.id === activeId) ?? translatedRegions[0],
    [activeId, translatedRegions]
  );

  const polygonsData = useMemo(() => {
    const geo = feature(countriesTopo, countriesTopo.objects.countries).features;

    return geo.map((country) => {
      const [lon, lat] = geoCentroid(country);
      return {
        ...country,
        properties: {
          ...country.properties,
          regionKey: getRegionByCoord(lat, lon),
        },
      };
    });
  }, []);

  const oceanOutlinePaths = useMemo(() => {
    const paths = [];

    for (let lat = -80; lat <= 80; lat += 10) {
      const points = [];
      for (let lon = -180; lon <= 180; lon += 4) points.push([lat, lon, 0.0032]);
      paths.push({ points });
    }

    for (let lon = -180; lon <= 180; lon += 10) {
      const points = [];
      for (let lat = -90; lat <= 90; lat += 4) points.push([lat, lon, 0.0032]);
      paths.push({ points });
    }

    return paths;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = Math.max(280, Math.floor(entry.contentRect.width));
      setCanvasSize((prev) =>
        prev.width === width && prev.height === width ? prev : { width, height: width }
      );
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!globeRef.current || !isGlobeReady) return;
    globeRef.current.pointOfView(
      {
        lat: activeRegion.lat,
        lng: activeRegion.lon,
        altitude: FIXED_ALTITUDE,
      },
      1100
    );
  }, [activeRegion, isGlobeReady]);

  const applyGlobeStyling = useCallback(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();
    controls.enablePan = false;
    controls.enableZoom = false;

    const material = globeRef.current.globeMaterial();
    material.color = new THREE.Color("#c3c4c7");
    material.emissive = new THREE.Color("#babcc1");
    material.emissiveIntensity = 0.12;
    material.shininess = 0.8;
    material.specular = new THREE.Color("#d3d6dc");
    globeRef.current.pointOfView(
      {
        lat: activeRegion.lat,
        lng: activeRegion.lon,
        altitude: FIXED_ALTITUDE,
      },
      0
    );
  }, [activeRegion.lat, activeRegion.lon]);

  const handleGlobeReady = useCallback(() => {
    setIsGlobeReady(true);
    applyGlobeStyling();
  }, [applyGlobeStyling]);

  return (
    <>
    <main className="ivexia-presence min-h-[70vh]">
      <section className="presence-wrap" aria-label="Global presence by region">
        <h1>{translations?.accordSection?.title || "Global Presence"}</h1>

        <div className="presence-grid">
          <nav className="region-nav" aria-label="Region selector">
            {translatedRegions.map((region) => {
              const selected = activeId === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  className={`region-btn ${selected ? "is-active" : ""}`}
                  onClick={() => setActiveId(region.id)}
                  aria-pressed={selected}
                >
                  {region.label}
                </button>
              );
            })}
          </nav>

          <article className="region-copy" aria-live="polite">
            {activeRegion.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </article>

          <div className="globe-shell" aria-hidden="true">
            <div className="globe-canvas" ref={containerRef}>
              <Globe
                ref={globeRef}
                onGlobeReady={handleGlobeReady}
                width={canvasSize.width}
                height={canvasSize.height}
                backgroundColor="rgba(255,255,255,0)"
                globeImageUrl={OCEAN_TEXTURE}
                bumpImageUrl={undefined}
                showAtmosphere
                atmosphereColor="#dde1e6"
                atmosphereAltitude={0.07}
                showGraticules={false}
                polygonsData={polygonsData}
                polygonCapColor={(d) =>
                  d.properties.regionKey === activeId ? "#ff9913" : "#b5bac1"
                  
                }
                polygonSideColor={(d) =>
                  d.properties.regionKey === activeId ? "#FF7A00" : "#b5bac1"
                }
                polygonStrokeColor={(d) =>
                  d.properties.regionKey === activeId ? "#EC5135" : "#e7ebef"
                }
                polygonAltitude={(d) => (d.properties.regionKey === activeId ? 0.022 : 0.01)}
                polygonsTransitionDuration={450}
                pathsData={oceanOutlinePaths}
                pathPoints="points"
                pathPointLat={(p) => p[0]}
                pathPointLng={(p) => p[1]}
                pathPointAlt={(p) => p[2]}
                pathColor={() => "rgba(179,186,196,0.95)"}
                pathStroke={0.34}
                pathResolution={1}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
    <style jsx>{`
      .ivexia-presence {
        --ink: #0d2d47;
        --panel: #fff8f5;
        --line: rgba(13, 45, 71, 0.15);
        
        padding: 4px 16px;
      }

      .ivexia-presence .presence-wrap {
        max-width: 980px;
        margin: 0 auto;
        margin-bottom: 0;
      }

      .ivexia-presence .presence-wrap h1 {
        font-size: clamp(1.8rem, 3vw, 2.5rem);
        font-weight: 700;
        color: #0d2d47;
        margin-bottom: 32px;
      }

      .ivexia-presence .presence-grid {
        display: grid;
        grid-template-columns: 190px 1fr 300px;
        gap: 30px;
        padding: 0 18px;
        background: var(--panel);
        border-radius: 8px;
        align-items: center;
      }

      .ivexia-presence .region-nav {
        border-right: 1px solid var(--line);
        padding: 20px 0;
      }

      .ivexia-presence .region-btn {
        width: 100%;
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid var(--line);
        background: transparent;
        color: var(--ink);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .ivexia-presence .region-btn:first-child {
        border-top: 1px solid var(--line);
      }

      .ivexia-presence .region-btn:hover {
        background: rgba(255, 122, 0, 0.1);
      }

      .ivexia-presence .region-btn.is-active {
        border: 2px solid #ff7a00;
        background: linear-gradient(
          90deg,
          rgba(255, 122, 0, 0.15),
          rgba(226, 0, 79, 0.1)
        );
      }

      .ivexia-presence .region-copy {
        max-width: 520px;
      }

      .ivexia-presence .region-copy p {
        color: var(--ink);
        font-size: 1.15rem;
        line-height: 1.55;
        font-weight: 400;
        margin-bottom: 14px;
      }

      .ivexia-presence .globe-shell {
        display: flex;
        justify-content: flex-end;
        margin-right: -120px;
      }

      .ivexia-presence .globe-canvas {
        width: 350px;
        aspect-ratio: 1;
        border-radius: 50%;
        overflow: hidden;
        background: radial-gradient(circle, #f3f7fb, #e6eef7);
        box-shadow: 0 20px 30px rgba(13, 45, 71, 0.15);
      }

      /* Tablet */
      @media (max-width: 1000px) {
        .ivexia-presence .presence-grid {
          grid-template-columns: 170px 1fr;
        }

        .ivexia-presence .globe-shell {
          margin-right: 0;
        }
      }

      /* Mobile */
      @media (max-width: 920px) {
        .ivexia-presence .presence-grid {
          grid-template-columns: 1fr;
        }

        .ivexia-presence .globe-shell {
          justify-content: center;
          margin: 0;
        }

        .ivexia-presence .globe-canvas {
          width: 280px;
        }

        .ivexia-presence .globe-canvas canvas {
          transform: scale(1.4);
          transform-origin: center;
        }
      }
    `}</style>
    </>
  );
}