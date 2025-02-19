import { CommonCodeProvider } from "../../api/Provider/CommonCodeProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { CommonCodeMain } from "../../components/page/Management/CommonCode/CommonCodeMain/CommonCodeMain";
import { CommonCodeSearch } from "../../components/page/Management/CommonCode/CommonCodeSearch/CommonCodeSearch";

export const CommonCode = () => {
    return (
        <>
            <CommonCodeProvider>
                <ContentBox>공통코드관리</ContentBox>
                <CommonCodeSearch />
                <CommonCodeMain />
            </CommonCodeProvider>
        </>
    );
};
