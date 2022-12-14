CREATE DATABASE api_survey;
CREATE DATABASE api_survey_test;

DROP DATABASE api_survey;
DROP DATABASE api_survey_test;
-- CREATE DATABASE api_survey_test;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE USERS (
  id UUID NOT NULL PRIMARY KEY,
  username VARCHAR(40) NOT NULL UNIQUE CHECK(LENGTH(username) >= 3),
  first_name VARCHAR(50) NOT NULL CHECK(LENGTH(first_name) >= 4),
  last_name VARCHAR(50) NOT NULL CHECK(LENGTH(last_name) >= 4),
  email VARCHAR(100) NOT NULL UNIQUE CHECK(LENGTH(email) >= 6),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  password VARCHAR(200) NOT NULL UNIQUE
);

CREATE TABLE ACCOUNT (
  id UUID NOT NULL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  avatar VARCHAR(200),
  birthday DATE CHECK(birthday < CURRENT_DATE),
  phone_number VARCHAR(9) UNIQUE CHECK(LENGTH(phone_number) = 9),
  address VARCHAR(80) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE
);

CREATE TABLE SURVEY (
  id UUID NOT NULL PRIMARY KEY,
  title VARCHAR(120) NOT NULL CHECK(LENGTH(title) >= 6),
  description TEXT CHECK(LENGTH(description) >= 10),
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE
);

CREATE TABLE QUESTION_TYPE (
  id UUID NOT NULL PRIMARY KEY,
  name VARCHAR(60) NOT NULL
);

INSERT INTO QUESTION_TYPE (id, name) VALUES (uuid_generate_v4(), 'text');
INSERT INTO QUESTION_TYPE (id, name) VALUES (uuid_generate_v4(), 'multi');

CREATE TABLE QUESTION (
  id UUID NOT NULL PRIMARY KEY,
  survey_id UUID NOT NULL,
  question_type_id UUID NOT NULL,
  question VARCHAR(200) NOT NULL,
  FOREIGN KEY (survey_id) REFERENCES SURVEY(id) ON DELETE CASCADE,
  FOREIGN KEY (question_type_id) REFERENCES QUESTION_TYPE(id) ON DELETE CASCADE
);

CREATE TABLE QUESTION_OPTION (
  id UUID NOT NULL PRIMARY KEY,
  question_id UUID NOT NULL,
  option VARCHAR(200) NOT NULL,
  FOREIGN KEY (question_id) REFERENCES QUESTION(id) ON DELETE CASCADE
);

CREATE TABLE ANSWER_TEXT (
  id UUID NOT NULL PRIMARY KEY,
  question_id UUID NOT NULL,
  user_id UUID NOT NULL,
  response TEXT NOT NULL CHECK(LENGTH(response) >= 10),
  FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES QUESTION(id) ON DELETE CASCADE
);

CREATE TABLE ANSWER_MULTI (
  id UUID NOT NULL PRIMARY KEY,
  question_id UUID NOT NULL,
  user_id UUID NOT NULL,
  option_id UUID NOT NULL,
  FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
  FOREIGN KEY (option_id) REFERENCES QUESTION_OPTION(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES QUESTION(id) ON DELETE CASCADE
);