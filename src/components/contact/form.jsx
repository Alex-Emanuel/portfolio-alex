import './contact.css';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const Form = () => {
  const { lenisRef } = useOutletContext();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });

  const onSubmit = async (data) => {
    try {
      // Simuleer API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      reset();
      setSnackbar({ show: true, message: 'Bericht succesvol verzonden!', type: 'success' });
    } catch (err) {
      setSnackbar({ show: true, message: 'Er is iets misgegaan. Probeer opnieuw.', type: 'error' });
    }
  };

  useEffect(() => {
    if (lenisRef?.current) {
      setTimeout(() => {
        lenisRef.current.resize();
      }, 50);
    }
  }, [errors, lenisRef]);

  // Verberg snackbar na 3 seconden automatisch
  useEffect(() => {
    if (snackbar.show) {
      const timer = setTimeout(() => setSnackbar({ ...snackbar, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">E-mailadres</label>
          <input id="email" type="email" placeholder="jouw@mail.be"
            {...register("email", {
              required: "E-mailadres is verplicht",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Ongeldig e-mailadres"
              }
            })}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="message">Bericht</label>
          <textarea id="message" rows={14}
            placeholder="Laat hier uw bericht achter…"
            {...register("message", {
              required: "Bericht is verplicht",
              minLength: {
                value: 10,
                message: "Bericht moet minimaal 10 tekens zijn"
              }
            })}
          />
          {errors.message && <p className='error'>{errors.message.message}</p>}
        </div>

        <motion.button type="submit" disabled={isSubmitting} className='submitbtn'
          whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }} >
          {isSubmitting && (
            <motion.div className='spinner' animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          )}
          <span>{isSubmitting ? "" : "Verzenden"}</span>
        </motion.button>
      </form>

      {/* SNACKBAR */}
      <AnimatePresence>
        {snackbar.show && (
          <motion.div 
            className={`snackbar ${snackbar.type}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: 'ease', stiffness: 500 }}
          >
            <span>{snackbar.message}</span>
            <button 
              className="snackbar-close" 
              onClick={() => setSnackbar({ ...snackbar, show: false })}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Form;
