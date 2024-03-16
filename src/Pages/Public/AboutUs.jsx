import React from 'react'
import NavPublic from '../../Components/Views/SitePages/NavPublic'
import Footer from '../../Components/Views/SitePages/Footer'
import IconWhatssap from '../../Components/Common/IconWhatssap'

//icons
import SmartToyIcon from '@mui/icons-material/SmartToy';


function AboutUs() {
  return (
   <>
   <NavPublic>
    <IconWhatssap/>
    {/* Team */}
    <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
                 Un Equipo <span className="text-blue-500">Dedicado a Tu Éxito</span>
                </h1>

                <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
                  En AutoConta, nos enorgullece contar con un equipo de profesionales altamente cualificados
                  y apasionados por la innovación en el sector contable.
                </p>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
                    {/* Team Member 1 */}
                    <div className="px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
                        <div className="flex flex-col sm:-mx-4 sm:flex-row">
                            <img className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />

                            <div className="mt-4 sm:mx-4 sm:mt-0">
                                <h1 className="text-xl font-semibold text-gray-700 capitalize md:text-2xl dark:text-white group-hover:text-white">Dylan Aponte</h1>

                                <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">Desarollador</p>
                            </div>
                        </div>

                        <p className="mt-4 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nesciunt officia aliquam neque optio? Cumque facere numquam est.
                        </p>

                        {/* Social Links */}
                        {/* ... */}
                    </div>

                    {/* Team Member 2 */}
                    {/* Repeat the structure similar to Team Member 1 */}
                    {/* ... */}
                    
                    {/* Additional team members can be added similarly */}
                </div>
            </div>
        </section>


    <section className="flex items-center bg-stone-50 xl:h-screen font-poppins dark:bg-gray-800">
      <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
        <div className="flex flex-wrap items-center">
          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <div className="lg:max-w-md">
              <span className="text-xl font-semibold text-blue-600 uppercase dark:text-blue-500">
                Acerca de Nosotros
              </span>
              <h2 className="mt-4 mb-6 text-2xl font-bold dark:text-gray-300">
               Innovación y Confianza en el Mundo Contable
              </h2>
              <p className="mb-10 text-gray-600 dark:text-gray-400">
              AutoConta surgió de la visión de transformar el panorama contable para
              pequeñas y medianas empresas. Nuestra misión es simplificar los procesos
              contables a través de soluciones tecnológicas innovadoras, permitiendo a
              nuestros clientes enfocarse en lo que mejor saben hacer: dirigir sus
              negocios hacia el éxito. 
              </p>
            </div>
          </div>
          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <div className="flex mb-4">
              <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-blue-500 rounded dark:bg-blue-500 dark:text-gray-100 text-gray-50">
              <SmartToyIcon/>
              </span>
              <div>
                <h2 className="mb-4 text-xl font-bold leading-tight dark:text-gray-300 md:text-2xl">
                Inteligencia Artificial (IA)
                </h2>
                <p className="text-base leading-loose text-gray-500 dark:text-gray-400">
                En AutoConta, utilizamos inteligencia artificial para revolucionar la 
                contabilidad, automatizando procesos y generando análisis predictivos
                que impulsan el éxito empresarial
                </p>
              </div>
            </div>
            {/* Repite el mismo patrón para los otros bloques */}
          </div>
        </div>
      </div>
    </section>
    </NavPublic>
{/* Testimonials */}
    <section className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl px-6 py-10 mx-auto">
                <p className="text-xl font-medium text-blue-500">Testimonials</p>
                <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                    What clients saying
                </h1>

                <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
                    <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>
                    
                    <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                        <img className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl" src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="client photo" />
                        
                        <div className="mt-2 md:mx-6">
                            <div>
                                <p className="text-xl font-medium tracking-tight text-white">Ema Watson</p>
                                <p className="text-blue-200">Marketing Manager at Stech</p>
                            </div>

                            <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                                “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda”.
                            </p>
                            
                            <div className="flex items-center justify-between mt-6 md:justify-start">
                                <button title="left arrow" className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-blue-400">
                                    {/* SVG for left arrow */}
                                </button>

                                <button title="right arrow" className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-blue-400">
                                    {/* SVG for right arrow */}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>

    <Footer/>
   </>
  )
}

export default AboutUs