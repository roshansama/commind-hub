import { NavLink } from "react-router-dom";
import { Search, Home, Plus, Activity, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { path: "/", label: "Feed", icon: Home },
  { path: "/search", label: "Search", icon: Search },
  { path: "/ingest", label: "Add Content", icon: Plus },
  { path: "/ops", label: "Operations", icon: Activity },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] glass-card border-r transition-transform duration-300 z-30",
          "w-64 md:translate-x-0",
          isMobile 
            ? (open ? "translate-x-0" : "-translate-x-full")
            : "md:static md:h-auto md:min-h-screen"
        )}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <div className="flex justify-end p-4 md:hidden">
            <Button variant="ghost" size="sm" onClick={onClose} className="focus-ring">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={isMobile ? onClose : undefined}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200",
                    "hover:bg-secondary/50 focus-ring",
                    isActive
                      ? "gradient-accent text-accent-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}