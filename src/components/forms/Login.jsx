/** @format */

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import axios from "axios";

const Login = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/login",
        {
          email,
          password,
        }
      );
      console.log(data);
      navigate("/dashboard");
      toast.success("Welcome");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Check your credentials");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-100">
        <Form
          className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-white p-5 md:py-10 rounded-tl-3xl rounded-br-3xl"
          onSubmit={login}
        >
          <span className="text-2xl font-bold text-center text-[rgb(241,146,46)]">
            Admin Panel
          </span>
          <section className="py-7 space-y-6">
            {/* Email */}
            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md">
              <input
                type="email"
                required
                placeholder="email"
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <AiOutlineMail className="text-xl " />
            </div>
            {/* Password */}
            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md">
              <input
                type={inputpass ? "text" : "password"}
                placeholder="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />

              <span
                onClick={() => {
                  setPass(!pass);
                  setInputpass(!inputpass);
                }}
                className="text-xl cursor-pointer hover:scale-90 "
              >
                {pass ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>
            <button
              type="submit"
              className="py-2 cursor-pointer tracking-wider bg-[rgb(241,146,46)] flex justify-center items-center w-full rounded-md font-medium   "
            >
              {loading ? (
                <Oval height={30} secondaryColor="black" color="black" />
              ) : (
                <div className="flex items-center">
                  <span className="flex items-center justify-center">
                    LOG In
                  </span>
                  <BiLogInCircle className="pl-1.5 text-2xl" />
                </div>
              )}
            </button>
          </section>
        </Form>
      </div>
    </>
  );
};

export default Login;
