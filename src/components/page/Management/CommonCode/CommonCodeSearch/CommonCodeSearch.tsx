import { useContext, useRef, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeStyled } from "./styled";
import { CommonCodeContext } from "../../../../../api/provider/commonCodeProvider";

export const CommonCodeSearch = () => {
    const [selectValue, setSelectValue] = useState<string>("groupName");
    const inputValue = useRef<HTMLInputElement>();
    const { setSearchKeyWord } = useContext(CommonCodeContext);

    const handlerSearch = () => {
        setSearchKeyWord({
            groupCodeSelect: selectValue,
            searchTitle: inputValue.current.value
        });
    };
    const options = [
        { label: "그룹코드명", value: "groupName" },
        { label: "그룹코드", value: "groupCode" },
    ];

    return (
        <CommonCodeStyled>
            <StyledSelectBox options={options} value={selectValue} onChange={setSelectValue} />
            <StyledInput ref={inputValue} />
            <StyledButton onClick={handlerSearch}>검색</StyledButton>
            <StyledButton>등록</StyledButton>
        </CommonCodeStyled>
    );
};
