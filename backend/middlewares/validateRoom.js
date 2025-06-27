import Joi from "joi";

const roomSchema = Joi.object({
  roomNumber: Joi.string().required(),
  type: Joi.string().valid("single", "double", "suite", "deluxe").required(),
  price: Joi.number().required(),
  status: Joi.string()
    .valid("available", "occupied", "cleaning", "maintenance")
    .required(),
  features: Joi.array().items(Joi.string()),
  images: Joi.array().items(Joi.string()),
});

export const validateRoom = (req, res, next) => {
  const data = {
    ...req.body,
    images: req.files?.map((file) => file.filename) || [],
  };

  const { error } = roomSchema.validate(data, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
};
