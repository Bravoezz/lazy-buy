import { TfiClose } from "react-icons/tfi";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "./Cart";
const ModalCart = ({ active, setActive }) => {
  return (
    <>
      <AnimatePresence>
        {active && (
          <div>
            <motion.div
              onClick={() => setActive(false)}
              className="fixed top-0 right-0 w-full h-screen flex justify-start p-6 items-start modal_bg"
              initial={{ x: 0, opacity: 0 }}
              animate={{ opacity: 100 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <motion.button
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
                transition={{ duration: 0.5 }}
                className="h-12 w-12 bg-fondo-300 rounded-lg grid place-content-center"
                onClick={() => setActive(false)}
              >
                <TfiClose size={"1.5em"} className="text-white" />
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ x: 500 }}
              animate={{ x: 100 }}
              exit={{ x: 500 }}
              transition={{ delay: 0.1, lease: "anticipate" }}
              className="cart_modal"
            >
              <Cart />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalCart;