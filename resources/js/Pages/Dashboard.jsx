import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, groupedFavourites }) {
    console.log("groupedFavourites: ", groupedFavourites);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Inicio
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Bienvenido a Friendflix
                        </div>
                    </div>
                </div>

                {groupedFavourites &&
                    groupedFavourites.map((favourite, index) => {
                        return (
                            <div key={index}>
                                {favourite.user}

                                <div>
                                    {favourite.movies &&
                                        favourite.movies.map((movie, index) => {
                                            return (
                                                <span key={index}>
                                                    {movie.title}
                                                </span>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </AuthenticatedLayout>
    );
}
