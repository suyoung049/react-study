import { useContext, useRef, useState } from "react";
import { CommonCodeContext } from "../../../../../api/Provider/CommonCodeProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { CommonCodeSearchStyled } from "./styled";

export const CommonCodeSearch = () => {
    const { setSearchKeyWord } = useContext(CommonCodeContext);
    const [selectValue, setSelectValue] = useState<string>("groupName");
    const inputValue = useRef<HTMLInputElement>();
    const [modal, setModal] = useRecoilState(modalState);

    const options = [
        {
            label: "그룹코드명",
            value: "groupName",
        },
        {
            label: "그룹코드",
            value: "groupCode",
        },
    ];

    const handlerSearch = () => {
        setSearchKeyWord({
            groupCodeSelect: selectValue,
            searchTitle: inputValue.current.value,
        });
    };

    return (
        <CommonCodeSearchStyled>
            <div className='flex space-x-4'>
                <div>
                    {/* <select onChange={(e) => setSelectValue(e.target.value)}>
                            <option value={"groupName"}>그룹코드명</option>
                            <option value={"groupCode"}>그룹코드</option>
                        </select> */}
                    <StyledSelectBox options={options} value={selectValue} onChange={setSelectValue} />
                    <StyledInput ref={inputValue} />
                    <StyledButton onClick={handlerSearch}>검색</StyledButton>
                    <StyledButton
                        onClick={() => {
                            setModal(!modal);
                        }}
                    >
                        등록
                    </StyledButton>
                </div>
            </div>
        </CommonCodeSearchStyled>
    );
};
