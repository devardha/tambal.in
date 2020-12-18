import styled from '@emotion/styled'
import Nav from './Nav'
import NavMobile from './NavMobile'

export default function Layout({ children }){
    return(
        <>
            <a href="https://github.com/devardha" target="_blank">
            <div className="github-badge">
                <img src="https://sentiment-sweep.com/images/github-corner.png" alt="Github devardha"/>
            </div>
            </a>
            <Wrapper>
                <Nav/>
                
                <div className="container">
                    {children}
                </div>
                <NavMobile/>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    max-width:512px;
    margin: auto;

    .container{
        padding:0 1.25rem;
    }
`