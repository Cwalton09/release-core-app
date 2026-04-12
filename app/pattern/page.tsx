import { Suspense } from "react";
import PatternContent from "./PatternContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PatternContent />
    </Suspense>
  );
}