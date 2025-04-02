import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const CareersTab = () => {
  const careerOpportunities = require("../../data/careerOpportunities.json");

  return (
    <div id="careers">
      <h2 className="text-2xl font-bold text-[#5a5f7c] mb-6 flex items-center gap-2">
        <Briefcase className="text-[#F6B93B]" /> Opportunités Professionnelles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {careerOpportunities.map((career :string,  index:number) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            key={index}
            className={`p-4 rounded-lg shadow-sm ${
              index % 3 === 0 ? 'bg-[#F9E4B7]' : 
              index % 3 === 1 ? 'bg-[#C7D9DD]' : 'bg-[#F1C6D4]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                index % 3 === 0 ? 'bg-[#F6B93B]' : 
                index % 3 === 1 ? 'bg-[#ADB2D4]' : 'bg-[#F1A7A1]'
              } text-white`}>
                <Briefcase size={16} />
              </div>
              <h3 className="font-medium text-[#5a5f7c]">{career}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareersTab;