import { Suspense } from "react";
import RegulationContent from "./RegulationContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegulationContent />
    </Suspense>
  );
}