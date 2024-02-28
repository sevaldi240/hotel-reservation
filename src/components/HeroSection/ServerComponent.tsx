import Image from "next/image";
export const heading1= (
    <>
        <h1 className="font-heading mb-6 ">
            Ven Y Disfruta de la mejor Hostadia
        </h1>
        <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg">
        ¡Bienvenidos a nuestra cadena de hoteles, donde el calor humano y la pasión por nuestra tierra se funden para ofrecerte una experiencia única al estilo ecuatoriano! Con años de trayectoria en el mercado hotelero, nos enorgullece compartir contigo la riqueza de nuestras tradiciones y la belleza de nuestros paisajes.
        </p>
    </>
);

export const section2=(
    <div className="md:grid hidden gap-8 grid-cols-1">
        <div className="rounded-2xl overflow-hidden h-48">
            <Image src="/images/logo.jpg" alt="hero-1" width={300} height={300} className="img scale-animation "/>
        </div>
        <div className="grid grid-cols-2 gap-8 h-48">
            <div className="rounded-2xl overflow-hidden">
                <Image src="/images/uno.jpg" alt="hero-2" width={300} height={300} className="img scale-animation "/>
            </div>
            <div className="rounded-2xl overflow-hidden">
               <Image src="/images/otro.jpg" alt="hero-3" width={300} height={300} className="img scale-animation "/>
            </div>
        </div>
    </div>
);