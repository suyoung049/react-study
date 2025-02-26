import { NoticeModalStyled } from "./styled";

export const NoticeModal = () => {
    return (
        <NoticeModalStyled>
            <div className='container'>
                <form>
                    <label>
                        제목 :<input type='text' name='fileTitle'></input>
                    </label>
                    <label>
                        내용 : <input type='text' name='fileContent'></input>
                    </label>
                    파일 :<input type='file' id='fileInput' style={{ display: "none" }}></input>
                    <label className='img-label' htmlFor='fileInput'>
                        파일 첨부하기
                    </label>
                    <div></div>
                    <div className={"button-container"}>
                        <button type='button'>저장</button>
                        <button type='button'>나가기</button>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
