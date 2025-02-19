import { useContext, useRef, useState } from "react";
import { CommonCodeContext } from "../../../../../api/Provider/CommonCodeProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

export const CommonCodeSearch = () => {
    const { setSearchKeyWord } = useContext(CommonCodeContext);
    const [selectValue, setSelectValue] = useState<string>("groupName");
    const inputValue = useRef<HTMLInputElement>();
    const [modal, setModal] = useRecoilState(modalState);

    const handlerSearch = () => {
        setSearchKeyWord({
            groupCodeSelect: selectValue,
            searchTitle: inputValue.current.value,
        });
    };

    return (
        <div>
            <div>
                <div className='flex space-x-4'>
                    <div>
                        <select onChange={(e) => setSelectValue(e.target.value)}>
                            <option value={"groupName"}>그룹코드명</option>
                            <option value={"groupCode"}>그룹코드</option>
                        </select>
                        <input ref={inputValue} />
                        <button onClick={handlerSearch}>검색</button>
                        <button
                            onClick={() => {
                                setModal(!modal);
                            }}
                        >
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
