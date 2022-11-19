# Certificategenerator.web

This is the Certificategenerator application built with [React](https://reactjs.org/) (Frontend) and  [Node](https://nodejs.org/)

## Getting Started.

Make sure you have nodejs installed by running the following command:

```bash
node -v
```

If the output is not the version of your nodejs installation, install nodejs from [here](https://nodejs.org/en/download/)

After installing nodejs install [yarn](https://www.npmjs.com/package/yarn)
if you have it then install the project's dependencies:

```bash
npm install
```

## STARTING THE SERVER

To start the whole application server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### **Building**

```bash
npm run build
```

To remove dist folder

```bash
npm clean
```

To remove all node_modules

```bash
npm clean-fresh
```

## Editor setup

We're using eslint for js linting, and prettier for code formating, make sure you install eslint and prettier plugins in your editor so you can
see linting errors as you code and have your code formatted on save by prettier. If formatOnSave doesn't work please google how to set up
format on save for the eslint & prettier plugins in your editor 🙃

**Before send PR or making a merge make sure you code is properly formatted.** You can easily do that by running

```bash
npm lint # to lint all files # in project directory
npm lint:js # to lint only js,jsx files # in project directory

npm prettify # to prettify files # in project directory
```

you can also lint for all files in the repo by running that command in the root folder.
