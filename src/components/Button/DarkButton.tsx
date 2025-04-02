import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface DarkButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  darkMode?: boolean;
}

const DarkButton: React.FC<DarkButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  fullWidth = false,
  disabled = false,
  darkMode = false,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Variant styles with new color palette
  const variantStyles = {
    primary: darkMode ? 'bg-[#4A5568] hover:bg-[#2D3748] text-[#C7D9DD]' : 'bg-[#F6B93B] hover:bg-[#FAD7A1] text-white',
    secondary: darkMode ? 'bg-[#2D3748] hover:bg-[#4A5568] text-[#ADB2D4]' : 'bg-[#F1A7A1] hover:bg-[#F9E4B7] text-white',
    danger: darkMode ? 'bg-[#742A2A] hover:bg-[#9B2C2C] text-[#F1C6D4]' : 'bg-[#F1A7A1] hover:bg-[#F6B93B] text-white',
    success: darkMode ? 'bg-[#2C7A4E] hover:bg-[#38A169] text-[#D5E5D5]' : 'bg-[#ADB2D4] hover:bg-[#C7D9DD] text-white',
  };

  // Size styles
  const sizeStyles = {
    sm: `py-1 px-3 text-sm ${isMobile ? 'py-1.5 px-3.5' : ''}`,
    md: `py-2 px-4 text-base ${isMobile ? 'py-2.5 px-5' : ''}`,
    lg: `py-3 px-6 text-lg ${isMobile ? 'py-3.5 px-7' : ''}`,
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`
        flex items-center justify-center gap-2
        rounded-xl font-medium transition-all
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
        shadow-md hover:shadow-lg
      `}
      disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children && <span className="truncate">{children}</span>}
    </motion.button>
  );
};

export default DarkButton;