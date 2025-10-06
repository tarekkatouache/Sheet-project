import React from "react";

/**
 * ServerRackCard.jsx
 * A small, self-contained React component (single file) that visually represents
 * an empty server rack and displays rack name + info. Uses pure CSS (no Tailwind).
 *
 * Props:
 *  - name: string (rack name/title)
 *  - location: string
 *  - uCount: number (U size, e.g. 42)
 *  - infoLines: array of strings (additional lines to show)
 *  - showSlots: boolean (render empty U slots)
 *
 * Usage:
 *  <ServerRackCard
 *    name="Rack A1"
 *    location="Data Center 1 - Row 2"
 *    uCount={42}
 *    infoLines={["Owner: Ops Team", "Last Audit: 2025-09-01"]}
 *    showSlots={true}
 *  />
 */

export default function ServerRackCard({
  name = "Empty Rack",
  location = "—",
  uCount = 42,
  infoLines = [],
  showSlots = true,
}) {
  // build an array representing U slots (top-to-bottom visual)
  const slots = Array.from({ length: uCount }, (_, i) => ({ id: i + 1 }));

  return (
    <div className="rack-card">
      <style>{`
        .rack-card {
          --card-bg: #0f1724; /* deep slate */
          --panel-bg: #0b1220;
          --accent: #10b981;
          --muted: #9aa4b2;
          width: 320px;
          border-radius: 10px;
          padding: 16px;
          box-sizing: border-box;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02));
          color: #e6eef6;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          box-shadow: 0 6px 18px rgba(2,6,23,0.6);
        }

        .rack-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .rack-title {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.2px;
        }

        .rack-sub {
          font-size: 12px;
          color: var(--muted);
        }

        .rack-body {
          display: flex;
          gap: 12px;
        }

        /* visual rack */
        .rack-visual {
          width: 120px;
          height: 240px;
          background: linear-gradient(180deg, #071022, #07162a);
          border-radius: 6px;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.04);
          position: relative;
          flex-shrink: 0;
        }

        .rail {
          position: absolute;
          top: 6px;
          bottom: 6px;
          width: 6px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius: 2px;
          border: 1px solid rgba(255,255,255,0.03);
        }

        .rail.left { left: 6px; }
        .rail.right { right: 6px; }

        .u-slots {
          height: 100%;
          display: grid;
          grid-template-rows: repeat(${uCount}, 1fr);
          gap: 4px;
          padding: 4px 18px; /* leave space for rails */
          box-sizing: border-box;
          overflow: hidden;
        }

        .u-slot {
          border-radius: 3px;
          border: 1px dashed rgba(255,255,255,0.04);
          background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.02));
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6px;
          font-size: 10px;
          color: rgba(230,238,246,0.7);
        }

        /* small indicator dots on each U */
        .u-slot .dots {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.03);
        }

        .dot.empty { opacity: 0.28; }

        .rack-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-block {
          background: var(--panel-bg);
          border-radius: 8px;
          padding: 8px 10px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.02);
        }

        .info-row { font-size: 13px; }
        .info-row strong { display: block; font-weight: 600; }
        .info-row span { color: var(--muted); font-size: 12px; }

        .info-list { display:flex; flex-direction:column; gap:6px; }

        /* footer small text */
        .rack-footer { margin-top: 10px; font-size: 12px; color: var(--muted); }

        /* responsive */
        @media (max-width: 420px) {
          .rack-card { width: 100%; padding: 12px; }
          .rack-body { flex-direction: row; gap: 10px; }
          .rack-visual { height: 200px; width: 100px; }
        }
      `}</style>

      <div className="rack-header">
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            background: "#071a2a",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />
        <div>
          <div className="rack-title">{name}</div>
          {/* <div className="rack-sub">{location}</div> */}
        </div>
      </div>

      <div className="rack-body">
        <div className="rack-info">
          <div className="info-block">
            <div className="info-row">
              <p>sous systeme :</p>
              <h1>MCS01</h1>
            </div>
            <div className="info-row" style={{ marginTop: 8 }}>
              <strong>
                <h2>Localisation </h2>
                <p>Batiment : ######</p>
                <p>salle : ######</p>
              </strong>
            </div>
          </div>
          <div className="rack-visual" aria-hidden>
            <p>description</p>
          </div>
        </div>
      </div>
      <div
        className="rack-footer"
        style={{
          marginTop: 12,
          display: "flex",
          gap: 8,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <button>Fiche</button>
        <button>Instruments</button>
      </div>
    </div>
  );
}
