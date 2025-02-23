import { NoticeSearchStyled } from "./styled";
import Button from "react-bootstrap/Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";

export const NoticeSearch = () => {
    const title = useRef<HTMLInputElement>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const navigate = useNavigate();
    useEffect(() => {
        window.location.search && navigate(window.location.pathname, { replace: true });
    }, [navigate]);

    const handlerSearch = () => {
        const query: string[] = [];

        !title.current.value || query.push(`searchTitle=${title.current.value}`);
        !startDate || query.push(`searchStDate=${startDate}`);
        !endDate || query.push(`searchEdDate=${endDate}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/management/notice${queryString}`);
    };

    return (
        <NoticeSearchStyled>
            <div className='input-box'>
                <StyledInput size={"small"} ref={title}></StyledInput>
                <StyledInput size={"small"} type='date' onChange={(e) => setStartDate(e.target.value)}></StyledInput>
                <StyledInput size={"small"} type='date' onChange={(e) => setEndDate(e.target.value)}></StyledInput>
                <StyledButton onClick={handlerSearch}>검색</StyledButton>
                <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
            </div>
        </NoticeSearchStyled>
    );
};
