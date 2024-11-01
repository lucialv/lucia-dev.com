import React, { useState } from "react";
import {
  Award,
  Calendar,
  ExternalLink,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  url?: string;
  imageUrl: string;
};

const certificates: Certificate[] = [
  {
    title: "Introducció a les Xarxes (CCNA Routing & Switching)",
    issuer: "INS Sa Palomera",
    date: "2024",
    description:
      "Curso de introducción a las redes, incluyendo conceptos básicos de redes, protocolos, y configuración de dispositivos Cisco.",
    skills: ["Redes", "CCNA", "Routing", "Switching", "Cisco", "Packet Tracer"],
    imageUrl: "/certificates/Xarxes-Cert.jpg",
  },
  {
    title: "Administració básica de sistemes Linux",
    issuer: "INS Sa Palomera",
    date: "2024",
    description:
      "Curso de administración básica de sistemas Linux, incluyendo conceptos de terminal, comandos, y configuración de servicios.",
    skills: ["Linux", "Terminal", "Comandos", "Administración"],
    imageUrl: "/certificates/Linux-Cert.jpg",
  },
  {
    title: "Administració básica de sistemes en Windows 10",
    issuer: "INS Sa Palomera",
    date: "2024",
    description:
      "Curso de administración básica de sistemas Windows 10, incluyendo conceptos de configuración, mantenimiento, y resolución de problemas.",
    skills: [
      "Windows 10",
      "Administración",
      "Mantenimiento",
      "Resolución de Problemas",
    ],
    imageUrl: "/certificates/Windows-Cert.jpg",
  },
  {
    title: "Introducció a HTML i CSS",
    issuer: "INS Sa Palomera",
    date: "2024",
    description:
      "Curso de introducción a HTML y CSS, incluyendo conceptos básicos de maquetación y diseño web.",
    skills: ["HTML", "CSS", "Maquetación", "Diseño Web"],
    imageUrl: "/certificates/Html-Cert.jpg",
  },
  {
    title: "Elaboració de presentacions amb PowerPoint",
    issuer: "INS Sa Palomera",
    date: "2024",
    description:
      "Curso de elaboración de presentaciones con PowerPoint, incluyendo aspectos avanzados del programa.",
    skills: ["PowerPoint", "Presentaciones", "Diseño"],
    imageUrl: "/certificates/PowerPoint-Cert.jpg",
  },
  {
    title: "Elaboració avançada de Fulls de Càlcul amb Excel",
    issuer: "INS Sa Palomera",
    date: "2024",
    description:
      "Curso de elaboración avanzada de hojas de cálculo con Excel, incluyendo aspectos avanzados del programa.",
    skills: ["Excel", "Hojas de Cálculo", "Fórmulas", "Gráficos", "Macros"],
    imageUrl: "/certificates/Excel-Cert.jpg",
  },
  {
    title: "Elaboració avançada de documents de text amb Word",
    issuer: "INS Sa Palomera",
    date: "2024",
    description:
      "Curso de elaboración avanzada de documentos de texto con Word, incluyendo aspectos avanzados del programa.",
    skills: ["Word", "Documentos", "Texto", "Diseño"],
    imageUrl: "/certificates/Word-Cert.jpg",
  },
  {
    title: "Elaboració d'aplicacions amb bases de dades amb Access",
    issuer: "INS Sa Palomera",
    date: "2024",
    description:
      "Curso de elaboración de aplicaciones con bases de datos con Access, incluyendo aspectos avanzados del programa.",
    skills: ["Access", "Bases de Datos", "Aplicaciones", "Relaciones"],
    imageUrl: "/certificates/Access-Cert.jpg",
  },
  {
    title: "Gestió de correu i agenda amb Outlook",
    issuer: "INS Sa Palomera",
    date: "2024",
    description:
      "Curso de gestión de correo y agenda con Outlook, incluyendo aspectos avanzados del programa.",
    skills: ["Outlook", "Correo", "Agenda", "Gestión"],
    imageUrl: "/certificates/Outlook-Cert.jpg",
  },
];

const CertificatesPage: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < certificates.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className="mx-auto py-12 px-4 bg-gradient-to-br from-white to-purple-100 min-h-screen">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-[Mini] md:text-5xl lg:text-6xl font-bold text-[#d859fb] text-center">
          Mis Certificados
        </h1>
        <img
          className="ml-4 h-10 md:h-16 text-primary"
          src="/star_purple.gif"
          alt="star"
        />
      </div>
      <div className="grid p-16 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div
              className="relative h-48 w-full cursor-pointer group"
              onClick={() => openModal(index)}
            >
              <img
                src={cert.imageUrl}
                alt={`Certificado de ${cert.title}`}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  size={32}
                />
              </div>
            </div>
            <div className="p-6">
              <h2 className="  xl:text-2xl h-20 font-semibold mb-2 text-purple-700 flex items-center gap-2 text-md md:text-lg lg:text-xl">
                <Award className="h-6 w-6" />
                {cert.title}
              </h2>
              <p className="text-gray-600 mb-4">{cert.issuer}</p>
              <p className="text-gray-700 mb-4">{cert.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {cert.date}
                </div>
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors duration-300"
                  >
                    Ver certificado
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">
                    No hay enlace disponible
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="fixed top-4 right-4 text-white hover:text-gray-300 focus:outline-none z-60"
            aria-label="Cerrar imagen"
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="max-w-full max-h-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedImageIndex > 0 && (
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black hover:scale-105"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}
            <img
              src={certificates[selectedImageIndex].imageUrl}
              alt="Certificado en tamaño completo"
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: "90vh", maxWidth: "90vw" }}
            />
            {selectedImageIndex < certificates.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:scale-105"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
