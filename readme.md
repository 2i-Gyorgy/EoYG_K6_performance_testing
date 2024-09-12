this is an excersize running load tests with k6

1. first, start mock api server: run `uvicorn api:app` in ./apiServer

2. run load tests with command from root folder: `k6 run [test.js]`
