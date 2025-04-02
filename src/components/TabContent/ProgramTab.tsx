import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
const ProgramTab = () => {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const programData = require('../../data/programData.json');
  type Semester = {
    title: string;
    modules: string[];
  };
  
  type YearData = {
    year: number;
    semesters: Semester[];
  };
  
  return (
    <div id="program">
      <h2 className="text-2xl font-bold text-[#5a5f7c] mb-6 flex items-center gap-2">
        <BookOpen className="text-[#F6B93B]" /> Programme d'Études
      </h2>
      <div className="space-y-6">
        {programData.map((yearData:YearData) => (
          <div key={yearData.year} className="border border-[#EEF1DA] rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedYear(expandedYear === yearData.year ? null : yearData.year)}
              className={`w-full flex justify-between items-center p-4 ${
                expandedYear === yearData.year ? 'bg-[#F6B93B] text-white' : 'bg-[#EEF1DA] text-[#5a5f7c]'
              }`}
            >
              <span className="font-semibold">{yearData.year}ère Année</span>
              {expandedYear === yearData.year ? <ChevronUp /> : <ChevronDown />}
            </button>
            <AnimatePresence>
              {expandedYear === yearData.year && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 space-y-6"
                >
                  {yearData.semesters.map((semester, idx) => (
                    <div key={idx} className="bg-[#F9E4B7] bg-opacity-30 p-4 rounded-lg">
                      <h3 className="font-semibold text-[#F1A7A1] mb-3">{semester.title}</h3>
                      <ul className="space-y-2">
                        {semester.modules.map((module , i:number) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#F6B93B] mt-2" />
                            <span className="text-[#5a5f7c]">{module}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramTab;