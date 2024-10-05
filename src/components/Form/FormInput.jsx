import { ErrorMessage, Field } from "formik";

export default function FormInput({ label, name, type, autocomplete, ...props }) {
  return (
    <>
      <Field name={name}>
        {({ field, form }) => (
          <div className="relative z-0 group w-full mb-5">
            <label
              htmlFor={name}
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {label}
            </label>
            {type === 'textarea' ?
              <textarea
                {...props}
                {...field}
                id={name}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer ${form.errors[name] && form.touched[name] ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              :
              <input
                {...props}
                {...field}
                id={name}
                type={type ?? "text"}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer ${form.errors[name] && form.touched[name] ? 'border-red-500 focus:border-red-500' : ''}`}
                autoComplete={autocomplete ?? ""}
              />
            }
            <ErrorMessage name={name} component="p" className="text-red-500 text-xs mt-1" />
          </div>
        )}
      </Field>
    </>
  )
}