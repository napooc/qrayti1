import { motion } from "framer-motion";
import { Heart, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer id="about" className="bg-qrayti-navy text-primary-foreground pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.img
              src={logo}
              alt="Qrayti"
              className="h-16 w-auto mb-6"
              whileHover={{ scale: 1.05 }}
            />
            <p className="text-primary-foreground/80 leading-relaxed mb-6 max-w-md">
              Qrayti est l'IA éducative conçue pour les étudiants marocains.
              Nous transformons les cours complexes en outils d'apprentissage
              accessibles, avec des explications en Darija.
            </p>
            <div className="flex items-center gap-2 text-qrayti-gold">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Made with ❤️ in Morocco</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Produit</h4>
            <ul className="space-y-3">
              <FooterLink href="#features">Fonctionnalités</FooterLink>
              <FooterLink href="#how-it-works">Comment ça marche</FooterLink>
              <FooterLink href="#comparison">Pourquoi Qrayti</FooterLink>
              <FooterLink href="#">Tarifs</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@qrayti.ma"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-qrayti-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contact@qrayti.ma
                </a>
              </li>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Support</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © 2024 Qrayti. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li>
    <a
      href={href}
      className="text-primary-foreground/70 hover:text-qrayti-gold transition-colors"
    >
      {children}
    </a>
  </li>
);

export default Footer;
