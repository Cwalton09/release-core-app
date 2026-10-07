import { ImageResponse } from "next/og";

export const runtime = "edge";

// Preview card shown when the site is shared on Facebook, iMessage, etc.
export const alt = "Release Core — nervous system regulation and release method";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f8fafc",
          borderTop: "24px solid #047857",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 600, color: "#047857" }}>
          Release Core
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#0f172a",
          }}
        >
          What if your body is reacting to something your mind already knows is over?
        </div>
        <div style={{ marginTop: 32, fontSize: 32, color: "#475569" }}>
          Uncover the nervous system patterns behind anxiety, panic, and shutdown.
        </div>
      </div>
    ),
    size
  );
}
