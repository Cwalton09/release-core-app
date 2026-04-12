import { Suspense } from "react";
import InstallBeliefsContent from "./InstallBeliefsContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InstallBeliefsContent />
    </Suspense>
  );
}