import './contact.css';
import { useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">E-mailadres</label><br />
        <input id="email" type="email" placeholder="jouw@mail.be"
          {...register("email", {
            required: "E-mailadres is verplicht",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ongeldig e-mailadres"
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message">Bericht</label><br />
        <textarea id="message" rows={15}
          placeholder="Laat hier uw bericht achter…"
          {...register("message", {
            required: "Bericht is verplicht",
            minLength: {
              value: 10,
              message: "Bericht moet minimaal 10 tekens zijn"
            }
          })}
        />
        {errors.message && <p>{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Verzenden..." : "Verzenden"}
      </button>
    </form>
  );
}

export default Form;