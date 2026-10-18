"use client";
import {Children,type ReactNode} from 'react';
import MobileFold from './mobile-fold';
import {useLanguage} from './language-provider';
export default function ResponsiveDashboard({children}:{children:ReactNode}){const {text}=useLanguage();const titles=[text('My learning path','Mon parcours'),text('Hourly learning brief','Brief pédagogique'),text('Interview drill','Entraînement entretien'),text('Market map','Carte des marchés'),text('Continue learning','Continuer à apprendre'),text('Latest news','Dernières actualités'),text('AI professor','Professeur IA')];return <section className="dashboard-grid">{Children.toArray(children).map((child,i)=><MobileFold key={i} title={titles[i]||text('Explore','Découvrir')} initialOpen={i===0}>{child}</MobileFold>)}</section>;}
