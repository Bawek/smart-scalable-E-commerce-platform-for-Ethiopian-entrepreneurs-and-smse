import Link from "next/link";
import { toggleSidebar } from "../api_urls/geditor_utils";
function TopNav() {
  const handleClick = () => {
    toggleSidebar(false);
  };
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleClick}
        >
          <i className="fa fa-bars"></i>
        </button>
        <div className="panel__devices"></div>
        <div className="panel__editor"></div>
        <div className="panel__basic-actions"></div>
        <Link href={'/system-admin/manage-template'} className="border border-red-500 text-red-500 px-2 py-1">Go Templates</Link>
      </div>
    </nav>
  );
}

export default TopNav;