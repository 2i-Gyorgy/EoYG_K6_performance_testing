import { theTestScript } from "./theTest.js";

export const options = {
  // Key configurations for breakpoint in this section
  executor: "ramping-arrival-rate", //Assure load increase if the system slows
  stages: [
    { duration: "2h", target: 20000 }, // just slowly ramp-up to a HUGE load
  ],
};

export default () => {
  theTestScript();
};
