import ratelimit from "../config/upstash.js";

// const rateLimiter = async (req,res,next) => {
//     try {
//         const {sucess} = await ratelimit.limit("my-limit-key"); //change to "userId" for req per user 

//         if (!sucess) {
//             return res.status(429).json({
//                 message: "Too many requests , please try again later!"
//             })
//         }
//         next()

//     } catch (error) {
//         console.log(`Rate limit error : ${error}`);
//         next(error);
//     }
// }

export default async function rateLimiter(req, res, next) {
  // ✅ NEVER rate-limit in development
  if (process.env.NODE_ENV !== "production") {
    return next();
  }

  const ip = req.ip ?? "127.0.0.1";

  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    return res.status(429).json({
      message: "Too many requests",
      reset,
    });
  }

  next();
}
