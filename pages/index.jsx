import Head from 'next/head'
import styled from '@emotion/styled'
import CardList from '../components/CardList'
import Layout from '../components/Layout'

export default function Home() {
    return (
        <Wrapper>
            <Layout>
                <CardList/>
            </Layout>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:100%;
`