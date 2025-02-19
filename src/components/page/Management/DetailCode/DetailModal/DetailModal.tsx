import { FC, useEffect, useState } from "react";
import { DetailModalStyled } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { useRecoilState } from "recoil";
import axios, { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";

interface ICommonDetail {
    detailIdx: number;
    groupCode: string;
    detailCode: string;
    detailName: string;
    useYn: string;
    author: string;
    createdDate: string;
    note: string;
}

interface IDetailModalProps {
    detailIdx: number;
    setDetailIdx: React.Dispatch<React.SetStateAction<number>>;
    postSuccess: () => void;
}

export const DetailModal: FC<IDetailModalProps> = ({ detailIdx, setDetailIdx, postSuccess }) => {
    const [detailCode, setDetailCode] = useState<ICommonDetail>();
    const [modal, setModal] = useRecoilState(modalState);
    const { state } = useLocation();

    useEffect(() => {
        searchDetailCode();

        return () => {
            setDetailIdx(0);
        };
    }, []);

    const searchDetailCode = () => {
        axios
            .post("/management/commonDetailCodeDetailBody.do", { detailIdx })
            .then((res: AxiosResponse<{ detailValue: ICommonDetail }>) => {
                setDetailCode(res.data.detailValue);
            });
    };

    const updateCommonDetailCode = () => {
        axios
            .post("/management/commonDetailCodeUpdateBody.do", {
                ...detailCode,
                detailNote: detailCode.note,
                detailIdx,
            })
            .then((res) => {
                if (res.data.result === "success") {
                    postSuccess();
                } else if (res.data.result.includes("Duplicate")) {
                    alert(`입력하신 그룹코드(${detailCode.groupCode})는 중복됩니다.`);
                    return;
                }
            });
    };
    const saveCommonDetailCode = () => {
        axios
            .post("/management/commonDetailCodeSaveBody.do", {
                ...detailCode,
                groupCode: state.groupCode,
                detailNote: detailCode.note,
                detailIdx,
            })
            .then((res) => {
                if (res.data.result === "success") {
                    postSuccess();
                } else if (res.data.result.includes("Duplicate")) {
                    alert(`입력하신 그룹코드(${detailCode.groupCode})는 중복됩니다.`);
                    return;
                }
            });
    };
    const deleteCommonDetailCode = () => {
        axios.post("/management/commonDetailCodeDeleteBody.do", { detailIdx }).then((res) => {
            res.data.result === "success" && postSuccess();
        });
    };

    return (
        <DetailModalStyled>
            <div className='container'>
                <label>
                    그룹코드*
                    <input type='text' defaultValue={state.groupCode} readOnly></input>
                </label>
                <label>
                    상세코드*
                    <input
                        type='text'
                        defaultValue={detailCode?.detailCode}
                        onChange={(e) => setDetailCode({ ...detailCode, detailCode: e.target.value })}
                    ></input>
                </label>
                <label>
                    상세코드명*
                    <input
                        type='text'
                        defaultValue={detailCode?.detailName}
                        onChange={(e) => setDetailCode({ ...detailCode, detailName: e.target.value })}
                    ></input>
                </label>
                <label>
                    상세코드설명*
                    <input
                        type='text'
                        defaultValue={detailCode?.note}
                        onChange={(e) => setDetailCode({ ...detailCode, note: e.target.value })}
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
                            checked={detailCode?.useYn === "Y"}
                            onChange={(e) => setDetailCode({ ...detailCode, useYn: e.target.value })}
                        />

                        <label>No</label>
                        <input
                            type='radio'
                            name='useYn'
                            value={"N"}
                            checked={!detailCode?.useYn || detailCode?.useYn === "N"} // 값이 없거나 "N"일 때
                            onChange={(e) => setDetailCode({ ...detailCode, useYn: e.target.value })}
                        />
                    </div>
                </label>
                <div className={"button-container"}>
                    <button type='button' onClick={detailIdx ? updateCommonDetailCode : saveCommonDetailCode}>
                        {detailIdx ? "수정" : "저장"}
                    </button>
                    {!!detailIdx && (
                        <button type='button' onClick={deleteCommonDetailCode}>
                            삭제
                        </button>
                    )}
                    <button type='button' onClick={() => setModal(!modal)}>
                        나가기
                    </button>
                </div>
            </div>
        </DetailModalStyled>
    );
};
