import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowRight } from "react-icons/hi";

export default function DashSidebar() {
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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label="User"
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowRight}>Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
