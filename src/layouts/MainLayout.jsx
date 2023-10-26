import Navigation from '../components/Navigation'
import Header from '../components/Header'

const MainLayout = ({ children, title }) => {
  return (
    <>
      <Header title={title} />
      {children}
      <Navigation />
    </>
  )
}

export default MainLayout
