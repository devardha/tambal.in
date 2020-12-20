import styled from '@emotion/styled'
import { useContext, useState } from 'react'
import { DetailContext } from '../context/DetailContext'
import { RiMapPinAddFill } from 'react-icons/ri'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import { useEffect } from 'react'
import ListSkeleton from './ListSkeleton'
import { AiFillPicture } from 'react-icons/ai'
import { RiRoadMapLine } from 'react-icons/ri'

export default function CardList(){
    const [detail, setDetail] = useContext(DetailContext)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState()
    const [myCoor, setMyCoor] = useState()
    const [nearActive, setNearActive] = useState(false)
    const [loadingNew, setLoadingNew] = useState(false)
    const mapactive = false

    const searchTambalban = async (e) => {
        e.preventDefault()
        const query = e.currentTarget.elements.query.value

        if(query){
            setLoadingNew(true)
            const { data } = await axios.get(`/api/tambalban/find?q=${query}`)

            if(data){
                setLoadingNew(false)
                setList(data)
            }
        }
    }

    const getCoords = (position) => {
        setMyCoor([position.coords.longitude, position.coords.latitude])
        setNearActive(true)
        getTambalbanNearme(position.coords.longitude, position.coords.latitude)
    }

    const geoError = () => {
        setError("Geolocation is not supported by your browser")
    }

    const getTambalbanNearme = async (lon, lat) => {
        if(lon && lat){
            const { data } = await axios.get(`/api/tambalban/nearest?coordinates=${lon},${lat}`)

            if(data){
                setLoadingNew(false)
                setList(data)
            }
        }
    }

    const findMyLocation = () => {
        if(navigator.geolocation){
            setLoadingNew(true)
            navigator.geolocation.getCurrentPosition(getCoords, geoError);
            getTambalbanNearme()
        }else{
            return setError("Geolocation is not supported by your browser")
        }
    }

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

    const apiKey = process.env.NEXT_PUBLIC_GEOLOCATION

    const makeQuery = () => {
        let queryWrapper = ""
        const marker = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"

        list?.map(item => {
            const baseQuery = `&markers=icon:${marker}|${item.location.coordinates[1]},${item.location.coordinates[0]}`
            queryWrapper = queryWrapper + baseQuery
        })
        // return queryWrapper
        return `https://maps.locationiq.com/v2/staticmap?key=${apiKey}&center=-6.9725342,110.4581955&zoom=18&size=1920x1080&format=png&maptype=roadmap${queryWrapper}`
    }

    return(
        <Wrapper>
            <div className="body">
            <div className="body-left">
            <div className="head">
                <form className="search-bar" onSubmit={searchTambalban}>
                    <input name="query" type="text" placeholder="Lagi dimana?"/>
                    <span><FaSearch/></span>
                </form>
                <div className="filters">
                    <div className={`filter ${nearActive ? 'active' : ''}`} onClick={() => findMyLocation()}>Cari Terdekat</div>
                </div>
            </div>
            {
                !loadingNew ? (
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
                                                {
                                                    item.picture ? (
                                                        <img src={item.picture}/>
                                                    ) : <AiFillPicture/>
                                                }
                                            </div>
                                            <div className="details">
                                                <span className="title">{item.address}</span>
                                                <span className="address"><i><RiMapPinAddFill/></i>{ item.location.completeAddress?.road + ", " + item.location.completeAddress?.sub_district + ", " + item.location.completeAddress?.city}</span>
                                                <span className="desc">{limitCharacter(item.description, 80)}</span>
                                            </div>
                                        </li>
                                    )
                                })
                            )
                        }
                    </ul>
                ) : (
                    <div className="loading">
                        <div className="loader">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                )
            }
            </div>
            <div className="body-right">
                { mapactive && list ? <img src={makeQuery()}/> : <span className="nomap-msg">Sorry, Map location is not available right now.</span> }
            </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:100%;
    margin-top:2rem;

    .body{
        display:flex;
        position:relative;
    }

    .body-right{
        width:50%;
        height:calc(100vh - 3.75rem);
        background:#f4f4f4;
        position:sticky;
        border-radius:.5rem;
        right:0;
        top:2rem;
        overflow:hidden;
        display:none;
        box-shadow:inset 0 0 10px rgb(0,0,0,0.02);

        @media(min-width:1200px){
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;

            .map{
                font-size:7rem;
                color:#ddd !important;
            }
            .nomap-msg{
                margin-top:.5rem;
                font-size:.9rem;
            }
        }

        img{
            height:100%;
            width:150%;
            object-fit:cover;
        }
    }

    .body-left{
        width:100%;
        display:flex;
        flex-direction:column;

        @media(min-width:1200px){
            width:50%;
        }
    }

    .loading{
        width:100%;
        margin-top:1.5rem;

        .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            height:40px;
        }
        .loader > div {
            width: 6px;
            height: 6px;
            background: #226cfb;
            border-radius: 50%;
            margin : 3px;
            animation: loader 0.4s infinite alternate;
        }
        .loader > div:nth-of-type(2) {
            animation-delay: 0.2s;
        }
        .loader > div:nth-of-type(3) {
            animation-delay: 0.3s;
        }
        @keyframes loader {
            to {
                background:#fff;
                
            }
        }
    }

    .head{
        display:flex;
        justify-content:space-between;

        @media(min-width:1200px){
            padding-right:1rem;
        }

        .search-bar{
            width:300px;
            position:relative;
            display:flex;
            align-items:Center;

            input{
                padding:.4rem 1.25rem;
                border:1px solid #ccc;
                height:100%;
                width:100%;
                border-radius:4rem;

                &::placeholder{
                    font-size:.9rem;
                    font-family: 'Open Sans', sans-serif;
                }
            }

            span{
                position: absolute;
                right: 1.5rem;
                transform: translateY(2px);
                color: #226cfb;
            }
        }

        .filters{
            display:flex;
            
            .filter{
                padding:.5rem 1rem;
                border:1px solid #ccc;
                border-radius:4rem;
                margin-left:.5rem;
                cursor: pointer;
                font-size:.9rem;
                display:block;
                min-width: 121px;
            }
        }

        .search-bar input:hover, .filter:hover{
            border-color:#555;
        } 
    }

    .active{
        border-color: #226cfb !important;
        color: blue;
        background: #f0f5ff;
    }

    .input-wrapper{
        position:relative;
        display:flex;
        align-items:center;
    }

    ul{
        padding:0;
        margin:0;
        margin-top:1.5rem;
        display:flex;
        flex-direction:column;
        width:100%;

        @media(min-width:600px){
            flex-direction:column;
            flex-wrap:wrap;
        }

        li{
            display:flex;
            border-radius:.5rem;
            background-color:#fff;
            width:100%;
            margin-bottom:1rem;
            cursor: pointer;
            transition:.2s;

            @media(min-width:800px){
                margin-bottom:1.5rem;
                padding-right:1rem;
            }

            @media(min-width:1200px){
                padding-right:1rem;
            }

            &:hover{
                .image{
                    img{
                        filter:brightness(1.1);
                    }
                }
            }

            .image{
                height:120px;
                display:block;
                width:35%;
                background:#f4f4f4;
                border-radius:.5rem;
                position:relative;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4rem;
                color: #ddd;

                @media(min-width:800px){
                    height:150px;
                }

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
                    color:#226cfb;
                    font-weight:500;

                    @media(min-width:800px){
                        font-size:.9rem;
                        margin-top:8px;
                    }
                }

                .title{
                    font-weight:bold;
                    font-size:.9rem;
                }

                .desc{
                    font-size:.8rem;
                    margin-top:4px;
                    line-height:1.5;
                }

                i{
                    margin-right:4px;
                }

                @media(min-width:480px){
                    .title{
                        font-size:1rem;
                    }
                    .desc{
                        font-size:.9rem;
                        line-height:1.6;
                    }
                }
            }
        }
    }
`