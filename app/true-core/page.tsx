import { Suspense } from "react";
import TrueCoreContent from "./TrueCoreContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrueCoreContent />
    </Suspense>
  );
}