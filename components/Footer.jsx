import styled from '@emotion/styled'

export default function Footer(){
    return(
        <Wrapper>
            <p>Dibuat dengan penuh cinta oleh @devardha</p>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    max-width:512px;
    margin: auto;
    padding:2rem 0 1rem 0;

    p{
        text-align:center;
        font-size:.9rem;
    }
`