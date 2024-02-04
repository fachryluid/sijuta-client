import { useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import { Card } from "flowbite-react";
import { Formik, Form } from "formik";
import { FIELDWORK_STATUS, FIELDWORK_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";
import FormInput from "../../../components/Form/FormInput";
import { getPeriodes } from "../../../utils/generate";
import { validateFieldworkStore } from "../../../utils/validation";
import FormSelect from "../../../components/Form/FormSelect";
import FormButton from "../../../components/Form/FormSubmit";
import axios from "../../../utils/axios"

export default function FieldworkCreate() {
  const { fieldworkType } = useParams()

  return (
    <AdminLayout
      title={"Tambah Data " + FIELDWORK_TYPE[fieldworkType.toUpperCase()]}
    >
      <Card>
        <Formik
          initialValues={{ name: '', periode: { label: '', value: '' }, status: FIELDWORK_STATUS.INACTIVE }}
          validate={validateFieldworkStore}
          onSubmit={async (values, actions) => {
            try {
              const payload = {
                type: FIELDWORK_TYPE[fieldworkType.toUpperCase()],
                name: values.name,
                periode: values.periode.value,
                status: values.status
              }

              const { data: response } = await axios.post(`/admin/fieldwork`, payload)

              toast.success(response.message)
              actions.resetForm()
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
                label={"Nama " + fieldworkType}
                name="name"
                placeholder={"Isi Nama " + fieldworkType}
              />
              <FormSelect
                label="Periode"
                name="periode"
                placeholder="Pilih Periode"
                options={getPeriodes().map(e => ({ label: e, value: e }))}
                isSearchable={true}
              />
              <FormButton
                isSubmitting={props.isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </Card>
    </AdminLayout>
  )
}