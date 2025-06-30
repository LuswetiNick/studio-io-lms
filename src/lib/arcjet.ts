import "server-only";
import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from "@arcjet/next";

export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
};

export default arcjet({
  key:
    process.env.ARCJET_KEY ||
    (() => {
      throw new Error("ARCJET_KEY environment variable is required");
    })(),
  characteristics: ["fingerprint"],
  rules: [shield({ mode: "LIVE" })],
});
