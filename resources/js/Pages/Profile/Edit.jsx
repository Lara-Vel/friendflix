import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdateUserAvatarForm from "./Partials/UpdateUserAvatarForm";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mi perfil">
                <meta
                    name="description"
                    content="Personaliza tus datos y contraseña en Friendflix. Gestiona tu perfil y ajusta tus preferencias."
                />
            </Head>

            <div>
                <div className="container-profile">
                    <div className="container-profile-information">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            // className="max-w-xl"
                            className="container-profile-information-form"
                        />
                    </div>
                    <div className="container-profile-avatar">
                        <UpdateUserAvatarForm className="max-w-xl" />
                    </div>

                    <div className="container-profile-password">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    <div className="container-profile-delete">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
