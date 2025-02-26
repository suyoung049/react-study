export const CommonCodeSearch = () => {
    return (
        <div>
            <div>
                <div className='flex space-x-4'>
                    <div>
                        <select>
                            <option value={"groupName"}>그룹코드명</option>
                            <option value={"groupCode"}>그룹코드</option>
                        </select>
                        <input />
                        <button>검색</button>
                        <button>등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
