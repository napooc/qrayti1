import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={logo} alt="Qrayti Logo" className="h-12 w-auto" />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Fonctionnalités</NavLink>
            <NavLink href="#how-it-works">Comment ça marche</NavLink>
            <NavLink href="#comparison">Pourquoi Qrayti</NavLink>
            <NavLink href="#about">À propos</NavLink>
          </nav>

          {/* Spacer for layout balance */}
          <div className="hidden md:block w-8" />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass border-t border-border"
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <NavLink href="#features" mobile onClick={() => setIsMenuOpen(false)}>
              Fonctionnalités
            </NavLink>
            <NavLink href="#how-it-works" mobile onClick={() => setIsMenuOpen(false)}>
              Comment ça marche
            </NavLink>
            <NavLink href="#comparison" mobile onClick={() => setIsMenuOpen(false)}>
              Pourquoi Qrayti
            </NavLink>
            <NavLink href="#about" mobile onClick={() => setIsMenuOpen(false)}>
              À propos
            </NavLink>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

const NavLink = ({
  href,
  children,
  mobile,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}) => (
  <motion.a
    href={href}
    onClick={onClick}
    className={`font-medium text-foreground/80 hover:text-qrayti-coral transition-colors ${
      mobile ? "text-lg py-2" : ""
    }`}
    whileHover={{ x: mobile ? 8 : 0 }}
  >
    {children}
  </motion.a>
);

export default Header;
