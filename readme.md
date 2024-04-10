# Fantastic AI Commerce Backend

This is the backend for the Fantastic AI Commerce project. It's built with Node.js, TypeScript, Express, and uses the commercetools platform for eCommerce functionality. It also uses Axios for making HTTP requests.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installing

1. Clone the repository:
git clone https://github.com/yourusername/fantastic-ai-commerce-be.git

2. Navigate to the project directory:
cd fantastic-ai-commerce-be

3. Install the dependencies:
npm install

##
create an .env files using the .env_mock and update the values

## Running the Application

To start the application, run:
npm start

## Handling CORS

Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin.

This project uses the `cors` middleware to handle CORS. If you want to restrict access to specific origins, you can modify the `cors` configuration in the server file.

Here's how the `cors` middleware is applied in the server file:

## Running the Tests

To run the tests, run:
npm test


## Buidling and running a docker container
docker build -t fantastic-ai-commerce-be .
docker run --env-file .env -p 5000:5000 fantastic-ai-commerce-be

## Built With

- [Node.js](https://nodejs.org/) - The runtime environment
- [TypeScript](https://www.typescriptlang.org/) - The programming language
- [Express](https://expressjs.com/) - The web application framework
- [Axios](https://axios-http.com/) - The HTTP client
- [commercetools](https://commercetools.com/) - The eCommerce platform

## Contributing
We welcome contributions from everyone. Here are some guidelines to follow:

1. Fork the repository and create your branch from `master`.
2. Write clear, concise, and descriptive commit messages.
3. Push your changes to your fork and submit a pull request.

For more details, please read [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the [INSERT YOUR LICENSE HERE] License - see the [LICENSE.md](LICENSE.md) file for details