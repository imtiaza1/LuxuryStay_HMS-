import Joi from "joi";

// Validation schema
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  contact: Joi.string().min(10).max(15).optional(),
  preferences: Joi.string().optional(), // only for guest
  role: Joi.string()
    .valid("admin", "manager", "receptionist", "housekeeping", "guest")
    .required(),
});

// Middleware
export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};
