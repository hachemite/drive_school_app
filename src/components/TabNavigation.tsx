import { motion } from 'framer-motion';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'about', label: 'À Propos' },
    { id: 'program', label: 'Programme' },
    { id: 'faculty', label: 'Équipe' },
    { id: 'careers', label: 'Carrières' }
  ];

  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex rounded-lg bg-[#EEF1DA] p-1 shadow-inner">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id 
                ? 'bg-white text-[#5a5f7c] shadow-sm' 
                : 'text-[#5a5f7c] hover:bg-[#D5E5D5]'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;