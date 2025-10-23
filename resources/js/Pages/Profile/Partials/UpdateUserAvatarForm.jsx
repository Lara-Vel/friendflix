import { useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import React, { useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import SecondaryButton from "@/Components/SecondaryButton";
import Toast from "@/Components/Toast";

export default function UpdateUserAvatarForm({ className = "" }) {
    const user = usePage().props.auth.user;
    const fileInputRef = useRef(null);
    const [sizeError, setSizeError] = useState("");
    const [preview, setPreview] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "" });

    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        clearErrors,
    } = useForm({
        avatar: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) {
            setSizeError(
                "El archivo es demasiado grande. Tamaño máximo: 2 MB."
            );
            setData("avatar", null);
            setPreview(null);
            return;
        }
        setSizeError("");
        setData("avatar", file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        clearErrors("avatar");

        post(route("profile.avatar.update"), {
            forceFormData: true,
            onSuccess: () => {
                setData("avatar", null);
                setPreview(null);
                setSizeError("");
                setToast({ show: true, message: "Avatar actualizado" });
            },
        });
    };

    const handleEditClick = () => {
        clearErrors("avatar");
        fileInputRef.current.click();
    };

    const handleDeleteAvatar = () => {
        clearErrors("avatar");

        post(route("profile.avatar.delete"), {
            onSuccess: () => {
                setData("avatar", null);
                setPreview(null);
                setSizeError("");
                setToast({ show: true, message: "Avatar eliminado" });
            },
        });
    };

    return (
        <section className={className}>
            <header className="update-avatar">
                <h2 className="text-lg font-medium text-gray-900">
                    Avatar de perfil
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Sube una imagen para tu perfil. Si no seleccionas ninguna,
                    se usará la imagen por defecto.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
                encType="multipart/form-data"
            >
                <div className="avatar-img-edit-container">
                    <img
                        src={
                            preview
                                ? preview
                                : user.avatar
                                ? `/storage/${user.avatar}`
                                : "/storage/avatars/default.webp"
                        }
                        alt="Avatar"
                        className="avatar-img-preview"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/storage/avatars/default.webp";
                        }}
                    />
                    <button
                        type="button"
                        className="avatar-edit-btn"
                        onClick={handleEditClick}
                        aria-label="Cambiar avatar"
                    >
                        <FiEdit2 size={24} />
                    </button>
                    <input
                        id="avatar"
                        name="avatar"
                        type="file"
                        className="avatar-upload-input"
                        accept="image/jpeg,image/png,image/webp"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </div>

                <span className="avatar-allowed-types">
                    Archivos compatibles: JPEG, PNG o WEBP. Tamaño máximo 2mb.
                </span>

                {sizeError && (
                    <div className="input-error-message">{sizeError}</div>
                )}

                <InputLabel
                    htmlFor="avatar"
                    value="Cambiar avatar"
                    className="sr-only"
                />

                <InputError
                    className="input-error-message"
                    message={data.avatar ? errors.avatar : ""}
                />

                <div className="avatar-buttons">
                    <PrimaryButton
                        type="submit"
                        className="button-avatar button-save"
                        disabled={processing || !!sizeError || !data.avatar}
                    >
                        <span>Guardar</span>
                    </PrimaryButton>
                    {!preview &&
                        user.avatar &&
                        user.avatar !== "avatars/default.webp" && (
                            <SecondaryButton
                                type="button"
                                className="button-avatar button-delete"
                                onClick={handleDeleteAvatar}
                            >
                                Borrar imagen
                            </SecondaryButton>
                        )}
                    {recentlySuccessful && (
                        <p className="text-sm text-green-600">¡Guardado!</p>
                    )}
                </div>
                {toast.show && (
                    <Toast
                        message={toast.message}
                        onClose={() => setToast({ show: false, message: "" })}
                    />
                )}
            </form>
        </section>
    );
}
