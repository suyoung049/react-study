import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
    StyledTable,
    StyledTd,
    StyledTh,
} from "@/component/common/styled/StyledTable";
import { Portal } from "@/component/common/potal/Portal";
import { NoticeModal } from "../NoticeModal/NoticeModal";
import { modalState } from "@/stores/modalState";

interface INotice {
    noticeId: number;
    title: string;
    author: string;
    createdDate: string;
}

interface INoticeResponse {
    noticeList: INotice[];
    noticeCnt: number;
}

export const NoticeMain = () => {
    const { search } = useLocation();
    const [noticeList, setNoticeList] = useState<INotice[]>();
    const [listCount, setListCount] = useState<number>(0);
    const [noticeId, setNoticeId] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState); // recoil에 저장된 state
    useEffect(() => {
        searchNoitceList();
    }, [search]);

    const searchNoitceList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        const searchParam = new URLSearchParams(search);
        searchParam.append("currentPage", currentPage.toString());
        searchParam.append("pageSize", "5");

        axios
            .post("/management/noticeListJson.do", searchParam)
            .then((res: AxiosResponse<INoticeResponse>) => {
                setNoticeList(res.data.noticeList);
                setListCount(res.data.noticeCnt);
            });
    };

    const handlerModal = (id: number) => {
        setModal(!modal);
        setNoticeId(id);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchNoitceList();
    };
    return (
        <>
            총 갯수 : {listCount} 현재 페이지 : 0
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
                        noticeList?.map((notice) => {
                            return (
                                <tr
                                    key={notice.noticeId}
                                    onClick={() =>
                                        handlerModal(notice.noticeId)
                                    }
                                >
                                    <StyledTd>{notice.noticeId}</StyledTd>
                                    <StyledTd>{notice.title}</StyledTd>
                                    <StyledTd>{notice.author}</StyledTd>
                                    <StyledTd>{notice.createdDate}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            {modal && (
                <Portal>
                    <NoticeModal
                        id={noticeId}
                        postSuccess={postSuccess}
                        setNoticeId={setNoticeId}
                    />
                </Portal>
            )}
        </>
    );
};
