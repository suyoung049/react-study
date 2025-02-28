import { useLocation } from "react-router-dom";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { NoticeModal } from "../NoticeModal/NoticeModal";
import { Portal } from "../../../../common/portal/Portal";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

export interface INotice {
    noticeId: number;
    title: string;
    content: string;
    createdDate: string;
    author: string;
}

interface INoticeListBodyResponse {
    noticeList: INotice[];
    noticeCnt: number;
}

export const NoticeMain = () => {
    const { search } = useLocation();
    const [noticeList, setNoticeList] = useState<INotice[]>([]);
    const [noticeCount, setNoticeCount] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const [noticeId, setNoticeId] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        searchNoticeList();
    }, [search]);

    const searchNoticeList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        const searchParam = new URLSearchParams(search);
        searchParam.append("currentPage", currentPage.toString());
        searchParam.append("pageSize", "5");

        axios.post("/management/noticeListBody.do", searchParam).then((res: AxiosResponse<INoticeListBodyResponse>) => {
            setNoticeList(res.data.noticeList);
            setNoticeCount(res.data.noticeCnt);
            setCPage(currentPage);
        });
    };

    const handlerModal = (id: number) => {
        setModal(!modal);
        setNoticeId(id);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchNoticeList();
    };
    return (
        <>
            총 갯수 {noticeCount} : 현재 페이지 : {cPage}
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={5}>번호</StyledTh>
                        <StyledTh size={50}>제목</StyledTh>
                        <StyledTh size={10}>작성자</StyledTh>
                        <StyledTh size={20}>등록일</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {noticeList?.length > 0 ? (
                        noticeList.map((item) => {
                            return (
                                <tr key={item.noticeId} onClick={() => handlerModal(item.noticeId)}>
                                    <StyledTd>{item.noticeId}</StyledTd>
                                    <StyledTd>{item.title}</StyledTd>
                                    <StyledTd>{item.author}</StyledTd>
                                    <StyledTd>{item.createdDate}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={4}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={noticeCount}
                onChange={searchNoticeList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
            {modal && (
                <Portal>
                    <NoticeModal noticeId={noticeId} setNoticeId={setNoticeId} postSuccess={postSuccess} />
                </Portal>
            )}
        </>
    );
};
