"use client";
import React, { useEffect, useMemo, useState } from "react";
import PocketBase from "pocketbase";
import { motion, AnimatePresence } from "framer-motion";
import { MdCancel } from "react-icons/md";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { useRouter } from 'next/navigation';


function ProgressBar({ value, index }) {
  return (
    <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
      <div className={`h-full rounded-full bg-gradient-to-r from-[#2C3480] via-[#EE2C30] to-[#D92870]`}
      style={{ width: `${value}%`, transition: 'width 0.3s ease-in-out' }}></div>
    </div>
  );
}

function Dots({ total, current, onSelect }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          aria-label={`Ir al paso ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "w-6" : "w-2.5"} bg-[#2C3480] hover:opacity-80`}
        />
      ))}
    </div>
  );
}

const variants = { enter: { x: 20, opacity: 0 }, center: { x: 0, opacity: 1 }, exit: { x: -20, opacity: 0 } };


export default function Walkthrough({
  collectionName = "walkthrough",
  titleField = "title",
  descriptionField = "description",
  mediaField = "image", 
  open = true,
}) {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);

  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  pb.autoCancellation(false);

  const backendUrl = process.env.NEXT_PUBLIC_PB_URL;

  useEffect(() => {
    let mounted = true;
    async function fetchSteps() {
      try {
        const records = await pb.collection(collectionName).getFullList({
        });

        const mapped = records.map((r) => {
          const step = {
            title: r[titleField] ?? "",
            description: r[descriptionField] ?? "",
          };
          if (mediaField && r[mediaField]) {
            step.media = (
              <img
                alt={r[titleField] || "ilustración"}
                className="h-28"
                src={`${backendUrl}/api/files/${r.collectionId}/${r.id}/${r[mediaField]}?token=`}
              />
            );
          }
          return step;
        });

        if (mounted) {
          setSteps(mapped);
          setError("");
        }
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los pasos.");
      } finally {
        setLoading(false);
      }
    }
    fetchSteps();
    return () => {
      mounted = false;
    };
  }, [collectionName, titleField, descriptionField, mediaField]);

  const last = steps.length - 1;
  const pct = useMemo(() => (steps.length ? Math.round(((index + 1) / steps.length) * 100) : 0), [index, steps.length]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function next() { setIndex((i) => Math.min(i + 1, last)); }
  function prev() { setIndex((i) => Math.max(i - 1, 0)); }
  function finish() { router.push("/games"); }
  function onClose() { router.push("/games"); }

  if (!open) return null;

  const step = steps[index] || {};

  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4 py-8 bg-black/40">
      <div className="relative w-full max-w-md shadow-2xl rounded-3xl overflow-hidden bg-white">

        <div className="p-6 bg-neutral-50">
          <div className="flex items-center justify-between">
            <div className="text-xs tracking-widest uppercase text-neutral-500">{loading ? "Cargando…" : "Bienvenido"}</div>
            <button onClick={onClose} aria-label="Cerrar" className="p-2 rounded-full hover:bg-neutral-200/70">
              <MdCancel size={20} />
            </button>
          </div>
          <div className="mt-4">
            <ProgressBar value={pct} />
          </div>
        </div>

        <div className={`relative h-28 flex items-center px-6 bg-[#2C3480]`}>
          <h1 className="text-white text-2xl font-bold tracking-tight">Petapa OnTrack</h1>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="mb-3 text-sm text-red-600">{error}</div>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={index} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: "easeOut" }}>
                {step.media && <div className="flex flex-col justify-center items-center">{step.media}</div>}
                <h2 className="text-xl font-bold text-neutral-900">{step.title}</h2>
                <p className=" text-neutral-600 leading-relaxed text-sm flex flex-col gap-4"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                ></p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={prev} disabled={index === 0} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-[#2C3480] text-[#2C3480] disabled:opacity-40">
              <FaAngleLeft size={16} /> Atrás
            </button>

            <Dots total={Math.max(steps.length, 1)} current={index} onSelect={setIndex} />

            {index < last ? (
              <button onClick={next} className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-md bg-[#2C3480] hover:bg-[#1e255f]">
                Siguiente <FaAngleRight size={16} />
              </button>
            ) : (
              <button onClick={finish} className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-md bg-[#2C3480] hover:bg-[#1e255f]">
                ¡Empezar!
              </button>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <button onClick={onClose} 
            className="underline text-neutral-500 hover:text-neutral-700">Omitir por ahora</button>
            <span className="text-neutral-300">•</span>
            <button onClick={() => setIndex(last)} className="underline text-neutral-500 hover:text-neutral-700">Saltar al final</button>
          </div>
        </div>
      </div>
    </div>
  );
}