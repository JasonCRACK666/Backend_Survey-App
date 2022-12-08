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
  first_name VARCHAR(50) NOT NULL CHECK(LENGTH(first_name) >= 4),
  last_name VARCHAR(50) NOT NULL CHECK(LENGTH(last_name) >= 4),
  email VARCHAR(100) NOT NULL UNIQUE CHECK(LENGTH(email) >= 6),
  password VARCHAR(200) NOT NULL UNIQUE
);

CREATE TABLE account (
  id UUID NOT NULL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  avatar VARCHAR(200),
  birthday DATE CHECK(birthday < CURRENT_DATE),
  phone_number VARCHAR(9) UNIQUE CHECK(LENGTH(phone_number) = 9),
  address VARCHAR(80) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE survey (
  id UUID NOT NULL PRIMARY KEY,
  title VARCHAR(120) NOT NULL CHECK(LENGTH(title) >= 6),
  description TEXT CHECK(LENGTH(description) >= 10),
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE question_type (
  id UUID NOT NULL PRIMARY KEY,
  name VARCHAR(60) NOT NULL
)

CREATE TABLE question (
  id UUID NOT NULL PRIMARY KEY,
  survey_id UUID NOT NULL,
  question_type_id UUID NOT NULL,
  question VARCHAR(200) NOT NULL,
  FOREIGN KEY (survey_id) REFERENCES survey(id) ON DELETE CASCADE,
  FOREIGN KEY (question_type_id) REFERENCES question_type(id) ON DELETE CASCADE
);

CREATE TABLE question_option (
  id UUID NOT NULL PRIMARY KEY,
  question_id UUID NOT NULL,
  option VARCHAR(200) NOT NULL,
  FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);

CREATE TABLE answer_text (
  id UUID NOT NULL PRIMARY KEY,
  question_id UUID NOT NULL,
  user_id UUID NOT NULL,
  response TEXT NOT NULL CHECK(LENGTH(response) >= 10),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);

CREATE TABLE answer_multi (
  id UUID NOT NULL PRIMARY KEY,
  question_multi_id UUID NOT NULL,
  user_id UUID NOT NULL,
  option_id UUID NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (option_id) REFERENCES question_option(id) ON DELETE CASCADE,
  FOREIGN KEY (question_multi_id) REFERENCES question_multi(id) ON DELETE CASCADE
);
