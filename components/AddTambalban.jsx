import { useState } from 'react'
import { v4 } from 'uuid'
import { storage } from '../utils/firebase'
import styled from '@emotion/styled'

export default function AddTambalban(){
    const [imageFile, setImageFile] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [ uploadLoading, setUploadLoading] = useState(false)
    const [ uploadProgress, setUploadProgress ] = useState(0)
    const [ error, setError ] = useState()
    const [ coordinates, setCoordinates ] = useState()

    const handleImageAsFile = (e) => {
        if(e.target.files[0]){
            const image = e.target.files[0]
            setImageFile(() => (image))
        }
    }

    const handleUpload = (e) => {
        e.preventDefault()
        const alamat = e.currentTarget.elements.alamat
        const deskripsi = e.currentTarget.elements.deskripsi

        const generateFileName = `${v4()}`
        const uploadTask = storage.ref(`photos/${generateFileName}`).put(imageFile);

        const getCoords = (position) => {
            setCoordinates([position.coords.longitude, position.coords.latitude])
        }
    
        const geoError = () => {
            setError("Geolocation is not supported by your browser")
        }
    
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getCoords, geoError)
        }else{
            return setError("Geolocation is not supported by your browser")
        }

        uploadTask.on('state_changed',
        (snapshot) => {
            setUploadLoading(true)
            const progress = snapshot.bytesTransferred;
            const totalSize = snapshot.totalBytes;
            const calculate = progress/totalSize*100;

            setUploadProgress(calculate)
        },
        (error) => {
            // peringatan ketika terjadi kesalahan
            setError('Terjadi kesalahan dalam mengunggah. Tunggu beberapa saat dan coba lagi.')
        },
        () => {
            storage.ref('photos').child(generateFileName).getDownloadURL().then(url => {
                setImageUrl(url)

                // Save to database
                const tambalbanObject = {
                    address: alamat.value,
                    picture: url,
                    description: deskripsi.value,
                    location: {
                        coordinates: coordinates,
                        type: "Point",
                    },
                }
            })
        })
    }

    return(
        <Wrapper>
        <div className="container">
            <img src="https://www.dporganizer.com/wp-content/uploads/2018/05/18163329/0006_illustration_data_mapping.png" alt=""/>
            <form onSubmit={handleUpload}>
                <label htmlFor="alamat">Alamat</label>
                <input type="text" name="alamat" placeholder="Alamat"/>
                <label htmlFor="deskripsi">Deskripsi</label>
                <input type="text" name="deskripsi" placeholder="Deskripsi"/>
                <label htmlFor="foto">Foto</label>
                <div className="dropimage-area">
                    <span>{imageFile ? imageFile.name : "Tidak ada gambar yang dipilih"}</span>
                    <button type="button" className="dark">Pilih Gambar</button>
                    <input type="file" name="myfile" onChange={handleImageAsFile}/>
                </div>
                <button type="submit" className="bg-black">Petakan Lokasi</button>
            </form>
        </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .container{
        justify-content:center;
        align-items:center;
        flex-direction:column;
        display:flex;

        img{
            width: 300px;
        }
    }

    form{
        display: flex;
        flex-direction: column;
        width: 320px;

        button.bg-black{
            color: #fff;
            background: #000;

            &:hover{
                background:#111;
            }
        }

        label{
            color:rgba(113,128,150,1);
            font-weight: 600;
            margin-top: .75rem;
            font-size: .75rem;
        }

        input{
            margin-top: .5rem;
            padding: 0.75rem;;
            border-radius: 0;
            border: 1px solid #eee;
            transition: .2s;
            background-color: #fff;

            &::placeholder{
                color:#8693a1;
            }

            &:focus{
                border-color: #ccc;
            }
        }

        button{
            margin-top: 1rem;
        }
    }

    .dropimage-area{
        width:100%;
        height:100px;
        padding: var(--size-3);
        border: 2px dashed rgb(197, 205, 212);
        transition: .2s;
        margin-top: .5rem;
        margin-bottom: .5rem;
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
        position: relative;
        flex-direction: column;

        span{
            font-size: .8rem;
            color: #8e9fb0;
            position: absolute;
            top: 20px;
        }

        button{
            margin: 0 auto;
            transform: translateY(75px);
            background: #4300f2;
            color: #fff;
        }
    }

    input[type=file] {
        position: absolute;
        left: 27%;
        bottom: -20px;
        opacity: 0;
        width: 150px;
        cursor: pointer;
    }
`