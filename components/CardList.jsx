import styled from '@emotion/styled'
import { useContext, useState } from 'react'
import { DetailContext } from '../context/DetailContext'
import { HiStar } from 'react-icons/hi'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import { useEffect } from 'react'
import ListSkeleton from './ListSkeleton'

export default function CardList(){
    const [detail, setDetail] = useContext(DetailContext)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState()

    const limitCharacter = (text, count) => {
        if(!text){
            return ''
        }else{
            return text.slice(0, count) + (text.length > count ? "..." : "");
        }
    }

    useEffect(() => {
        async function fetchData(){
            setLoading(true)
            const { data } = await axios.get("/api/tambalban")

            if(data){
                setList(data)
                setLoading(false)
            }else{
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return(
        <Wrapper>
            <div className="input-wrapper">
                <input type="text" placeholder="Lagi dimana?"/>
                <span><FaSearch/></span>
            </div>
            <ul>
                {
                    !list || loading ? (
                        <>
                        <ListSkeleton/>
                        <ListSkeleton/>
                        <ListSkeleton/>
                        <ListSkeleton/>
                        </>
                    ) : (
                        list?.map((item, index) => {
                            return(
                                <li key={index} onClick={() => setDetail(detail ? null : item)}>
                                    <div className="image">
                                        <img src={item.picture}/>
                                    </div>
                                    <div className="details">
                                        <span className="title">{item.address}</span>
                                        <span className="address">{ item.location.completeAddress?.road + ", " + item.location.completeAddress?.sub_district + ", " + item.location.completeAddress?.city}</span>
                                        <span className="desc">{limitCharacter(item.description, 80)}</span>
                                    </div>
                                </li>
                            )
                        })
                    )
                }
            </ul>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:100%;
    margin-top:2rem;

    .active{
        color:#ff585d;
    }

    .input-wrapper{
        position:relative;
        display:flex;
        align-items:center;

        input{
            width: 100%;
            border: 0;
            padding: 1rem 1.5rem;
            border-radius: 4rem;
            box-shadow:0 2px 12px rgba(0, 0, 0, 0.075);

            &::placeholder{
                color:#777;
                font-family:'Montserrat';
            }

            &:focus{
                box-shadow:0 2px 14px rgba(0, 0, 0, 0.15);
            }
        }
        span{
            position: absolute;
            right: 1.5rem;
            transform: translateY(2px);
            color: #ff585d;
        }
    }

    ul{
        padding:0;
        margin:0;
        margin-top:1.5rem;
        display:flex;
        flex-direction:column;

        li{
            display:flex;
            border-radius:.5rem;
            background-color:#fff;
            width:100%;
            margin-bottom:1rem;
            cursor: pointer;
            transition:.2s;

            .image{
                height:110px;
                display:block;
                width:35%;
                background:#f4f4f4;
                border-radius:.5rem 0 0 .5rem;
                position:relative;

                img{
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    border-radius:.5rem 0 0 .5rem;
                }
            }
            .details{
                width:65%;
                display:flex;
                flex-direction:column;
                padding:0 1rem;

                .address{
                    font-size:.7rem;
                    line-height:1.4;
                    margin-top:4px;
                    color:#ff585d;
                    font-weight:500;
                }

                .title{
                    font-weight:bold;
                    font-size:.9rem;
                }

                .desc{
                    font-size:.75rem;
                    margin-top:4px;
                    line-height:1.5;
                }

                @media(min-width:480px){
                    .title{
                        font-size:1rem;
                    }
                    .desc{
                        font-size:.8rem;
                        line-height:1.6;
                    }
                }
            }
        }
    }
`