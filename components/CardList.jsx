import styled from '@emotion/styled'
import { useContext, useState } from 'react'
import { DetailContext } from '../context/DetailContext'
import { HiStar } from 'react-icons/hi'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import { useEffect } from 'react'

export default function CardList(){
    const [detail, setDetail] = useContext(DetailContext)
    const [list, setList] = useState()

    useEffect(() => {
        async function fetchData(){
            const { data } = await axios.get("/api/tambalban")

            if(data){
                setList(data)
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
                    list ? (
                        list.map((item, index) => {
                            return(
                                <li key={index} onClick={() => setDetail(detail ? null : item)}>
                                    <div className="image">
                                        <img src={item.picture}/>
                                    </div>
                                    <div className="details">
                                        <span className="title">{item.address}</span>
                                        <span className="desc">{item.description}</span>
                                        {/* <div className="place-info">
                                            <span className="rate"><HiStar/></span>
                                            <span className="countrate">4 Reviews</span>
                                        </div> */}
                                    </div>
                                </li>
                            )
                        })
                    ) : ''
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
                background:#fafafa;
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

                .title{
                    font-weight:bold;
                    font-size:.9rem;
                }

                .desc{
                    font-size:.75rem;
                    margin-top:.5rem;
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

                .place-info{
                    margin-top:.5rem;
                    display:flex;
                    align-items:center;
                    font-size:.75rem;

                    .rate{
                        font-size:.9rem;
                        transform: translateY(2px);
                        margin-right: 4px;
                        color: #ff585d;
                    }
                }
            }
        }
    }
`