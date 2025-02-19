import { DetailCodeProvider } from "../../api/Provider/DetailCodeProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { DetailCodeMain } from "../../components/page/Management/DetailCode/DetailCodeMain/DetailCodeMain";
import { DetailSearch } from "../../components/page/Management/DetailCode/DetailSearch/DetailSearch";

export const DetailCode = () => {
    return (
        <>
            <DetailCodeProvider>
                <ContentBox>상세코드관리</ContentBox>
                <DetailSearch />
                <DetailCodeMain></DetailCodeMain>
            </DetailCodeProvider>
        </>
    );
};
