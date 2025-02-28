import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { NoticeModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { INotice } from "../NoticeMain/NoticeMain";

interface INoticeModalProps {
    setNoticeId: React.Dispatch<React.SetStateAction<number>>;
    noticeId: number;
    postSuccess: () => void;
}

interface INoticeDetail extends INotice {
    fileName: string | null;
    fileExt: string | null;
    fileSize: number | null;
    physicalPath: string | null;
    logicalPath: string | null;
}

interface INoticeDetailResponse {
    detailValue: INoticeDetail;
}

interface IPostResponse {
    result: "success" | "fail";
}

export const NoticeModal: FC<INoticeModalProps> = ({ noticeId, setNoticeId, postSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detail, setDetail] = useState<INoticeDetail>();
    const formRef = useRef<HTMLFormElement>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string>(null);

    useEffect(() => {
        noticeId && searchDetail();

        return () => {
            setNoticeId(0);
        };
    }, []);

    const searchDetail = () => {
        axios
            .post("/management/noticeFileDetailJson.do", { noticeId })
            .then((res: AxiosResponse<INoticeDetailResponse>) => {
                if (res.data.detailValue) {
                    setDetail(res.data.detailValue);
                    const { fileExt, logicalPath } = res.data.detailValue;
                    if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
                        setImageUrl(logicalPath);
                    } else {
                        setImageUrl("");
                    }
                }
            });
    };

    const saveNotice = () => {
        axios.post("/management/noticeSave.do", formRef.current).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("저장되었습니다.");
                postSuccess();
            }
        });
    };

    const saveNoticeFile = () => {
        axios.post("/management/noticeFileSave.do", formRef.current).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("저장되었습니다.");
                postSuccess();
            }
        });
    };

    const updateNotice = () => {
        const formData = new FormData(formRef.current);
        formData.append("noticeId", noticeId.toString());
        axios.post("/management/noticeUpdate.do", formData).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("수정되었습니다.");
                postSuccess();
            }
        });
    };

    const updateNoticeFile = () => {
        const formData = new FormData(formRef.current);
        formData.append("noticeId", noticeId.toString());
        axios.post("/management/noticeFileUpdate.do", formData).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("수정되었습니다.");
                postSuccess();
            }
        });
    };

    const deleteNotice = () => {
        axios.post("/management/noticeDeleteJson.do", { noticeId }).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("삭제되었습니다.");
                postSuccess();
            }
        });
    };

    const deleteNoticeFile = () => {
        axios.post("/management/noticeFileDeleteJson.do", { noticeId }).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("삭제되었습니다.");
                postSuccess();
            }
        });
    };

    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;

        if (fileInfo && fileInfo.length > 0) {
            const fileName = fileInfo[0].name;
            const fileSplit = fileName.split(".");
            const fileExt = fileSplit.pop()?.toLowerCase(); // 확장자 안전 추출

            if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            }

            setFileName(fileName);
        }
    };

    const fileDownload = () => {
        const param = new URLSearchParams();
        param.append("noticeId", noticeId.toString());
        axios
            .post("/management/noticeDownload.do", param, { responseType: "blob" })
            .then((res: AxiosResponse<Blob>) => {
                const url = window.URL.createObjectURL(res.data);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", detail?.fileName as string);
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            });
    };
    return (
        <NoticeModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        제목 :<StyledInput type='text' name='fileTitle' defaultValue={detail?.title}></StyledInput>
                    </label>
                    <label>
                        내용 : <StyledInput type='text' name='fileContent' defaultValue={detail?.content}></StyledInput>
                    </label>
                    파일 :
                    <StyledInput
                        onChange={handlerFile}
                        type='file'
                        id='fileInput'
                        name='file'
                        style={{ display: "none" }}
                    ></StyledInput>
                    <label className='img-label' htmlFor='fileInput'>
                        파일 첨부하기
                    </label>
                    <div onClick={fileDownload}>
                        {imageUrl ? (
                            <div>
                                <label>미리보기</label>
                                <img src={imageUrl} />
                            </div>
                        ) : (
                            <div>{fileName || detail?.fileName}</div>
                        )}
                    </div>
                    <div className={"button-container"}>
                        <StyledButton type='button' onClick={noticeId ? updateNoticeFile : saveNoticeFile}>
                            {noticeId ? "수정" : "저장"}
                        </StyledButton>
                        {Boolean(noticeId) && (
                            <StyledButton type='button' onClick={deleteNoticeFile}>
                                삭제
                            </StyledButton>
                        )}
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
