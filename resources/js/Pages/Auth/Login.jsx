import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import Loader from "@/Components/Loader";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesión" />

            <Loader show={processing} overlay label="Creando cuenta…" />

            <div className="container-login-form">
                <Link
                    href="/"
                    className="button button-back"
                    aria-label="Volver"
                >
                    <ArrowLeft className="arrow-left" />
                </Link>
                <div className="image-login-form">
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
                <div className="title-login-form">
                    {status && <div className="status-message">{status}</div>}

                    <form onSubmit={submit} className="login-form">
                        <div className="title-login-header">
                            <img
                                src="/images/icon-Friendflix.webp"
                                alt="Icon Popcorn Friendflix"
                                className="icon-login"
                            />
                            <h2 className="title-login">Iniciar sesión</h2>
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

                        <div>
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
                                <span>Recuérdame</span>
                            </label>
                        </div>

                        <div className="button-login-form">
                            <p className="link-login">
                                ¿No tienes una cuenta?&nbsp;
                                <Link href={route("register")}>
                                    Regístrate ahora
                                </Link>
                            </p>
                            <PrimaryButton
                                type="submit"
                                className="button-login"
                                disabled={processing}
                            >
                                <span>Acceder</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
