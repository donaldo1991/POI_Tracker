import Joi from "joi";
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PointSpec = Joi.object()
  .keys({
    name: Joi.string().example("Cliffs of Moher").required(),
    longitude: Joi.number().example(1).required(),
    latitude: Joi.number().example(1).required(),
    description: Joi.string().example("Cliffs of Moher").required(),
    countryid: IdSpec,
  })
  .label("PointDetails");

export const PointSpecPlus = PointSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PointPlus");

export const PointArray = Joi.array().items(PointSpecPlus).label("PointArray");

export const CountrySpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Ireland"),
    userid: IdSpec,
    points: PointArray,
  })
  .label("Country");

export const CountrySpecPlus = CountrySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CountryPlus");

export const CountryArray = Joi.array().items(CountrySpecPlus).label("CountryArray");
