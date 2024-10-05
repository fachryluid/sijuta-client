import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import SecondLayout from '../../../layouts/SecondLayout'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import FormInput from '../../../components/Form/FormInput'
import FormButton from '../../../components/Form/FormSubmit'
import { validateChangePassword } from '../../../utils/validation'
import axios from '../../../utils/axios'
import { useNavigate } from 'react-router-dom'

export default function ChangePassword() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    return navigate('/login')
  }

  return (
    <>
      <SecondLayout
        title="Ganti Password"
        backButton={true}
        rightButtonLink="/profil"
        rightButtonIcon={
          <FontAwesomeIcon icon={faCircleUser} className="w-4 h-4 text-[#fffffe]" />
        }
      >
        <section>
          <Formik
            initialValues={{ old_password: '', new_password: '', repeat_password: '' }}
            validate={validateChangePassword}
            onSubmit={async (values, actions) => {
              try {
                const { data: response } = await axios.post(`/auth/change_password`, values)

                toast.success(response.message)
                actions.resetForm()
                handleLogout()
              } catch (error) {
                toast.error(error.response?.data?.message || error.message)
              } finally {
                actions.setSubmitting(false);
              }
            }}
          >
            {(props) => (
              <Form>
                <FormInput
                  type="password"
                  label="Password Lama"
                  name="old_password"
                  autocomplete="current-password"
                />
                <FormInput
                  type="password"
                  label="Password Baru"
                  name="new_password"
                  autocomplete="new-password"
                />
                <FormInput
                  type="password"
                  label="Konfirmasi Password"
                  name="repeat_password"
                  autocomplete="new-password"
                />
                <FormButton
                  isSubmitting={props.isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </section>
      </SecondLayout>
    </>
  )
}