import { theTestScript } from "./theTest_copy.js";

export const options = {
  vus: 3,
  duration: "30s",
};

export default () => {
  theTestScript();
};
