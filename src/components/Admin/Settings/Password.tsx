import { useContext } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import Input from '../../UI/Input'
import AdminContext from '../../../store/Admin/admin-context'
import Button from '../../UI/Button';


const validationScheme = Yup.object({
    oldPassword: Yup.string()
        .required("Required"),
    newPassword: Yup.string()
        .required("Required"),
    confirmPassword: Yup.string()
        .required("Required"),
})




const initialValues: { oldPassword: string, newPassword: string, confirmPassword: string } = { oldPassword: '', newPassword: '', confirmPassword: '', }


const MyForm: React.FC = () => {
    const { authMeta } = useContext(AdminContext)
    const { loading, error } = authMeta


    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationScheme}
            onSubmit={async (values, { setSubmitting }) => {
                console.log(values);

            }}
        >
            {({ handleSubmit, errors }: any) => {
                return (
                    <div className='my-10'>
                        <h2 className='font-medium my-2'>Update Password</h2>

                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Current Password"
                                name="oldPassword"
                                type="password"
                                placeholder="********"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"

                            />
                            <Input
                                label="New Password"
                                name="newPassword"
                                type="password"
                                placeholder="********"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"

                            />
                            <Input
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="********"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"

                            />
                            <div className='flex'>
                                <Button
                                    disabled={loading}
                                    loading={loading}
                                    title="Update"
                                    type="submit"
                                    onClick={() => { }}
                                    style="bg-green-400 mt-10"
                                />
                            </div>

                        </form>
                    </div>

                )
            }
            }
        </Formik>
    )

}
export default MyForm



