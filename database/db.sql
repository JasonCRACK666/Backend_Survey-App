CREATE DATABASE api_survey;
CREATE DATABASE api_survey_test;

DROP DATABASE api_survey;
DROP DATABASE api_survey_test;
-- CREATE DATABASE api_survey_test;

CREATE EXTENSION "uuid-ossp";

-- \c api_survey_test;
\c api_survey;

CREATE TABLE users (
  id UUID NOT NULL PRIMARY KEY,
  username VARCHAR(40) NOT NULL UNIQUE CHECK(LENGTH(username) >= 3),
  firstName VARCHAR(50) NOT NULL CHECK(LENGTH(firstName) >= 4),
  lastName VARCHAR(50) NOT NULL CHECK(LENGTH(lastName) >= 4),
  email VARCHAR(100) NOT NULL UNIQUE CHECK(LENGTH(email) >= 6),
  password VARCHAR(200) NOT NULL UNIQUE
);

CREATE TABLE account (
  id UUID NOT NULL PRIMARY KEY,
  userId UUID NOT NULL UNIQUE,
  avatar VARCHAR(200),
  birthday DATE CHECK(birthday < CURRENT_DATE),
  phoneNumber VARCHAR(9) UNIQUE CHECK(LENGTH(phoneNumber) = 9),
  address VARCHAR(80) NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE survey (
  id UUID NOT NULL PRIMARY KEY,
  title VARCHAR(120) NOT NULL CHECK(LENGTH(title) >= 6),
  description TEXT CHECK(LENGTH(description) >= 10),
  userId UUID NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE question (
  id UUID NOT NULL PRIMARY KEY,
  surveyId UUID NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (surveyId) REFERENCES survey(id) ON DELETE CASCADE
);

CREATE TABLE question_multi (
  id UUID NOT NULL PRIMARY KEY,
  questionId UUID NOT NULL,
  question VARCHAR(200) NOT NULL,
  FOREIGN KEY (questionId) REFERENCES question(id) ON DELETE CASCADE
);

CREATE TABLE question_text (
  id UUID NOT NULL PRIMARY KEY,
  questionId UUID NOT NULL,
  question VARCHAR(200) NOT NULL CHECK(LENGTH(question) >= 10),
  FOREIGN KEY (questionId) REFERENCES question(id) ON DELETE CASCADE
);

CREATE TABLE question_option (
  id UUID NOT NULL PRIMARY KEY,
  questionMultiId UUID NOT NULL,
  option VARCHAR(200) NOT NULL,
  FOREIGN KEY (questionMultiId) REFERENCES question_multi(id) ON DELETE CASCADE
);

CREATE TABLE answer_text (
  id UUID NOT NULL PRIMARY KEY,
  questionTextId UUID NOT NULL,
  userId UUID NOT NULL,
  response TEXT NOT NULL CHECK(LENGTH(response) >= 10),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (questionTextId) REFERENCES question_text(id) ON DELETE CASCADE
);

CREATE TABLE answer_multi (
  id UUID NOT NULL PRIMARY KEY,
  questionMultiId UUID NOT NULL,
  userId UUID NOT NULL,
  optionId UUID NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (optionId) REFERENCES question_option(id) ON DELETE CASCADE,
  FOREIGN KEY (questionMultiId) REFERENCES question_multi(id) ON DELETE CASCADE
);
