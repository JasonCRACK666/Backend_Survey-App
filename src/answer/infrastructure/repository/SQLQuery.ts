export const findAnswersTextByQuestionIdQuery = `
  SELECT
    anstx.id,
    anstx.response,
    account.avatar,
    us.username
  FROM answer_text anstx
  INNER JOIN users us
    ON us.id = anstx.user_id
  INNER JOIN account
    ON account.user_id = us.id
  WHERE question_id = $1;
`

export const countSelectedOptionByOptionIdQuery = `
  SELECT
    COUNT(*) as selecteds
  FROM answer_multi
  WHERE option_id = $1
`

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
