export const selectSurveyByIdQuery = `

  SELECT
    surv.id,
    surv.title,
    surv.description,
    acco.avatar,
    user.username,
    surv.created_at,
    surv.updated_at
  FROM survey surv
    INNER JOIN users user
      ON surv.user_id = user.id
    INNER JOIN account acco
      ON acco.user_id = user.id
  WHERE
    surv.id = $1
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
    )
`

export const updateSurveyQuery = `
  UPDATE survey
  SET
    title = $2,
    description = $3
  WHERE
    id = $1
`