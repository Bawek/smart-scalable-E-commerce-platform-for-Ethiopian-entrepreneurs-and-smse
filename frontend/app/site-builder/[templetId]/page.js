'use client'
import React from "react";
import Pagebuilder from "@/app/[locale]/components/sitebuilder/pageBuilder";
import { useParams } from "next/navigation";
function Template() {
  const params = useParams()
  return (
    <div className="App">
      {/* <GrapesjsMain/> */}
      <Pagebuilder templetId={params.templetId} />
    </div>
  );
}

export default Template;
