import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  Menu,
  Sun,
  Moon,
  Home,
  Film,
  GraduationCap,
  LayoutDashboard,
  Award,
  Glasses,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import brandIcon from "../assets/brandIcon.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Add scroll listener with debouncing for performance
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 0);
      }, 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "dark:bg-black/95 bg-white/95 shadow-md"
          : "bg-gradient-to-b from-black/80 to-transparent dark:from-black/80"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={brandIcon}
              alt="Edastra"
              className="h-10 w-10 md:h-12 md:w-12 object-contain mt-1"
            />
            <span className="text-[#FAD502] text-xl md:text-2xl font-bold hover:text-[#e5c302] transition-colors">
              EDASTRA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 transition font-medium ${
                isScrolled ? "dark:text-white text-gray-900" : "text-white"
              } hover:text-[#FAD502] dark:hover:text-[#FAD502]`}
            >
              <Home size={18} />
              Home
            </Link>
            <Link
              to="/entertainment"
              className={`flex items-center gap-2 transition font-medium ${
                isScrolled ? "dark:text-white text-gray-900" : "text-white"
              } hover:text-[#FAD502] dark:hover:text-[#FAD502]`}
            >
              <Film size={18} />
              Entertainment
            </Link>
            <Link
              to="/subjects"
              className={`flex items-center gap-2 transition font-medium ${
                isScrolled ? "dark:text-white text-gray-900" : "text-white"
              } hover:text-[#FAD502] dark:hover:text-[#FAD502]`}
            >
              <GraduationCap size={18} />
              Education
            </Link>
            <Link
              to="/my-corner"
              className={`flex items-center gap-2 transition font-medium ${
                isScrolled ? "dark:text-white text-gray-900" : "text-white"
              } hover:text-[#FAD502] dark:hover:text-[#FAD502]`}
            >
              <LayoutDashboard size={18} />
              My Corner
            </Link>
            <Link
              to="/scholarship"
              className={`flex items-center gap-2 transition font-medium ${
                isScrolled ? "dark:text-white text-gray-900" : "text-white"
              } hover:text-[#FAD502] dark:hover:text-[#FAD502]`}
            >
              <Award size={18} />
              Scholarship
            </Link>
            <Link
              to="/vr"
              className={`flex items-center gap-2 transition font-medium ${
                isScrolled ? "dark:text-white text-gray-900" : "text-white"
              } hover:text-[#FAD502] dark:hover:text-[#FAD502]`}
            >
              <Glasses size={18} />
              VR
            </Link>
          </nav>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`transition ${
              isScrolled ? "dark:text-white text-gray-900" : "text-white"
            } hover:text-[#FAD502] dark:hover:text-[#FAD502]`}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <input
                type="text"
                placeholder="Search..."
                className={`dark:bg-black/70 bg-white/70 border ${
                  isScrolled
                    ? "dark:border-white border-gray-900 dark:text-white text-gray-900"
                    : "border-white text-white"
                } px-4 py-2 rounded-sm w-64 focus:outline-none focus:border-[#FAD502]`}
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className={`transition ${
                  isScrolled ? "dark:text-white text-gray-900" : "text-white"
                } hover:text-[#FAD502] dark:hover:text-[#FAD502]`}
              >
                <Search size={20} className="mt-1" />
              </button>
            )}
          </div>

          {/* Notifications */}
          <button
            className={`transition ${
              isScrolled ? "dark:text-white text-gray-900" : "text-white"
            } hover:text-[#FAD502] dark:hover:text-[#FAD502]`}
          >
            <Bell size={20} />
          </button>

          {/* Profile */}
          <Link
            to="/profile"
            className={`transition ${
              isScrolled ? "dark:text-white text-gray-900" : "text-white"
            } hover:text-[#FAD502] dark:hover:text-[#FAD502]`}
          >
            <User size={20} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden dark:text-white text-gray-900 hover:text-gray-500 dark:hover:text-gray-300 transition z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-8 md:hidden">
          <Link
            to="/"
            className="flex items-center gap-3 text-white text-2xl hover:text-[#FAD502] transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home size={24} />
            Home
          </Link>
          <Link
            to="/entertainment"
            className="flex items-center gap-3 text-white text-2xl hover:text-[#FAD502] transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Film size={24} />
            Entertainment
          </Link>
          <Link
            to="/subjects"
            className="flex items-center gap-3 text-white text-2xl hover:text-[#FAD502] transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <GraduationCap size={24} />
            Education
          </Link>
          <Link
            to="/my-corner"
            className="flex items-center gap-3 text-white text-2xl hover:text-[#FAD502] transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LayoutDashboard size={24} />
            My Corner
          </Link>
          <Link
            to="/scholarship"
            className="flex items-center gap-3 text-white text-2xl hover:text-[#FAD502] transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Award size={24} />
            Scholarship
          </Link>
          <Link
            to="/vr"
            className="flex items-center gap-3 text-white text-2xl hover:text-[#FAD502] transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Glasses size={24} />
            VR
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-3 text-white text-2xl hover:text-[#FAD502] transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <User size={24} />
            My Profile
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
