import { useField } from "formik";

export const Checkbox = ({ children, ...props }: any) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <>
            <label className="checkbox">
                <input {...field} {...props} type="checkbox" />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error text-red-400 text-sm">{meta.error}</div>

            ) : null}
        </>
    );
};
