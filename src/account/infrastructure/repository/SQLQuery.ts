export const selectAccountUserQuery = `
  SELECT
    users.id,
    users.username,
    users.firstName,
    users.lastName,
    accou.avatar,
    accou.birthday,
    accou.phoneNumber,
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
    phoneNumber = $4,
    address = $5
  WHERE
    userId = $1
`
export const createAccountQuery = `
  INSERT INTO
    account (
      id,
      userId,
      avatar,
      birthday,
      phoneNumber,
      address,
      createdAt,
      updatedAt
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7
    )
`
