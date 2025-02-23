import styled from "styled-components";
// ✅ 전체 레이아웃 스타일링
const DashboardContainer = styled.div``;

export const DashBoardStyled = styled.div`
    width: 80%;
    padding-top: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    margin: 0 auto;
    .dashboard-ul {
        list-style-type: none;
        display: flex;
        overflow: hidden;
    }
    .menu-bar {
        float: left;
    }
    .content {
        padding-left: 50px;
        width: 100%;
    }
`;
