import { useState } from 'react';
import { Link } from "react-router-dom";
import AuthLayout from '../../layouts/AuthLayout';

const Forgot = ({ verifyToken }) => {
  const [formData, setFormData] = useState({
    role: '',
    username: '',
    password: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setShowAlertMessage] = useState(null);

  const handleForgot = () => {

  }

  return (
    <>
      <AuthLayout verifyToken={verifyToken}>
        <div className="mb-10 text-center text-gray-700">
          <h1 className="text-2xl font-bold mb-2">Lupa Password</h1>
          <h4 className="">Punya email pemulihan? Kirim kode pemulihan sekarang.</h4>
        </div>
        <form onSubmit={handleForgot}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              placeholder=""
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>

          <button type="submit" className="text-white bg-main-0 hover:bg-main-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-main-0 dark:hover:bg-main dark:focus:ring-blue-800 mb-6">Submit</button>
          <div className="flex items-center justify-center">
            <Link to="/login" className="text-sm font-medium text-main-0 hover:underline dark:text-primary-500 mb-3">Kembali ke Login</Link>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}

export default Forgot