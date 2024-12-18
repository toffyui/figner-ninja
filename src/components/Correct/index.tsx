import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./index.module.scss";
import { successTexts } from "../../utils/successTexts";

export const CorrectAnimation = () => {
  const [show, setShow] = useState(false);
  const controls = useAnimation();
  const shurikenSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    setShow(true);

    const animationSequence = async () => {
      if (!isMounted) return;
      await controls.start("flyIn");
      await controls.start("rotate");
      await controls.start("static");
    };

    animationSequence();
    if (shurikenSound.current) {
      shurikenSound.current.currentTime = 0;
      shurikenSound.current.play();
    }
    return () => {
      isMounted = false;
    };
  }, [controls]);

  const shurikenVariants = {
    initial: { x: "-100vw", rotate: 0 },
    flyIn: { x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    rotate: { rotate: 360, transition: { duration: 0.4, ease: "linear" } },
    static: { rotate: 0, transition: { duration: 0.2 } },
  };

  const textVariants = {
    initial: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.8, duration: 0.4 },
    },
  };

  const getVisibleHeight = () => {
    if (window.visualViewport) {
      return window.visualViewport.height;
    } else {
      // visualViewport がサポートされていない場合
      return window.innerHeight;
    }
  };

  return (
    <div
      className={`${styles.container} ${show ? styles.show : ""}`}
      style={{ height: getVisibleHeight() }}
    >
      <motion.div
        className={styles.shuriken}
        variants={shurikenVariants}
        initial="initial"
        animate={controls}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 375 375"
        >
          <path
            fill="#4c5461"
            d="M0 3.867C0 3.352.098 2.86.293 2.387.493 1.914.77 1.496 1.133 1.133c.363-.363.781-.64 1.254-.84C2.86.098 3.352 0 3.867 0L187.5 77.32 371.133 0c.515 0 1.008.098 1.48.293.473.2.891.477 1.254.84.364.363.641.781.84 1.254.196.473.293.965.293 1.48L297.68 187.5 375 371.133c0 .515-.098 1.008-.293 1.48-.2.473-.476.891-.84 1.254-.363.364-.78.641-1.253.84-.473.196-.965.293-1.48.293L187.5 297.68 3.867 375c-.515 0-1.008-.097-1.48-.293-.473-.199-.891-.476-1.254-.84-.363-.363-.64-.78-.84-1.253C.098 372.14 0 371.648 0 371.133L77.32 187.5 0 3.867"
          />
          <path
            fill="#000000"
            fillOpacity="0.5"
            d="M187.5 129.512c1.898 0 3.793.09 5.684.277 1.89.187 3.765.465 5.629.836 1.863.371 3.703.832 5.52 1.383 1.82.55 3.605 1.191 5.36 1.918 1.753.726 3.468 1.535 5.144 2.433 1.676.895 3.3 1.868 4.883 2.926 1.578 1.055 3.102 2.184 4.57 3.387 1.47 1.207 2.871 2.48 4.215 3.824 1.344 1.344 2.617 2.746 3.824 4.215 1.203 1.468 2.332 2.992 3.387 4.57 1.058 1.582 2.031 3.207 2.926 4.883.898 1.676 1.707 3.39 2.433 5.144.727 1.754 1.367 3.54 1.918 5.36.55 1.816 1.012 3.656 1.383 5.52.371 1.862.648 3.737.836 5.628.187 1.89.277 3.785.277 5.684 0 1.898-.09 3.793-.277 5.684-.187 1.89-.465 3.765-.836 5.628-.371 1.864-.832 3.704-1.383 5.52-.55 1.82-1.191 3.606-1.918 5.36-.726 1.754-1.535 3.469-2.433 5.145-.895 1.675-1.868 3.3-2.926 4.883-1.055 1.578-2.184 3.101-3.387 4.57-1.207 1.469-2.48 2.87-3.824 4.215-1.344 1.343-2.746 2.617-4.215 3.824-1.468 1.203-2.992 2.332-4.57 3.387-1.582 1.058-3.207 2.031-4.883 2.926-1.676.898-3.39 1.707-5.144 2.433-1.754.727-3.54 1.367-5.36 1.918-1.816.55-3.656 1.012-5.52 1.383-1.863.371-3.738.648-5.629.836-1.89.187-3.785.277-5.684.277-1.898 0-3.793-.09-5.684-.277-1.89-.188-3.765-.465-5.628-.836-1.864-.371-3.704-.832-5.52-1.383-1.82-.55-3.606-1.191-5.36-1.918-1.754-.726-3.469-1.535-5.145-2.433-1.675-.895-3.3-1.868-4.883-2.926-1.578-1.055-3.101-2.184-4.57-3.387-1.469-1.207-2.87-2.48-4.215-3.824-1.343-1.344-2.617-2.746-3.824-4.215-1.203-1.469-2.332-2.992-3.387-4.57-1.058-1.582-2.031-3.207-2.926-4.883-.898-1.676-1.707-3.39-2.433-5.145-.727-1.753-1.367-3.539-1.918-5.36-.55-1.816-1.012-3.656-1.383-5.52-.371-1.863-.648-3.738-.836-5.628-.187-1.89-.277-3.786-.277-5.684 0-1.899.09-3.793.277-5.684.187-1.89.465-3.766.836-5.629.371-1.863.832-3.703 1.383-5.52.55-1.82 1.191-3.605 1.918-5.359.726-1.754 1.535-3.468 2.433-5.144.895-1.676 1.868-3.3 2.926-4.883 1.055-1.578 2.184-3.102 3.387-4.57 1.207-1.47 2.48-2.871 3.824-4.215 1.344-1.344 2.746-2.617 4.215-3.824 1.469-1.203 2.992-2.332 4.57-3.387 1.582-1.058 3.207-2.031 4.883-2.926 1.676-.898 3.39-1.707 5.145-2.433 1.753-.727 3.539-1.367 5.36-1.918 1.816-.55 3.656-1.012 5.52-1.383 1.863-.371 3.738-.649 5.628-.836 1.89-.187 3.786-.277 5.684-.277"
          />
          <path
            fill="#c1c1c1"
            d="M187.5 129.512c1.898 0 3.793.09 5.684.277 1.89.187 3.765.465 5.629.836 1.863.371 3.703.832 5.52 1.383 1.82.55 3.605 1.191 5.36 1.918 1.753.726 3.468 1.535 5.144 2.433 1.676.895 3.3 1.868 4.883 2.926 1.578 1.055 3.102 2.184 4.57 3.387 1.47 1.207 2.871 2.48 4.215 3.824 1.344 1.344 2.617 2.746 3.824 4.215 1.203 1.468 2.332 2.992 3.387 4.57 1.058 1.582 2.031 3.207 2.926 4.883.898 1.676 1.707 3.39 2.433 5.144.727 1.754 1.367 3.54 1.918 5.36.55 1.816 1.012 3.656 1.383 5.52.371 1.862.648 3.737.836 5.628.187 1.89.277 3.785.277 5.684 0 1.898-.09 3.793-.277 5.684-.187 1.89-.465 3.765-.836 5.628-.371 1.864-.832 3.704-1.383 5.52-.55 1.82-1.191 3.606-1.918 5.36-.726 1.754-1.535 3.469-2.433 5.145-.895 1.675-1.868 3.3-2.926 4.883-1.055 1.578-2.184 3.101-3.387 4.57-1.207 1.469-2.48 2.87-3.824 4.215-1.344 1.343-2.746 2.617-4.215 3.824-1.468 1.203-2.992 2.332-4.57 3.387-1.582 1.058-3.207 2.031-4.883 2.926-1.676.898-3.39 1.707-5.144 2.433-1.754.727-3.54 1.367-5.36 1.918-1.816.55-3.656 1.012-5.52 1.383-1.863.371-3.738.648-5.629.836-1.89.187-3.785.277-5.684.277-1.898 0-3.793-.09-5.684-.277-1.89-.188-3.765-.465-5.628-.836-1.864-.371-3.704-.832-5.52-1.383-1.82-.55-3.606-1.191-5.36-1.918-1.754-.726-3.469-1.535-5.145-2.433-1.675-.895-3.3-1.868-4.883-2.926-1.578-1.055-3.101-2.184-4.57-3.387-1.469-1.207-2.87-2.48-4.215-3.824-1.343-1.344-2.617-2.746-3.824-4.215-1.203-1.469-2.332-2.992-3.387-4.57-1.058-1.582-2.031-3.207-2.926-4.883-.898-1.676-1.707-3.39-2.433-5.145-.727-1.753-1.367-3.539-1.918-5.36-.55-1.816-1.012-3.656-1.383-5.52-.371-1.863-.648-3.738-.836-5.628-.187-1.89-.277-3.786-.277-5.684 0-1.899.09-3.793.277-5.684.187-1.89.465-3.766.836-5.629.371-1.863.832-3.703 1.383-5.52.55-1.82 1.191-3.605 1.918-5.359.726-1.754 1.535-3.468 2.433-5.144.895-1.676 1.868-3.3 2.926-4.883 1.055-1.578 2.184-3.102 3.387-4.57 1.207-1.47 2.48-2.871 3.824-4.215 1.344-1.344 2.746-2.617 4.215-3.824 1.469-1.203 2.992-2.332 4.57-3.387 1.582-1.058 3.207-2.031 4.883-2.926 1.676-.898 3.39-1.707 5.145-2.433 1.753-.727 3.539-1.367 5.36-1.918 1.816-.55 3.656-1.012 5.52-1.383 1.863-.371 3.738-.649 5.628-.836 1.89-.187 3.786-.277 5.684-.277m0 5.797c-1.711 0-3.414.085-5.117.253-1.7.164-3.387.418-5.067.75-1.676.332-3.332.746-4.965 1.242-1.637.5-3.246 1.074-4.824 1.727-1.578.656-3.121 1.386-4.629 2.191-1.508.805-2.973 1.684-4.395 2.633-1.422.95-2.793 1.965-4.113 3.05-1.32 1.087-2.586 2.231-3.797 3.438-1.207 1.211-2.351 2.477-3.438 3.797-1.085 1.32-2.101 2.691-3.05 4.113-.95 1.422-1.829 2.887-2.633 4.395-.805 1.508-1.536 3.05-2.192 4.629-.652 1.578-1.226 3.187-1.726 4.824-.496 1.633-.91 3.289-1.242 4.965-.332 1.68-.586 3.367-.75 5.066-.168 1.703-.254 3.407-.254 5.118 0 1.71.086 3.414.254 5.117.164 1.699.418 3.386.75 5.066.332 1.676.746 3.332 1.242 4.965.5 1.637 1.074 3.246 1.726 4.824.656 1.578 1.387 3.121 2.192 4.629.804 1.508 1.683 2.973 2.633 4.395.949 1.422 1.965 2.793 3.05 4.113 1.087 1.32 2.23 2.586 3.438 3.797 1.21 1.207 2.476 2.351 3.797 3.438 1.32 1.085 2.691 2.101 4.113 3.05 1.422.95 2.887 1.829 4.395 2.633 1.508.805 3.05 1.536 4.629 2.192 1.578.652 3.187 1.226 4.824 1.726 1.633.496 3.289.91 4.965 1.242 1.68.332 3.367.586 5.067.75 1.703.168 3.406.254 5.117.254 1.71 0 3.414-.086 5.117-.254 1.699-.164 3.386-.418 5.066-.75 1.676-.332 3.332-.746 4.965-1.242 1.637-.5 3.246-1.074 4.824-1.726 1.578-.656 3.121-1.387 4.629-2.192 1.508-.804 2.973-1.683 4.395-2.633 1.422-.949 2.793-1.965 4.113-3.05 1.32-1.087 2.586-2.23 3.797-3.438 1.207-1.21 2.351-2.476 3.438-3.797 1.085-1.32 2.101-2.691 3.05-4.113.95-1.422 1.829-2.887 2.633-4.395.805-1.508 1.536-3.05 2.192-4.629.652-1.578 1.226-3.187 1.726-4.824.496-1.633.91-3.289 1.242-4.965.332-1.68.586-3.367.75-5.066.168-1.703.254-3.407.254-5.117 0-1.711-.086-3.415-.254-5.118-.164-1.699-.418-3.386-.75-5.066-.332-1.676-.746-3.332-1.242-4.965-.5-1.637-1.074-3.246-1.726-4.824-.656-1.578-1.387-3.121-2.192-4.629-.804-1.508-1.683-2.973-2.633-4.395-.949-1.422-1.965-2.793-3.05-4.113-1.087-1.32-2.23-2.586-3.438-3.797-1.21-1.207-2.476-2.351-3.797-3.438-1.32-1.085-2.691-2.101-4.113-3.05-1.422-.95-2.887-1.829-4.395-2.633-1.508-.805-3.05-1.536-4.629-2.191-1.578-.653-3.187-1.227-4.824-1.727-1.633-.496-3.289-.91-4.965-1.242-1.68-.332-3.367-.586-5.066-.75-1.703-.168-3.407-.253-5.117-.253"
          />
        </svg>
      </motion.div>
      <motion.div
        className={styles.text}
        variants={textVariants}
        initial="initial"
        animate="visible"
      >
        {successTexts[Math.floor(Math.random() * successTexts.length)]}
      </motion.div>
      <audio ref={shurikenSound} src="/sounds/shuriken.mp3" />
    </div>
  );
};
