// File: src/components/Footer.tsx
import React from 'react';
import { FacebookLogo, TwitterLogo, GithubLogo, EnvelopeSimple, DiscordLogo } from '@phosphor-icons/react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: <FacebookLogo size={18} />,
      url: process.env.REACT_APP_FACEBOOK,
      label: "Facebook"
    },
    {
      icon: <TwitterLogo size={18} />,
      url: process.env.REACT_APP_TWITTER,
      label: "Twitter (X)"
    },
    {
      icon: <GithubLogo size={18} />,
      url: process.env.REACT_APP_GITHUB,
      label: "GitHub"
    },
    {
      icon: <DiscordLogo size={18} />,
      url: process.env.REACT_APP_DISCORD,
      label: "Discord"
    }
  ];

  return (
    <footer className="bg-[#5a5f7c] text-[#EEF1DA] py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* About Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#F6B93B]">HACHEM SQUALLI ELHOUSSAINI</h3>
            <p className="text-sm sm:text-base mb-2">Étudiant à l'ENSA Fès SOFTWARE ENGINEER AND AI</p>
            <p className="text-sm sm:text-base mb-3 sm:mb-4">Membre de l'équipe JAPONI FAMILY</p>
            <a 
              href={`mailto:${process.env.REACT_APP_EMAIL}`}
              className="flex items-center justify-center sm:justify-start gap-2 text-[#ADB2D4] hover:text-[#FAD7A1] transition-colors text-sm sm:text-base"            >
              <EnvelopeSimple size={16} />
              hazzinesaid@oulook.ilia
            </a>
          </div>

          {/* Social Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#F6B93B]">Réseaux Sociaux</h3>
            <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#ADB2D4] hover:text-[#FAD7A1] transition-colors text-sm sm:text-base"
                >
                  <span className="w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center">
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#F6B93B]">3IACN</h3>
            <p className="text-sm sm:text-base mb-2">© {new Date().getFullYear()} Tous droits réservés pour ENSA first HACHEMITE SUPRIME SECOND AND ENSA STUDENT FROM JAPONY FAMILY</p>
            <p className="text-xs sm:text-sm text-[#ADB2D4]">
              Développé par les étudiants de l'ENSA Fès
            </p>
          </div>
        </div>

        <div className="border-t border-[#ADB2D4] mt-6 sm:mt-8 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-[#ADB2D4]">
          <p className="px-2">Filière Ingénierie Informatique, Intelligence Artificielle et Confiance Numérique</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;