import { useContext, useEffect, useState } from "react";
import { CommonCodeMainStyled } from "./styled";
import { CommonCodeContext } from "../../../../../api/provider/commonCodeProvider";
import axios, { AxiosResponse } from "axios";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";

interface ICommonCode {
    groupIdx: number;
    groupCode: string;
    groupName: string;
    useYn: string;
    createdDate: string;
    author: string;
    note: string;
}

interface ICommonCodeResponse {
    commonCode: ICommonCode[];
    commonCodeCnt: number;
}

export const CommonCodeMain = () => {
    const { searchKeyWord } = useContext(CommonCodeContext);
    const [commonCodeList, setCommonCodeList] = useState<ICommonCode[]>();
    const [commonCodeCount, setCommonCodeCount] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);

    useEffect(() => {
        searchCommonCode();
    }, [searchKeyWord]);

    const searchCommonCode = (currentPage?: number) => {
        currentPage = currentPage || 1;
        const payload = {
            ...(searchKeyWord ? searchKeyWord : {}),
            pageSize: 5,
            currentPage,
        };
        axios.post("/management/commonCodeListBody.do", payload).then((res: AxiosResponse<ICommonCodeResponse>) => {
            setCommonCodeList(res.data.commonCode);
            setCommonCodeCount(res.data.commonCodeCnt);
            setCPage(currentPage);
            console.log(res.data.commonCode);
        });
    };
    return (
        <CommonCodeMainStyled>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={1}>번호</StyledTh>
                        <StyledTh size={3}>그룹코드</StyledTh>
                        <StyledTh size={6}>그룹코드명</StyledTh>
                        <StyledTh size={7}>그룹코드설명</StyledTh>
                        <StyledTh size={5}>등록일</StyledTh>
                        <StyledTh size={3}>사용여부</StyledTh>
                        <StyledTh size={3}>비고</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {commonCodeList?.length > 0 ? (
                        commonCodeList.map((item) => {
                            return (
                                <tr key={item.groupIdx}>
                                    <StyledTd>{item.groupIdx}</StyledTd>
                                    <StyledTd>{item.groupCode}</StyledTd>
                                    <StyledTd>{item.groupName}</StyledTd>
                                    <StyledTd>{item.note}</StyledTd>
                                    <StyledTd>{new Date(item.createdDate).toISOString().split("T")[0]}</StyledTd>
                                    <StyledTd>{item.useYn}</StyledTd>
                                    <StyledTd>
                                        <StyledButton>수정</StyledButton>
                                    </StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={7}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={commonCodeCount}
                onChange={searchCommonCode}
                itemsCountPerPage={5}
                activePage={cPage}
            />
        </CommonCodeMainStyled>
    );
};
