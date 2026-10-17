import SectionLayout from '@/components/section-layout';
import LearningHub from '@/components/learning-hub';
export default function Page(){return <SectionLayout activeSlug="learn" eyebrow={{en:'LEARNING STUDIO',fr:'ATELIER D’APPRENTISSAGE'}} title={{en:'Understand your strengths and next steps',fr:'Comprends tes points forts et tes prochaines étapes'}} description={{en:'Your goals, practice results and review dates in one place.',fr:'Tes objectifs, tes résultats et tes dates de révision réunis au même endroit.'}}><LearningHub view="skills"/></SectionLayout>;}
