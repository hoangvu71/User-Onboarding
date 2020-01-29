import React, {useState, useEffect} from "react"
import { Form, Field, withFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"

function Forms({ errors, status }){
    const [user, setUser] = useState([]);

    useEffect(() => {
        status && setUser(user => [...user, status]);
    }, [status])

    return(
        <div>
            <Form>
                <Field type="text" name="name" placeholder="Name..."/>
                {errors.name && <p>{errors.name}</p>}
                <Field type="text" name="email" placeholder="Email..."/>
                <Field type="text" name="password" placeholder="Password..."/>
                <label>
                    Terms Agreement
                    {errors.terms && <p>{errors.terms}</p>}
                    <Field type="checkbox" name="terms"/>
                </label>
                <button type="submit">Submit</button>
            </Form>

            {user.map(ele => (
                <div>
                    <div>{ele.name}</div>
                    <div>{ele.email}</div>
                    <div>{ele.password}</div>
                </div>
            ))}

        </div>

    )
}

const FormikForm = withFormik({
    mapPropsToValues() {
        return {
            name: "",
            email: "",
            password: "",
            terms: false,
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
        .min(6)
        .required("Please enter your username."),
        email: Yup.string()
        .required("Please enter your email."),
        password: Yup.string()
        .min(6)
        .required("Please enter your password."),
        terms: Yup.bool()
        .required("The terms and condition must be accepted")
        .oneOf([true], "The terms and condition must be accepted")
    }),

    handleSubmit(values, { setStatus, resetForm}) {
        console.log(values);

        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log("Success", res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => {
            console.log("Error", err)
        })
    }
})(Forms)



export default FormikForm