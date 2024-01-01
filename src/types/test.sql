SELECT
    *
FROM
    users
WHERE
    name ILIKE (
        CASE
            WHEN $ 1 IS NOT NULL THEN $ 1
            ELSE '%%'
        END
    )
    AND email ILIKE (
        CASE
            WHEN $ 2 IS NOT NULL THEN $ 2
            ELSE '%%'
        END
    )
    AND gender = (
        CASE
            WHEN $ 3 IS NOT NULL THEN $ 2
            ELSE gender
        END
    )