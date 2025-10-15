// AnimatedTableBody.jsx
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import TableBody from "./TableBody";

function AnimatedTableBody({ data, currentPage, direction, onEdit, onDelete }) {
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentPage}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        <TableBody data={data} onEdit={onEdit} onDelete={onDelete} />
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedTableBody;
