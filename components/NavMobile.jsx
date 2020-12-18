import styled from '@emotion/styled'
import { useContext } from 'react'
import { DetailContext } from '../context/DetailContext'
import { RiCloseCircleFill } from 'react-icons/ri'

export default function NavMobile(){
    const [detail, setDetail] = useContext(DetailContext)

    return(
        <>
        <Wrapper isOpen={detail}>
            <div className="infos">
                <span className="close" onClick={() => setDetail(null)}><RiCloseCircleFill/></span>
                <div className="col">
                    <div className="info-detail nama-jalan">{detail?.address}</div>
                    <p className="info-detail deskripsi">{detail?.description}</p>
                </div>
            </div>
            <a target="_blank" href={`https://maps.google.com/?q=${detail?.location.coordinates[1]},${detail?.location.coordinates[0]}`}><button>Open in Google Map</button></a>
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width:100%;
    max-width:1024px;
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
            font-size: 2.5rem;
            z-index: 2;
            display: flex;
            position: absolute;
            color:#111;
            border-radius: 50%;
            right: 1rem;
            top: -1.2rem;
            cursor: pointer;

            &:hover{
                color:#222;
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