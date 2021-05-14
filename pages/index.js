import { useRouter } from 'next/router'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import jwt from "jsonwebtoken"
import axios from "axios";

const SignupSchema = Yup.object().shape({
  c_string: Yup.string()
    .min(2, "Connect string is to short !")
    .required("You have to enter valid string"),
  db_name: Yup.string()
    .min(2, "DB name is to short !")
    .required("You have to enter a database name"),
});

export default function Home() {
  const router = useRouter()

  function sendToAPI(data) {
    document.getElementById("submit_btn").style.display = "none";

    axios({
      url: "/api/getcharts",
      method: "POST",
      data: data,
    })
      .then((res) => router.push('/metrics?token=' + jwt.sign(res.data, "shhhhh")))
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center text-center">
      <div className="flex">
        <img
          src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png"
          style={{ height: "8rem" }}
        />
        <p className="text-8xl pt-5 ml-7 font-normal">metrics</p>
      </div>
      <div className="flex flex-col mt-5">
        <Formik
          initialValues={{ c_string: "", db_name: "" }}
          validationSchema={SignupSchema}
          onSubmit={sendToAPI}
        >
          {({ errors, touched }) => (
            <Form>
              {(errors.c_string && touched.c_string) ||
              (errors.db_name && touched.db_name) ? (
                <div className="  text-green-800 text-xl m-3 mt-0">
                  <p>{errors.c_string}</p>
                  <p>{errors.db_name}</p>
                </div>
              ) : null}
              <Field
                name="c_string"
                placeholder="mongodb+srv://admin:admin@template-db.db.mongodb.net/Template-DB"
                className="shadow border-2 p-3 border-green-600 rounded mr-2 w-96 focus:outline-none"
              />

              <Field
                name="db_name"
                placeholder="DB Name"
                className="shadow border-2 p-3 border-green-600 rounded mr-2 w-96 focus:outline-none"
              />
              <button
                id="submit_btn"
                className="p-3 bg-green-600 rounded text-white mt-5 w-11/12 focus:outline-none hover:bg-green-700 uppercase font-bold"
                type="submit"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
