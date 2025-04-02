import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '' }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center justify-center
        ${isMobile ? 
          'p-4 rounded-full bg-[#F6B93B] text-white shadow-xl' : 
          'px-4 py-2 rounded-xl bg-[#FAD7A1] text-[#5a5f7c] shadow-lg'}
        hover:shadow-xl
        transition-all ${className}
      `}
      aria-label="Go back"
    >
      <ArrowLeft size={isMobile ? 24 : 20} />
      {!isMobile && <span className="ml-2 font-medium">Back</span>}
    </motion.button>
  );
};

export default BackButton;