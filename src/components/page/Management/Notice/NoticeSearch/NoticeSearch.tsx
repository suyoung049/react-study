import { Button } from "react-bootstrap";

export const NoticeSearch = () => {
    return (
        <>
            <div className='input-box'>
                <input></input>
                <input type='date'></input>
                <input type='date'></input>
                <Button>검색</Button>
                <Button>등록</Button>
            </div>
        </>
    );
};
