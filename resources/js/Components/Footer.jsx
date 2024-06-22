import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { FaLinkedin, FaGithub } from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <Link href="/inicio">
                        <img
                            src="/images/Logo-mobile.webp"
                            alt="Logo Friendflix mobile"
                        />
                    </Link>
                </div>
                <div className="footer-text">
                    <p>Web design & developed by Lara Vel.</p>
                    <p> Friendflix - 2024</p>
                </div>
                <div className="footer-link">
                    <a
                        href="https://github.com/Lara-Vel"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGithub
                            style={{
                                color: "#093266",
                            }}
                            title="github"
                        />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/lara-vel/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaLinkedin
                            style={{
                                color: "#093266",
                            }}
                            title="linkedin"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}
