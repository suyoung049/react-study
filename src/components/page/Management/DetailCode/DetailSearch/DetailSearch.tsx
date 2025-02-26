import { DetailSearchStyled } from "./styled";

export const DetailSearch = () => {
    return (
        <DetailSearchStyled>
            <div>
                <div className='flex space-x-4'>
                    <div>
                        <select>
                            <option>상세코드명</option>
                            <option>상세코드</option>
                        </select>
                        <input />
                        <button>검색</button>
                        <button>등록</button>
                    </div>
                </div>
            </div>
        </DetailSearchStyled>
    );
};
