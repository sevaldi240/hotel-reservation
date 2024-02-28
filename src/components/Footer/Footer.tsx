import Link from "next/link";
import { BiMessageDetail } from "react-icons/bi";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";
import { FaArrowAltCircleDown, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="mt-16">
            <div className="container mx-auto px-4">
                <Link href="/" className="font-black text-tertiary-dark">
                    HOTEL COPO DE NIEVE
                </Link>
                <div className="flex flex-wrap gap-16 items-center justify-between">
                    <h5 className="font-semibold text-[40px] py-6">Ubicación</h5>
                    <div className="flex-1">
                        <div className="flex items-center py-4">
                            <FaArrowAltCircleDown/>
                            <p>Av. Ladrón de Guevara E11-253</p>
                        </div>
                        
                        <div className="flex items-center py-4">
                            <BsFillSendFill/>
                            <p className="ml-2"> Quito 170143</p>
                        </div>
                        <div className="flex items-center">
                            <BsTelephoneOutbound/>
                            <p className="ml-2">+593-98-862-1799</p>
                        </div>
                        <div className="flex items-center t-4">
                            <BiMessageDetail/>
                            <p className="ml-2">Correo</p>
                        </div>
                    </div>
                    <div className="flex-1 md:text-center">
                        <h5 className="font-semibold text-[40px] py-6">Más</h5>
                        <p className="pb-4">Contacto</p>
                        <p className="pb-4">Acerca de Nosotros</p>
                        <p className="pb-4">Términos y condiciones</p>
                    </div>
                    <div className="flex-2 md:text-right">
                        <h5 className="font-semibold text-[40px] py-6">Redes Sociales</h5>

                        <Link href="https://www.facebook.com" passHref>
                            <FaFacebook  className="pb-4"/>
                        </Link>

                        <Link href="https://www.instagram.com" passHref>
                            <FaInstagram className="pb-4"/>
                        </Link>

                        <Link href="https://www.linkedin.com" passHref>
                            <FaLinkedin className="pb-4"/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0"/>
        </footer>
    );
};

export default Footer;