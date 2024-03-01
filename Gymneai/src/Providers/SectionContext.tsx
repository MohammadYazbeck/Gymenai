import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  section: number;
  days: number
}

interface SectionInfo {
  id: number | null;
  name: string;
  time: string;
  coach_name: string;
  photo: File | null;
  number_of_sessions: number;
  plans: SubscriptionPlan[];
}

type SectionAction =
  | { type: 'SET_SECTION_INFO'; payload: SectionInfo }
  | { type: 'RESET_SECTION_INFO' };

interface SectionContextType {
  state: SectionInfo;
  dispatch: Dispatch<SectionAction>;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

const sectionReducer = (state: SectionInfo, action: SectionAction): SectionInfo => {
  switch (action.type) {
    case 'SET_SECTION_INFO':
      return action.payload;
    case 'RESET_SECTION_INFO':
      return {
        id: null,
        name: '',
        time: '',
        coach_name: '',
        photo: null,
        number_of_sessions: 1,
        plans: [],
      };
    default:
      return state;
  }
};

interface SectionProviderProps {
  children: ReactNode;
}

const SectionProvider: React.FC<SectionProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(sectionReducer, {
    id: null,
    name: '',
    time: '',
    coach_name: '',
    photo: null,
    number_of_sessions: 1,
    plans: [],
  });

  return (
    <SectionContext.Provider value={{ state, dispatch }}>
      {children}
    </SectionContext.Provider>
  );
};

const useSectionContext = (): SectionContextType => {
  const context = React.useContext(SectionContext);
  if (!context) {
    throw new Error('useSectionContext must be used within a SectionProvider');
  }
  return context;
};

export { SectionProvider, useSectionContext };
