import http from "k6/http";
import { sleep } from "k6";

//init
export const options = {
  vus: 10,
  duration: "30s",
};

// vu script
export default function () {
  let res = http.get("http://localhost:2002");
  console.log(res.status);
  sleep(5);
}
