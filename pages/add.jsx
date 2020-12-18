import Head from 'next/head'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import AddForm from '../components/AddForm'

export default function Add() {
    return (
        <Wrapper>
            <Head>
                <title>Petakan Lokasi - Tambal.in</title>
                <meta name="description" content="Cari tempat tambal ban di dekatmu dengan mudah"/>
            </Head>
            <Layout>
                <AddForm/>
            </Layout>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:100%;
`