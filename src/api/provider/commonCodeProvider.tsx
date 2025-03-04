import React, { createContext, FC, useState } from "react";

interface ISearchKeyWord {
    searchKeyWord?: object;
    setSearchKeyWord?: React.Dispatch<React.SetStateAction<object>>;
}

const defaultValue: ISearchKeyWord = {
    searchKeyWord: {},
    setSearchKeyWord: () => {},
};

// 다른 컴포넌트에서 사용이 가능한 context를 만듬
export const CommonCodeContext = createContext(defaultValue);

//만들어진 context를 컴포넌트에 전달할 provider를 만든다.
export const CommonCodeProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyWord, setSearchKeyWord] = useState({});
    return (
        <CommonCodeContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>{children}</CommonCodeContext.Provider>
    );
};
