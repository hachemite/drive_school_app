import React from 'react';
import { 
  GraduationCap, 
  Code, 
  BookOpen, 
  Briefcase, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook,
  Cpu,
  Terminal
} from 'lucide-react';
import {
  HardDrives,
  GitBranch,
  Database,
  AndroidLogo,
  LinuxLogo,
  FigmaLogo,
  Star
} from '@phosphor-icons/react';

const AboutTab = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 max-w-6xl mx-auto" style={{ background: '#EEF1DA' }}>
      {/* Profile Section */}
      <div className="flex flex-col items-center md:w-1/3">
        <div className="relative mb-6">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#F6B93B] to-[#FAD7A1] p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-white overflow-hidden border-2 border-[#F9E4B7]">
              <img 
                src={`${require("../static/me.jpeg")}`}
                alt="Hachem Squalli Elhoussaini"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#ADB2D4] to-[#C7D9DD] p-1 border-4 border-[#EEF1DA] shadow-md">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <img 
                src={`${require("../static/japony2.gif")}`}
                alt="Japony"
                className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-[#3A4750]">Hachem Squalli Elhoussaini</h1>
        <p className="text-[#ADB2D4] text-center mb-4">Software and AI Engineering Student</p>
        
        <div className="flex flex-col gap-2 w-full px-4">
          <div className="flex items-center gap-2 bg-[#F9E4B7] p-2 rounded-lg">
            <Mail className="text-[#D35D6E] w-5 h-5" />
            <span className="text-[#3A4750]">{process.env.REACT_APP_EMAIL}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#F9E4B7] p-2 rounded-lg">
            <Phone className="text-[#D35D6E] w-5 h-5" />
            <span className="text-[#3A4750]">+212 720-840</span>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <a href={process.env.REACT_APP_LINKEDIN} target="_blank" rel="noopener noreferrer" className="bg-[#ADB2D4] p-2 rounded-full hover:bg-[#C7D9DD] transition-colors">
            <Linkedin className="text-white w-5 h-5 hover:scale-110 transition-transform" />
          </a>
          <a href={process.env.REACT_APP_GITHUB} target="_blank" rel="noopener noreferrer" className="bg-[#ADB2D4] p-2 rounded-full hover:bg-[#C7D9DD] transition-colors">
            <Github className="text-white w-5 h-5 hover:scale-110 transition-transform" />
          </a>
          <a href={process.env.REACT_APP_X} target="_blank" rel="noopener noreferrer" className="bg-[#ADB2D4] p-2 rounded-full hover:bg-[#C7D9DD] transition-colors">
            <Twitter className="text-white w-5 h-5 hover:scale-110 transition-transform" />
          </a>
          <a href={process.env.REACT_APP_FACEBOOK} target="_blank" rel="noopener noreferrer" className="bg-[#ADB2D4] p-2 rounded-full hover:bg-[#C7D9DD] transition-colors">
            <Facebook className="text-white w-5 h-5 hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      {/* Information Section */}
      <div className="md:w-2/3 space-y-6">
        {/* Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#F6B93B]">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-[#3A4750]">
            <Briefcase className="text-[#F6B93B] w-5 h-5" />
            SUMMARY
          </h2>
          <p className="text-[#5C6B73]">
            Aspiring Software Engineer with a strong foundation in software development, seeking an internship opportunity to apply and enhance my skills.
            <span className="block mt-2 font-medium text-[#F6B93B]">A proud member of japony family</span>
          </p>
        </div>

        {/* Education */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#ADB2D4]">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-[#3A4750]">
            <GraduationCap className="text-[#ADB2D4] w-5 h-5" />
            EDUCATION
          </h2>
          <div className="space-y-2">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#F6B93B] mt-1"></div>
                <div className="w-0.5 h-full bg-[#C7D9DD]"></div>
              </div>
              <div>
                <h3 className="font-medium text-[#3A4750]">3rd Year Engineering Degree in Software Engineering and AI</h3>
                <p className="text-[#ADB2D4]">École Nationale des Sciences Appliquées (ENSA) Fès • Fès • May 2028</p>
                <div className="flex items-center mt-1">
                  <Star weight="fill" className="text-[#F6B93B] mr-1" size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coursework */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#FAD7A1]">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-[#3A4750]">
            <BookOpen className="text-[#FAD7A1] w-5 h-5" />
            COURSEWORK
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-[#F9E4B7] p-2 rounded-lg">
              <Cpu className="text-[#D35D6E] w-5 h-5" />
              <span className="text-[#3A4750]">Microprocessors and Microcontrollers</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F9E4B7] p-2 rounded-lg">
              <HardDrives className="text-[#D35D6E] w-5 h-5" />
              <span className="text-[#3A4750]">Python and AI Frameworks</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#C7D9DD]">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-[#3A4750]">
            <Code className="text-[#C7D9DD] w-5 h-5" />
            SKILLS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Programming Languages */}
            <div className="bg-[#EEF1DA] p-3 rounded-lg">
              <h3 className="font-medium mb-2 text-[#3A4750] flex items-center gap-1">
                <Terminal className="text-[#F6B93B] w-4 h-4" />
                Programming Languages
              </h3>
              <ul className="space-y-1">
                {['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'PHP'].map(lang => (
                  <li key={lang} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#F6B93B]"></div>
                    <span className="text-[#5C6B73]">{lang}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Web Technologies */}
            <div className="bg-[#EEF1DA] p-3 rounded-lg">
              <h3 className="font-medium mb-2 text-[#3A4750] flex items-center gap-1">
                <FigmaLogo className="text-[#F6B93B] w-4 h-4" />
                Web Technologies
              </h3>
              <ul className="space-y-1">
                {['HTML', 'CSS', 'Angular', 'Bootstrap', 'jQuery'].map(tech => (
                  <li key={tech} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#F6B93B]"></div>
                    <span className="text-[#5C6B73]">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Frameworks & Libraries */}
            <div className="bg-[#EEF1DA] p-3 rounded-lg">
              <h3 className="font-medium mb-2 text-[#3A4750] flex items-center gap-1">
                <GitBranch className="text-[#F6B93B] w-4 h-4" />
                Frameworks & Libraries
              </h3>
              <ul className="space-y-1">
                {['Laravel', 'Express', 'Django'].map(framework => (
                  <li key={framework} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#F6B93B]"></div>
                    <span className="text-[#5C6B73]">{framework}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Databases & Tools */}
            <div className="bg-[#EEF1DA] p-3 rounded-lg">
              <h3 className="font-medium mb-2 text-[#3A4750] flex items-center gap-1">
                <Database className="text-[#F6B93B] w-4 h-4" />
                Databases & Tools
              </h3>
              <ul className="space-y-1">
                {['MySQL', 'MongoDB', 'SQL'].map(db => (
                  <li key={db} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#F6B93B]"></div>
                    <span className="text-[#5C6B73]">{db}</span>
                  </li>
                ))}
                <li className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-[#F6B93B]"></div>
                  <span className="flex items-center gap-1 text-[#5C6B73]">
                    <AndroidLogo className="w-4 h-4" /> Android Studio
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F6B93B]"></div>
                  <span className="flex items-center gap-1 text-[#5C6B73]">
                    <LinuxLogo className="w-4 h-4" /> Linux
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;