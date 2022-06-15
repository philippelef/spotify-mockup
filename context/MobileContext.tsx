import { createContext, useState, useContext, ReactNode } from 'react'

type isMobileContextType = {
    isMobile: boolean;
    setIsMobile: (newState: boolean) => void;
};

const isMobileContextDefaultValues: isMobileContextType = {
    isMobile: false,
    setIsMobile: () => { },

};

const IsMobileContext = createContext<isMobileContextType>(isMobileContextDefaultValues);

type Props = {
    children: ReactNode;
};

export function useIsMobile() {
    return useContext(IsMobileContext);
}

export function IsMobileProvider({ children }: Props) {
    const [isMobile, handleIsMobile] = useState<boolean>(true);

    const setIsMobile = (newState: boolean) => {
        handleIsMobile(newState)
    }

    const value = {
        isMobile, setIsMobile
    }

    return (
        <IsMobileContext.Provider value={value}>
            {children}
        </IsMobileContext.Provider>
    );
}