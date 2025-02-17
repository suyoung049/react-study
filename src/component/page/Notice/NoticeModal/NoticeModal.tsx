import React, { FC, useEffect, useRef, useState } from 'react';
import { NoticeModalStyled } from './styled';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import axios from 'axios';

interface NoticeModalProps {
    id: number;
    postSuccess: () => void;
    setNoticeId: React.Dispatch<React.SetStateAction<number>>;
}

interface NoticeDetail {
    noticeId: number;
    title: string;
    content: string;
    author: string;
    createdDate: string;
    updatedDate: string;
    fileName?: string;
}

export const NoticeModal: FC<NoticeModalProps> = ({ id, postSuccess, setNoticeId }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detail, setDetail] = useState<NoticeDetail>();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        id && searchDetail(id);

        return () => {
            setNoticeId(0);
        };
    }, []);

    const handlerModal = () => {
        setModal(!modal);
    };

    const searchDetail = (id: number) => {
        axios.post('/management/noticeDetailJson.do', { noticeId: id }).then((res) => {
            setDetail(res.data.detailValue);
        });
    };

    const saveNotice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.post('/management/noticeSave.do', formRef.current).then((res) => {
            res.data.result === 'success' && postSuccess();
        });
    };

    const deleteNotice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.post('/management/noticeDeleteJson.do', { noticeId: id }).then((res) => {
            res.data.result === 'success' && postSuccess();
        });
    };

    const updateNotice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        formData.append('noticeId', id.toString());

        axios.post('/management/noticeUpdateJson.do', formRef.current).then((res) => {
            res.data.result === 'success' && postSuccess();
        });
    };

    return (
        <NoticeModalStyled>
            <div className="container">
                <form ref={formRef}>
                    <label>
                        제목 :<input type="text" defaultValue={detail?.title} name="title"></input>
                    </label>
                    <label>
                        내용 : <input type="text" defaultValue={detail?.content} name="content"></input>
                    </label>
                    {detail?.fileName && (
                        <>
                            파일 :<input type="file" id="fileInput" style={{ display: 'none' }}></input>
                            <label className="img-label" htmlFor="fileInput">
                                파일 첨부하기
                            </label>
                            <div>
                                <div>
                                    <label>미리보기</label>
                                    <img src="" />
                                </div>
                            </div>
                        </>
                    )}

                    <div className={'button-container'}>
                        <button onClick={ id ? updateNotice : saveNotice}>{id ? "수정" : "저장"}</button>
                        { !!id && <button onClick={deleteNotice}>삭제</button> }
                        <button onClick={handlerModal}>나가기</button>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
