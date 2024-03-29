import Head from 'next/head'
import styled from '@emotion/styled'
import CardList from '../components/CardList'
import Layout from '../components/Layout'

export default function Home() {
    return (
        <Wrapper>
            <Head>
                <title>Tambal.in - Cari tempat tambal ban terdekat dengan mudah</title>
                <meta name="description" content="Cari tempat tambal ban di dekatmu dengan mudah"/>
            </Head>
            <Layout>
                <CardList/>
            </Layout>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:100%;
`