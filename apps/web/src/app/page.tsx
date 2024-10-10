import dynamic from "next/dynamic";
import { useMemo } from "react";

export default async function Page() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <div className="flex flex-1">
        <Map zoom={3} posix={[54, 14]} />
      </div>
    </>
  );
}
