import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

interface Exercise {
  id: number;
  name: string;
  reps: number;
  sets: number;
}

interface ExerciseState {
  programName: string | null;
  programID: number | null;
  selectedExercises: Exercise[];
  memberInfo: {
    memberId: number | null;
    memberFirstName: string | null;
    memberLastName: string | null;

  };
}

type Action =
  | { type: 'SET_MEMBER_INFO'; payload: { memberId: number; memberFirstName: string; memberLastName: string  } }
  | { type: 'ADD_EXERCISE'; payload: Exercise }
  | { type: 'SET_PROGRAM_INFO'; payload: {programName: string,programID: number} }
  | { type: 'REMOVE_EXERCISE'; payload: number };


interface ExerciseContextType {
  state: ExerciseState;
  dispatch: Dispatch<Action>;
}

const initialState: ExerciseState = {
  programName: null,
  programID: null,
  selectedExercises: [],
  memberInfo: {
    memberId: null,
    memberFirstName: null,
    memberLastName: null,

  },
};

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

const exerciseReducer = (state: ExerciseState, action: Action): ExerciseState => {
  switch (action.type) {

    case 'SET_PROGRAM_INFO':
      return {
        ...state,
        programName: action.payload.programName,
        programID: action.payload.programID,


      };
      
    case 'SET_MEMBER_INFO':
      return {
        ...state,
        memberInfo: {
          memberId: action.payload.memberId,
          memberFirstName: action.payload.memberFirstName,
          memberLastName: action.payload.memberLastName,

        },
      };
    case 'ADD_EXERCISE':
      const existingExerciseIndex = state.selectedExercises.findIndex((exercise) => exercise.id === action.payload.id);

      if (existingExerciseIndex !== -1) {
        // If exercise with the same id exists, replace it
        const updatedExercises = [...state.selectedExercises];
        updatedExercises[existingExerciseIndex] = action.payload;

        return {
          ...state,
          selectedExercises: updatedExercises,
        };
      } else {
        // If exercise with the id doesn't exist, add it
        return {
          ...state,
          selectedExercises: [...state.selectedExercises, action.payload],
        };
      }

    case 'REMOVE_EXERCISE':
      return {
        ...state,
        selectedExercises: state.selectedExercises.filter((exercise) => exercise.id !== action.payload),
      };
    default:
      return state;
  }
};

interface ExerciseProviderProps {
  children: ReactNode;
}

const ExerciseProvider: React.FC<ExerciseProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  return (
    <ExerciseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExerciseContext.Provider>
  );
};

const useExerciseContext = (): ExerciseContextType => {
  const context = React.useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExerciseContext must be used within an ExerciseProvider');
  }
  return context;
};

export { ExerciseProvider, useExerciseContext };
