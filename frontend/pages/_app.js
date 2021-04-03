import '../styles/globals.css'
import '../../sharedSymbols/models.mjs'
import Layout from "../components/Layout";

function MyApp({Component, pageProps}) {
    return <Layout>
        <Component {...pageProps} />
    </Layout>

}

export default MyApp
