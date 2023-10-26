import logo from './../assets/logo.svg';

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="bg-main-0">
        <div className="flex flex-col items-center justify-start sm:justify-center min-h-screen pb-10 w-full max-w-lg mx-auto px-5 sm:px-2">
          <div className="flex justify-center items-center mb-10 mt-10">
            <img src={logo} alt="S I J U P R I" className="h-10" />
          </div>
          <main className="bg-white p-6 shadow rounded-lg w-full">
            {children}
          </main>
          <div className="mt-10 text-gray-100 text-center text-sm">
            <p className="font-bold">v1.0.0</p>
            <p>Sijupri &copy; 2023</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout