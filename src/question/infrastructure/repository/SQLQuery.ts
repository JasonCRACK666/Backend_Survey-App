export const findQuestionsBySurveyIdQuery = `
  SELECT
    question.id,
    question_type.name as question_type,
    question.question
  FROM question
    INNER JOIN question_type
      ON question.question_type_id = question_type.id
  WHERE question.survey_id = $1
`

export const findQuestionByIdQuery = `
  SELECT
    question.id,
    question.survey_id,
    question_type.name as question_type,
    question.question
  FROM question
    INNER JOIN question_type
      ON question.question_type_id = question_type.id
  WHERE question.id = $1;
`

export const findQuestionTypeByIdQuery = `
  SELECT * FROM question_type WHERE id = $1
`

export const createQuestionQuery = `
  INSERT INTO
    question (
      id,
      survey_id,
      question_type_id,
      question
    ) VALUES (
      $1,
      $2,
      $3,
      $4
    );
`

export const createQuestionTypeQuery = `
  INSERT INTO
    question_type (
      id,
      name
    ) VALUES (
      $1,
      $2
    );
`

export const deleteQuestionQuery = `
  DELETE FROM
    question
  WHERE
    id = $1;
`

export const deleteAllQuestionsQuery = `
  DELETE FROM
    question
  WHERE
    id = id;
`
