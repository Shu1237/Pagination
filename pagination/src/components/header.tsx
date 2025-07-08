import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const menuItems = [
    { name: "Overview", href: "/" },
    { name: "Actor", href: "/actors" },
    { name: "Movies", href: "/movies" },
    { name: "Schedules", href: "/schedules" },
    { name: "Orders", href: "/orders" },
    { name: "Tickets", href: "/tickets" },
  ];

  return (
    <header className="w-full bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-foreground">Chis</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors font-medium ${isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="flex gap-2 items-center">

              <div onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`flex item-center cursor-pointer transition-transform duration-500
                    ${isDark ? 'rotate-180' : 'rotate-0'}`}
              >
                {isDark ?
                  <Sun className="w-full text-yellow-500 rotate-0 transition-all" /> :
                  <Moon className="w-full text-blue-500 rotate-0 transition-all" />}
              </div>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <img className="w-full rounded-full" src="https://scontent.fsgn21-1.fna.fbcdn.net/v/t1.6435-9/139255782_102607631831947_7407807722722624817_n.jpg?stp=dst-jpg_tt6&cstp=mx1012x1000&ctp=s1012x1000&_nc_cat=102&cb=99be929b-878c9f95&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGTp3NzAdKsyYHyasyZKk-G7-stNIqjAXnv6y00iqMBeZ-zxKVzZRj6I1JJ290nq_M5PgBdG4KXl8VZbZVoN95a&_nc_ohc=LhioX_3rAdcQ7kNvwGge2Xf&_nc_oc=Adk1jqUBjU3r1QfbAEpLGyZ70dkDpaXCwB-Avyn1TLk5EZ5yzwnGYqod1bM8A1cgc9caWQ3o4V2WzgWyZZNsOJj6&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=VPKscqbs6CTGzxO9AJQBZQ&oh=00_AfTCQ0b29EMlyUvrQaGqYEPkT09YM0l-vLcFchFwJ-EstA&oe=689362F1" alt="" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
