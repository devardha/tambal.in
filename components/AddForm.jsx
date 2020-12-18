import styled from '@emotion/styled'
import { useState } from 'react'
import { v4 } from 'uuid'
import { storage } from '../utils/firebase'

export default function AddForm() {
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

                console.log(url)
            })
        })
    }

    return (
        <Wrapper>
            <form onSubmit={handleUpload}>
                <label htmlFor="alamat">Alamat</label>
                <input type="text" name="alamat" placeholder="Alamat"/>
                <label htmlFor="deskripsi">Deskripsi</label>
                <input type="text" name="deskripsi" placeholder="Deskripsi"/>
                <label htmlFor="foto">Foto</label>
                <div className="dropimage-area">
                    <span>{imageFile ? imageFile.name : "Tidak ada gambar yang dipilih"}</span>
                    <div className="button-wrapper">
                        <button type="button" className="dark">Pilih Gambar</button>
                        <input type="file" name="myfile" onChange={handleImageAsFile}/>
                    </div>
                </div>
                <button type="submit">Petakan Lokasi</button>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:100%;
    margin-top:2rem;

    form{
        display: flex;
        flex-direction: column;
        width:100%;

        label{
            color:#555;
            font-weight: 600;
            margin-top: .75rem;
            font-size: .75rem;
        }

        input{
            margin-top: .5rem;
            padding: 0.75rem;;
            border-radius: 0;
            border: 1px solid #ddd;
            transition: .2s;
            background-color: #fff;

            &::placeholder{
                color:#777;
                font-family:'Montserrat';
            }

            &:focus{
                border-color: #bbb;
            }
        }

        button{
            margin-top: 1rem;
            background-color:#111;
            color:#fff;
        }

        .dropimage-area{
            width:100%;
            height:100px;
            border: 2px dashed#ddd;
            transition: .2s;
            margin-top: .5rem;
            margin-bottom: .5rem;
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
            position: relative;
            flex-direction: column;
            justify-content:flex-end;

            span{
                font-size: .8rem;
                color: #777;
                position: absolute;
                top: 20px;
            }

            button{
                margin: 0 auto;
                width:100%;
                background: #ff585d;
                color: #fff;
            }

            .button-wrapper{
                width:40%;
                margin:0 auto;
                position:relative;
                transform:translateY(20px);

                input[type=file] {
                    position: absolute;
                    width: 100%;
                    cursor: pointer;
                    left: 0;
                    height: 100%;
                    bottom: 0;
                    opacity: 0;
                }
            }
        }
    }
`