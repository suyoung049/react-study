import React, { useContext, useEffect, useState } from "react";
import { CommonCodeContext } from "../../../../../api/Provider/CommonCodeProvider";
import { CommonCodeMainStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CommonCodeModal } from "../CommonCodeModal/CommonCodeModal";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";

interface ICommonCode {
    author: string;
    createdDate: string;
    groupCode: string;
    groupIdx: number;
    groupName: string;
    note: string;
    useYn: string;
}

interface ICommonCodeResponse {
    commonCode: ICommonCode[];
    commonCodeCnt: number;
}

export const CommonCodeMain = () => {
    const { searchKeyWord } = useContext(CommonCodeContext);
    const [commonCodeList, setCommonCodeList] = useState<ICommonCode[]>();
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState(modalState);
    const [groupIdx, setGroupIdx] = useState<number>();

    useEffect(() => {
        searchCommonCode();
    }, [searchKeyWord]);

    const searchCommonCode = () => {
        axios
            .post("/management/commonCodeListJson.do", {
                ...searchKeyWord,
                currentPage: 1,
                pageSize: 5,
            })
            .then((res: AxiosResponse<ICommonCodeResponse>) => {
                setCommonCodeList(res.data.commonCode);
            });
    };

    const handlerModal = (id: number) => {
        setModal(!modal);
        setGroupIdx(id);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchCommonCode();
    };

    return (
        <CommonCodeMainStyled>
            <table>
                <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "5%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>그룹코드</th>
                        <th>그룹코드명</th>
                        <th>그룹코드설명</th>
                        <th>등록일</th>
                        <th>사용여부</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {commonCodeList?.length > 0 ? (
                        commonCodeList?.map((commonCode, index) => {
                            return (
                                <tr key={commonCode.groupIdx}>
                                    <td>{commonCode.groupIdx}</td>
                                    <td
                                        className='td-pointer'
                                        onClick={() => {
                                            navigate(`${commonCode.groupIdx}`, {
                                                state: {
                                                    groupCode: commonCode.groupCode,
                                                },
                                            });
                                        }}
                                    >
                                        {commonCode.groupCode}
                                    </td>

                                    <td>{commonCode.groupName}</td>
                                    <td>{commonCode.note}</td>
                                    <td>{commonCode.createdDate.substring(0, 10)}</td>
                                    <td>{commonCode.useYn}</td>
                                    <td>
                                        <Button onClick={() => handlerModal(commonCode.groupIdx)}>수정</Button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={7}>조회 내역이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {modal && (
                <Portal>
                    <CommonCodeModal
                        groupIdx={groupIdx}
                        setGroupIdx={setGroupIdx}
                        postSuccess={postSuccess}
                    ></CommonCodeModal>
                </Portal>
            )}
        </CommonCodeMainStyled>
    );
};
