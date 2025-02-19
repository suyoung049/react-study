import { FC, createContext, useState } from "react";

interface ISearchKeyword {
    searchKeyWord: object;
    setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: ISearchKeyword = {
    searchKeyWord: {},
    setSearchKeyWord: () => {},
};

// 다른 컴포넌트에서 사용이 가능한 context를 만든다.
export const CommonCodeContext = createContext(defaultValue);

// 컴포넌트를 이용하여 제공이 되는 곳을 지정하는 작업임
export const CommonCodeProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyWord, setSearchKeyWord] = useState({});
    return (
        <CommonCodeContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>
            {children}
        </CommonCodeContext.Provider>
    );
};
