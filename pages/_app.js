import Aside from '../Components/Layouts/Aside'
import Reproductor from '../Components/Layouts/Reproductor'
import { DataAudProvider } from '../Context/AudContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <DataAudProvider>
      <div className="container">
        <Aside/>
        <Component {...pageProps} />
        <Reproductor/>
      </div>
    </DataAudProvider>
  )
}

export default MyApp
