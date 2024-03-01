import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';


interface PersonalInfo {
  firstName: string;
  lastName: string;
  fatherName: string;
  phoneNumber: string;
  email: string;
  nationalID: string;
  password: string;
}

interface GymInfo {
  name: string;
  location: string;
  capacity: string;
  workingHours: string;
  commercialRegisterNumber: string;
  licenseNumber: string;
  about: string;
  logo: File | null;
  photos: File[];
}

type RegisterAction =
  | { type: 'SET_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'RESET_PERSONAL_INFO' }
  | { type: 'SET_GYM_INFO'; payload: Partial<GymInfo> }
  | { type: 'RESET_GYM_INFO' };

interface RegisterContextType {
  personalInformation: PersonalInfo;
  gymInformation: GymInfo;
  dispatch: Dispatch<RegisterAction>;
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

const registerReducer = (
  state: RegisterContextType,
  action: RegisterAction
): RegisterContextType => {
  switch (action.type) {

    case 'SET_PERSONAL_INFO':
      return { ...state, personalInformation: { ...state.personalInformation, ...action.payload } };
    case 'RESET_PERSONAL_INFO':
      return { ...state, personalInformation: { firstName: '', lastName: '', fatherName: '', phoneNumber: '', email: '', nationalID: '', password: '' } };
    case 'SET_GYM_INFO':
      return { ...state, gymInformation: { ...state.gymInformation, ...action.payload } };
    case 'RESET_GYM_INFO':
      return { ...state, gymInformation: { name: '', location: '', capacity: '', workingHours: '', commercialRegisterNumber: '', licenseNumber: '', about: '', logo: null, photos: [] } };
    default:
      return state;
  }
};

interface RegisterProviderProps {
  children: ReactNode;
}

const RegisterProvider: React.FC<RegisterProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(registerReducer, {
    personalInformation: { firstName: '', lastName: '', fatherName: '', phoneNumber: '', email: '', nationalID: '', password: '' },
    gymInformation: { name: '', location: '', capacity: '', workingHours: '', commercialRegisterNumber: '', licenseNumber: '', about: '', logo: null, photos: [] },
  });

  return (
    <RegisterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
};

const useRegisterContext = (): RegisterContextType => {
  const context = React.useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegisterContext must be used within a RegisterProvider');
  }
  return context;
};

export { RegisterProvider, useRegisterContext };
