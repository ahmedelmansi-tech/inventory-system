"use client";
import { Plus, LayoutDashboard, CirclePile, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@neondatabase/auth-ui";
const SideBare = () => {
  //{ currentPath = "/dashboard" }
  const currentPath = usePathname();
  const navigationLinks = [
    { name: "dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "inventory", href: "/inventory", icon: CirclePile },
    { name: "add product", href: "/add-product", icon: Plus },
    { name: "account", href: "/account/security", icon: UserRound },
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

          // console.log({
          //   currentPath,
          //   href: link.href,
          //   active,
          // });
          return (
            <Link
              href={link.href}
              key={key}
              className={`flex space-x-3 items-center [&>span]:uppercase [&>span]:text-sm p-2 rounded-sm ${active ? "bg-gray-500" : "bg-transparent"} hover:bg-green-100 font-semibold`}
            >
              <NavigationLinkIcon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-2 left-2 -ml-2">
        <UserButton
          size={"full"}
          sideOffset={10}
          side="top"
          disableDefaultLinks={false}
          // additionalLinks={[
          //   {
          //     label: "Products",
          //     href: "/products",
          //   },
          //   {
          //     label: "Orders",
          //     href: "/orders",
          //   },
          // ]}
        />
      </div>
    </div>
  );
};

export default SideBare;
