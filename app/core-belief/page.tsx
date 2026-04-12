import { Suspense } from "react";
import CoreBeliefContent from "./CoreBeliefContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoreBeliefContent />
    </Suspense>
  );
}