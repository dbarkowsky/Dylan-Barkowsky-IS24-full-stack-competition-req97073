# Dylan-Barkowsky-IS24-full-stack-competition-req97073

## Setup
There are two `.env` files that you can choose to create and populate. 

If you choose not to, the API will run on port `3000` by default, and the frontend will choose a new port for itself using a default hostname of `localhost` and default port of `3000` for the API connection.

I highly recommend setting the `.env` files to avoid a conflict on port `3000`.

`.env` setups are as follows:

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
To run the application in your local development environment:
### API
1. Navigate to the `/api` folder.
2. Run the command `npm ci` to install packages.
3. Run the command `npm run dev` to start the API.

This should report back with `Server started on port 3000.`

### App

In a separate terminal:
1. Navigate to the `/app` folder.
2. Run the command `npm ci` to install packages.
3. Run the command `npm start` to start the frontend component.

This should report back with `Compiled successfully!` and will open the page in your browser. 

If not, navigate to `http://localhost:3000`, assuming that's the port you used in the `.env` file.
