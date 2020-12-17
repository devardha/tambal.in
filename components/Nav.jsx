import styled from '@emotion/styled'
import { RiMapPinAddFill, RiMapPinUserFill } from 'react-icons/ri'

export default function Nav({ children }){
    return(
        <Wrapper>
            <span className="icon"><RiMapPinAddFill/></span>
            <h1>Tambal<span>.in</span></h1>
            <span className="icon"><RiMapPinUserFill/></span>
        </Wrapper>
    )
}

const Wrapper = styled.nav`
    width:100%;
    height:60px;
    color:var(--primary);
    display:flex;
    align-items:center;
    justify-content:space-between;
    box-shadow:0 4px 8px rgb(0,0,0,0.05);
    padding-left:1.25rem;
    padding-right:1.25rem;

    .icon{
        display:flex;
        padding:.5rem;
        background: #f9f9f9;
        border-radius: 50%;
        color: #999;
        cursor: pointer;
    }

    h1{
        font-size:1.25rem;
        margin:0;
        font-family: 'Leckerli One', cursive;

        span{
            color:#000;
        }
    }
`