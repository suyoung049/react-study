import styled from "styled-components";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { NoticeMain } from "../../components/page/Management/Notice/NoticeMain/NoticeMain";
import { NoticeSearch } from "../../components/page/Management/Notice/NoticeSearch/NoticeSearch";

export const Notice = () => {
    return (
        <>
            <ContentBox variant='info' fontSize='large'>
                공지사항
            </ContentBox>
            <NoticeSearch />
            <NoticeMain />
        </>
    );
};
