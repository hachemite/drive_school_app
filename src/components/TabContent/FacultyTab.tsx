import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const FacultyTab =()=>{




  const facultyData = require("../../data/facultyData.json");

  type Professor ={
    name:string,
    specialty:string,
    email ?:string,
    
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#5a5f7c] mb-6 flex items-center gap-2">
        <Users className="text-[#F6B93B]" /> Équipe Pédagogique
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {facultyData.map((professor :Professor  , index :number) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={index}
            className="bg-[#EEF1DA] rounded-lg p-4 shadow-sm"
          >
            <h3 className="font-semibold text-[#5a5f7c]">{professor.name}</h3>
            <p className="text-sm text-[#ADB2D4]">{professor.specialty}</p>
            {professor.email && (
              <a 
                href={`mailto:${professor.email}`} 
                className="text-xs text-[#F6B93B] hover:underline mt-2 inline-block"
              >
                {professor.email}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FacultyTab;