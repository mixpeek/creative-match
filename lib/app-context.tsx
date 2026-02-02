'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Offer, MatchResult, mockOffers, mockMatchResults } from './mock-data';

interface AppState {
  currentStep: number;
  selectedDatasets: string[];
  selectedOffer: Offer | null;
  matchResults: MatchResult[];
  isJobRunning: boolean;
  jobProgress: number;
}

interface AppContextType extends AppState {
  setCurrentStep: (step: number) => void;
  setSelectedDatasets: (datasets: string[]) => void;
  setSelectedOffer: (offer: Offer | null) => void;
  setMatchResults: (results: MatchResult[]) => void;
  setIsJobRunning: (running: boolean) => void;
  setJobProgress: (progress: number) => void;
  runMatch: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>(['cta_landing_pages']);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(mockOffers[0]);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [isJobRunning, setIsJobRunning] = useState(false);
  const [jobProgress, setJobProgress] = useState(0);

  const runMatch = () => {
    setMatchResults(mockMatchResults);
  };

  return (
    <AppContext.Provider
      value={{
        currentStep,
        selectedDatasets,
        selectedOffer,
        matchResults,
        isJobRunning,
        jobProgress,
        setCurrentStep,
        setSelectedDatasets,
        setSelectedOffer,
        setMatchResults,
        setIsJobRunning,
        setJobProgress,
        runMatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
