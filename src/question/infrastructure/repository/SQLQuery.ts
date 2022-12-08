export const findQuestionByIdQuery = `
  SELECT * FROM question WHERE id = $1
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
    )
`

export const deleteQuestionQuery = `
  DELETE FROM question
  WHERE
    id = $1
`

export const findQuestionTypeByIdQuery = `
  SELECT * FROM question_type WHERE id = $1
`