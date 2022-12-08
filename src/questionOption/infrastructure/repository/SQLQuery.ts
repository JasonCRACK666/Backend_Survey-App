export const findQuestionOptionByIdQuery = `
  SELECT * FROM question_option WHERE id = $1
`

export const createQuestionOptionQuery = `
  INSERT INTO
    question_option (
      id,
      question_id,
      option
    ) VALUES (
      $1,
      $2,
      $3
    )
`

export const deleteQuestionOptionQuery = `
  DELETE FROM
    question
  WHERE
    id = $1
`

export const deleteAllQuestionOptionsQuery = `
  DELETE FROM
    question_option
  WHERE
    id = id
`
