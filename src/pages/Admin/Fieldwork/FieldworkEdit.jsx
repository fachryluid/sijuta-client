import { Card } from "flowbite-react"
import AdminLayout from "../../../layouts/AdminLayout"
import axios from "../../../utils/axios"
import { useParams } from "react-router-dom"
import { Form, Formik } from "formik"
import FormInput from "../../../components/Form/FormInput"
import FormButton from "../../../components/Form/FormSubmit"
import FormSelect from "../../../components/Form/FormSelect"
import { getPeriodes } from "../../../utils/generate"
import swr from "../../../utils/swr"
import { toast } from "react-toastify"
import { FIELDWORK_STATUS, FIELDWORK_TYPE } from "../../../utils/constants"
import { validateFieldworkUpdate } from "../../../utils/validation"

export default function FieldworkEdit() {
  const { fieldworkId, fieldworkType } = useParams()
  const { data: fielworkData, isLoading: fielworkIsLoading, error: fielworkError } = swr(`/admin/fieldwork/${fieldworkId}`)

  return (
    <>
      <AdminLayout
        isLoading={fielworkIsLoading}
        title={"Edit Data " + FIELDWORK_TYPE[fieldworkType.toUpperCase()]}
      >
        <Card>
          <Formik
            initialValues={{
              name: fielworkData?.data?.name,
              periode: { label: fielworkData?.data?.periode, value: fielworkData?.data?.periode },
              status: { label: fielworkData?.data?.status, value: fielworkData?.data?.status }
            }}
            validate={validateFieldworkUpdate}
            onSubmit={async (values, actions) => {
              try {
                const { data: response } = await axios.put(`/admin/fieldwork/${fieldworkId}`, {
                  type: FIELDWORK_TYPE[fieldworkType.toUpperCase()],
                  name: values.name,
                  periode: values.periode.value,
                  status: values.status.value
                })

                toast.success(response.message)
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
                  label="Nama Magang"
                  name="name"
                  placeholder="Isi Nama Magang"
                />
                <FormSelect
                  label="Periode"
                  name="periode"
                  placeholder="Pilih Periode"
                  options={getPeriodes().map(e => ({ label: e, value: e }))}
                  isSearchable={true}
                />
                <FormSelect
                  label="Status"
                  name="status"
                  placeholder="Pilih Status"
                  options={Object.keys(FIELDWORK_STATUS).map(key => ({
                    label: FIELDWORK_STATUS[key],
                    value: key
                  }))}
                />
                <FormButton
                  isSubmitting={props.isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </Card>
      </AdminLayout>
    </>
  )
}