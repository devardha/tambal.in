import Head from 'next/head'
import AddTambalban from '../components/AddTambalban'
import styled from '@emotion/styled'

export default function Add() {
    return (
        <Wrapper>
            <div className="main">
                <Head>
                    <title>Petakan Lokasi - Tambal.in</title>
                </Head>
                <AddTambalban/>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .main{
        padding-bottom:40px;
    }
`
