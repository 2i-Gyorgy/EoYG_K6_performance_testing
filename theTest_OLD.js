import http from "k6/http";
import { check, sleep } from "k6";

export function theTestScript() {
  const url = "http://localhost:2002/api/products/";
  const payload_orig = JSON.stringify({
    name: "black cat",
    price: "13",
  });
  const payload_update = JSON.stringify({
    name: "blue whale",
    price: "25000",
  });
  const post_params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const put_params = {
    headers: {
      "Content-Type": "application/json",
    },
    tags: { name: "PutItemURL" },
  };
  const delete_params = {
    headers: {
      "Content-Type": "application/json",
    },
    tags: { name: "DeleteItemURL" },
  };
  var res = http.post(url, payload_orig, post_params);
  const new_product_id = res.json(["id"]);
  sleep(1);
  check(res, {
    "Post status is 201": (r) => res.status === 201,
    "Post Content-Type header": (r) =>
      res.headers["Content-Type"] === "application/json; charset=utf-8",
    "Post response name": (r) => res.json(["name"]) === "black cat",
  });
  console.log("post id: " + res.json(["id"]));

  res = http.put(url + new_product_id, payload_update, put_params);
  sleep(1);
  check(res, {
    "Put status is 200": (r) => res.status === 200,
    "Put response name": (r) => res.json(["name"]) === "blue whale",
  });
  console.log(
    "put id: " + res.json(["id"]) + " | put status code: " + res.status
  );

  res = http.del(url + new_product_id, null, delete_params);
  sleep(1);
  check(res, {
    "Delete status is 200": (r) => res.status === 200,
  });
  console.log(
    "delete id: " + new_product_id + " | delete status code: " + res.status
  );
}
