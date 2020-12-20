import styled from '@emotion/styled'
import Nav from './Nav'
import NavMobile from './NavMobile'
import Footer from './Footer'
import Head from 'next/head'

export default function Layout({ children }){
    return(
        <>
            <Wrapper>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <meta name="description" content="Cari tempat tambal ban dan bengkel terdekat nggak pake ribet" />
                    <meta name="keywords" content="cari tambal ban, tambal ban terdekat, tempat tambal ban, tambal ban, tempat tambal ban terdekat, bengkel terdekat, cari tempat tambal ban, cari bengkel"/>
                    <meta name="locale" content="id"/>
                    <meta name="robots" content="index,follow"/>
                    <meta name="googlebot" content="index,follow"/>

                    <meta property="og:title" content="Tambal.in" />
                    <meta property="og:url" content="https://tambalin.now.sh" />
                    <meta property="og:description" content="Cari tempat tambal ban dan bengkel terdekat nggak pake ribet" />
                    <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/tambal-in.appspot.com/o/photos%2F92e1e1ab-e6e5-4902-bc53-e29d11b086a3?alt=media&token=71c4d72b-203e-49b5-87e9-7318803e22a9" />

                    <meta property="twitter:card" content="summary"/>
                    <meta property="twitter:title" content="Tambal.in"/>
                    <meta property="twitter:description" content="Cari tempat tambal ban dan bengkel terdekat nggak pake ribet"/>
                    <meta property="twitter:url" content="https://tambalin.now.sh"/>
                    <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/tambal-in.appspot.com/o/photos%2F92e1e1ab-e6e5-4902-bc53-e29d11b086a3?alt=media&token=71c4d72b-203e-49b5-87e9-7318803e22a9" />
                </Head>
                <Nav/>
                
                <div className="container">
                    {children}
                </div>
                <NavMobile/>
            </Wrapper>
            <Footer/>
        </>
    )
}

const Wrapper = styled.div`
    margin: auto;

    .container{
        padding:0 1.25rem;

        @media(min-width:800px){
            padding:0 80px;
        }
    }
`