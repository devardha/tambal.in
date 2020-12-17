import '../styles/globals.css'
import { DetailProvider } from '../context/DetailContext'

function MyApp({ Component, pageProps }) {
    return (
        <DetailProvider>
            <Component {...pageProps} />
        </DetailProvider>
    )
}

export default MyApp
