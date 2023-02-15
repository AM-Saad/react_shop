


import { useField } from "formik";

interface Props {
  label: string;
  id?: string;
  name: string;
  placeholder?: string
  data?: string;
  className?: string;
  type?: string;
}

const Input: React.FC<Props> = ({ label, ...props }) => {

  const [field, meta] = useField(props);
  return (
    <div className="grid w-full">
      <div className="flex items-center gap-3 w-1/8">
        <label htmlFor={props.id || props.name} className="text-xs font-medium">{label}</label>

        {meta.touched && meta.error ? (
          <div className="error text-red-400 text-xs">{meta.error}</div>
        ) : null}
      </div>
      <input
        id={props.id || props.name}
        {...field}
        className="shadow bg-gray-50 outline-none focus:shadow-md transition-shadow duration-300 block w-full text-xs rounded p-3 my-2"
        {...props} />
    </div>
  );
};

export default Input
