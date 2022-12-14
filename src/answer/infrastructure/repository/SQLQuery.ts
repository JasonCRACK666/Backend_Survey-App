export const findAnswerTextByIdQuery = `
  SELECT
    id,
    question_id,
    user_id,
    response
  FROM answer_text
  WHERE id = $1;
`

export const findAnswerMultiByIdQuery = `
  SELECT
    id,
    question_id,
    user_id,
    option_id
  FROM answer_multi
  WHERE id = $1;
`

export const createAnswerTextQuery = `
  INSERT INTO
    answer_text (
      id,
      question_id,
      user_id,
      response
    ) VALUES (
      $1,
      $2,
      $3,
      $4
    );
`

export const createAnswerMultiQuery = `
  INSERT INTO
    answer_multi (
      id,
      question_id,
      user_id,
      option_id
    ) VALUES (
      $1,
      $2,
      $3,
      $4
    );
`
