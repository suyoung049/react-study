import { useContext, useRef, useState } from "react";
import { DetailSearchStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { DetailCodeContext } from "../../../../../api/Provider/DetailCodeProvider";

export const DetailSearch = () => {
    const { setSearchKeyWord } = useContext(DetailCodeContext);
    const [selectValue, setSelectValue] = useState<string>("detailCodeName");
    const inputValue = useRef<HTMLInputElement>();
    const [modal, setModal] = useRecoilState(modalState);

    const handlerSearch = () => {
        setSearchKeyWord({
            detailCodeSelect: selectValue,
            detailCodeSearchTitle: inputValue.current.value,
        });
    };

    return (
        <DetailSearchStyled>
            <div>
                <div className='flex space-x-4'>
                    <div>
                        <select onChange={(e) => setSelectValue(e.target.value)}>
                            <option value={"detailCodeName"}>상세코드명</option>
                            <option value={"detailCode"}>상세코드</option>
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
        </DetailSearchStyled>
    );
};
