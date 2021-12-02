import Aside from '../Components/Layouts/Aside'
import Reproductor from '../Components/Layouts/Reproductor'
import { DataAudProvider } from '../Context/AudContext'
import { DataAuthProvider } from '../Context/AuthContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <DataAuthProvider>
      <DataAudProvider>
        <div className="container">
          <Aside/>
          <Component {...pageProps} />
          <Reproductor/>
        </div>
      </DataAudProvider>
    </DataAuthProvider>
  )
}

export default MyApp
