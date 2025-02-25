const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, 
  max: 50,
  message: { error: "Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde." },
  standardHeaders: true, 
  legacyHeaders: false, 
});

module.exports = limiter;
