import * as Yup from 'yup';

export const validationSchemaStoreJournal = Yup.object({
  groupId: Yup.string().required('Jenis kegiatan harus dipilih'),
  date: Yup.date()
    .required('Tanggal harus diisi'),
  start: Yup.string().required('Waktu mulai harus diisi'),
  end: Yup.string().required('Waktu selesai harus diisi'),
  name: Yup.string()
    .max(50, 'Nama maksimal 50 karakter')
    .required('Nama kegiatan harus diisi'),
  desc: Yup.string().required('Deskripsi kegiatan harus diisi'),
  location: Yup.string().required('Lokasi harus diisi'),
  outcome: Yup.number()
    .integer('Outcome harus berupa bilangan bulat')
    .min(0, 'Outcome minimal 0')
    .max(100, 'Outcome maksimal 100')
    .required('Capaian harus diisi'),
  note: Yup.string().nullable().transform((value) => (value === '' ? null : value)), // Allow empty string to be null
});

export const validationSchemaUpdateJournal = Yup.object({
  date: Yup.date()
    .required('Tanggal harus diisi'),
  start: Yup.string().required('Waktu mulai harus diisi'),
  end: Yup.string().required('Waktu selesai harus diisi'),
  name: Yup.string()
    .max(50, 'Nama maksimal 50 karakter')
    .required('Nama kegiatan harus diisi'),
  desc: Yup.string().required('Deskripsi kegiatan harus diisi'),
  location: Yup.string().required('Lokasi harus diisi'),
  outcome: Yup.number()
    .integer('Outcome harus berupa bilangan bulat')
    .min(0, 'Outcome minimal 0')
    .max(100, 'Outcome maksimal 100')
    .required('Capaian harus diisi'),
  note: Yup.string().nullable().transform((value) => (value === '' ? null : value)), // Allow empty string to be null
});

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

export const validateChangePassword = values => {
  const errors = {}

  if (!values.old_password) {
    errors.old_password = 'Password Lama harus diisi.'
  }

  if (!values.new_password) {
    errors.new_password = 'Password Baru harus diisi.'
  }

  if (!values.repeat_password) {
    errors.repeat_password = 'Konfirmasi Password harus diisi.'
  } else if (values.new_password != values.repeat_password) {
    errors.repeat_password = 'Konfirmasi tidak valid.'
  }

  return errors
}