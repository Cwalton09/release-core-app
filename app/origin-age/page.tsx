import { Suspense } from "react";
import OriginAgeContent from "./OriginAgeContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OriginAgeContent />
    </Suspense>
  );
}