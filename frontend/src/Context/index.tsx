import { createContext, useReducer, Dispatch, ReactNode } from "react";

interface QuickstartState {
  linkSuccess: boolean;
  isItemAccess: boolean;
  isPaymentInitiation: boolean;
  linkToken: string | null;
  accessToken: string | null;
  itemId: string | null;
  isError: boolean;
  isVerified: boolean; 
  backend: boolean;
  products: string[];
  linkTokenError: {
    error_message: string;
    error_code: string;
    error_type: string;
  };
  studyName: string | null;
  searchParams: string | null;
  studyData: StudyData | null;
}

export interface StudyData {
    ID: string,
    StudyName: string, 
    subtitle: string, 
    introPar: string, 
    RedirectPass: string, 
    RedirectFail: string, 
    itemAccessDesc: string, 
    UseVerify: string, 
    VerifyDesc: string, 
    VerifyString: string, 
    VerifyMinCount: string, 
    VerifyMaxTransactions: string, 
    VerifyMaxDays: string, 
    VerifyMinAmount: string, 
    UseBalance: string, 
    BalanceDesc: string, 
    BalanceSubTypes: string, 
    MinBalance: string, 
}

const initialState: QuickstartState = {
  linkSuccess: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  linkToken: "", // Don't set to null or error message will show up briefly when site loads
  accessToken: null,
  itemId: null,
  isError: false,  
  isVerified: false,
  backend: true,
  products: ["transactions"],
  linkTokenError: {
    error_type: "",
    error_code: "",
    error_message: "",
  },
  studyName: null,
  searchParams: null,
  studyData: null,
};

type QuickstartAction = 
  | { type: "SET_STATE"; state: Partial<QuickstartState> }
  | { type: "SET_STUDY_NAME"; studyName: string }
  | { type: "SET_SEARCH_PARAMS"; searchParams: string }
  | { type: "SET_STUDY_DATA"; studyData: any }
  | { type: "SET_IS_VERIFIED"; isVerified: boolean};

interface QuickstartContext extends QuickstartState {
  dispatch: Dispatch<QuickstartAction>;
}

const Context = createContext<QuickstartContext>(
  initialState as QuickstartContext
);

const { Provider } = Context;
export const QuickstartProvider: React.FC<{ children: ReactNode }> = (
  props
) => {
  const reducer = (
    state: QuickstartState,
    action: QuickstartAction
  ): QuickstartState => {
    switch (action.type) {
      case "SET_STATE":
        return { ...state, ...action.state };
      case "SET_STUDY_NAME":
        return { ...state, studyName: action.studyName };
      case "SET_SEARCH_PARAMS":
        return { ...state, searchParams: action.searchParams };
      case "SET_STUDY_DATA":        
        return { ...state, studyData: action.studyData };
      case "SET_IS_VERIFIED":
        return { ...state, isVerified: action.isVerified };
      default:
        return { ...state };
      }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ ...state, dispatch }}>{props.children}</Provider>;
};

export default Context;
