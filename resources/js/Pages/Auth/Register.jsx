import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import Loader from "@/Components/Loader";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Registro de usuario" />

            <Loader show={processing} overlay label="Iniciando sesión…" />

            <div className="container-register-form">
                <Link
                    href="/"
                    className="button button-back"
                    aria-label="Volver"
                >
                    <ArrowLeft className="arrow-left" />
                </Link>
                <div className="image-register-form">
                    <picture>
                        <source
                            media="(max-width: 576px)"
                            srcSet="/images/welcome-Mobile.webp"
                        />
                        <source
                            media="(min-width: 577px) and (max-width: 992px)"
                            srcSet="/images/welcome-Tablet.webp"
                        />
                        <img
                            src="/images/welcome-Desktop.webp"
                            alt="Welcome Friendflix"
                        />
                    </picture>
                </div>
                <div className="title-register-form">
                    <form onSubmit={submit} className="register-form">
                        <div className="title-register-header">
                            <img
                                src="/images/icon-Friendflix.webp"
                                alt="Icon Popcorn Friendflix"
                                className="icon-register"
                            />
                            <h2 className="title-register">
                                Registro de usuario
                            </h2>
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="Nombre" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                required
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                required
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Contraseña" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                required
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirmar contraseña"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                required
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="button-register-form">
                            <p className="link-register">
                                ¿Ya tienes una cuenta?&nbsp;
                                <Link
                                    href={route("login")}
                                >
                                    Inicia sesión
                                </Link>
                            </p>

                            <PrimaryButton
                                type="submit"
                                className="button-register"
                                disabled={processing}
                            >
                                <span>Crea tu cuenta</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
