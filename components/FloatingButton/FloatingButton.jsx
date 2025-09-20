"use client";
import React, { useState } from "react";
import { FaEnvelope, FaBook } from "react-icons/fa";
import { TbHelpCircleFilled } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";
import { useRouter } from "next/navigation"


const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const actions = [
    {
      icon: <FaEnvelope  />,
      label: "Escribir a soporte",
      onClick: () => window.location.href = "mailto:her21199@uvg.edu.gt",
    },
    {
      icon: <FaBook />,
      label: "Preguntas frecuentes",
      onClick: () => router.push('/faqs'),
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-3">
      {open && actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className="flex items-center bg-white shadow-md p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <span className="mr-2 text-black">{action.label}</span>
          <span className="text-[#2C3480]">{action.icon}</span>
        </button>
      ))}

      <button
        onClick={() => setOpen(!open)}
        className="rounded-full bg-white h-10 w-10 "
      >
        {open ? 
            <IoIosCloseCircle className=" w-full rounded-full h-full text-[#2C3480]" />
         : <TbHelpCircleFilled className=" w-full rounded-full h-full text-[#2C3480]" />}
      </button>
    </div>
  );
};

export default FloatingButton;