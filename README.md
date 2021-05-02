# MERN Blog

This is a fully functional blog that was built using the MERN stack.

The useReducer React Hook is used for state management.

## Key Features

Create, Read, Update, Delete blog articles, upload a blog image and search for articles based on the article tags.

## Installation

Using npm:

```bash
git clone https://github.com/dlamb22/mernblog.git
cd mernblog/server
npm install
cd ../client
npm install
```

## Usage

Once it has finished installing all of the packages you need to create a .env file inside of the server/config directory:

.env
```bash
NODE_ENV=development
PORT=5000
MONGO_DB=mongodb_url_connection
```
Now, run this command in the server directory:

```bash
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
