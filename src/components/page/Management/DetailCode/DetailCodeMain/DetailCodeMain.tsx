import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DetailCodeMainStyled } from "./styled";
import { DetailCodeContext } from "../../../../../api/Provider/DetailCodeProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { DetailModal } from "../DetailModal/DetailModal";
import { Portal } from "../../../../common/potal/Portal";

interface ICommonDetailCode {
    author: string;
    createdDate: string;
    detailCode: string;
    detailIdx: number;
    detailName: string;
    groupCode: string;
    note: string;
    useYn: string;
}

interface ICommonDetailCodeResponse {
    commonDetailCode: ICommonDetailCode[];
    commonDetailCodeCnt: number;
}

export const DetailCodeMain = () => {
    const [modal, setModal] = useRecoilState(modalState);
    const { groupIdx } = useParams();
    const { state } = useLocation();
    const [commonDetailCodeList, setCommonDetailCodeList] = useState<ICommonDetailCode[]>();
    const { searchKeyWord } = useContext(DetailCodeContext);
    const [detailIdx, setDetailIdx] = useState<number>();
    const navigate = useNavigate();

    useEffect(() => {
        searchDetailCode();
    }, [searchKeyWord]);

    const searchDetailCode = () => {
        axios
            .post("/management/commonDetailCodeListJson.do", {
                ...searchKeyWord,
                groupCode: state.groupCode,
                currentPage: 1,
                pageSize: 5,
            })
            .then((res: AxiosResponse<ICommonDetailCodeResponse>) => {
                setCommonDetailCodeList(res.data.commonDetailCode);
            });
    };

    const updateBtnHandler = (idx: number) => {
        setDetailIdx(idx);
        setModal(!modal);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchDetailCode();
    };

    return (
        <DetailCodeMainStyled>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>그룹코드</th>
                        <th>상세코드</th>
                        <th>상세코드명</th>
                        <th>상세코드설명</th>
                        <th>사용여부</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {commonDetailCodeList?.length > 0 ? (
                        commonDetailCodeList?.map((commonDetailCode, index) => {
                            return (
                                <tr key={commonDetailCode.detailIdx}>
                                    <td>{commonDetailCode.detailIdx}</td>
                                    <td>{commonDetailCode.groupCode}</td>

                                    <td>{commonDetailCode.detailCode}</td>
                                    <td>{commonDetailCode.detailName}</td>
                                    <td>{commonDetailCode.note}</td>
                                    <td>{commonDetailCode.useYn}</td>
                                    <td>
                                        <Button onClick={() => updateBtnHandler(commonDetailCode.detailIdx)}>
                                            수정
                                        </Button>
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
            <button onClick={() => navigate(-1)}>뒤로가기</button>
            {modal && (
                <Portal>
                    <DetailModal detailIdx={detailIdx} setDetailIdx={setDetailIdx} postSuccess={postSuccess} />
                </Portal>
            )}
        </DetailCodeMainStyled>
    );
};
