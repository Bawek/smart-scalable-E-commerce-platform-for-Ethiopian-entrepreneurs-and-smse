import React from "react";
import Pagebuilder from "@/app/[locale]/components/sitebuilder/pageBuilder";
function Template({ params }) {
  return (
    <div className="App">
      {/* <GrapesjsMain/> */}
      <Pagebuilder templetId={params.templetId} />
    </div>
  );
}

export default Template;
