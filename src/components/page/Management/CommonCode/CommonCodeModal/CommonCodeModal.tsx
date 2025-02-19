import { useRecoilState } from "recoil";
import { CommonCodeModalStyle } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface ICommonCodeModalProps {
    groupIdx: number;
    setGroupIdx: React.Dispatch<React.SetStateAction<number>>;
    postSuccess: () => void;
}

interface ICommonCode {
    author: string;
    createdDate: string;
    groupCode: string;
    groupIdx: number;
    groupName: string;
    note: string;
    useYn: string;
}

export const CommonCodeModal: FC<ICommonCodeModalProps> = ({ groupIdx, setGroupIdx, postSuccess }) => {
    const [modal, setModal] = useRecoilState(modalState);
    const [commonCode, setCommonCode] = useState<ICommonCode>();

    useEffect(() => {
        groupIdx && commonCodeDetail();

        return () => {
            setGroupIdx(0);
        };
    }, []);

    const commonCodeDetail = () => {
        axios
            .post("/management/commonCodeDetailJson.do", { groupIdx })
            .then((res: AxiosResponse<{ detailValue: ICommonCode }>) => {
                setCommonCode(res.data.detailValue);
            });
    };

    const saveCommonCode = () => {
        axios.post("/management/commonCodeSaveBody.do", commonCode).then((res: AxiosResponse<{ result: string }>) => {
            if (res.data.result === "success") {
                postSuccess();
            } else if (res.data.result.includes("Duplicate")) {
                alert(`입력하신 그룹코드(${commonCode.groupCode})는 중복됩니다.`);
                return;
            }
        });
    };

    const deleteCommonCode = () => {
        axios
            .post("/management/commonCodeDeleteBody.do", { groupIdx })
            .then((res: AxiosResponse<{ result: string }>) => {
                if (res.data.result === "success") {
                    postSuccess();
                }
            });
    };

    const updateCommonCode = () => {
        axios.post("/management/commonCodeUpdateBody.do", commonCode).then((res: AxiosResponse<{ result: string }>) => {
            if (res.data.result === "success") {
                postSuccess();
            } else if (res.data.result.includes("Duplicate")) {
                alert(`입력하신 그룹코드(${commonCode.groupCode})는 중복됩니다.`);
                return;
            }
        });
    };

    return (
        <CommonCodeModalStyle>
            <div className='container'>
                <label>
                    그룹코드*
                    <input
                        onChange={(e) => setCommonCode({ ...commonCode, groupCode: e.target.value })}
                        type='text'
                        defaultValue={commonCode?.groupCode}
                    ></input>
                </label>
                <label>
                    그룹코드명*
                    <input
                        type='text'
                        defaultValue={commonCode?.groupName}
                        onChange={(e) => setCommonCode({ ...commonCode, groupName: e.target.value })}
                    ></input>
                </label>
                <label>
                    그룹코드설명*
                    <input
                        type='text'
                        defaultValue={commonCode?.note}
                        onChange={(e) => setCommonCode({ ...commonCode, note: e.target.value })}
                    ></input>
                </label>
                <label>
                    사용여부*
                    <div className='radio-group'>
                        <label>Yes</label>
                        <input
                            type='radio'
                            name='useYn'
                            value={"Y"}
                            checked={commonCode?.useYn === "Y"}
                            onChange={(e) => setCommonCode({ ...commonCode, useYn: e.target.value })}
                        />

                        <label>No</label>
                        <input
                            type='radio'
                            name='useYn'
                            value={"N"}
                            checked={!commonCode?.useYn || commonCode?.useYn === "N"} // 값이 없거나 "N"일 때
                            onChange={(e) => setCommonCode({ ...commonCode, useYn: e.target.value })}
                        />
                    </div>
                </label>
                <div className={"button-container"}>
                    <button type='button' onClick={groupIdx ? updateCommonCode : saveCommonCode}>
                        {groupIdx ? "수정" : "저장"}
                    </button>
                    {!!groupIdx && (
                        <button type='button' onClick={deleteCommonCode}>
                            삭제
                        </button>
                    )}
                    <button type='button' onClick={() => setModal(!modal)}>
                        나가기
                    </button>
                </div>
            </div>
        </CommonCodeModalStyle>
    );
};
