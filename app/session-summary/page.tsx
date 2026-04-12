import { Suspense } from "react";
import SessionSummaryContent from "./SessionSummaryContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SessionSummaryContent />
    </Suspense>
  );
}