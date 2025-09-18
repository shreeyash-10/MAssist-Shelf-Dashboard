import React, { useEffect, useState } from "react";
import Logo from "../branding/Logo";
import { Icon } from "../icons";
import { Button } from "../ui";
import VoiceWaveBg from "../background/VoiceWaveBg";
import useRevealAnimation from "../../hooks/useRevealAnimation";

const navItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "users", label: "Users" },
  { key: "submissions", label: "Submissions" },
  { key: "training", label: "Training" },
  { key: "sku", label: "SKU" },
  { key: "storeByStore", label: "Store-by-Store" },
  { key: "export", label: "Export" },
  { key: "planogram", label: "Planogram" },
];

const AppLayout = ({ page, setPage, children }) => {
  useRevealAnimation();
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

  const NavButton = ({ item }) => {
    const isActive = page === item.key;
    return (
      <button
        onClick={() => {
          setPage(item.key);
          setSidebarOpen(false);
        }}
        className={`group flex w-full items-center gap-3 rounded-xl px-4 py-2 text-left text-sm font-medium transition duration-200 ease-brand ${
          isActive ? "bg-black/15 text-black" : "hover:bg-black/10"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="text-lg" aria-hidden="true">
          •
        </span>
        {item.label}
      </button>
    );
  };

  return (
    <div className="relative flex min-h-screen text-black">
      <VoiceWaveBg />
      <aside
        className="glass sticky top-0 hidden h-screen w-64 shrink-0 border border-black/12 bg-white px-4 pb-6 pt-4 md:block"
        aria-label="Primary navigation"
      >
        <div className="flex h-16 items-center gap-3">
          <Logo />
        </div>
        <nav className="mt-6 space-y-1">
          {navItems.map((item) => (
            <NavButton key={item.key} item={item} />
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {sidebarOpen && (
        <aside className="glass fixed inset-y-0 left-0 z-40 w-72 border border-black/12 bg-white p-5 transition duration-200 ease-brand md:hidden">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Logo />
            <Button variant="ghost" onClick={() => setSidebarOpen(false)} aria-label="Close navigation">
              Close
            </Button>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavButton key={item.key} item={item} />
            ))}
          </nav>
        </aside>
      )}

      <div className="relative z-20 flex min-w-0 flex-1 flex-col">
        <header className="glass sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-black/12 bg-white/90 px-4 backdrop-blur-xl sm:h-16 sm:px-6">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
            <Icon.menu className="h-6 w-6" />
          </button>
          <div className="hidden items-center gap-3 md:flex">
            <Logo />
          </div>
          <div className="relative ml-auto w-full max-w-xl">
            <Icon.search className="pointer-events-none absolute left-4 top-2.5 h-4 w-4" />
            <input
              placeholder="Search here..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-full border border-black/15 bg-white py-2 pl-10 pr-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              role="searchbox"
              aria-label="Search"
            />
          </div>
          <div className="ml-4 flex items-center gap-3">
            <button className="text-sm font-semibold" aria-label="Sign in">
              Sign in
            </button>
            <Button aria-label="Start free trial">Start free</Button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-6 md:px-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
