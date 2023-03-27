# Dylan-Barkowsky-IS24-full-stack-competition-req97073

## Setup
There are two `.env` files that you can choose to create and populate. 

If you choose not to, the API will run on port `3000` by default, and the frontend will choose a new port for itself using a default hostname of `localhost` and default port of `3000` for the API connection.

.env setups are as follows:

/app/.env

|  Variable | Example  | Description |
|---|---|---|
|  PORT | 8080  | The port the app will use.|
|  API_PORT | 3000  | The port the app contacts the API on. |
| HOSTNAME | localhost | The hostname of the API. |

/api/.env

|  Variable | Example  | Description |
|---|---|---|
|  PORT | 3000  | The port the API will use.|

## Running Instructions
There are two components: 
- the App
- the API

To run the application in your local development environment, run the following in separate terminals:
- From the `/api` folder, use the command `npm run dev`. This should report back with `Server started on port 3000.`
- From the `/app` folder, use the command `npm start`. This should report back with `Compiled successfully!` and will open the page in your browser. 
  - If not, navigate to `http://localhost:3000`, assuming that's the port you used in the .env file.
