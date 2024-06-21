import { usePage } from "@inertiajs/react";

export default function __(text) {
    const { translation } = usePage().props;
    return translation[text];
}
