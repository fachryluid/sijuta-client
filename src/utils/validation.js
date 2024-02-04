export const validateFieldworkUpdate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Nama harus diisi.'
  }

  if (!values.periode) {
    errors.periode = 'Periode harus diisi.'
  }

  if (!values.status) {
    errors.status = 'Status harus diisi.'
  }

  return errors
}

export const validateFieldworkStore = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Nama harus diisi.'
  }

  if (!values.periode.value) {
    errors.periode = 'Periode harus diisi.'
  }

  if (!values.status) {
    errors.status = 'Status harus diisi.'
  }

  return errors
}

export const validateGroupsImport = values => {
  const errors = {}

  if (!values.file) {
    errors.file = 'File harus diisi.'
  }

  return errors
}