import React from "react";
import Link from "next/link";
import { GoClock } from "react-icons/go";
import { motion, MotionConfig } from "motion/react";

const Game = ({ game }) => {
  const backendUrl = process.env.NEXT_PUBLIC_PB_URL;

  const handleGameTime = (time) => {
    let newtime = "";
    let unit = "";
    if (time < 1) {
      newtime = "< 1";
      unit = "min";
      return (
        <span className="text-white">
          <span className="text-2xl font-bold">{newtime}</span>
          <span className="text-sm">{unit}</span>
        </span>
      );
    } else if (time > 60) {
      let hour = time / 60;
      let min = (hour - Math.floor(hour)) * 60;
      newtime = Math.floor(hour);
      unit = "h";
      if (min > 0) {
        return (
          <span className="text-white">
            <span className="text-2xl font-bold">{newtime}</span>
            <span className="text-sm">{unit} </span>
            <span className="text-2xl font-bold">{Math.floor(min)}</span>
            <span className="text-sm">min</span>
          </span>
        );
      } else {
        return (
          <span className="text-white">
            <span className="text-2xl font-bold">{newtime}</span>
            <span className="text-sm">{unit}</span>
          </span>
        );
      }
    } else {
      newtime = time;
      unit = "min";
      return (
        <span className="text-white">
          <span className="text-2xl font-bold">{newtime}</span>
          <span className="text-sm">{unit}</span>
        </span>
      );
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 16, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 28, mass: 0.8 }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 12px 40px rgba(0,0,0,0.20)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    tap: { scale: 0.98 }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * i, type: "spring", stiffness: 250, damping: 22 }
    })
  };

  const imageVariants = {
    initial: { y: -12, opacity: 0, rotate: -0.5 },
    animate: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 220, damping: 20 }
    },
    hover: {
      y: -6,
      rotate: 0.5,
      transition: { type: "spring", stiffness: 250, damping: 16 }
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.li
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.4 }}
        whileHover="hover"
        whileTap="tap"
        variants={cardVariants}
        className="p-4 rounded-xl relative shadow-sm h-24 md:h32 w-full md:min-w-[30%] md:flex-1 md:max-w-[33%] cursor-pointer"
        style={{
          background: `radial-gradient(circle, #${game.inner_color}, #${game.out_color})`,
          willChange: "transform, box-shadow"
        }}
      >
        <Link
          href={{
            pathname: `/game/${game.id}`,
            query: { outer: game.out_color }
          }}
        >
          <motion.img
            src={`${backendUrl}/api/files/${game.collectionId}/${game.id}/${game.image}?token=`}
            alt={game.name}
            className="w-full max-w-[80%] h-26 absolute left-1/2 -translate-x-1/2 -top-16 object-contain rounded-lg pointer-events-none select-none"
            variants={imageVariants}
          />

          <div className="flex justify-between absolute bottom-4 left-4 right-4">
            <motion.h2
              className="text-2xl font-bold text-white w-46 leading-[1]"
              custom={0}
              variants={contentVariants}
            >
              {game.name}
            </motion.h2>

            <motion.div
              className="flex items-center justify-center gap-2"
              custom={1}
              variants={contentVariants}
              aria-label={`Tiempo estimado: ${game.time} minutos`}
            >
              <GoClock className="text-white text-2xl" />
              {handleGameTime(game.time)}
            </motion.div>
          </div>

          {/* Brillo suave al pasar el mouse */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                "radial-gradient(120px 60px at var(--mx,50%) -20%, rgba(255,255,255,0.25), rgba(255,255,255,0) 70%)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            onMouseMove={(e) => {
              const target = e.currentTarget;
              const rect = target.getBoundingClientRect();
              const mx = ((e.clientX - rect.left) / rect.width) * 100;
              target.style.setProperty("--mx", `${mx}%`);
            }}
          />
        </Link>
      </motion.li>
    </MotionConfig>
  );
};

export default Game;