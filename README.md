# React Reddit

This is a little app to demonstrate how Universal Rendering works.

## Running the project

This project uses the reddit API, so in order to run it you will need to create a reddit API user. You can read more about how to do it [here](https://github.com/reddit/reddit/wiki/OAuth2)

Once you have the all the API information, you need to create a `reddit.conf.json` file using the `reddit.conf.json.example` file as the template, and fill all the required information.

### Installing dependencies

  npm install

### Running in client-side-rendering mode

  npm run start
  open http://localhost:3000

### Running in universal-rendering mode

  npm run server
  open http://localhost:3001