const Joi = require('joi');
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
  SERVER_HOST: Joi.string().required()
      .description('Microservice host url'),
  SERVER_PORT: Joi.number()
      .default(4040),
  DEBUG: Joi.boolean()
      .when('NODE_ENV', {
        is: Joi.string().equal('development'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false)
      }),
  JWT_SECRET: Joi.string().required()
      .description('JWT Secret required to sign'),
  DB_HOST: Joi.string().required()
      .description('Mongo DB host url'),
  DB_PORT: Joi.number()
      .default(7777)
}).unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  host: envVars.SERVER_HOST,
  port: envVars.SERVER_PORT,
  jwtSecret: envVars.JWT_SECRET
};

module.exports = config;