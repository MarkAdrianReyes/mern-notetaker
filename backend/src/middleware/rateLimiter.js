import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    //Since there is no authentication, there is no way to uniquely identify users.
    //If you have a user ID, use it to create a unique key for each user.
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return res.status(429).json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(error);
  } 
}

export default rateLimiter;