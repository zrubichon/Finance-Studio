import {notFound} from "next/navigation";
import {trainingPrograms} from "@/lib/training-catalog";
import TrainingDetail from "@/components/training-detail";
export function generateStaticParams(){return trainingPrograms.map(p=>({slug:p.slug}));}
export default async function ProgramPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const program=trainingPrograms.find(p=>p.slug===slug);if(!program)notFound();return <TrainingDetail program={program}/>;}
