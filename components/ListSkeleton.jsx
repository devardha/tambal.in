import styled from '@emotion/styled'

export default function ListSkeleton(){
    return(
        <Wrapper>
            <div className="image skeleton">
                
            </div>
            <div className="details">
                <span className="title title-skeleton skeleton"></span>
                <span className="desc desc-skeleton skeleton"></span>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.li`
    display:flex;
    border-radius:.5rem;
    width:100%;
    margin-bottom:1rem;

    .title-skeleton{
        height: 20px;
        background: #f4f4f4;
        border-radius: 3rem;
        margin-bottom:10px;
    }
    .desc-skeleton{
        height: 14px;
        background: #f4f4f4;
        border-radius: 2rem;
        margin-top: 13px;
    }
`