import React, { useEffect, useState } from "react";
import ThemeToggle from "../ThemeToggle";
import Logo from "../branding/Logo";
import { Icon } from "../icons";
import { Button } from "../ui";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: "??" },
  { key: "users", label: "Users", icon: "??" },
  { key: "submissions", label: "Submissions", icon: "???" },
  { key: "training", label: "Training", icon: "??" },
  { key: "sku", label: "SKU", icon: "???" },
  { key: "storeByStore", label: "Store-by-Store", icon: "??" },
  { key: "export", label: "Export", icon: "??" },
  { key: "planogram", label: "Planogram", icon: "???" },
];

const AppLayout = ({ page, setPage, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const NavButton = ({ item }) => (
    <button
      onClick={() => {
        setPage(item.key);
        setSidebarOpen(false);
      }}
      className={lex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium }
      aria-current={page === item.key ? "page" : undefined}
    >
      <span className="text-lg" aria-hidden="true">
        {item.icon}
      </span>
      {item.label}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside
        className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:block"
        aria-label="Primary"
      >
        <div className="flex h-16 items-center gap-2 px-4">
          <Logo />
        </div>
        <nav className="mt-4 space-y-1 px-3">
          {navItems.map((item) => (
            <NavButton key={item.key} item={item} />
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={ixed inset-y-0 left-0 z-50 w-72 border-r border-gray-200 bg-white p-4 transition-transform duration-200 dark:border-gray-800 dark:bg-gray-900 md:hidden }
      >
        <div className="mb-3 flex h-12 items-center justify-between">
          <Logo />
          <Button variant="ghost" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            ×
          </Button>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavButton key={item.key} item={item} />
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-gray-200 bg-gray-900/95 px-4 text-white backdrop-blur dark:border-gray-800">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Icon.menu className="h-6 w-6" />
          </button>
          <div className="relative mx-auto w-full max-w-xl">
            <Icon.search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              placeholder="Search here..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              role="searchbox"
              aria-label="Search"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <div className="flex items-center gap-2 rounded-full bg-gray-800 px-2 py-1 text-sm" aria-label="Model health">
              <span>62%</span>
            </div>
            <img
              src="https://api.dicebear.com/9.x/identicon/svg?seed=massist"
              alt="avatar"
              className="h-8 w-8 rounded-full bg-white"
            />
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;