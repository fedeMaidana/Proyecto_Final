import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    userName: "",
    birthDate: "",
    lastName: "",
  });

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const { email, name, password, userName, lastName, birthDate } = inputs;

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      userName !== "" &&
      lastName !== "" &&
      birthDate !== ""
    ) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userName", userName);
      formData.append("lastName", lastName);
      formData.append("birthDate", birthDate);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:3001/register",
          formData
        );
        setMessage(response.data.message);
        setInputs({
          email: "",
          name: "",
          password: "",
          userName: "",
          lastName: "",
          birthDate: "",
        });
        setProfileImage(null);
        setTimeout(() => {
          setMessage("");
          navigate("/login");
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error(error);
        setMessage("Ocurrió un error al registrarse");
        setTimeout(() => {
          setMessage("");
        }, 1500);
      }
    }
  };

  return (
    <div className="bg-principal-black min-h-screen flex items-center justify-center">
      <div className="bg-principal-white p-8 rounded shadow-md w-[30rem] h-auto text-2xl">
        <h1 className="text-5xl font-bold mb-8">Register in Custom Craft</h1>

        <form onSubmit={(event) => onSubmit(event)}>
          <div className="mb-6 ">
            <label
              className="block font-semibold text-gray-700 mb-3"
              htmlFor="profileImage"
            >
              Profile Image
            </label>
            <div className="flex items-center justify-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                {profileImage ? (
                  <div>
                    <img
                      id="image-preview"
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <label
                      htmlFor="profileImage"
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-gray-500 absolute bottom-0 right-0 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="profileImage"
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </label>
                )}
              </div>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                className="hidden"
                onChange={(event) => setProfileImage(event.target.files[0])}
              />
            </div>

            <div>
              <label
                className="block font-semibold text-gray-700 mb-3"
                htmlFor="name"
              >
                Name
              </label>

              <input
                className="
                                    bg-principal-white
                                    mt-1
                                    p-3
                                    border
                                    border-principal-black
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                    mb-1
                                "
                onChange={(event) => onChange(event)}
                type="text"
                id="name"
                name="name"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="mb-6">
            <div>
              <label
                className="block font-semibold text-gray-700 mb-3"
                htmlFor="lastName"
              >
                Lastname
              </label>

              <input
                className="
                                    bg-principal-white
                                    mt-1
                                    p-3
                                    border
                                    border-principal-black
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                    mb-1
                                "
                onChange={(event) => onChange(event)}
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="mb-6">
            <div>
              <label
                className="block font-semibold text-gray-700 mb-3"
                htmlFor="userName"
              >
                Username
              </label>

              <input
                className="
                                    bg-principal-white
                                    mt-1
                                    p-3
                                    border
                                    border-principal-black
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                    mb-1
                                "
                onChange={(event) => onChange(event)}
                type="text"
                id="userName"
                name="userName"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="mb-6">
            <div>
              <label
                className="block font-semibold text-gray-700 mb-3"
                htmlFor="birthDate"
              >
                Birthdate
              </label>

              <input
                className="
                                    bg-principal-white
                                    mt-1
                                    p-3
                                    border
                                    border-principal-black
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                    mb-1
                                "
                onChange={(event) => onChange(event)}
                type="date"
                id="birthDate"
                name="birthDate"
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <div>
              <label
                className="block font-semibold text-gray-700 mb-3"
                htmlFor="email"
              >
                Email
              </label>

              <input
                className="
                                    bg-principal-white
                                    mt-1
                                    p-3
                                    border
                                    border-principal-black
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                    mb-6
                                "
                onChange={(event) => onChange(event)}
                type="email"
                id="email"
                name="email"
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <div>
              <label
                className="block font-semibold text-gray-700 mb-3"
                htmlFor="password"
              >
                Password
              </label>

              <input
                className="
                                    bg-principal-white
                                    mt-1
                                    p-3
                                    border
                                    border-principal-black
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                    mb-8
                                "
                onChange={(event) => onChange(event)}
                type="password"
                id="password"
                name="password"
                autoComplete="off"
              />
            </div>
          </div>

          <button
            className="
                            w-full
                            bg-secondary-blue2
                            text-white
                            font-semibold
                            py-3
                            rounded
                            hover:bg-blue-600
                            transition-colors
                            duration-300
                            mb-5
                        "
            type="submit"
          >
            {loading ? "Loading..." : "Register"}
          </button>

          <p className="mt-4 text-center">
            Do you have an account?
            <br />{" "}
            <b
              className="cursor-pointer text-blue-500"
              onClick={() => navigate("/login")}
            >
              Log in
            </b>
          </p>
        </form>
      </div>

      {message && (
        <div
          className="
                        text-2xl
                        font-bold
                        text-black-500
                        bg-blue-500
                        bg-opacity-75
                        rounded-lg
                        w-96
                        text-center
                        absolute
                        bottom-0
                        mb-8px
                        px-6
                        py-3
                        transition
                        duration-300
                        translate-y-[-7px]
                    "
        >
          {message}
        </div>
      )}
    </div>
  );
};
