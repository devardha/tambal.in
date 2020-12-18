import styled from '@emotion/styled'
import { RiMapPinAddFill, RiMapPinUserFill } from 'react-icons/ri'

export default function Nav(){
    return(
        <Wrapper>
            <span className="icon"><RiMapPinAddFill/></span>
            <h1>Tambal<span>.in</span></h1>
        </Wrapper>
    )
}

const Wrapper = styled.nav`
    width:100%;
    color:var(--primary);
    display:flex;
    align-items:center;
    justify-content:center;
    padding-top:1.5rem;
    padding-bottom:1rem;
    padding-left:1.25rem;
    padding-right:1.25rem;

    h1{
        font-size:1.3rem;
        margin:0;
        font-family: 'Leckerli One', cursive;

        span{
            color:#000;
        }
    }

    @media(min-width:480px){
        h1{
            font-size:1.5rem;
        }
    }
`