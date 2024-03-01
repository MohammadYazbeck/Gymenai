import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

interface ReceptionData {
  email: string;
  password: string;
}

interface CoachData {
  email: string;
  password: string;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  photo: File;
  location: string;
  national_id: string;
  position: string;
  phone_number: string;
  shift: string;
  salary: number;
  reception: boolean;
  coach: boolean;
  reception_data?: ReceptionData;
  coach_data?: CoachData;
}

type EmployeeAction =
  | { type: 'SET_SELECTED_EMPLOYEE'; payload: Employee | null }
  | { type: 'CLEAR_SELECTED_EMPLOYEE' };

interface EmployeeContextType {
  state: Employee | null;
  dispatch: Dispatch<EmployeeAction>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

const employeeReducer = (state: Employee | null, action: EmployeeAction): Employee | null => {
  switch (action.type) {
    case 'SET_SELECTED_EMPLOYEE':
      return action.payload;
    case 'CLEAR_SELECTED_EMPLOYEE':
      return null;
    default:
      return state;
  }
};

interface EmployeeProviderProps {
  children: ReactNode;
}

const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, null);

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};

const useEmployeeContext = (): EmployeeContextType => {
  const context = React.useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};

export { EmployeeProvider, useEmployeeContext };
