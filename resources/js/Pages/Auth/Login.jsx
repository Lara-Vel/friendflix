import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("contraseña");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="login" />
            <div className="container-login-form">
                <div className="image-login-form">
                    <img
                        src="/images/Logo-Friendflix.webp"
                        alt="Logo Friendflix"
                    />
                </div>
                <div className="title-login-form">
                    {status && <div className="status-message">{status}</div>}

                    <form onSubmit={submit} className="login-form">
                        <h2 className="title-login">Iniciar sesión</h2>
                        <div>
                            <InputLabel htmlFor="email" value="email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                required
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Contraseña" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                required
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="remember-login-form">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Recuérdame
                                </span>
                            </label>
                        </div>

                        <div className="button-login-form">
                            <p className="link-login">
                                ¿No tienes una cuenta?&nbsp;
                                <Link
                                    href={route("register")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Regístrate ahora
                                </Link>
                            </p>

                            <PrimaryButton
                                className="button-login"
                                disabled={processing}
                            >
                                Acceder
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

// import { useEffect } from "react";
// import Checkbox from "@/Components/Checkbox";
// import GuestLayout from "@/Layouts/GuestLayout";
// import InputError from "@/Components/InputError";
// import InputLabel from "@/Components/InputLabel";
// import PrimaryButton from "@/Components/PrimaryButton";
// import TextInput from "@/Components/TextInput";
// import { Head, Link, useForm, usePage } from "@inertiajs/react";

// export default function Login({ status, canResetPassword }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         email: "",
//         password: "",
//         remember: false,
//     });

//     useEffect(() => {
//         return () => {
//             reset("contraseña");
//         };
//     }, []);

//     const submit = (e) => {
//         e.preventDefault();

//         post(route("login"));
//     };

//     return (
//         <GuestLayout>
//             <Head title="login" />

//             {status && (
//                 <div className="mb-4 font-medium text-sm text-green-600">
//                     {status}
//                 </div>
//             )}

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="email" value="Correo electrónico" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         isFocused={true}
//                         onChange={(e) => setData("email", e.target.value)}
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Contraseña" />

//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="current-password"
//                         onChange={(e) => setData("password", e.target.value)}
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="block mt-4">
//                     <label className="flex items-center">
//                         <Checkbox
//                             name="remember"
//                             checked={data.remember}
//                             onChange={(e) =>
//                                 setData("remember", e.target.checked)
//                             }
//                         />
//                         <span className="ms-2 text-sm text-gray-600">
//                             Recuérdame
//                         </span>
//                     </label>
//                 </div>

//                 <div className="flex items-center justify-end mt-4">
//                     {canResetPassword && (
//                         <Link
//                             href={route("password.request")}
//                             className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                             "¿Olvidó la contraseña?"
//                         </Link>
//                     )}

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Iniciar sesión
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }
