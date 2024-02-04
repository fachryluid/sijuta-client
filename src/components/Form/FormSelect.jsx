import { Field, ErrorMessage } from 'formik';
import Select from 'react-select';

export default function FormSelect({ label, name, placeholder, options, isSearchable }) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: 'calc(2.5rem + 2px)',
      padding: '0',
      width: '100%',
      fontSize: '0.875rem',
      color: '#1F2937',
      backgroundColor: 'transparent',
      borderTopWidth: '0px',
      borderLeftWidth: '0px',
      borderRightWidth: '0px',
      borderBottomWidth: '2px',
      borderBottomColor: state.isFocused ? '#2563EB' : state.selectProps.error ? '#EF4444' : '#D1D5DB',
      borderRadius: '0',
      appearance: 'none',
      outline: '0',
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#DBEAFE' : 'transparent',
      color: '#1F2937',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#1F2937',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: '#6B7280',
    }),
    menuPortal: provided => ({ ...provided, zIndex: 9999 }),
    menu: provided => ({ ...provided, zIndex: 9999 })
  };

  return (
    <div className="relative z-0 group w-full mb-5">
      <label htmlFor={name} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        {label}
      </label>
      <Field name={name}>
        {({ field, form }) => (
          <Select
            {...field}
            id={name}
            placeholder={field.value ?? placeholder}
            options={options}
            onChange={(option) => form.setFieldValue(name, option)}
            onBlur={() => form.setFieldTouched(name, true)}
            isSearchable={isSearchable ?? false}
            styles={customStyles}
            error={form.errors[name]}
            menuPortalTarget={document.body}
            menuPosition={'fixed'}
          />
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
}