import './contact.css';
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import { motion } from "framer-motion";

const Form = () => {
  const { lenisRef } = useOutletContext();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    reset();
  };

  useEffect(() => {
    if (lenisRef?.current) {
      setTimeout(() => {
        lenisRef.current.resize();
      }, 50);
    }
  }, [errors, lenisRef]);

  return (
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

      <button type="submit" disabled={isSubmitting} className='submitbtn'>
        {isSubmitting && (
          <motion.div className='spinner'
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        )}
        <span>{isSubmitting ? "" : "Verzenden"}</span>
        
      </button>
    </form>
  );
}

export default Form;