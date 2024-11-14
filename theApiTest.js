import http from "k6/http";
import { check, sleep } from "k6";

export function theTestScript() {
  const url = "http://localhost:8000/api/direction/left";
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  var res = http.get(url);
  sleep(1);
  check(res, {
    "Post status is 200": (r) => res.status === 200,
    "Post Content-Type header": (r) =>
      res.headers["Content-Type"] === "application/json",
  });
}
