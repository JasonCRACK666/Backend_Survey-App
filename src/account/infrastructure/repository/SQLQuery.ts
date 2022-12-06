export const selectAccountUserByIdQuery = `
  SELECT
    accou.id,
    users.username,
    users.first_name,
    users.last_name,
    accou.avatar,
    accou.birthday,
    accou.phone_number,
    accou.address,
    accou.created_at,
    accou.updated_at
  FROM account accou
    INNER JOIN users
      ON accou.user_id = users.id
  WHERE
    accou.id = $1
`

export const selectAccountUserByUserId = `
  SELECT
    users.id,
    users.username,
    users.first_name,
    users.last_name,
    accou.avatar,
    accou.birthday,
    accou.phone_number,
    accou.address
  FROM account accou
    INNER JOIN users
      ON accou.user_id = users.id
  WHERE
    users.id = $1
`

export const updateAccountUserQuery = `
  UPDATE
    account
  SET
    avatar = $2,
    birthday = $3,
    phone_number = $4,
    address = $5
  WHERE
    id = $1
`
export const createAccountQuery = `
  INSERT INTO
    account (
      id,
      user_id,
      avatar,
      birthday,
      phone_number,
      address,
      created_at,
      updated_at
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8
    )
`
