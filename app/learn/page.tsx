import SectionLayout from '@/components/section-layout';
import LearningHub from '@/components/learning-hub';
export default function Page(){return <SectionLayout activeSlug="learn" eyebrow={{en:'LEARNING STUDIO',fr:'ATELIER D’APPRENTISSAGE'}} title={{en:'Your personal learning path',fr:'Ton parcours d’apprentissage personnel'}} description={{en:'Your goals, practice results and review dates in one place.',fr:'Tes objectifs, tes résultats et tes dates de révision réunis au même endroit.'}}><LearningHub view="plan"/></SectionLayout>;}
