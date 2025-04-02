import { BookOpen, Mail, GraduationCap, Briefcase } from 'lucide-react';

const AboutTab = () => {
  return (
                <div>
                  <h2 className="text-2xl font-bold text-[#5a5f7c] mb-6 flex items-center gap-2">
                    <BookOpen className="text-[#F6B93B]" /> À Propos de 3IACN
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[#F1A7A1] mb-3">Objectifs de la filière</h3>
                      <p className="text-[#5a5f7c] mb-4">
                        La filière 3IACN forme des ingénieurs hautement qualifiés capables de concevoir, 
                        développer et sécuriser des systèmes informatiques intelligents.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="p-1 rounded-full bg-[#F9E4B7] mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#F6B93B]" />
                          </div>
                          <span className="text-[#5a5f7c]">Développement informatique</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-1 rounded-full bg-[#F9E4B7] mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#F6B93B]" />
                          </div>
                          <span className="text-[#5a5f7c]">Conception et Intégration des systèmes intelligents</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-1 rounded-full bg-[#F9E4B7] mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#F6B93B]" />
                          </div>
                          <span className="text-[#5a5f7c]">Cybersécurité</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#F1A7A1] mb-3">Structure de la formation</h3>
                      <div className="bg-[#EEF1DA] rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[#F6B93B] text-white">
                              <GraduationCap size={18} />
                            </div>
                            <span className="text-[#5a5f7c]">3 ans : 6 semestres</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[#F6B93B] text-white">
                              <BookOpen size={18} />
                            </div>
                            <span className="text-[#5a5f7c]">35 modules d'études</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[#F6B93B] text-white">
                              <Briefcase size={18} />
                            </div>
                            <span className="text-[#5a5f7c]">3 stages obligatoires</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3 p-3 bg-[#F9E4B7] rounded-lg">
                        <Mail className="text-[#F6B93B]" />
                        <div>
                          <p className="text-sm text-[#5a5f7c]">Coordonnateur Pédagogique</p>
                          <p className="font-medium">Pr. Mohammed BERRADA</p>
                          <a href="mailto:mohammed.berrada@gmail.com" className="text-sm text-[#ADB2D4] hover:underline">
                            mohammed.berrada@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  );
};

export default AboutTab;