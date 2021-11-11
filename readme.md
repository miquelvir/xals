Source code of XALS, the restaurant course timer.

![flake8](https://github.com/miquelvir/xals/actions/workflows/flake8.yml/badge.svg)
![tests](https://github.com/miquelvir/xals/actions/workflows/test.yml/badge.svg)
![black](https://github.com/miquelvir/xals/actions/workflows/black.yml/badge.svg)
![build-react](https://github.com/miquelvir/xals/actions/workflows/build-react.yml/badge.svg)
![docs](https://github.com/miquelvir/xals/actions/workflows/docs.yml/badge.svg)
![CodeQL](https://github.com/miquelvir/xals/actions/workflows/codeql-analysis.yml/badge.svg)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

[`DEPLOY APP TO STAGING`](https://github.com/miquelvir/xals/actions/workflows/deploy-heroku.yml)
[`DEPLOY DOCS TO GH-PAGES`](https://github.com/miquelvir/xals/actions/workflows/deploy-docs.yml)

STAGING: https://xals.herokuapp.com/
PRODUCTION: https://fb.unicohotels.com/

# SET UP FOR DEVELOPMENT
## INSTALLING
0. Fork this repository (needed only for contributing)
1. Clone your fork
2. Install [Python 3 and Pip](https://www.python.org/downloads/)
3. Install Python requirements using `pip install -r requirements.txt` within your venv
4. Install [npm](https://www.npmjs.com/get-npm)
5. `cd web_app` and run `npm install` for the frontend setup

## RUNNING
1. Python backend
    1. [Add all the required environment variables](https://www.jetbrains.com/help/objc/add-environment-variables-and-program-arguments.html): `ENVIRONMENT=development`, `SECRET=mySuperSecret`
    2. Use development/generate_sample_db.py to create a new database. It will prompt you for your email to add it as admin.
2. Frontend development server
    1. Run `npm start` inside web_app to start the frontend development server or `npm build` inside web_app to build the React files into static files

## DOCS
1. To build and run a development server with the documentation, `cd docs` and run `yarn install` & `yarn start`.

# ARCHITECTURE & DESIGN
Go to [/architecture](architecture/readme.md) for more info.
