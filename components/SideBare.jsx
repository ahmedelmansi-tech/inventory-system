import { Plus, LayoutDashboard, CirclePile, Settings } from "lucide-react";
import Link from "next/link";
const SideBare = ({ currentPath = "/dashboard" }) => {
  const navigationLinks = [
    { name: "dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "inventory", href: "/inventory", icon: CirclePile },
    { name: "add product", href: "/add-product", icon: Plus },
    { name: "settings", href: "/settings", icon: Settings },
  ];
  return (
    <div className="w-48 bg-gray-200 fixed top-0 left-0 min-h-screen p-2">
      <div className="flex space-x-2 items-center mt-3 mb-6 border-b pb-3">
        <LayoutDashboard className="w-5 h-5" />
        <span className="uppercase text-sm font-mono">inventory</span>
      </div>
      <nav className="space-y-5">
        {navigationLinks.map((link, key) => {
          const NavigationLinkIcon = link.icon;
          const active = currentPath === link.href;
          return (
            <Link
              href={link.href}
              key={key}
              className={`flex space-x-3 items-center [&>span]:uppercase [&>span]:text-sm p-2 rounded-sm ${active && "bg-gray-500"} hover:bg-green-100 font-semibold`}
            >
              <NavigationLinkIcon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideBare;
