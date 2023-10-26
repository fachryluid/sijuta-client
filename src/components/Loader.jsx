import LogoCircle from './../assets/logo-circle.svg'

const Loader = () => {
  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-white bg-opacity-100 z-50">
        <img src={LogoCircle} alt="" className="w-12 h-12 rounded-full animate-bounce" />
      </div>
    </>
  )
}

export default Loader