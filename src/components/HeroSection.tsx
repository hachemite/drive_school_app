import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center min-h-screen flex flex-col items-center justify-center sticky top-0"
    >
      <motion.div className="relative">

        <motion.h1 
          className="text-4xl font-bold text-[#5a5f7c] sm:text-5xl md:text-6xl relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#F6B93B] to-[#F1A7A1]">
            3IACN
          </span>
        </motion.h1>
      </motion.div>      <motion.p 
        className="text-lg text-[#5a5f7c] max-w-2xl mx-auto my-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Ingénierie Informatique, Intelligence Artificielle et Confiance Numérique
      </motion.p>
      <motion.p 
        className="text-md text-[#5a5f7c] max-w-xl mx-auto mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Découvrez notre formation d'excellence en informatique, spécialisée dans l'IA et la sécurité numérique. Rejoignez-nous pour façonner l'avenir du numérique.
      </motion.p>
      <motion.a 
        href="./drives" 
        className="inline-block px-6 py-2 text-white bg-gradient-to-r from-[#F6B93B] to-[#F1A7A1] rounded-full font-semibold hover:opacity-90 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.a>
      <motion.div 
        className="absolute bottom-10 w-full"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="text-[#5a5f7c] text-sm">Scroll Down</div>
        <div className="mt-2">↓</div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;