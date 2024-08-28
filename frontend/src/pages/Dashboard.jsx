import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "./../components/DashSidebar";
import DashProfile from "./../components/DashProfile";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const tabFromUrl = urlSearchParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    console.log("Tab: ", tabFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="sidebar md:w-56">
        <DashSidebar />
      </div>
      <div className="content w-full">
        {tab === "profile" && <DashProfile />}
      </div>
    </div>
  );
}
