export const findAllSurveysQuery = `
  SELECT
    survey.id,
    account.avatar,
    users.username,
    survey.title,
    survey.description,
    survey.created_at,
    survey.updated_at
  FROM survey
  INNER JOIN users
    ON survey.user_id = users.id
  INNER JOIN account
    ON users.id = account.user_id
  WHERE
    users.id = $1
`

export const findSurveyByIdQuery = `
  SELECT
    survey.id,
    account.avatar,
    users.username,
    survey.title,
    survey.description,
    survey.created_at,
    survey.updated_at
  FROM survey
  INNER JOIN users
    ON survey.user_id = users.id
  INNER JOIN account
    ON users.id = account.user_id
  WHERE
    survey.id = $1;
`

export const findCompleteSurveyQuery = `
  SELECT
    user_id,
    survey_id
  FROM completed_surveys
  WHERE
    user_id = $1 AND
    survey_id = $2;
`

export const createSurveyQuery = `
  INSERT INTO
    survey (
      id,
      title,
      description,
      user_id,
      created_at,
      updated_at
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    );
`

export const createCompleteSurveyQuery = `
  INSERT INTO
    completed_surveys (
      user_id,
      survey_id
    ) VALUES (
      $1,
      $2
    );
`

export const updateSurveyQuery = `
  UPDATE survey
  SET
    title = $2,
    description = $3
  WHERE
    id = $1;
`

export const deleteAllSurveysQuery = `
  DELETE FROM
    survey
  WHERE
    id = id;
`
