import styled from '@emotion/styled'
import { useContext } from 'react'
import { DetailContext } from '../context/DetailContext'

export default function CardList(){
    const [detail, setDetail] = useContext(DetailContext)

    return(
        <Wrapper>
            <ul>
                <li onClick={() => setDetail(true)}>
                    <div className="image">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/163/163953544.jpg" alt=""/>
                    </div>
                    <div className="details">
                        <span className="title">Jl. Dempel Mukti 1</span>
                        <span className="desc">Pertigaan pertama belom kanan, tempatnya ada</span>
                        <div className="place-info">
                            <span className="distance">3km</span>
                        </div>
                    </div>
                </li>
            </ul>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:100%;

    ul{
        padding:0;
        margin:0;
        margin-top:40px;
        display:flex;
        flex-direction:column;

        li{
            display:flex;
            border-radius:.5rem;
            box-shadow:var(--shadow-soft);
            background-color:#fff;
            width:100%;
            margin-bottom:1rem;
            cursor: pointer;
            transition:.2s;

            &:hover{
                box-shadow:var(--shadow-hard);
            }

            .image{
                height:auto;
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
                padding:1rem;

                .title{
                    font-weight:bold;
                    font-size:.8rem;
                    margin-bottom:.5rem;
                }

                .desc{
                    font-size:.75rem;
                    color:#666;
                }

                .place-info{
                    margin-top:.5rem;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;

                    .distance{
                        font-weight:bold;
                        font-size:.8rem;
                        color:var(--primary);
                    }
                }
            }
        }
    }
`