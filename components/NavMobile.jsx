import styled from '@emotion/styled'
import { useContext } from 'react'
import { DetailContext } from '../context/DetailContext'

export default function NavMobile(){
    const [detail, setDetail] = useContext(DetailContext)

    console.log(detail)

    return(
        <Wrapper isOpen={detail}>
            <div className="infos">
                <span className="close" onClick={() => setDetail(false)}>✕</span>
                <div className="col">
                    <div className="info-detail nama-jalan">Jl. Dempel Mukti 1</div>
                    <div className="info-detail deskripsi">Pertigaan pertama belok kanan, tempatnya ada di kiri jalan.</div>
                    
                </div>
            </div>
            <button>Open in Google Map</button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:100%;
    height:200px;
    background:#fff;
    box-shadow:var(--shadow-medium);
    position:fixed;
    z-index:1;
    bottom:${props => props.isOpen ? '0' : '-220px'};
    border-radius:2rem 2rem 0 0;
    padding: 0 1rem;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    transition:.2s ease-in-out;

    .infos{
        display:flex;
        font-size:.8rem;
        position:relative;

        .close{
            font-size: 1.2rem;
            padding: .5rem .7rem;
            color: #fff;
            background: #111;
            z-index: 2;
            display: flex;
            position: absolute;
            border-radius: 50%;
            right: 1rem;
            top: -1rem;
            box-shadow:0 2px 14px rgba(0, 0, 0, 0.1);
            cursor: pointer;

            &:hover{
                background:#191919;
            }
        }

        .col{
            width:100%;
            height:100%;
            padding:2rem .5rem .5rem .5rem;

            .info-detail{
                margin-bottom:.5rem;
            }
            .nama-jalan{
                font-weight:bold;
            }
        }
    }

    button{
        background:var(--primary);
        margin: 1rem auto;
        padding:.75rem 1rem;
        width:100%;
        color:#fff;
        border-radius:8px;
        border:0;

        &:hover{
            background-color:var(--primary-dark);
        }
    }
`