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
        <div className="text-white">
          <span className="text-2xl font-bold">{Math.round(newtime)}</span>
          <span className="text-sm">{unit}</span>
        </div>
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

  const isClosed = game.closed === true;

  return (
    <MotionConfig reducedMotion="user">
      <motion.li
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.4 }}
        variants={cardVariants}
        className={`p-4 rounded-xl relative shadow-sm h-24 md:h32 w-full lg:max-w-[45%] xl:max-w-[30%]
          ${isClosed ? "grayscale" : ""} transition-all duration-200`}
        style={{
          background: isClosed
            ? "radial-gradient(circle, #9ca3af, #6b7280)" // gris
            : `radial-gradient(circle, #${game.inner_color}, #${game.out_color})`,
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
              {game.name}{" "}
              {isClosed && (
                <span className="block text-sm font-medium text-red-300">
                  CERRADO
                </span>
              )}
            </motion.h2>

            {!isClosed && (
              <motion.div
                className="flex items-center justify-end gap-2 w-full"
                custom={1}
                variants={contentVariants}
                aria-label={`Tiempo estimado: ${game.time} minutos`}
              >
                <GoClock className="text-white text-2xl" />
                {handleGameTime(game.time)}
              </motion.div>
            )}
          </div>
        </Link>
      </motion.li>
    </MotionConfig>
  );
};

export default Game;