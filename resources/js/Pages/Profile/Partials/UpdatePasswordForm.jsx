import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="update-password">
                <h2>Actualizar contraseña</h2>

                <p>
                    Asegúrate de que tu cuenta utiliza una contraseña larga y
                    aleatoria para que sea segura.
                </p>
            </header>

            <form onSubmit={updatePassword} className="update-password-form">
                <div className="update-password-text">
                    <InputLabel
                        htmlFor="current_password"
                        value="Contraseña actual"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div className="update-password-text">
                    <InputLabel htmlFor="password" value="Nueva contraseña" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="update-password-text">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirme contraseña"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* <div className="button-profile flex items-center gap-4"> */}
                <div className="button-profile">
                    <PrimaryButton
                        className="button-profile button-update"
                        disabled={processing}
                    >
                        <span>Guardar</span>
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xl text-white-600">Guardando.</p>
                    </Transition>
                </div>
                <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    defaultValue=""
                    tabIndex={-1}
                    aria-hidden="true"
                    className="sr-only"
                    style={{
                        position: "absolute",
                        left: "-9999px",
                        width: 1,
                        height: 1,
                        opacity: 0,
                    }}
                    readOnly
                />
            </form>
        </section>
    );
}
