import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { NoticeModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import axios, { AxiosResponse } from "axios";
import { modalState } from "@/stores/modalState";

interface NoticeModalProps {
    id: number;
    postSuccess: () => void;
    setNoticeId: React.Dispatch<React.SetStateAction<number>>;
}

interface INoticeDetail {
    noticeId: number;
    title: string;
    content: string;
    author: string;
    createdDate: string;
    updatedDate: string;
    fileName?: string;
    fileExt?: string;
    logicalPath?: string;
}

interface INoticeDetailResponse {
    detailValue: INoticeDetail;
}

export const NoticeModal: FC<NoticeModalProps> = ({
    id,
    postSuccess,
    setNoticeId,
}) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detail, setDetail] = useState<INoticeDetail>();
    const formRef = useRef<HTMLFormElement>(null);
    const [fileData, setFileData] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>();

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
        axios
            .post("/management/noticeFileDetail.do", { noticeId: id })
            .then((res: AxiosResponse<INoticeDetailResponse>) => {
                // 파일은 noticeFileDetail
                if (res.data.detailValue) {
                    setDetail(res.data.detailValue);
                    const { fileExt, logicalPath } = res.data.detailValue;
                    if (
                        fileExt === "jpg" ||
                        fileExt === "gif" ||
                        fileExt === "png"
                    ) {
                        console.log(fileExt);
                        setImageUrl(logicalPath);
                    } else {
                        setImageUrl("");
                    }
                }
            });
    };

    const saveNotice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.post("/management/noticeSave.do", formRef.current).then((res) => {
            res.data.result === "success" && postSuccess();
        });
    };

    const saveNoticeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        fileData && formData.append("file", fileData);
        axios.post("/management/noticeFileSave.do", formData).then((res) => {
            res.data.result === "success" && postSuccess();
        });
    };

    const deleteNotice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios
            .post("/management/noticeFileDeleteJson.do", { noticeId: id })
            .then((res) => {
                // 파일은 noticeFileDeleteJson
                res.data.result === "success" && postSuccess();
            });
    };

    const updateNotice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        formData.append("noticeId", id.toString());

        axios.post("/management/noticeUpdateJson.do", formData).then((res) => {
            res.data.result === "success" && postSuccess();
        });
    };

    const updateNoticeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        fileData && formData.append("file", fileData);
        formData.append("noticeId", id.toString());

        axios.post("/management/noticeFileUpdate.do", formData).then((res) => {
            res.data.result === "success" && postSuccess();
        });
    };

    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;
        if (fileInfo?.length > 0) {
            const fileInfoSplit = fileInfo[0].name.split(".");
            const fileExtension = fileInfoSplit[1].toLowerCase();

            if (
                fileExtension === "jpg" ||
                fileExtension === "gif" ||
                fileExtension === "png"
            ) {
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            } else {
                setImageUrl("");
            }

            setFileData(fileInfo[0]);
        }
    };

    return (
        <NoticeModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        제목 :
                        <input
                            type='text'
                            defaultValue={detail?.title}
                            name='fileTitle'
                        ></input>
                    </label>
                    <label>
                        내용 :{" "}
                        <input
                            type='text'
                            defaultValue={detail?.content}
                            name='fileContent'
                        ></input>
                    </label>
                    파일 :
                    <input
                        type='file'
                        id='fileInput'
                        style={{ display: "none" }}
                        onChange={handlerFile}
                    ></input>
                    <label className='img-label' htmlFor='fileInput'>
                        파일 첨부하기
                    </label>
                    <div>
                        {imageUrl ? (
                            <div>
                                <label>미리보기</label>
                                <img src={imageUrl} />
                                {fileData?.name}
                            </div>
                        ) : (
                            <div>{fileData?.name}</div>
                        )}
                    </div>
                    <div className={"button-container"}>
                        <button
                            type='button'
                            onClick={id ? updateNoticeFile : saveNoticeFile}
                        >
                            {id ? "수정" : "저장"}
                        </button>
                        {!!id && (
                            <button type='button' onClick={deleteNotice}>
                                삭제
                            </button>
                        )}
                        <button type='button' onClick={handlerModal}>
                            나가기
                        </button>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
