import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import TabNavigation from '../components/TabNavigation';
import AboutTab from '../components/TabContent/AboutTab';
import ProgramTab from '../components/TabContent/ProgramTab';
import FacultyTab from '../components/TabContent/FacultyTab';
import CareersTab from '../components/TabContent/CareersTab';

const Home = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-[calc(100vh-9rem)] bg-gradient-to-br from-[#EEF1DA] to-[#D5E5D5] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/*  Hero Section */}
        <div className="mb-6">
          <HeroSection  />
        </div>

        {/* Tab Navigation */}
        <div className="mb-4">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab}  />
        </div>

        {/* Tab Content -  */}
        <div className="bg-white rounded-xl shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-6"
            >
              {activeTab === 'about' && <AboutTab  />}
              {activeTab === 'program' && <ProgramTab  />}
              {activeTab === 'faculty' && <FacultyTab  />}
              {activeTab === 'careers' && <CareersTab  />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home;