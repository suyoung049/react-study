import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { NoticeSearchStyled } from "./styled";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

export const NoticeSearch = () => {
    const title = useRef<HTMLInputElement>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const navigate = useNavigate();

    useEffect(() => {
        window.location.search && navigate(window.location.pathname, { replace: true });
    }, []);

    const handlerSearch = () => {
        //검색 데이터를 url에 queryParam으로 옮겨 줄것
        const query: string[] = [];
        !title.current.value || query.push(`searchTitle=${title.current.value}`);
        !startDate || query.push(`searchStDate=${startDate}`);
        !endDate || query.push(`searchEdDate=${endDate}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/management/notice${queryString}`);
    };
    return (
        <NoticeSearchStyled>
            <StyledInput ref={title} />
            <StyledInput type='date' onChange={(e) => setStartDate(e.target.value)} />
            <StyledInput type='date' onChange={(e) => setEndDate(e.target.value)} />
            <StyledButton onClick={handlerSearch}>검색</StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </NoticeSearchStyled>
    );
};
