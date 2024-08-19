import { theTestScript } from "./theTest.js";

export const options = {
  // Key configurations for avg load test in this section
  stages: [
    { duration: "1m", target: 50 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: "5m", target: 50 }, // stay at 100 users for 30 minutes
    { duration: "1m", target: 0 }, // ramp-down to 0 users
  ],
};

export default () => {
  theTestScript();
};
